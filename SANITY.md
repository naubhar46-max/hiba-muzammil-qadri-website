# Sanity CMS Integration Plan

## Status: Not yet connected

This document describes the plan agreed in the architecture blueprint. No Sanity project has been created, no schemas exist yet, and the frontend does not fetch from Sanity at this baseline.

## Why Sanity

See the full reasoning in `hiba-website-backend-blueprint.md`. In short: it provides a ready-made, non-technical-friendly admin UI ("Studio") and a managed content API, without needing to hand-build admin screens from scratch.

## What Sanity will NOT do

- It will not replace or redesign the existing frontend.
- It will not change the visual design in any way.
- It will not automatically migrate content — that is a deliberate, verified step (see `CONTENT-MIGRATION.md`).

## Planned content types (schemas)

Based on the approved architecture blueprint:

- `language` — name, native name, description, icon, order, featured, active
- `musicItem` — title, native title, type, language reference, project reference, release date, description, artwork, YouTube URL, audio, lyrics, platform links, featured, published, order, SEO fields
- `video` — title, type, YouTube URL, thumbnail, related music item, featured, published
- `project` — title, cover artwork, description, release info, SEO fields
- `galleryItem` — image, category, caption, related project, order
- `achievement` — title, description, date, category, image, order
- `pressItem` — title, publication, URL, date, type, image
- `event` — title, description, date, location, type, image, links
- `credit` — person name, role, linked project or music item
- `socialLink` / `musicPlatformLink` — platform, URL, icon, order, active
- `siteSettings` — global key-value settings (singleton document)

None of these schemas have been created in an actual Sanity project yet — this is the plan for Phase 5/6 of the implementation.

## Steps required from you before I can proceed

Since I cannot create accounts on your behalf:

1. Go to [sanity.io](https://www.sanity.io) and create a free account.
2. Create a new project (any name, e.g. "hiba-muzammil-qadri-website").
3. Note down the **Project ID** and choose a dataset name (default `production` is fine).
4. Come back and share the Project ID (this is not a secret — it's safe to share). **Do not share any API token in chat** — tokens are entered directly into your own environment variables, never pasted here.

Once I have the Project ID, I can write the actual schema files and the frontend integration code in a future session.

## Fallback behavior

Per the architecture rule, if Sanity content is ever unreachable or a field is empty, the frontend must fail gracefully (show an empty-state message, as already implemented for Audio Library and Multilingual Portfolio) rather than displaying a broken page.
