-- One-time setup for the website CMS.
-- Run this entire file in Supabase Dashboard > SQL Editor.

create table if not exists public.cms_pages (
  slug text primary key,
  title text not null,
  hero_title text not null default '',
  hero_subtitle text not null default '',
  hero_image_url text not null default '',
  hero_image_path text,
  thumbnail_image_url text not null default '',
  thumbnail_image_path text,
  gallery jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by text
);

alter table public.cms_pages enable row level security;
grant select on public.cms_pages to anon, authenticated;
grant insert, update, delete on public.cms_pages to authenticated;

-- The function checks the real Auth user record, including verified email status.
create or replace function public.is_cms_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from auth.users as u
    where u.id = (select auth.uid())
      and lower(u.email) in ('team@nextlevelgamingevents.com', 'kcbianzon@gmail.com')
      and u.email_confirmed_at is not null
  );
$$;

revoke all on function public.is_cms_admin() from public, anon;
grant execute on function public.is_cms_admin() to authenticated;

-- Email allow-list for the private novelty design tool. Passwords remain in
-- Supabase Auth and are never stored in this table or managed by the CMS.
create table if not exists public.novelty_access (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email = lower(email)),
  created_at timestamptz not null default now(),
  created_by text
);

alter table public.novelty_access enable row level security;
grant select, insert, delete on public.novelty_access to authenticated;

drop policy if exists "CMS admins can view novelty access" on public.novelty_access;
create policy "CMS admins can view novelty access"
on public.novelty_access for select
to authenticated
using ((select public.is_cms_admin()));

drop policy if exists "CMS admins can grant novelty access" on public.novelty_access;
create policy "CMS admins can grant novelty access"
on public.novelty_access for insert
to authenticated
with check ((select public.is_cms_admin()));

drop policy if exists "CMS admins can revoke novelty access" on public.novelty_access;
create policy "CMS admins can revoke novelty access"
on public.novelty_access for delete
to authenticated
using ((select public.is_cms_admin()));

create or replace function public.has_novelty_access()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from auth.users as u
    where u.id = (select auth.uid())
      and u.email_confirmed_at is not null
      and (
        lower(u.email) in ('team@nextlevelgamingevents.com', 'kcbianzon@gmail.com')
        or exists (
          select 1 from public.novelty_access as allowed
          where allowed.email = lower(u.email)
        )
      )
  );
$$;

revoke all on function public.has_novelty_access() from public, anon;
grant execute on function public.has_novelty_access() to authenticated;

-- Admin-created novelty accounts provide a quick alternative to verified
-- Supabase email accounts. Passwords are hashed for login and separately
-- encrypted with a key held in Supabase Vault for admin-only recovery.
create extension if not exists pgcrypto with schema extensions;
create extension if not exists supabase_vault with schema vault;

select vault.create_secret(
  encode(extensions.gen_random_bytes(32), 'hex'),
  'novelty_quick_access_password_encryption_key',
  'Encryption key used by the admin-only novelty password recovery function'
)
where not exists (
  select 1 from vault.secrets where name = 'novelty_quick_access_password_encryption_key'
);

create table if not exists public.novelty_quick_access (
  id uuid primary key default gen_random_uuid(),
  username text not null unique check (username = lower(username)),
  password_hash text not null,
  encrypted_password text,
  created_at timestamptz not null default now(),
  created_by text
);
alter table public.novelty_quick_access
  add column if not exists encrypted_password text;

create table if not exists public.novelty_quick_access_sessions (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.novelty_quick_access(id) on delete cascade,
  token_hash text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);
create index if not exists novelty_quick_access_sessions_expiry_idx
  on public.novelty_quick_access_sessions (expires_at);

alter table public.novelty_quick_access enable row level security;
alter table public.novelty_quick_access_sessions enable row level security;
grant select, delete on public.novelty_quick_access to authenticated;

drop policy if exists "CMS admins can view quick novelty access" on public.novelty_quick_access;
create policy "CMS admins can view quick novelty access" on public.novelty_quick_access
for select to authenticated using ((select public.is_cms_admin()));
drop policy if exists "CMS admins can revoke quick novelty access" on public.novelty_quick_access;
create policy "CMS admins can revoke quick novelty access" on public.novelty_quick_access
for delete to authenticated using ((select public.is_cms_admin()));

create or replace function public.create_novelty_quick_access(p_username text, p_password text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare normalized_username text := lower(btrim(p_username));
  encryption_key text;
begin
  if not (select public.is_cms_admin()) then
    raise exception 'CMS admin access required';
  end if;
  if normalized_username is null or normalized_username !~ '^[a-z0-9][a-z0-9._-]{2,31}$' then
    raise exception 'Username must be 3–32 characters using letters, numbers, dots, dashes, or underscores';
  end if;
  if p_password is null or length(p_password) < 10 or octet_length(p_password) > 72 then
    raise exception 'Password must be at least 10 characters and no more than 72 bytes';
  end if;

  select decrypted_secret into encryption_key
  from vault.decrypted_secrets
  where name = 'novelty_quick_access_password_encryption_key';
  if encryption_key is null then
    raise exception 'Quick access password encryption is not configured';
  end if;

  insert into public.novelty_quick_access (username, password_hash, encrypted_password, created_by)
  values (
    normalized_username,
    extensions.crypt(p_password, extensions.gen_salt('bf', 12)),
    encode(extensions.pgp_sym_encrypt(p_password, encryption_key), 'base64'),
    auth.jwt() ->> 'email'
  )
  on conflict (username) do update
    set password_hash = excluded.password_hash,
        encrypted_password = excluded.encrypted_password,
        created_at = now(),
        created_by = excluded.created_by;
  delete from public.novelty_quick_access_sessions
  where account_id = (select id from public.novelty_quick_access where username = normalized_username);
end;
$$;

create or replace function public.get_novelty_quick_access_password(p_username text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  encryption_key text;
  stored_password text;
begin
  if not (select public.is_cms_admin()) then
    raise exception 'CMS admin access required';
  end if;

  select decrypted_secret into encryption_key
  from vault.decrypted_secrets
  where name = 'novelty_quick_access_password_encryption_key';
  if encryption_key is null then
    raise exception 'Quick access password encryption is not configured';
  end if;

  select encrypted_password into stored_password
  from public.novelty_quick_access
  where username = lower(btrim(p_username));
  if stored_password is null then return null; end if;
  return extensions.pgp_sym_decrypt(decode(stored_password, 'base64'), encryption_key);
end;
$$;

create or replace function public.authenticate_novelty_quick_access(p_username text, p_password text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  matched_account uuid;
  session_token text;
begin
  if p_username is null or p_password is null then return null; end if;
  select id into matched_account
  from public.novelty_quick_access
  where username = lower(btrim(p_username))
    and password_hash = extensions.crypt(p_password, password_hash)
  limit 1;
  if matched_account is null then return null; end if;

  delete from public.novelty_quick_access_sessions where expires_at <= now();
  session_token := encode(extensions.gen_random_bytes(32), 'hex');
  insert into public.novelty_quick_access_sessions (account_id, token_hash, expires_at)
  values (matched_account, extensions.crypt(session_token, extensions.gen_salt('bf', 12)), now() + interval '8 hours');
  return session_token;
end;
$$;

create or replace function public.validate_novelty_quick_access_session(p_session_token text)
returns boolean
language sql
security definer
set search_path = ''
as $$
  select coalesce(exists (
    select 1 from public.novelty_quick_access_sessions as session
    where p_session_token is not null
      and session.expires_at > now()
      and session.token_hash = extensions.crypt(p_session_token, session.token_hash)
  ), false);
$$;

create or replace function public.end_novelty_quick_access_session(p_session_token text)
returns void
language sql
security definer
set search_path = ''
as $$
  delete from public.novelty_quick_access_sessions as session
  where p_session_token is not null
    and session.token_hash = extensions.crypt(p_session_token, session.token_hash);
$$;

revoke all on function public.create_novelty_quick_access(text, text) from public, anon;
revoke all on function public.get_novelty_quick_access_password(text) from public, anon;
revoke all on function public.authenticate_novelty_quick_access(text, text) from public;
revoke all on function public.validate_novelty_quick_access_session(text) from public;
revoke all on function public.end_novelty_quick_access_session(text) from public;
grant execute on function public.create_novelty_quick_access(text, text) to authenticated;
grant execute on function public.get_novelty_quick_access_password(text) to authenticated;
grant execute on function public.authenticate_novelty_quick_access(text, text) to anon, authenticated;
grant execute on function public.validate_novelty_quick_access_session(text) to anon, authenticated;
grant execute on function public.end_novelty_quick_access_session(text) to anon, authenticated;

drop policy if exists "CMS pages are public to read" on public.cms_pages;
create policy "CMS pages are public to read"
on public.cms_pages for select
to anon, authenticated
using (true);

drop policy if exists "CMS admin can insert pages" on public.cms_pages;
create policy "CMS admin can insert pages"
on public.cms_pages for insert
to authenticated
with check ((select public.is_cms_admin()));

drop policy if exists "CMS admin can update pages" on public.cms_pages;
create policy "CMS admin can update pages"
on public.cms_pages for update
to authenticated
using ((select public.is_cms_admin()))
with check ((select public.is_cms_admin()));

drop policy if exists "CMS admin can delete pages" on public.cms_pages;
create policy "CMS admin can delete pages"
on public.cms_pages for delete
to authenticated
using ((select public.is_cms_admin()));

-- Customer novelty designs are publicly submittable and readable only by CMS admins.
create table if not exists public.novelty_design_submissions (
  id uuid primary key default gen_random_uuid(),
  product_id text not null,
  product_title text not null,
  image_url text not null,
  image_path text not null,
  styles text[] not null default '{}',
  description text not null default '',
  submitted_by_email text,
  status text not null default 'new' check (status in ('new', 'reviewing', 'quoted', 'complete')),
  created_at timestamptz not null default now()
);
alter table public.novelty_design_submissions
  add column if not exists submitted_by_email text;
alter table public.novelty_design_submissions enable row level security;
grant insert on public.novelty_design_submissions to anon, authenticated;
grant select, update, delete on public.novelty_design_submissions to authenticated;
drop policy if exists "Visitors can submit novelty designs" on public.novelty_design_submissions;
create policy "Visitors can submit novelty designs" on public.novelty_design_submissions
for insert to anon, authenticated with check (status = 'new');
drop policy if exists "CMS admins can view novelty designs" on public.novelty_design_submissions;
create policy "CMS admins can view novelty designs" on public.novelty_design_submissions
for select to authenticated using ((select public.is_cms_admin()));
drop policy if exists "CMS admins can update novelty designs" on public.novelty_design_submissions;
create policy "CMS admins can update novelty designs" on public.novelty_design_submissions
for update to authenticated using ((select public.is_cms_admin())) with check ((select public.is_cms_admin()));
drop policy if exists "CMS admins can delete novelty designs" on public.novelty_design_submissions;
create policy "CMS admins can delete novelty designs" on public.novelty_design_submissions
for delete to authenticated using ((select public.is_cms_admin()));

-- Public URLs are needed to display images on the public website. Writes are
-- still protected by verified-admin checks in the storage object policies.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cms-media', 'cms-media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "CMS media can be read publicly" on storage.objects;
create policy "CMS media can be read publicly"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'cms-media');

drop policy if exists "CMS admin can upload media" on storage.objects;
create policy "CMS admin can upload media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'cms-media' and (select public.is_cms_admin()));

drop policy if exists "Visitors can upload novelty designs" on storage.objects;
create policy "Visitors can upload novelty designs" on storage.objects
for insert to anon, authenticated
with check (bucket_id = 'cms-media' and name like 'novelty-designs/%');

drop policy if exists "CMS admin can update media" on storage.objects;
create policy "CMS admin can update media"
on storage.objects for update
to authenticated
using (bucket_id = 'cms-media' and (select public.is_cms_admin()))
with check (bucket_id = 'cms-media' and (select public.is_cms_admin()));

drop policy if exists "CMS admin can remove media" on storage.objects;
create policy "CMS admin can remove media"
on storage.objects for delete
to authenticated
using (bucket_id = 'cms-media' and (select public.is_cms_admin()));

-- Realtime refresh keeps edits in sync between the CMS and public pages.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'cms_pages'
  ) then
    alter publication supabase_realtime add table public.cms_pages;
  end if;
end;
$$;
