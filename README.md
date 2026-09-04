# Hiba Muzammil Qadri — Official Website

Official artist website for Hiba Muzammil Qadri, Pakistani nasheed artist.

## What this project is

A premium, single-page artist website: Hero, About, Music Catalogue, Multilingual Nasheed Portfolio (in progress), Audio Library, Kids Series, Collaborations, Songs from the Heart, Gallery, Playlists (Spotify + YouTube embeds), Social Media Hub, and Contact.

## Current technology stack (as of this baseline)

- Plain HTML, CSS, and vanilla JavaScript — no framework, no build step.
- All content currently lives inside `index.html` (hardcoded arrays for tracks, gallery, playlists).
- Images are embedded as base64 data — a known limitation, addressed by the planned Sanity/CDN migration (see `SANITY.md`).
- No backend, no database, no authentication exist yet.

## How to run locally

This is a static file — no install or build step is required today.

```bash
# Just open it directly in a browser, or serve it locally:
python3 -m http.server 8000
# then visit http://localhost:8000
```

## How to build

Not applicable yet — there is no build system at this baseline. Once Sanity + a frontend build step are introduced, this section will be updated with real build commands.

## How to test

No automated tests exist yet. Manual QA checklist:
- All nav links scroll to the correct section
- All YouTube links/embeds play the correct video
- All social/platform links point to the correct official account
- Mobile menu opens/closes correctly
- Gallery lightbox and track modal open/close correctly

## Sanity CMS

Not yet connected. See `SANITY.md` for the planned integration and `ENVIRONMENT.md` for required variables once it is connected.

## Required environment variables

See `.env.example` for the full list and `ENVIRONMENT.md` for explanations. No environment variables are required to run the current static baseline.

## Deployment overview

See `DEPLOYMENT.md`.

## Repository structure

```
/
├── index.html              # The complete current website (baseline)
├── .env.example             # Template for future environment variables
├── .gitignore
├── README.md                 # This file
├── ARCHITECTURE.md           # Technical architecture & content inventory
├── SETUP.md                  # Local setup instructions
├── DEPLOYMENT.md              # How and where to deploy
├── SANITY.md                  # Sanity CMS integration plan
├── CONTENT-MIGRATION.md        # How existing content moves into Sanity
├── ENVIRONMENT.md              # Environment variable reference
├── CHANGELOG.md                # Dated record of significant changes
└── BACKUP-AND-RECOVERY.md      # How to restore this project from scratch
```
