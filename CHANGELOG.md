# Changelog

All notable changes to this project are recorded here, most recent first.

## [v2.0.1] — Copy audit: age-repetition & real playlist titles

Full front-end audit against a "$50k luxury site" checklist found the
design/UX/embeds/accessibility/performance already solid from v2.0.0. Two
genuine content issues were fixed:

- The "At just 13 / At 13" framing appeared three times across About and
  Multilingual — reduced to a single, strategic mention.
- The five "Her Playlists" cards showed generic "Playlist 1–5" labels;
  replaced with each playlist's real YouTube title (shortened, not
  invented — verified live against youtube.com/playlist).

## [v2.0.0] — Sanity CMS, live deployment, visual upgrade & Contact/Inquiry system

Everything since the v1.0.0 baseline:

- **Sanity CMS** connected (project `7rufe5dw`, dataset `production`, Studio at
  hiba-muzammil-qadri.sanity.studio): all original content migrated in
  (social/music-platform links, gallery, music catalogue, Kids Series,
  Collaboration, Songs from the Heart) plus a new Multilingual Portfolio
  populated with Arabic, Urdu, Pashto, Gujarati, Punjabi and Persian tracks.
  Frontend reads content live from Sanity with graceful hardcoded fallback.
- **Deployed live** on GitHub Pages at
  https://naubhar46-max.github.io/hiba-muzammil-qadri-website/ (custom
  domain hibamuzammilqadri.com pending renewal — not currently live).
- **Visual upgrade**: cinematic Hero, premium navigation with scroll/active
  states, refined About/Music Catalogue/Videos/Gallery/Playlists/Social
  Media/Kids-Collaboration sections — same color palette and content,
  richer typography, motion and depth throughout. Minor copy corrections
  (spelling) and full SEO metadata (Open Graph, Twitter Card, canonical,
  JSON-LD, robots.txt, sitemap.xml) added.
- **Contact & Inquiry System**: the Contact section is now 8 category-based
  inquiry forms (event booking, collaboration, PR/media, press, video,
  private/one-to-one, licensing, general), each with only its relevant
  fields, validation and spam protection. Submissions go through a
  Cloudflare Worker (Free plan, `worker/`) which rate-limits and writes to
  a new Sanity `inquiry` schema — visible and manageable in Sanity Studio
  with a status field (New/Under Review/Contacted/Approved/Declined/
  Completed). Falls back to the site's existing email address if the
  Worker is ever unreachable.

## [v1.0.0] — FINAL FRONTEND BASELINE — BEFORE SANITY

**Established as the primary rollback point before any CMS/backend work begins.**

Represents the complete, approved website exactly as it exists today:

- Hero, About, Videos, Music Catalogue (28 tracks), Multilingual Portfolio (shell/empty-state), Audio Library (shell/empty-state), Kids Series, Collaboration, Songs from the Heart, Gallery, Playlists, Social Media Hub, Contact.
- 29 verified YouTube video links, 5 verified YouTube playlists, verified social and music-platform links, verified contact email.
- No backend, database, or CMS — single static HTML file.

This is the state Git will always be able to return to if any future integration causes a problem.
