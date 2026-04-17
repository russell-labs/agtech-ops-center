-- 20260418_fix_rls_gaps.sql
--
-- Purpose: close the critical and high-priority gaps identified by the
-- 2026-04-18 RLS audit (see docs/rls-audit-2026-04-18.md).
--
-- What this migration changes:
--
--   1. pre_created_profiles — RLS was DISABLED entirely. Enable it, and add:
--        * admin full access (read/write/delete)
--        * any authenticated user can SELECT (drives the "people interested
--          in intros to you" directory in the account page)
--      Non-admins cannot insert, update, or delete — Russell seeds these
--      rows himself.
--
--   2. venture_submissions — all three existing policies evaluated to
--      `true`, so any authenticated user could read, edit, or insert any
--      submission. Tighten to:
--        * INSERT: anyone (anon + authenticated) — the submission form is
--          public, people submit before they have an account.
--        * SELECT: admin OR the submitter (matched by founderEmail =
--          auth.email()). If the submitter later signs up with the same
--          email, their submissions appear in their account automatically.
--        * UPDATE: admin OR the submitter (same email-match rule as
--          SELECT — submitters can edit their own from their account).
--        * DELETE: admin only (was missing entirely).
--
--   3. workspace_invites — no DELETE policy existed, so revoking invites
--      from the UI silently failed. Mirror the existing UPDATE policy.
--
--   4. agtech_deals + introductions — replace hardcoded
--      `auth.email() = 'russellcolevop@gmail.com'` checks with the existing
--      is_admin() helper, matching the pattern every other table already
--      uses. This means future admins can be added by updating is_admin()
--      in one place instead of editing every policy.
--
-- NOT in scope (needs a product decision first or is lower priority):
--   - profiles.users_read_own (audit finding #3) — do we want non-admins
--     to be able to read other users' profiles for the mentors directory?
--   - eco_applications DELETE policy (#9)
--   - eco_program_settings duplicate SELECT (#6)
--   - ws_airtable_records redundant SELECT (#7)
--   - introductions admin/user policy consolidation (#8)
--
-- Wrapped in one transaction so the whole thing is atomic.

begin;

-- ─────────────────────────────────────────────────────────────────────
-- 1. pre_created_profiles — enable RLS + policies
-- ─────────────────────────────────────────────────────────────────────

alter table public.pre_created_profiles enable row level security;

drop policy if exists "admin_all"           on public.pre_created_profiles;
drop policy if exists "authenticated_read"  on public.pre_created_profiles;

create policy "admin_all"
  on public.pre_created_profiles
  for all
  to authenticated
  using (is_admin())
  with check (is_admin());

create policy "authenticated_read"
  on public.pre_created_profiles
  for select
  to authenticated
  using (true);

-- ─────────────────────────────────────────────────────────────────────
-- 2. venture_submissions — admin + submitter only
-- ─────────────────────────────────────────────────────────────────────

drop policy if exists "Anyone can insert submissions"  on public.venture_submissions;
drop policy if exists "Anyone can read submissions"    on public.venture_submissions;
drop policy if exists "Anyone can update submissions"  on public.venture_submissions;
drop policy if exists "public_insert"                  on public.venture_submissions;
drop policy if exists "admin_or_submitter_select"      on public.venture_submissions;
drop policy if exists "admin_update"                   on public.venture_submissions;
drop policy if exists "admin_or_submitter_update"      on public.venture_submissions;
drop policy if exists "admin_delete"                   on public.venture_submissions;

-- INSERT: anonymous submissions allowed (the submission form is public).
create policy "public_insert"
  on public.venture_submissions
  for insert
  to anon, authenticated
  with check (true);

-- SELECT: admin sees everything; submitter sees their own if they sign in
-- later with the same email they used on the form.
create policy "admin_or_submitter_select"
  on public.venture_submissions
  for select
  to authenticated
  using (
    is_admin()
    OR lower("founderEmail") = lower(auth.email())
  );

-- UPDATE: admin OR submitter. Once a user signs up with the same email
-- they used on the form, they can edit their submission from their
-- account. Both USING (which rows they can target) and WITH CHECK
-- (what the row is allowed to look like after the edit) apply the same
-- rule — otherwise a submitter could change the founderEmail out from
-- under themselves.
create policy "admin_or_submitter_update"
  on public.venture_submissions
  for update
  to authenticated
  using (
    is_admin()
    OR lower("founderEmail") = lower(auth.email())
  )
  with check (
    is_admin()
    OR lower("founderEmail") = lower(auth.email())
  );

-- DELETE: admin only.
create policy "admin_delete"
  on public.venture_submissions
  for delete
  to authenticated
  using (is_admin());

-- ─────────────────────────────────────────────────────────────────────
-- 3. workspace_invites — add DELETE policy
-- ─────────────────────────────────────────────────────────────────────

drop policy if exists "wi_delete" on public.workspace_invites;
create policy "wi_delete"
  on public.workspace_invites
  for delete
  to authenticated
  using (
    is_platform_admin()
    OR exists (
      select 1 from public.workspaces w
      where w.id = workspace_invites.workspace_id
        and w.owner_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────────────────────────────────
-- 4. agtech_deals — replace hardcoded admin email with is_admin()
-- ─────────────────────────────────────────────────────────────────────

drop policy if exists "Admin can manage deals" on public.agtech_deals;

create policy "admin_manage_deals"
  on public.agtech_deals
  for all
  to authenticated
  using (is_admin())
  with check (is_admin());

-- (the existing "Authenticated users can read deals" SELECT policy stays)

-- ─────────────────────────────────────────────────────────────────────
-- 5. introductions — replace hardcoded admin email with is_admin()
-- ─────────────────────────────────────────────────────────────────────

drop policy if exists "admin_delete_intros"  on public.introductions;
drop policy if exists "admin_insert_intros"  on public.introductions;
drop policy if exists "admin_read_intros"    on public.introductions;
drop policy if exists "admin_update_intros"  on public.introductions;

create policy "admin_delete_intros"
  on public.introductions
  for delete
  to authenticated
  using (is_admin());

create policy "admin_insert_intros"
  on public.introductions
  for insert
  to authenticated
  with check (is_admin());

create policy "admin_read_intros"
  on public.introductions
  for select
  to authenticated
  using (is_admin());

create policy "admin_update_intros"
  on public.introductions
  for update
  to authenticated
  using (is_admin())
  with check (is_admin());

commit;

-- ─────────────────────────────────────────────────────────────────────
-- Verification queries — run after commit. Expected:
--   * pre_created_profiles: relrowsecurity = true, 2 policies
--   * venture_submissions:  4 policies, none evaluating to `true` for SELECT/UPDATE/DELETE
--   * workspace_invites:    4 policies, one for each of SELECT/INSERT/UPDATE/DELETE
--   * agtech_deals:         2 policies, admin one uses is_admin()
--   * introductions:        7 policies, admin ones all use is_admin()
-- ─────────────────────────────────────────────────────────────────────
-- select c.relname, c.relrowsecurity,
--        (select count(*) from pg_policy p where p.polrelid = c.oid) as policy_count
-- from pg_class c
-- join pg_namespace n on n.oid = c.relnamespace
-- where n.nspname = 'public'
--   and c.relname in ('pre_created_profiles', 'venture_submissions',
--                     'workspace_invites', 'agtech_deals', 'introductions')
-- order by c.relname;
--
-- select c.relname as table_name,
--        p.polname as policy_name,
--        case p.polcmd when 'r' then 'SELECT' when 'a' then 'INSERT'
--                      when 'w' then 'UPDATE' when 'd' then 'DELETE'
--                      when '*' then 'ALL' end as command,
--        pg_get_expr(p.polqual, p.polrelid)      as using_expr,
--        pg_get_expr(p.polwithcheck, p.polrelid) as with_check_expr
-- from pg_policy p
-- join pg_class    c on c.oid = p.polrelid
-- join pg_namespace n on n.oid = c.relnamespace
-- where n.nspname = 'public'
--   and c.relname in ('pre_created_profiles', 'venture_submissions',
--                     'workspace_invites', 'agtech_deals', 'introductions')
-- order by c.relname, p.polname;
