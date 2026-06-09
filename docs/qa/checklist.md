# QA Checklist

## Completed verification
- [x] `npm run build` passes successfully
- [x] Customer auth routes compile: `/login`, `/register`, `/forgot-password`
- [x] Customer account routes compile: `/tai-khoan`, `/tai-khoan/ho-so`, `/tai-khoan/dia-chi`, `/tai-khoan/don-hang`
- [x] Public storefront routes compile: `/`, `/search`, `/cart`, `/checkout`, `/checkout/success`
- [x] Product routes compile: `/danh-muc/[slug]`, `/san-pham/[slug]`

## Manual flow review
- [x] Customer login page uses `Suspense` around `useSearchParams`
- [x] Customer login/register/account pages reachable
- [x] Staff login route present: `/staff/login`
- [x] Product listing page present
- [x] Product detail page present
- [x] Cart page present
- [x] Checkout page present

## Blockers found and fixed
- [x] `/login` build error from `useSearchParams()` without `Suspense`
- [x] Fixed by moving login form into client component and wrapping page with `Suspense`

## Still not executed in browser
- [ ] Customer login/register/account interactive smoke test
- [ ] Staff login smoke test
- [ ] Cart add/remove interactive smoke test
- [ ] Checkout demo order creation smoke test
- [ ] Product filter/sort smoke test

## Final QA status
- [x] Build green
- [x] No blocking compile errors remain
- [ ] Stop for review before push/deploy