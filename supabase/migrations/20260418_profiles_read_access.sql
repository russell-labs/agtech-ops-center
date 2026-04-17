-- 20260418_profiles_read_access.sql
--
-- Purpose: let any signed-in user browse other members' profiles (for the
-- mentors directory, ecosystem-workspace member list, and the intros
-- "people interested in you" UI) without exposing admin-only columns.
--
-- Background: public.profiles has 52 columns, 7 of which are admin-only
-- (admin_notes, admin_tags, blocked, blocked_reason, blocked_at,
-- checkin_notes, suspension_warned_at). A blanket "authenticated can SELECT
-- any row" policy would leak moderation data to everyone. Instead, we
-- expose a curated view of the safe columns and keep the underlying table
-- locked down as it is today.
--
-- What this migration does:
--   1. Creates view public.public_profiles — the safe subset of columns.
--   2. Filters out blocked users so they don't show up in directories.
--   3. Grants SELECT on the view to authenticated.
--
-- What this migration does NOT do:
--   * It does NOT change any RLS policy on public.profiles. The existing
--     users_read_own / users_update_own / users_insert_own / admin_read_all /
--     admin_update_all policies stay exactly as they are. Admin queries
--     still go against profiles directly.
--   * It does NOT touch index.html. The app-side change is a one-line
--     swap from `.from('profiles')` to `.from('public_profiles')` on the
--     community-directory query (around index.html line 15459, in
--     ecoLoadPlatformFounders). That code edit ships separately.
--
-- Note on `email`: we include email in the view because the ecosystem
-- workspace feature uses it, and for a small mentors/intros community
-- the email is effectively part of the contact card. If that stance
-- changes later (e.g., we want to hide email until an intro is accepted),
-- drop the email column from the view — no data migration needed.
--
-- Wrapped in a single transaction so the whole thing is atomic.

begin;

drop view if exists public.public_profiles;

create view public.public_profiles as
select
  id,
  email,
  full_name,
  avatar_url,
  persona,
  organization,
  job_title,
  linkedin_url,
  location,
  company_name,
  company_stage,
  what_building,
  funding_status,
  team_size,
  biggest_needs,
  investment_stages,
  check_size,
  portfolio_agtech,
  deal_interests,
  expertise_areas,
  advising_count,
  advisor_interests,
  institution,
  research_focus,
  open_to_collab,
  service_type,
  startup_experience,
  startup_pricing,
  agtech_focus,
  goals_platform,
  goals_general,
  how_heard,
  onboarding_complete,
  created_at,
  updated_at,
  profile_completeness,
  verified_at,
  badges,
  tier,
  intro_tier_pref,
  badge_evidence,
  pre_created,
  consent_accepted,
  consent_accepted_at
from public.profiles
where coalesce(blocked, false) = false;

-- Any signed-in user can SELECT from the view. Anonymous (pre-signup) users
-- cannot — the directory is a members-only feature.
grant select on public.public_profiles to authenticated;

commit;

-- ─────────────────────────────────────────────────────────────────────
-- Verification — run after commit:
--   * The view exists and returns rows for any signed-in user.
--   * Querying admin-only columns through the view fails (column does
--     not exist).
--   * profiles itself is still restricted by RLS (non-admins still can't
--     read other users' admin_notes via profiles directly).
-- ─────────────────────────────────────────────────────────────────────
-- select count(*) from public.public_profiles;
--
-- -- should error: "column admin_notes does not exist"
-- -- select admin_notes from public.public_profiles limit 1;
--
-- select table_name, privilege_type
-- from information_schema.role_table_grants
-- where grantee = 'authenticated' and table_name = 'public_profiles';
