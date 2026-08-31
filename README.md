# ReputationFlow

Professional reputation management for independent local service businesses.

Get more Google reviews. Protect your rating. Turn feedback into marketing.

## Stack

- **Frontend**: Next.js 15+ (App Router) + TypeScript + Tailwind CSS
- **Auth & Database**: Supabase (PostgreSQL + Auth)
- **Hosting**: Vercel (recommended)

## Current Progress

| Phase | Description                          | Status     |
|-------|--------------------------------------|------------|
| 0–1   | Project setup + Dark landing page    | ✅ Done    |
| 2     | Database schema + Login / Signup     | ✅ Done    |
| 3     | Smart Review Link + QR + Routing     | ✅ Done    |
| 4     | Full Dashboard + Private Feedback    | ✅ Done    |
| 5     | AI Reply + Social Graphics           | ✅ Done    |
| —     | Professional Onboarding flow         | ✅ Done    |
| —     | Settings + Privacy + Terms           | ✅ Done    |
| 6     | Stripe structure + Deploy guide      | ✅ Done    |

## Getting Started

### 1. Install dependencies

```bash
npm install
npm install @supabase/supabase-js stripe @stripe/stripe-js
```

**Full launch instructions** (Supabase + Stripe + Vercel) → see [`DEPLOY.md`](./DEPLOY.md)

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. Copy your Project URL and `anon` key from **Settings → API**
4. Create `.env.local`:

```bash
cp .env.example .env.local
# then fill in the values
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
  app/
    page.tsx              → Landing page (dark X-style)
    login/page.tsx        → Login
    signup/page.tsx       → Signup
    dashboard/page.tsx    → Dashboard (link + QR)
    r/[slug]/page.tsx    → Smart review funnel (public)
  lib/
    supabase.ts           → Supabase client
supabase/
  schema.sql              → Full database schema + RLS
```

## Test the Smart Link

After running the app:

- Landing: http://localhost:3000
- Dashboard: http://localhost:3000/dashboard
- Smart review demo: http://localhost:3000/r/demo


## Design

Dark professional theme inspired by X (Twitter):
- Background: `#000000`
- Cards: `#16181c`
- Borders: `#2f3336`
- Accent: `#1d9bf0`
- Text: `#e7e9ea` / muted `#71767b`
