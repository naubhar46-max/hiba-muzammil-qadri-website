// One-time data correction: fixes a spelling typo ("Storical" -> "Historical")
// and Alhumdulillah -> Alhamdulillah that was carried into Sanity from the
// original site copy during the Music Catalogue migration.
// Run with: npx sanity exec fix-storical-typo.mjs --with-user-token
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function run() {
  const docs = await client.fetch(
    `*[_type=="musicItem" && (description match "Storical*" || description match "*Alhumdulillah*")]{_id, description}`
  )
  console.log(`Found ${docs.length} document(s) to fix.`)
  const tx = client.transaction()
  for (const doc of docs) {
    const fixed = doc.description
      .replace(/Storical/g, 'Historical')
      .replace(/Alhumdulillah/g, 'Alhamdulillah')
    tx.patch(doc._id, { set: { description: fixed } })
    console.log(`${doc._id}: "${doc.description}" -> "${fixed}"`)
  }
  if (docs.length) await tx.commit()
  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
