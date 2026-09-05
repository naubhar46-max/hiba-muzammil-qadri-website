// One-time migration script: migrates three small, easy-to-verify groups
// from index.html into Sanity — Kids Series, Collaboration, and
// Songs from the Heart — per the staged plan in CONTENT-MIGRATION.md.
//
// This script only READS index.html (to pull the few real images that
// exist in these sections) — it never writes to it. The frontend is
// completely untouched by running this.
//
// Run with: npx sanity exec migrate-heart-kids-collab.mjs --with-user-token

import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const indexHtmlPath = path.join(__dirname, '..', 'index.html')
const client = getCliClient()

const html = fs.readFileSync(indexHtmlPath, 'utf8')

// Find an <img src="data:...;base64,..." alt="EXACT ALT TEXT"> by its alt text
// and return {dataUri, alt}, without ever printing the base64 data anywhere.
function findImageByAlt(altText) {
  const escaped = altText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`<img src="(data:image\\/[a-zA-Z]+;base64,[^"]+)" alt="${escaped}"`)
  const match = html.match(re)
  if (!match) throw new Error(`Image with alt "${altText}" not found in index.html`)
  return match[1]
}

async function uploadImage(dataUri, filename) {
  const [, mime, base64Data] = dataUri.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/)
  const buffer = Buffer.from(base64Data, 'base64')
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: mime,
  })
  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
}

async function run() {
  const transaction = client.transaction()

  // ---------- KIDS SERIES ----------
  const kidsImage = await uploadImage(
    findImageByAlt('Learn Six Kalmas animated series'),
    'kids-6-kalma.jpg',
  )
  transaction.createIfNotExists({
    _id: 'musicItem-kids-6-kalma',
    _type: 'musicItem',
    title: "6 Kalma — Learn Six Kalma's",
    type: 'kids',
    description:
      'An animated learning series presented by Hiba, created to help children learn and memorise the Six Kalmas in a warm, friendly and easy-to-follow way.',
    artwork: kidsImage,
    youtubeUrl: 'https://youtu.be/DBtilsCExvk',
    featured: false,
    published: true,
    order: 1,
  })

  // ---------- COLLABORATION ----------
  const collabImage = await uploadImage(
    findImageByAlt('In His Love medley — international collaboration'),
    'collab-in-his-love.jpg',
  )
  transaction.createIfNotExists({
    _id: 'musicItem-collab-in-his-love',
    _type: 'musicItem',
    title: 'Medley: In His Love ﷺ',
    type: 'collaboration',
    description:
      "Hiba joins vocalists from several countries in a devotional medley in praise of the Prophet ﷺ — a reminder that love for him crosses every border and language.",
    artwork: collabImage,
    youtubeUrl: 'https://youtu.be/yvBeh2VWQ2Q',
    featured: false,
    published: true,
    order: 1,
  })

  const rajabImage = await uploadImage(
    findImageByAlt('13 Rajab Special — coming soon'),
    'collab-13-rajab-coming-soon.jpg',
  )
  transaction.createIfNotExists({
    _id: 'musicItem-collab-13-rajab',
    _type: 'musicItem',
    title: '13 Rajab Special',
    type: 'collaboration',
    description: "A new release is on its way — follow Hiba's channels so you don't miss the premiere.",
    artwork: rajabImage,
    featured: false,
    published: false, // "Coming soon" — not yet released, kept unpublished
    order: 2,
  })

  // ---------- SONGS FROM THE HEART ----------
  const maaBaapImage = await uploadImage(
    findImageByAlt('Maa Baap Ka Dil Na Dukha — official cover art'),
    'heart-maa-baap-ka-dil-na-dukha.jpg',
  )

  const heartTracks = [
    {
      id: 'piyari-maa',
      title: 'Piyari Maa',
      tag: 'Mother',
      description: 'Recited at age 8 · Crossed 60 million views, Alhumdulillah',
      youtubeUrl: 'https://youtu.be/pFB1GRlQbUM?si=9NUluVg_vRojTS9r',
      artwork: null,
      order: 1,
    },
    {
      id: 'maa-baap-ka-dil-na-dukha',
      title: 'Maa Baap Ka Dil Na Dukha',
      tag: 'Parents',
      description: 'True Story',
      youtubeUrl: 'https://youtu.be/I1igsP_4Zfs?si=D6aKvH7D2G-HpKZT',
      artwork: maaBaapImage,
      order: 2,
    },
    {
      id: 'mere-baba',
      title: 'Mere Baba',
      tag: 'Father',
      description: 'A tribute to fathers',
      youtubeUrl: 'https://youtu.be/_-qhNZNOQBs?si=0FwTBnvu1ATavffi',
      artwork: null,
      order: 3,
    },
    {
      id: 'maa-baba',
      title: 'Maa Baba',
      tag: 'Parents',
      description: 'A tribute to mother and father',
      youtubeUrl: 'https://youtu.be/CI1hQ-jrh18?si=Grk5L9kyBwSkJIqO',
      artwork: null,
      order: 4,
    },
    {
      id: 'brother-and-sister',
      title: 'Brother & Sister',
      tag: 'Siblings',
      description: 'A tribute to siblings',
      youtubeUrl: 'https://youtu.be/WltEFB2bHFI?si=1LwzBAsQQTaaT1cj',
      artwork: null,
      order: 5,
    },
    {
      id: 'friendship',
      title: 'Friendship',
      tag: 'Friendship',
      description: 'A nasheed about friendship',
      youtubeUrl: 'https://youtu.be/TtKooJEZun0?si=NiHLmXrnxRpyaP4v',
      artwork: null,
      order: 6,
    },
  ]

  for (const track of heartTracks) {
    transaction.createIfNotExists({
      _id: `musicItem-heart-${track.id}`,
      _type: 'musicItem',
      title: track.title,
      type: 'heart',
      description: `${track.tag} — ${track.description}`,
      ...(track.artwork ? {artwork: track.artwork} : {}),
      youtubeUrl: track.youtubeUrl,
      featured: false,
      published: true,
      order: track.order,
    })
  }

  const result = await transaction.commit()
  console.log(`Done. ${result.results.length} musicItem documents created/verified.`)
  console.log('Groups: 1 Kids Series, 2 Collaboration, 6 Songs from the Heart.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
