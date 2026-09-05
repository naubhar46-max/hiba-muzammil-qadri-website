// One-time migration script: creates Social Link and Music Platform Link
// documents in Sanity from the verified links already live in index.html.
// This does NOT touch index.html or any frontend file — it only writes
// new documents into the Sanity dataset ("production").
//
// Run with: npx sanity exec migrate-social-links.mjs --with-user-token

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const socialLinks = [
  {platform: 'youtube', url: 'https://www.youtube.com/@HibaMuzammilQadriiofficial', order: 1},
  {platform: 'instagram', url: 'https://www.instagram.com/hibamuzammilqadri/', order: 2},
  {platform: 'facebook', url: 'https://www.facebook.com/HIBAMUZAMMILQADRI/', order: 3},
  {platform: 'tiktok', url: 'https://www.tiktok.com/@hibamuzammilqadrii', order: 4},
  {platform: 'threads', url: 'https://www.threads.com/@hibamuzammilqadri', order: 5},
]

const musicPlatformLinks = [
  {platform: 'spotify', url: 'https://open.spotify.com/artist/7cXd7cfN6S94fR75DQIkpj', order: 1},
  {
    platform: 'appleMusic',
    url: 'https://music.apple.com/us/artist/hiba-muzammil-qadri/1574984081',
    order: 2,
  },
  {
    platform: 'amazonMusic',
    url: 'https://music.amazon.com/artists/B0989FSLKG/hiba-muzammil-qadri',
    order: 3,
  },
  {platform: 'deezer', url: 'https://www.deezer.com/en/artist/137715132', order: 4},
]

async function run() {
  const transaction = client.transaction()

  for (const link of socialLinks) {
    transaction.createIfNotExists({
      _id: `socialLink-${link.platform}`,
      _type: 'socialLink',
      platform: link.platform,
      url: link.url,
      order: link.order,
      active: true,
    })
  }

  for (const link of musicPlatformLinks) {
    transaction.createIfNotExists({
      _id: `musicPlatformLink-${link.platform}`,
      _type: 'musicPlatformLink',
      platform: link.platform,
      url: link.url,
      order: link.order,
      active: true,
    })
  }

  const result = await transaction.commit()
  console.log(`Done. ${result.results.length} documents created/verified.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
