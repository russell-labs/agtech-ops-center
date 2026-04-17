# Monolith Split Handoff

Written 2026-04-17 at the end of a Cowork session. Read this first before continuing the work in Claude Code.

## Where we are

`index.html` went from 18,913 lines → 16,108 lines in this session. Two extractions done:

1. **CSS** → `styles.css` (724 lines). Loaded via `<link rel="stylesheet" href="styles.css">` in the head. Committed and pushed (commit `7748b7c`).
2. **Big data arrays** → `data/mentors.js`, `data/accelerators.js`, `data/partner_ecosystems.js`. Loaded via `<script>` tags in the head, each sets a `window.XXX` global that is transparently referenced by the main script. 2,080 lines removed from `index.html`. **Pending commit/push** as of handoff.

The three `<style>` blocks at what are now roughly lines 3700 / 15200 / 15400 / 16300 are template literals inside JavaScript that generate printable HTML reports. **Do not extract those** — they live inside JS and belong where they are.

## Still pending from this session (verify before continuing)

- Local test of the data-array extraction (I asked Russell to `python3 -m http.server`, hit it, confirm nothing broke).
- Commit + push of the data-array extraction. Stale `.git/index.lock` may need `rm -f .git/index.lock` first.
- Delete the redundant `data/*.json` files (kept both .json and .js during extraction; only .js is referenced). Run: `rm data/mentors.json data/accelerators.json data/partner_ecosystems.json`.

## What's next (task #20 territory)

Convert the main `<script>` block at line ~420 into ES modules. Rough phase order:

1. Find the main script's opening `<script>` and closing `</script>`. Move everything between to `src/app.js`. Change the `<script>` tag to `<script type="module" src="./src/app.js"></script>`.
   - **Watch out**: the script currently relies on `window.supabase` (injected by the Supabase CDN script) and the `window.MENTORS / ACCELERATORS / PARTNER_ECOSYSTEMS` globals. Inside a module, you can still reference `window.X` — but script-top-level `const` / `var` declarations inside a module no longer leak to `window`. Audit for bare global references from inline `onclick=""` handlers in HTML — those resolve against `window`, so any functions they call must be explicitly attached to `window` after the module loads.
2. Peel off the first self-contained feature. Candidates, ranked by isolation:
   - **Market intel** (`MI_*` constants, `AGTECH_COMPANIES`, the big printable-report generator) — pretty self-contained.
   - **Admin area** (`deleteUser`, `blockUser`, related render functions around line 10000-11800) — moderately self-contained but references `_supabase`, `_userProfile`, `_allProfiles`, and calls `render('admin')`. You'll need to decide on a module-boundary convention for shared state.
   - **Onboarding wizard** (WIZ_STEPS, personas) — self-contained but called from the auth flow.
3. Keep peeling until `index.html` has only the shell (nav, modals, section containers) and a small bootstrap in `src/app.js`.

## Architectural constraints (from CLAUDE.md — re-read it)

- **No build step.** We're on GitHub Pages. Use native ES modules (`import` / `export`) served as static files. Modern browsers handle them directly.
- **Local preview**: `python3 -m http.server` from repo root, open `http://localhost:8000`.
- **Edit `index.html` in place.** Never regenerate it from scratch.
- **Russell is a non-developer.** Explain changes before making them. Commit often. Small PRs.
- **Prod Supabase URL is hard-coded.** Project `odvwxgxhacotiuyjyqtk`. No staging wiring yet.

## What NOT to extract (keep inline in index.html)

- The shell HTML: `<aside id="sidebar">`, `<main>`, modal dialogs, the top nav.
- Small inline `<style>` blocks in JS template literals for printable reports (see "Where we are" above).
- Short data arrays (fewer than ~20 lines) — extracting them is more churn than value.

## The list of data extractions we didn't do

Things worth extracting later if the file is still big:
- `AGTECH_COMPANIES` (73 lines)
- `MI_SECTORS`, `MI_TRENDS`, `MI_MATRIX`, `MI_SIGNALS`, `MI_PERSONAS`, `MI_RISKS`, `MI_CROSSWALK` (market intel content, collectively ~200+ lines)
- `HUB_*` arrays (newsletters, communities, events, mentors, podcasts, leaders)
- `COMMON_BADGES`, `TIER_DEFS`, `PERSONA_BADGES`

Bundle these into `data/market-intel.js`, `data/hub.js`, `data/badges.js` when the JS modularization stabilizes.
