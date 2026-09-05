// One-time migration script: tags the existing Urdu-language songs already
// in the Music Catalogue / Songs from the Heart / Kids Series with the
// `language` reference, so they appear under "Urdu" in the Multilingual
// Portfolio. No new documents, no new images — these songs and their
// artwork already exist; this only sets one field on each.
//
// Excludes: Assubhu Badamin, Al-Eid Takbirat (Arabic), Mera Nabi Sultan
// (Pashto), Madina Wara Sawariya (Gujarati) — already tagged with their
// own language — and "Medley: In His Love" (international collaboration,
// not specifically Urdu) and "13 Rajab Special" (unpublished).
//
// Run with: npx sanity exec migrate-multilingual-urdu.mjs --with-user-token

import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const urduItemIds = [
  // Music Catalogue
  'musicItem-catalogue-namaz',
  'musicItem-catalogue-aye-saba-mustafa-se-kahe-deena',
  'musicItem-catalogue-pukaro-ya-rasoolallah',
  'musicItem-catalogue-lab-pe-aati-hai-dua',
  'musicItem-catalogue-allah-hi-allah',
  'musicItem-catalogue-nabiyon-mai-aala',
  'musicItem-catalogue-naam-e-muhammad',
  'musicItem-catalogue-allahumma-salle-ala',
  'musicItem-catalogue-naatain-sarkar-ki-parhta-hoon-mein',
  'musicItem-catalogue-aao-watan-ki-suno-kahani',
  'musicItem-catalogue-pak-sar-zameen-national-anthem',
  'musicItem-catalogue-gunahon-par-hoon-sharminda',
  'musicItem-catalogue-pyara-quran',
  'musicItem-catalogue-mustafa-jaan-e-rehmat-pe',
  'musicItem-catalogue-allah-mera-bhi-hai',
  // Songs from the Heart
  'musicItem-heart-piyari-maa',
  'musicItem-heart-maa-baap-ka-dil-na-dukha',
  'musicItem-heart-mere-baba',
  'musicItem-heart-maa-baba',
  'musicItem-heart-brother-and-sister',
  'musicItem-heart-friendship',
  // Kids Series
  'musicItem-kids-6-kalma',
]

async function run() {
  await client.createIfNotExists({
    _id: 'language-urdu',
    _type: 'language',
    name: 'Urdu',
    nativeName: 'اردو',
    order: 0,
    active: true,
  })
  console.log('Created/verified Urdu language document.')

  const tx = client.transaction()
  let found = 0
  for (const id of urduItemIds) {
    const doc = await client.getDocument(id)
    if (!doc) {
      console.warn(`SKIPPED (not found): ${id}`)
      continue
    }
    tx.patch(id, { set: { language: { _type: 'reference', _ref: 'language-urdu' } } })
    found++
  }
  const result = await tx.commit()
  console.log(`Linked ${found} existing items to Urdu. (${result.results.length} writes)`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
