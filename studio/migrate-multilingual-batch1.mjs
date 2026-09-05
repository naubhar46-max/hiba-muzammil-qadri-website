// One-time migration script: populates the Multilingual Portfolio section
// with the first batch of languages/tracks the user provided directly
// (via chat, not through Sanity Studio). Uses the existing `language` and
// `musicItem` schemas — no new schema types created.
//
// For songs that already exist in the Music Catalogue (same YouTube video),
// this LINKS the existing document to its language instead of duplicating
// it. Only genuinely new songs get new documents.
//
// Run with: npx sanity exec migrate-multilingual-batch1.mjs --with-user-token

import fs from 'node:fs'
import path from 'node:path'
import { getCliClient } from 'sanity/cli'

const client = getCliClient()
const picsDir = 'C:\\Users\\DELL\\Documents\\website details and pics'

async function uploadImage(filename, assetFilename) {
  const filePath = path.join(picsDir, filename)
  const buffer = fs.readFileSync(filePath)
  const ext = path.extname(filename).slice(1)
  const asset = await client.assets.upload('image', buffer, {
    filename: assetFilename,
    contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
  })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

const languages = [
  { id: 'arabic', name: 'Arabic', nativeName: 'العربية', order: 1 },
  { id: 'pashto', name: 'Pashto', nativeName: 'پښتو', order: 2 },
  { id: 'gujarati', name: 'Gujarati', nativeName: 'ગુજરાતી', order: 3 },
  { id: 'punjabi', name: 'Punjabi', nativeName: 'پنجابی', order: 4 },
  { id: 'persian', name: 'Persian', nativeName: 'فارسی', order: 5 },
]

// Songs that already exist in the Music Catalogue — just link + optionally
// refresh artwork with the newer poster provided for this section.
const linkExisting = [
  { existingId: 'musicItem-catalogue-assubhu-badamin', language: 'arabic', newImage: 'assubhu.jpeg' },
  { existingId: 'musicItem-catalogue-mera-nabi-sultan', language: 'pashto', newImage: 'pashto.jpeg' },
  { existingId: 'musicItem-catalogue-madina-wara-sawariya', language: 'gujarati', newImage: null },
  { existingId: 'musicItem-catalogue-al-eid-takbirat', language: 'arabic', newImage: null },
]

// Genuinely new songs, not previously in the Catalogue.
const newTracks = [
  {
    id: 'asmaul-husna',
    title: 'Asmaul Husna',
    language: 'arabic',
    description: 'Names of Allah',
    youtubeUrl: 'https://youtu.be/6ICZqXJy8Wk',
    image: 'asmaulhusna.jpeg',
    order: 1,
  },
  {
    id: 'qaseeda-burda-shareef',
    title: 'Qaseeda Burda Shareef',
    language: 'arabic',
    description: '',
    youtubeUrl: 'https://youtu.be/IDG40DQARm4',
    image: 'qaseeda burda.jpeg',
    order: 2,
  },
  {
    id: 'tala-al-badru-alyna',
    title: 'Tala Al Badru Alyna',
    language: 'arabic',
    description: 'Rabiawwal Special Kalam 2025',
    youtubeUrl: 'https://youtu.be/1Zfm_RmV81k',
    image: 'tala al badru.jpeg',
    order: 3,
  },
  {
    id: 'rehmatul-lil-aalameen',
    title: 'Rehmatul Lil Aalameen',
    language: 'arabic',
    description: 'Arabic Kalam',
    youtubeUrl: 'https://youtu.be/Gstb15he2fw',
    image: 'rehmatullilalameen.jpeg',
    order: 4,
  },
  {
    id: 'menu-shouq-madine-jawan-da',
    title: 'Menu Shouq Madine Jawan Da',
    language: 'punjabi',
    description: 'Ramadan Special Kalam 2025',
    youtubeUrl: 'https://youtu.be/RDqY4w1LblM',
    image: 'menu shouq.jpeg',
    order: 1,
  },
  {
    id: 'lamyati-nazeeru',
    title: 'Lamyati Nazeeru',
    language: 'persian',
    description: 'New Special Kalam 2025',
    youtubeUrl: 'https://youtu.be/aqkgbSkaJuk',
    image: 'lamyati.jpeg',
    order: 1,
  },
]

async function run() {
  const tx = client.transaction()

  for (const lang of languages) {
    tx.createIfNotExists({
      _id: `language-${lang.id}`,
      _type: 'language',
      name: lang.name,
      nativeName: lang.nativeName,
      order: lang.order,
      active: true,
    })
  }

  await tx.commit()
  console.log(`Created/verified ${languages.length} language documents.`)

  for (const item of linkExisting) {
    const patch = client.patch(item.existingId).set({
      language: { _type: 'reference', _ref: `language-${item.language}` },
    })
    if (item.newImage) {
      const artwork = await uploadImage(item.newImage, `multilingual-${item.existingId}.jpg`)
      patch.set({ artwork })
    }
    await patch.commit({ autoGenerateArrayKeys: true })
    console.log(`Linked existing item ${item.existingId} -> ${item.language}`)
  }

  for (const track of newTracks) {
    const artwork = await uploadImage(track.image, `multilingual-${track.id}.jpg`)
    await client.createIfNotExists({
      _id: `musicItem-multilingual-${track.id}`,
      _type: 'musicItem',
      title: track.title,
      type: 'kalam',
      language: { _type: 'reference', _ref: `language-${track.language}` },
      description: track.description,
      artwork,
      youtubeUrl: track.youtubeUrl,
      featured: false,
      published: true,
      order: track.order,
    })
    console.log(`Created new item: ${track.title} (${track.language})`)
  }

  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
