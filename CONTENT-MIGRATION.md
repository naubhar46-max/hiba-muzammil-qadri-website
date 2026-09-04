# Content Migration Plan

## Principle

```
ORIGINAL CONTENT (index.html)
        ↓
BACKUP / VERSION CONTROL (this Git baseline)
        ↓
SANITY CONTENT (entered via Studio, or scripted import)
        ↓
FRONTEND VERIFICATION (compare live site against this baseline, item by item)
        ↓
ONLY THEN consider removing the now-redundant hardcoded arrays from index.html
```

**Nothing is deleted from `index.html` until the same content is confirmed present and correct in Sanity, and the frontend has been verified to display it identically.**

## Migration order (lowest risk first)

1. **Social links & music platform links** — small, simple, easy to verify (9 items total).
2. **Gallery photos** (5 items) — verify captions/order match.
3. **Songs from the Heart / Kids Series / Collaboration** (small, distinct groups) — easier to verify in isolation before the large catalogue.
4. **Music Catalogue** (28 tracks) — the largest existing dataset; migrate in the same category order as the current filter chips (Naat, Kalam, Hamd, Patriotic, Special) to make verification straightforward.
5. **Multilingual Portfolio** — populated once you provide the actual 8 languages and their content (nothing to migrate yet, since no language content exists on the live site).
6. **Audio Library** — populated once real audio files exist (nothing to migrate yet).

## Verification checklist per migrated item

- [ ] Title matches exactly
- [ ] YouTube link/ID matches exactly
- [ ] Cover artwork matches (or the same placeholder treatment, for items without real artwork)
- [ ] Category/tag matches
- [ ] Appears in the same display order
- [ ] Renders correctly on both mobile and desktop

## Rollback

Because the original `index.html` is preserved in Git history (tagged `v1.0.0-final-frontend`), the site can be reverted to the fully-hardcoded version at any point during migration if something doesn't verify correctly.
