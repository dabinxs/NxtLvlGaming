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
