// One-time migration script: creates a Collaboration document in Sanity
// for the "In His Love ﷺ" international collaboration medley already
// live in index.html. Does NOT touch index.html or any frontend file.
//
// Run with: npx sanity exec migrate-collaboration.mjs --with-user-token

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

async function run() {
  const result = await client.createIfNotExists({
    _id: 'collaboration-in-his-love',
    _type: 'collaboration',
    title: 'Medley: In His Love ﷺ',
    collaborators: 'Vocalists from several countries',
    description:
      'Hiba joins vocalists from several countries in a devotional medley in praise of the Prophet ﷺ — a reminder that love for him crosses every border and language.',
    youtubeUrl: 'https://youtu.be/yvBeh2VWQ2Q?si=iP82P-OxxCdSM188',
    published: true,
  })
  console.log(`Done. Document id: ${result._id}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
