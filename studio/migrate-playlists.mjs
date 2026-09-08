// One-time migration script: creates Playlist documents in Sanity from the
// 5 playlists already live in index.html's "Her Playlists" section.
// This does NOT touch index.html or any frontend file — it only writes
// new documents into the Sanity dataset ("production").
//
// Run with: npx sanity exec migrate-playlists.mjs --with-user-token

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const playlists = [
  {
    id: 'yt-pl-1',
    title: 'Soulful Duas & Nasheeds',
    playlistId: 'https://www.youtube.com/playlist?list=PLoxxj3cT59SdYviAf5e6q32fqdMt88CIH',
    coverColor: 'emerald',
    order: 1,
  },
  {
    id: 'yt-pl-2',
    title: 'Beautiful Naats',
    playlistId: 'https://www.youtube.com/playlist?list=PLoxxj3cT59ScYNKScnWWxBf6iajUNoLBR',
    coverColor: 'burgundy',
    order: 2,
  },
  {
    id: 'yt-pl-3',
    title: 'Moral Stories & Group Naats',
    playlistId: 'https://www.youtube.com/playlist?list=PLoxxj3cT59Sd8YADSApPEGbegh2_e92Y-',
    coverColor: 'peacock',
    order: 3,
  },
  {
    id: 'yt-pl-4',
    title: 'Duas & Prayers Collection',
    playlistId: 'https://www.youtube.com/playlist?list=PLoxxj3cT59ScpfcBA134yzWlbTh3xCXJz',
    coverColor: 'gold',
    order: 4,
  },
  {
    id: 'yt-pl-5',
    title: 'Manqabat Collection',
    playlistId: 'https://www.youtube.com/playlist?list=PLoxxj3cT59SeF8PGi7ZvEDhzWDdkniPR4',
    coverColor: 'plum',
    order: 5,
  },
]

async function run() {
  const transaction = client.transaction()

  for (const p of playlists) {
    transaction.createIfNotExists({
      _id: `playlist-${p.id}`,
      _type: 'playlist',
      title: p.title,
      platform: 'youtube',
      playlistId: p.playlistId,
      coverColor: p.coverColor,
      order: p.order,
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
