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
  status text not null default 'new' check (status in ('new', 'reviewing', 'quoted', 'complete')),
  created_at timestamptz not null default now()
);
alter table public.novelty_design_submissions enable row level security;
grant insert on public.novelty_design_submissions to anon, authenticated;
grant select, update on public.novelty_design_submissions to authenticated;
drop policy if exists "Visitors can submit novelty designs" on public.novelty_design_submissions;
create policy "Visitors can submit novelty designs" on public.novelty_design_submissions
for insert to anon, authenticated with check (status = 'new');
drop policy if exists "CMS admins can view novelty designs" on public.novelty_design_submissions;
create policy "CMS admins can view novelty designs" on public.novelty_design_submissions
for select to authenticated using ((select public.is_cms_admin()));
drop policy if exists "CMS admins can update novelty designs" on public.novelty_design_submissions;
create policy "CMS admins can update novelty designs" on public.novelty_design_submissions
for update to authenticated using ((select public.is_cms_admin())) with check ((select public.is_cms_admin()));

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
