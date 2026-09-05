// One-time migration script: migrates the Music Catalogue (Discography grid)
// from index.html into Sanity as musicItem documents.
//
// NOTE: Two songs shown in the Discography grid ("Piyari Maa" and
// "Maa Baap Ka Dil Na Dukha") were already migrated separately as
// "Songs from the Heart" items (musicItem-heart-*) in an earlier step,
// since the site itself displays them in both places. They are
// intentionally skipped here to avoid duplicate documents.
//
// This script only READS index.html — it never writes to it. The frontend
// is completely untouched by running this.
//
// Run with: npx sanity exec migrate-music-catalogue.mjs --with-user-token

import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const indexHtmlPath = path.join(__dirname, '..', 'index.html')
const client = getCliClient()

const html = fs.readFileSync(indexHtmlPath, 'utf8')

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
  const asset = await client.assets.upload('image', buffer, {filename, contentType: mime})
  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Order matches the exact order these cards appear in the Discography grid
// in index.html (minus "Piyari Maa" and "Maa Baap Ka Dil Na Dukha", already
// migrated as Songs from the Heart items).
const tracks = [
  {title: 'Al-Eid Takbirat', category: 'special', meta: 'Official 4K Video', youtubeUrl: 'https://youtu.be/iIHwZzW6wIU?si=1-p0fNapFUWycNs9'},
  {title: 'Namaz', category: 'kalam', meta: 'Devotional Kalam', youtubeUrl: 'https://youtu.be/2_5pN065qyo?si=AWu5mXPPpIjWKIwP'},
  {title: 'Aye Saba Mustafa Se Kahe Deena', category: 'naat', meta: 'Naat', youtubeUrl: 'https://youtu.be/u3WNK4uyJeA?si=dDWFKHy7fjO4DXvl'},
  {title: 'Assubhu Badamin', category: 'kalam', meta: 'Devotional Kalam', youtubeUrl: 'https://youtu.be/VZpOA6tZRlA?si=skhEy04bQZpIEmdT'},
  {title: 'Hasbi Rabbi Jallallah', category: 'kalam', meta: 'Hamd', youtubeUrl: 'https://youtu.be/Kq1BFC6-OE4?si=_lfHOapQuiU906kW'},
  {title: 'Pukaro Ya Rasoolallah', category: 'naat', meta: 'Naat', youtubeUrl: 'https://youtu.be/c8Gdz0Nyido?si=JG-PxtNMZ1ge2S26'},
  {title: 'Lab Pe Aati Hai Dua', category: 'special', meta: 'Poetry by Allama Iqbal', youtubeUrl: 'https://youtu.be/vRD4YP2oI8I?si=vZMV3n34T3CMAl6o'},
  {title: 'Allah Hi Allah', category: 'kalam', meta: 'Devotional Kalam', youtubeUrl: 'https://youtu.be/fNYufrT3r2g?si=JJ3ZrdNphACdl1An'},
  {title: 'Nabiyon Mai Aala', category: 'naat', meta: 'Naat', youtubeUrl: 'https://youtu.be/zd05jJ0yyTI?si=gU2Rt0BfwL-ftx0s'},
  {title: 'Madina Wara Sawariya', category: 'naat', meta: 'Naat', youtubeUrl: 'https://youtu.be/EAi-BJWiAKI?si=VLZzX9fnTjsZo4Ac'},
  {title: 'Naam-e-Muhammad', category: 'naat', meta: 'Heart Touching Naat · 2025', youtubeUrl: 'https://youtu.be/JaSxw9bYHos?si=KDRk43X4UQ2xHMog'},
  {title: 'Allahumma Salle Ala', category: 'special', meta: 'New Milad Kalam · 2025', youtubeUrl: 'https://youtu.be/JoFKx-SQw6U?si=ReNsjTOiC5GinkWc'},
  {title: 'Naatain Sarkar Ki Parhta Hoon Mein', category: 'naat', meta: 'Naat', youtubeUrl: 'https://youtu.be/nFfEa3h0C1k?si=aQmWQhNgzr3HbGWJ'},
  {title: 'Aao Watan Ki Suno Kahani', category: 'patriotic', meta: 'Independence Day Special', youtubeUrl: 'https://youtu.be/JlMiDTIibd0?si=Y7GTdEUVpps7cIxf'},
  {title: 'Pak Sar Zameen — National Anthem', category: 'patriotic', meta: 'National Anthem', youtubeUrl: 'https://youtu.be/oMAqxNx16FQ?si=pHIi76VpS39IMQqI'},
  {title: 'Gunahon Par Hoon Sharminda', category: 'kalam', meta: 'Heart Touching Kalam · 2025', youtubeUrl: 'https://youtu.be/DvBSJVefGaI?si=wzdgku24DXS350KA'},
  {title: 'Pyara Quran', category: 'special', meta: 'New Special Track · 2025', youtubeUrl: 'https://youtu.be/jdGHGHHeXhs?si=Lok_iz-EHUslsq3N'},
  {title: 'Mera Nabi Sultan', category: 'naat', meta: 'New Pashto Naat · 2026', youtubeUrl: 'https://youtu.be/szyVM4KlaH8?si=0ok7Zac1HnmDhTrx'},
  {title: 'Mustafa Jaan-e-Rehmat Pe', category: 'naat', meta: 'Lahore Salam', youtubeUrl: 'https://youtu.be/vKQwG_fIm8s?si=0rvSWjJewvvAkRnh'},
  {title: 'Allah Mera Bhi Hai', category: 'special', meta: 'Storical Song · 2026', youtubeUrl: 'https://youtu.be/DhHstrM2grQ?si=8jAmMMKmrxVqD1j7'},
]

async function run() {
  const transaction = client.transaction()

  for (let i = 0; i < tracks.length; i++) {
    const t = tracks[i]
    const artwork = await uploadImage(
      findImageByAlt(`${t.title} — official cover art`),
      `catalogue-${slugify(t.title)}.jpg`,
    )
    console.log(`Prepared ${i + 1}/${tracks.length}: ${t.title}`)

    transaction.createIfNotExists({
      _id: `musicItem-catalogue-${slugify(t.title)}`,
      _type: 'musicItem',
      title: t.title,
      type: t.category,
      description: t.meta,
      artwork,
      youtubeUrl: t.youtubeUrl,
      featured: false,
      published: true,
      order: i + 1,
    })
  }

  const result = await transaction.commit()
  console.log(`Done. ${result.results.length} musicItem documents created/verified.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
