# Founder Ops Center

**Live site:** https://www.founderopscenter.com

An ops and resource center for AgTech founders — dashboard, founder journey, glossary, document templates, mentors directory, ecosystem workspace, market intelligence, media directory, and a direct booking page.

## How it's built (today)

The entire site is a **single HTML file** — `index.html` in the repo root — served by **GitHub Pages**. It contains the markup, styles, and all client-side JavaScript, and talks to a Supabase backend for auth, data, and storage.

- **Hosting:** GitHub Pages (static) from the `main` branch
- **Custom domain:** mapped via the `CNAME` file
- **Auth:** Supabase Auth (Google OAuth + email magic link)
- **Database + storage:** Supabase (project `odvwxgxhacotiuyjyqtk`)
- **Build step:** none

No `npm install`, no dev server. To preview locally, open `index.html` in a browser (or run `python3 -m http.server` and visit `http://localhost:8000`). To deploy, commit and push to `main`.

## Repo layout

| Path | What it is |
|---|---|
| `index.html` | The site. Edit here. |
| `CNAME` | Custom domain mapping for GitHub Pages. |
| `Russell.jpeg`, `assets/` | Images referenced by the site. |
| `supabase/migrations/` | Database migrations. |
| `supabase/functions-backup/` | Backup of Supabase Edge Functions. |
| `docs/` | Project documentation. |
| `_archive/nextjs-experiment/` | Abandoned Next.js rewrite attempt. **Not deployed, not current.** See its README. |
| `CLAUDE.md` | Guidance for AI assistants working on this repo. |

## Editing the site

Because the site is one file, edits are surgical — find the block you want to change and replace it. Never regenerate the whole file; that will lose content. Small, targeted commits with clear messages are easier to review and roll back.

## Known issues

See `CLAUDE.md` for the current list (admin delete button, FK cascade gaps, no staging environment, content-mixed-with-code, etc.). These are the work items for bringing the site to production grade.
