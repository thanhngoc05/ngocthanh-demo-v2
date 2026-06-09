# Routes Plan

## Route strategy
Use Next.js App Router with clear separation between:
- public storefront routes
- customer auth/account routes
- staff auth and protected staff routes

Public navigation must never expose staff operations.

## Public storefront routes

### Core public pages
- `/` — homepage
- `/search` — product search results
- `/danh-muc/[categorySlug]` — category listing page
- `/thuong-hieu/[brandSlug]` — brand listing page
- `/san-pham/[productSlug]` — product detail page
- `/khuyen-mai` — promotions page
- `/gio-hang` — cart page
- `/thanh-toan` — checkout page
- `/don-hang/thanh-cong` — order success page
- `/cua-hang` — store locator
- `/ho-tro` — support/contact page

### Policy/info pages
- `/chinh-sach-giao-hang`
- `/chinh-sach-doi-tra`
- `/chinh-sach-bao-hanh`
- `/chinh-sach-thanh-toan`
- `/tra-gop`
- `/thu-cu-doi-moi`

## Customer auth routes
- `/login`
- `/register`
- `/forgot-password`

## Customer account routes
- `/tai-khoan` — account overview
- `/tai-khoan/ho-so` — profile
- `/tai-khoan/dia-chi` — address book
- `/tai-khoan/don-hang` — order history
- `/tai-khoan/don-hang/[orderCode]` — order detail

Rules:
- account routes require customer login
- guests redirected to `/login`

## Staff auth routes
- `/staff/login` — separate staff login page

Rules:
- customer session cannot open staff pages
- unauthenticated staff access redirects to `/staff/login`

## Staff portal routes

### Staff shell root
- `/staff` — dashboard

### Staff operations
- `/staff/products`
- `/staff/products/new`
- `/staff/products/[productId]`
- `/staff/products/[productId]/edit`

- `/staff/categories`
- `/staff/categories/new`
- `/staff/categories/[categoryId]/edit`

- `/staff/brands`
- `/staff/brands/new`
- `/staff/brands/[brandId]/edit`

- `/staff/inventory`
- `/staff/inventory/[productId]`

- `/staff/orders`
- `/staff/orders/[orderId]`

- `/staff/customers`
- `/staff/customers/[customerId]`

- `/staff/banners`
- `/staff/banners/new`
- `/staff/banners/[bannerId]/edit`

### Admin-focused routes
- `/staff/users`
- `/staff/users/new`
- `/staff/users/[userId]/edit`
- `/staff/audit-logs`
- `/staff/settings`

## Route protection matrix

### Public access
Accessible by all:
- homepage
- product listing/search/detail
- promotions
- policy pages
- stores/support
- cart
- checkout
- public auth pages

### Customer-only
Accessible by `customer`:
- `/tai-khoan`
- `/tai-khoan/ho-so`
- `/tai-khoan/dia-chi`
- `/tai-khoan/don-hang`
- `/tai-khoan/don-hang/[orderCode]`

### Staff roles
Accessible by `admin`, `manager`, `staff`:
- `/staff`
- `/staff/products`
- `/staff/inventory`
- `/staff/orders`
- `/staff/customers`

### Manager + admin
Accessible by `admin`, `manager`:
- `/staff/categories`
- `/staff/brands`
- `/staff/banners`

### Admin-only
Accessible by `admin`:
- `/staff/users`
- `/staff/audit-logs`
- `/staff/settings`

## Route behaviors

### Search and listing query params
Expected public query params:
- `q` — search keyword
- `category` — category slug or label
- `brand` — brand slug or label
- `minPrice`
- `maxPrice`
- `stock`
- `discount`
- `warranty`
- `sort`
- `page`

Sorting values:
- `relevance`
- `newest`
- `price_asc`
- `price_desc`
- `rating`
- `discount`

### Staff table query params
Expected staff query params:
- `q`
- `status`
- `role`
- `store`
- `category`
- `brand`
- `sort`
- `page`

## Not-found and error routes
Need support for:
- public not-found page
- staff not-found page or shared not-found
- unauthorized/forbidden feedback in protected flows
- empty states for no results, no orders, no inventory matches

## Future route candidates
Not in V1 locked scope:
- `/wishlist`
- `/compare`
- `/staff/reports`
- `/staff/analytics`
- `/staff/returns`
- `/staff/settings/shipping`