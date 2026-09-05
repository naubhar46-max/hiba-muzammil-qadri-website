// One-time migration script: extracts the 5 Gallery images (currently
// embedded as base64 inside index.html) and uploads them to Sanity as
// proper image assets, then creates galleryItem documents pointing to them.
//
// This script only READS index.html — it never writes to it. The frontend
// is completely untouched by running this.
//
// Run with: npx sanity exec migrate-gallery.mjs --with-user-token

import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const indexHtmlPath = path.join(__dirname, '..', 'index.html')

const client = getCliClient()

function extractGallerySection(html) {
  const startMarker = '<section class="section" id="gallery">'
  const startIdx = html.indexOf(startMarker)
  if (startIdx === -1) throw new Error('Gallery section not found in index.html')
  const endIdx = html.indexOf('</section>', startIdx)
  if (endIdx === -1) throw new Error('Gallery section end not found')
  return html.slice(startIdx, endIdx)
}

function extractImages(gallerySectionHtml) {
  const imgRegex = /<img src="(data:image\/[a-zA-Z]+;base64,[^"]+)" alt="([^"]*)"/g
  const images = []
  let match
  while ((match = imgRegex.exec(gallerySectionHtml)) !== null) {
    images.push({dataUri: match[1], alt: match[2]})
  }
  return images
}

async function run() {
  const html = fs.readFileSync(indexHtmlPath, 'utf8')
  const gallerySection = extractGallerySection(html)
  const images = extractImages(gallerySection)

  console.log(`Found ${images.length} gallery images in index.html`)

  const transaction = client.transaction()

  for (let i = 0; i < images.length; i++) {
    const {dataUri, alt} = images[i]
    const [, mime, base64Data] = dataUri.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/)
    const buffer = Buffer.from(base64Data, 'base64')
    const ext = mime.split('/')[1]

    console.log(`Uploading image ${i + 1}/${images.length}: "${alt}" (${buffer.length} bytes)`)
    const asset = await client.assets.upload('image', buffer, {
      filename: `gallery-${i + 1}.${ext}`,
      contentType: mime,
    })

    transaction.createIfNotExists({
      _id: `galleryItem-${i + 1}`,
      _type: 'galleryItem',
      image: {
        _type: 'image',
        asset: {_type: 'reference', _ref: asset._id},
      },
      caption: alt,
      order: i + 1,
    })
  }

  const result = await transaction.commit()
  console.log(`Done. ${result.results.length} galleryItem documents created/verified.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
