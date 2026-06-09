# Architecture Plan

## Goal
Build NgocThanh demo e-commerce system with 2 separate experiences:
1. Public storefront for customers
2. Protected staff portal for internal operations

Use JavaScript-only Next.js App Router project.

## Core principles
- JavaScript and JSX only
- No TypeScript
- No `9router`
- Keep `data/` and `public/` intact
- Use existing seed data from `data/tech_products_100_demo.json`
- Use local demo-safe architecture first
- Prefer simple and maintainable code
- Vietnamese UI, clear business flows
- Public and staff navigation must stay separate

## High-level system shape
- **Frontend app**: Next.js App Router
- **Styling**: Tailwind CSS
- **Runtime**: Node.js
- **Data layer**: local seed JSON first, database-backed demo operations for auth/orders/staff if implemented
- **Validation**: Zod allowed for runtime validation
- **Persistence**: SQLite with Prisma for local demo if database layer is added in V1
- **Auth model**: separate customer login and staff login
- **Authorization**: role-based access control for `admin`, `manager`, `staff`, `customer`

## Experience split

### Public storefront
Routes under public site handle:
- homepage
- search
- category browsing
- product detail
- cart
- checkout
- customer auth
- account pages
- policy/support pages
- store locator

### Staff portal
Routes under `/staff` handle:
- staff login
- dashboard
- product operations
- category and brand operations
- inventory operations
- order operations
- customer view
- banner/promotion operations
- audit logs
- staff user management for admin

## Suggested app layers

### 1. Presentation layer
Reusable UI components:
- layout shell
- header
- footer
- product card
- price display
- rating display
- badges
- tables
- forms
- modal/drawer
- empty/loading/error states

### 2. Route layer
App Router pages and layouts:
- public route groups
- auth pages
- customer account pages
- staff route group with protection

### 3. Service layer
Plain JavaScript service modules:
- product service
- category service
- brand service
- inventory service
- cart service
- order service
- auth service
- banner service
- audit log service

### 4. Data access layer
Simple repository-style modules:
- seed data reader
- optional Prisma repositories
- mapping helpers
- runtime validation
- fallback image resolution using manifest defaults

## Data strategy for V1
Use `data/tech_products_100_demo.json` as source of truth for catalog seed.

Observations from current seed:
- product shape matches required base fields
- `specs_json` stored as JSON string
- `image_url` currently points to placeholder URLs and must not be used directly for hotlinking
- image manifest currently contains only `_default` placeholder mapping

Planned image behavior:
- match products by `sku` against manifest entries if later added
- use `mainImage` for product cards
- use `gallery` for product details
- fallback to `/assets/products/placeholder/product-placeholder.png`

## Auth architecture
Keep customer auth and staff auth clearly separate.

### Customer auth
- `/login`
- `/register`
- `/forgot-password`
- customer session for account/order history

### Staff auth
- `/staff/login`
- protected `/staff/*`
- role-based navigation and access control

## RBAC rules
- **admin**: full system access
- **manager**: assigned store scope, inventory/orders/product visibility, limited pricing and promotions
- **staff**: assigned store scope, stock and order support only
- **customer**: public account only

## Inventory workflow
- cart does not reduce stock
- pending order does not reduce stock by default
- confirmed order reduces stock
- cancelled order restores stock if already reduced
- inventory changes must create audit log

## Order workflow
Draft V1 flow:
1. customer adds items to cart
2. checkout submits demo order
3. order created as `pending`
4. staff confirms order
5. confirmation decreases inventory
6. staff can move order through later statuses
7. cancellation restores inventory when needed

## Staff security model
Protect all `/staff` routes.
Checks needed:
- unauthenticated users redirected to `/staff/login`
- customer users blocked from staff area
- manager/staff action limits enforced in UI and backend/service layer

## SEO and metadata
Public storefront should include:
- brand title
- favicon from `public/assets/brand/logo-icon.png`
- original metadata text for Vietnamese retail demo
- clean URL slugs for products and categories

## Deployment target
- Preferred: Vercel
- Production domain target: `www.ngocthanh.org`
- Staff path target: `/staff`
- Do not claim deployment complete unless authenticated output proves it

## V1 implementation posture
Build real demo flows for:
- catalog
- search/filter/sort
- product detail
- cart
- demo checkout
- separate auth
- staff operations
- audit logs

Defer external integrations:
- payment gateway
- shipping provider
- OTP/email integrations
- analytics suites
- advanced PWA offline features