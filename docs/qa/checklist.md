# QA Checklist

## Completed verification
- [x] `npm run build` passes successfully
- [x] App Router dynamic pages await async `params` / `searchParams`
- [x] Header cart/auth client state is gated by mounted state
- [x] Product cards use category SVG placeholders instead of repeated brand logo fallback
- [x] Product detail fallback gallery uses the category placeholder
- [x] Horizontal logo dimensions match the source image ratio
- [x] Next/Image `fill` usages include `sizes`
- [x] Customer auth routes compile: `/login`, `/register`, `/forgot-password`
- [x] Customer account routes compile: `/tai-khoan`, `/tai-khoan/ho-so`, `/tai-khoan/dia-chi`, `/tai-khoan/don-hang`
- [x] Public storefront routes compile: `/`, `/search`, `/cart`, `/checkout`, `/checkout/success`
- [x] Product routes compile: `/danh-muc/[slug]`, `/san-pham/[slug]`
- [x] Staff entry routes compile: `/staff`, `/staff/login`
- [x] HTTP route check passes for `/`, `/search`, `/cart`, `/checkout`, `/checkout/success`, `/login`, `/register`, `/forgot-password`, `/staff/login`, `/staff`, `/danh-muc/dien-thoai`, `/danh-muc/laptop`, `/san-pham/samsung-galaxy-a56-5g-lite-001`
- [x] `.gitignore` excludes `node_modules`, `.next`, `out`, `.env*`, and `.vercel`
- [x] `git ls-files` shows no tracked `node_modules`, `.next`, `.env`, or `.env.local`

## Manual flow review
- [x] Customer login page uses `Suspense` around `useSearchParams`
- [x] Customer login/register/account pages reachable
- [x] Staff login route present: `/staff/login`
- [x] Staff/internal flow is documented as partial V1 work
- [x] Product listing page present
- [x] Product detail page present
- [x] Cart page present
- [x] Checkout page present

## Blockers found and fixed
- [x] `/login` build error from `useSearchParams()` without `Suspense`
- [x] Fixed by moving login form into client component and wrapping page with `Suspense`
- [x] Fixed `/danh-muc/[slug]` async params warning by awaiting `params`
- [x] Fixed dynamic page `searchParams` usage by awaiting before destructuring
- [x] Fixed repeated product logo placeholder by adding category SVG fallbacks
- [x] Fixed missing `/staff/login` route

## Still not executed in browser
- [ ] Customer login/register/account interactive smoke test
- [ ] Staff login smoke test
- [ ] Cart add/remove interactive smoke test
- [ ] Checkout demo order creation smoke test
- [ ] Product filter/sort smoke test

## Final QA status
- [x] Build green
- [x] No blocking compile errors remain
- [x] Existing dev server available at `http://localhost:3000`
- [x] In-app Browser session unavailable; HTTP route checks used instead
- [x] `/staff/login` returns 200
- [x] `npm install` completed; npm reported 2 moderate vulnerabilities
- [x] Vercel access is missing locally; deployment must be done manually or after access is configured
- [x] Domain/DNS access is missing locally; domain setup must be done manually
