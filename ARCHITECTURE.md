# Architecture & Project Inventory

## 1. Frontend

- **Framework:** none — plain HTML5, CSS3 (custom properties/variables for theming), vanilla JavaScript (ES6).
- **Build system:** none — the file runs as-is in any browser.
- **Routing:** none — single page, in-page anchor navigation (`#about`, `#music`, etc.).
- **Fonts:** Cormorant Garamond (headings), Jost (body/UI) — loaded from Google Fonts.
- **Icons:** hand-authored inline SVG (no icon library dependency).
- **Styling system:** CSS custom properties for the jewel-tone color palette, spacing, and shadows; no CSS framework.

## 2. Current Section Inventory

| Section | Anchor | Notes |
|---|---|---|
| Hero | `#top` | Portrait, tagline, CTAs |
| About | `#about` | Bio sourced from the artist's official YouTube channel description |
| Videos | `#videos` | Featured Release spotlight |
| Music Catalogue | `#music` | 28 tracks, filterable by category, each with a real YouTube link |
| Multilingual Nasheed Portfolio | `#multilingual` | Shell + empty state; no language content added yet |
| Audio Library | `#audio` | Empty-state; scaffolded `audioTracks[]` array for future MP3s |
| Kids Series | `#kids` | "6 Kalma" animated series |
| Collaboration | *(no id)* | "In His Love ﷺ" medley + Coming Soon strip |
| Songs from the Heart | *(no id)* | 6 family/emotional-themed tracks |
| Gallery | `#gallery` | 5 photos with lightbox |
| Playlists | `#playlists` | Spotify embed, 4-video YouTube grid, 5 embedded YouTube playlists |
| Social Media | `#social` | 5 platforms + live embedded Facebook Page |
| Contact | `#contact` | Verified email |

## 3. Content Inventory

- **Images/photos:** 41 embedded (base64) — official cover art, portraits, gallery photos, logo.
- **YouTube videos:** 29 unique, verified links (client-provided, not guessed).
- **YouTube playlists:** 5 embedded, client-provided.
- **Social links:** YouTube, Instagram, Facebook, TikTok, Threads — all verified.
- **Music platform links:** Spotify (+ embedded player), Apple Music, Amazon Music, Deezer.
- **Contact:** one verified email address (sourced from the artist's own YouTube channel description).

## 4. Technical Structure

- **APIs:** none.
- **Existing backend:** none.
- **Data sources:** hardcoded JavaScript arrays/objects inside `index.html` (`trackLinks`, `audioTracks`, discography card markup).
- **Environment variables:** none required at this baseline; see `.env.example` for what will be needed once Sanity is connected.
- **Configuration files:** none yet beyond `.gitignore` / `.env.example` introduced in this baseline.
- **Package dependencies:** none — no `package.json` exists yet (introduced only once a build step, e.g. Sanity Studio or a frontend framework, is added).
- **Deployment configuration:** none yet — see `DEPLOYMENT.md`.
- **Forms:** none — Contact is a `mailto:` link, not a submitting form.
- **Third-party integrations:** Google Fonts, YouTube (iframe embeds), Spotify (iframe embed), Facebook (Page Plugin iframe).

## 5. Known Limitations at This Baseline

- Images are embedded as base64 text rather than served from a CDN, making the file large (~5–6 MB) and content non-editable without touching code.
- No content management — every update requires a direct code edit.
- No automated tests.
- No analytics currently installed.

These limitations are exactly what the Sanity CMS integration (see `SANITY.md`) is designed to resolve, without changing the approved visual design.
