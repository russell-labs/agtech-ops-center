-- 20260420_add_secondary_role_to_profiles.sql
--
-- Purpose: close the one column drift between the client-side PROFILE_COLUMNS
-- whitelist (src/app.js line 8109+) and the actual `public.profiles` schema.
--
-- Background: the 2026-04-20 runtime probe on production (commit d33c22d)
-- caught `PGRST204 — Could not find the 'secondary_role' column of 'profiles'`
-- during wizSave's upsert. Every wizard save on prod was silently falling
-- back to the minimal-retry path because the full upsert hit this rejection.
-- secondary_role is a real feature — it drives persona-routing logic at
-- src/app.js:516, :542, :551 for founders-who-are-also-investors /
-- founders-who-are-also-ecosystem-managers. Adding the column here lets the
-- full profile land on every save.
--
-- Diff done by Claude Code against the information_schema output Russell ran
-- on 2026-04-20 — this was the only missing column across all 46 entries in
-- PROFILE_COLUMNS.
--
-- Type + default: text DEFAULT '' matches both the client-side init
-- (wizData.secondary_role = '' at src/app.js line 7755) and the editWizard
-- pre-fill path (p.secondary_role || ''). Nullable so existing rows keep
-- their NULL value (no backfill needed; reads already handle empty/null
-- identically via truthy checks).
--
-- Wrapped in a transaction so the whole thing is atomic.

begin;

alter table public.profiles
  add column if not exists secondary_role text default '';

commit;

-- After running: re-run the client-side runtime probe on the same account
-- (russell_cole@rocketmail.com) and confirm `wizSave upsert result` shows
-- `data` non-null and `error` null. If a separate type-coercion error fires
-- next (deal_interests ARRAY vs code string, goals_platform ARRAY vs code
-- string are the suspected ones), file a follow-up.
