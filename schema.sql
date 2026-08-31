-- ReputationFlow Database Schema (Supabase / PostgreSQL)
-- Run this in the Supabase SQL Editor after creating a new project.

-- Enable UUID extension (usually already enabled)
create extension if not exists "uuid-ossp";

-- =====================================================
-- PROFILES (extends auth.users)
-- =====================================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  email text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- =====================================================
-- BUSINESSES
-- =====================================================
create table public.businesses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  slug text unique not null,                    -- used in smart review link: /r/[slug]
  google_review_url text not null,              -- direct Google review form URL
  logo_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index businesses_user_id_idx on public.businesses(user_id);
create index businesses_slug_idx on public.businesses(slug);

-- =====================================================
-- PRIVATE FEEDBACK (low-star ratings kept private)
-- =====================================================
create table public.private_feedback (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references public.businesses(id) on delete cascade not null,
  rating integer not null check (rating between 1 and 5),
  message text,
  customer_name text,
  customer_email text,
  customer_phone text,
  created_at timestamptz default now() not null
);

create index private_feedback_business_id_idx on public.private_feedback(business_id);
create index private_feedback_created_at_idx on public.private_feedback(created_at desc);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
alter table public.profiles enable row level security;
alter table public.businesses enable row level security;
alter table public.private_feedback enable row level security;

-- Profiles: users can only see/edit their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Businesses: owners only
create policy "Users can view own businesses"
  on public.businesses for select
  using (auth.uid() = user_id);

create policy "Users can insert own businesses"
  on public.businesses for insert
  with check (auth.uid() = user_id);

create policy "Users can update own businesses"
  on public.businesses for update
  using (auth.uid() = user_id);

create policy "Users can delete own businesses"
  on public.businesses for delete
  using (auth.uid() = user_id);

-- Private feedback: business owners can view; public can insert (via smart link)
create policy "Owners can view their feedback"
  on public.private_feedback for select
  using (
    exists (
      select 1 from public.businesses
      where businesses.id = private_feedback.business_id
      and businesses.user_id = auth.uid()
    )
  );

create policy "Anyone can submit private feedback"
  on public.private_feedback for insert
  with check (true);

-- =====================================================
-- TRIGGER: auto-create profile on signup
-- =====================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =====================================================
-- UPDATED_AT helper
-- =====================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger businesses_updated_at
  before update on public.businesses
  for each row execute procedure public.set_updated_at();
