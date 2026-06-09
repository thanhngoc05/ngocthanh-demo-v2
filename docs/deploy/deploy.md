# Deploy Guide

## Current Deployment Status

- Production deployment from this machine: not completed.
- Reason: Vercel CLI is not installed, `VERCEL_TOKEN` is not configured, and no `.vercel` project link exists.
- Domain setup: not completed.
- Reason: no domain registrar or DNS access is available in the local environment.

## Vercel Settings

- Framework preset: Next.js
- Production branch: `main`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: default Vercel Next.js output
- Environment variables: none required for the current JSON/localStorage demo

Optional future environment variables from `.env.example`:

- `NEXT_PUBLIC_SITE_URL`: production URL, for example `https://www.ngocthanh.org`
- `DATABASE_URL`: only needed if the demo later adds a real database
- `NEXTAUTH_SECRET` and `NEXTAUTH_URL`: only needed if real auth is added

## Manual Vercel Deployment Steps

1. Open Vercel and import the GitHub repository `thanhngoc05/ngocthanh-demo-v2`.
2. Select branch `main`.
3. Choose framework preset `Next.js`.
4. Set install command to `npm install`.
5. Set build command to `npm run build`.
6. Leave output directory as Vercel default.
7. Add production environment variables only if future features require them.
8. Deploy and wait for Vercel to report a production URL.
9. Open the production URL and verify the routes listed in `docs/qa/checklist.md`.

## Manual CLI Deployment Steps

Run these only on a machine/account with Vercel access:

```bash
npm install
```

Installs dependencies before local verification.

```bash
npm run build
```

Verifies the app can build before deployment.

```bash
npx vercel login
```

Logs in to Vercel from the terminal.

```bash
npx vercel link
```

Links the local folder to the correct Vercel project.

```bash
npx vercel --prod
```

Creates a production deployment.

## Domain Plan

Preferred:

- `www.ngocthanh.org` should point to the Vercel production deployment.
- `ngocthanh.org` should redirect to `www.ngocthanh.org`.
- Staff entry should use `https://www.ngocthanh.org/staff`.

If `ngocthanh.org` is unavailable, use a clean alternative containing `ngocthanh`, such as:

- `ngocthanhdemo.com`
- `ngocthanhstore.com`
- `ngocthanhmobile.com`

## Manual DNS Steps

After Vercel deployment exists:

1. Add `www.ngocthanh.org` in the Vercel project Domains screen.
2. Add `ngocthanh.org` in the Vercel project Domains screen and configure it to redirect to `www.ngocthanh.org`.
3. In the DNS provider, create the records Vercel shows for the domain.
4. Wait for Vercel domain verification to become valid.
5. Open `https://www.ngocthanh.org`, `https://ngocthanh.org`, and `https://www.ngocthanh.org/staff`.

Do not claim the domain is configured until Vercel shows the domain as valid.
