# ReputationFlow — Launch Checklist

Professional step-by-step guide to go from this codebase to a live product.

---

## 1. Local setup

```bash
cd reputationflow
npm install
npm install @supabase/supabase-js stripe @stripe/stripe-js
cp .env.example .env.local
```

Fill in `.env.local` as you complete the services below.

---

## 2. Supabase (Auth + Database)

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → New query → paste and run the entire contents of `supabase/schema.sql`
3. Go to **Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. (Optional) Enable Email auth under **Authentication → Providers**

Then in the code:
- Uncomment the real Supabase calls in `login/page.tsx`, `signup/page.tsx`, and `onboarding/page.tsx`
- Replace mock data on the dashboard with real queries

---

## 3. Stripe (Subscriptions)

1. Create an account at [stripe.com](https://stripe.com)
2. Switch to **Test mode**
3. **Products** → Add product:
   - Name: `ReputationFlow Professional`
   - Pricing: Recurring, **$79 / month**
4. Copy the **Price ID** (`price_...`) → `STRIPE_PRICE_ID`
5. **Developers → API keys**:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`
6. For local webhooks:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   Copy the webhook signing secret → `STRIPE_WEBHOOK_SECRET`

When ready, uncomment the real logic in:
- `src/lib/stripe.ts`
- `src/app/api/stripe/checkout/route.ts`
- `src/app/api/stripe/webhook/route.ts`

Add a “Upgrade” or “Start subscription” button on the dashboard that calls `/api/stripe/checkout`.

---

## 4. Deploy to Vercel (recommended)

1. Push the project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo
3. Add all environment variables from `.env.local` in the Vercel project settings
4. Set `NEXT_PUBLIC_APP_URL` to your production domain (e.g. `https://reputationflow.app`)
5. Deploy

### Custom domain
- In Vercel → Domains → add your domain
- Update DNS as instructed
- Update `NEXT_PUBLIC_APP_URL` and any Stripe success/cancel URLs

### Stripe production webhook
- In Stripe Dashboard → Webhooks → Add endpoint  
  `https://yourdomain.com/api/stripe/webhook`
- Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
- Copy the signing secret into Vercel env vars

---

## 5. Final pre-launch checklist

- [ ] Supabase schema applied and auth working
- [ ] Onboarding creates a real business row
- [ ] Smart review link (`/r/[slug]`) saves private feedback to the database
- [ ] Dashboard shows real data
- [ ] Stripe Checkout works in test mode
- [ ] Webhook correctly marks users as subscribed
- [ ] Privacy Policy & Terms linked in footer
- [ ] Custom domain + SSL live
- [ ] Test the full flow on mobile

---

## 6. Pricing reminder

Current plan shown on the landing page: **$79 / month**

You can change this later in Stripe and update the landing page copy.

---

## Support

Once live, monitor:
- Vercel deployment logs
- Supabase logs & auth users
- Stripe Dashboard → Payments & Subscriptions
