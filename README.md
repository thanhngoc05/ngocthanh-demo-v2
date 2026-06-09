# NgocThanh Ecommerce Demo

Vietnamese ecommerce demo for NgocThanh, built with Next.js App Router, JavaScript, and Tailwind CSS.

## Current Status

- Public storefront: completed for demo review.
- Customer auth demo: completed with local browser storage.
- Staff entry: `/staff/login` and `/staff` exist as demo entry pages.
- Staff portal modules: documented and still in backlog.
- Product images: local category SVG placeholders are used when SKU images are not available.
- Deployment: ready for Vercel import, but not deployed from this machine because Vercel access is not configured.

## Tech Stack

- Next.js 16 App Router
- React 19
- JavaScript only
- Tailwind CSS
- Local JSON seed data from `data/tech_products_100_demo.json`

## Local Commands

```bash
npm install
```

Installs project dependencies from `package.json` and `package-lock.json`.

```bash
npm run dev
```

Starts the local development server, usually at `http://localhost:3000`.

```bash
npm run build
```

Builds the production Next.js app and checks App Router/prerender errors.

## Important Routes

- `/`
- `/search`
- `/cart`
- `/checkout`
- `/checkout/success`
- `/login`
- `/register`
- `/forgot-password`
- `/tai-khoan`
- `/tai-khoan/ho-so`
- `/tai-khoan/dia-chi`
- `/tai-khoan/don-hang`
- `/staff`
- `/staff/login`
- `/danh-muc/dien-thoai`
- `/danh-muc/laptop`
- `/san-pham/[slug]`

## Demo Staff Login

- Email: `staff@ngocthanh.demo`
- Password: `demo123`

The staff login is a route and UI demo. Full staff operations such as product management, inventory, orders, users, and audit logs remain planned work.

## Deployment Notes

See `docs/deploy/deploy.md` for Vercel deployment and domain/DNS instructions.

Preferred production domain plan:

- `www.ngocthanh.org` points to the Vercel production deployment.
- `ngocthanh.org` redirects to `www.ngocthanh.org`.
- Staff entry is available at `www.ngocthanh.org/staff`.

Domain and DNS are not configured in this repo.
