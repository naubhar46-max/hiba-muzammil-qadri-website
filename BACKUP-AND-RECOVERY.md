# Backup & Recovery

## The five independent layers

Per the architecture rule, these are separate systems — a backup of one does **not** back up the others.

| Layer | What it is | Backup strategy |
|---|---|---|
| **Code** | This repository | Git history + a remote on GitHub (see below) |
| **CMS content** | Sanity dataset (once connected) | Sanity's own dataset export/versioning (`sanity dataset export`) |
| **Media** | Images/audio/video files | Backed up wherever they're hosted (Sanity's asset pipeline includes this, or a CDN's own redundancy if self-hosted) |
| **Secrets** | API tokens, credentials | Stored only in your password manager and your hosting provider's environment variable settings — never in Git |
| **Domain & Hosting** | Registrar account, hosting account | Your own account access (registrar login, hosting provider login) — not something Git or Sanity can back up |

## Recovery procedure (full project restore)

1. Clone the GitHub repository: `git clone <repo-url>`
2. Install dependencies (once a `package.json` exists — none required at this baseline).
3. Copy `.env.example` to `.env` and fill in real values from your own records/password manager.
4. If Sanity is connected: reconnect using `SANITY_PROJECT_ID`/dataset, restore content from the latest Sanity dataset export if needed.
5. Serve/build the project (see `DEPLOYMENT.md`).
6. Reconnect the domain via your registrar's DNS settings, pointing to your chosen host.
7. Verify against `CONTENT-MIGRATION.md`'s checklist that all content, links, and media are present and correct.

## Current status of each layer (at this baseline)

- **Code:** now under local Git version control (this commit). Not yet pushed to a GitHub remote — see next steps below.
- **CMS content:** not applicable yet — no Sanity project exists.
- **Media:** currently embedded inside `index.html` itself (not yet using external storage) — this is a known limitation to be resolved during Sanity migration.
- **Secrets:** none exist yet.
- **Domain & Hosting:** outside this project's scope — managed by you directly.

## Immediate next step to complete Layer 1 (Code) backup

A local Git repository alone is not a backup — it lives only in this working session. To make it durable:

1. Create an empty repository on [github.com](https://github.com/new) (do not initialize it with a README — this project already has one).
2. Run, from your own machine after downloading this project:
   ```bash
   git remote add origin <your-new-repo-url>
   git branch -M main
   git push -u origin main
   git push --tags
   ```

This is the one step in the entire process that requires your own GitHub login — I cannot authenticate as you to push on your behalf.
