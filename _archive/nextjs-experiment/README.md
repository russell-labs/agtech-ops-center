# Next.js experiment — ARCHIVED

This folder contains an abandoned attempt to rewrite Founder Ops Center as a Next.js 14 app (App Router + TypeScript + Tailwind + NextAuth + Supabase).

**It is not deployed. It is not the live site.** The live site is the single-file HTML app at `/index.html` in the repo root, served by GitHub Pages at https://www.founderopscenter.com.

## Why it's here

In April 2026, there was an attempt to "professionalize" the site by breaking `index.html` apart into a Next.js app. The rewrite drifted significantly from the real site (missing content, broken interactive features) and was abandoned. Rather than delete the work outright, it's archived here so it can be referenced or resumed later if the project ever moves to a proper build.

## Why you should not touch it

- Editing files here has zero effect on the live site.
- The live site does not import from any of these files.
- AI assistants (Claude Code, Cowork, etc.) should treat this folder as read-only context — the source of truth is `/index.html`.

## If you ever want to resume this

Expect significant work. The HTML site has evolved a lot since this folder was last touched (auth flows, admin, workspaces, mentors, market intel, ecosystem, etc.). Any resumed Next.js build would need to re-port those features.
