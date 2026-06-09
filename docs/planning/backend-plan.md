# Backend Plan

## Backend goals
Support real demo operations for:
- separate auth flows
- role-based permissions
- product catalog services
- cart and checkout demo
- order lifecycle
- inventory tracking
- banner management
- audit logging

Keep backend simple, beginner-friendly, and safe for local demo.

## Backend approach
Use Next.js App Router with:
- server components for read-heavy pages
- route handlers for mutations and protected data actions
- plain JavaScript service modules
- optional Prisma + SQLite for persistence in V1

## Data source strategy

### Catalog seed source
Primary source:
- `data/tech_products_100_demo.json`

Supporting source:
- `data/product-image-manifest.json`

Catalog rules:
- parse `specs_json` safely
- normalize category and brand labels
- ignore external `image_url` placeholders for final rendering
- resolve product images from local manifest, fallback to local placeholder

### Demo operational persistence
Plan for persistence layer if implemented in V1:
- SQLite database for local development
- Prisma ORM with JavaScript client
- seed script imports catalog and demo operational data

## Auth flow plan

### Customer auth
- register with name, email, phone, password
- login with email/phone + password
- logout
- forgot-password page remains placeholder in V1
- protect account/order history pages

### Staff auth
- separate login endpoint and page at `/staff/login`
- only users with `admin`, `manager`, or `staff` role can access staff session
- protect `/staff/*` routes
- redirect unauthorized users away from staff routes

### Session approach
For V1 planning:
- prefer simple cookie-based session approach
- keep customer and staff session checks separate
- session payload should contain user id, role, and assigned store scope
- password storage must use secure hash

## RBAC plan
Roles:
- `admin`
- `manager`
- `staff`
- `customer`

Permission shape:
- admin: all actions
- manager: store-scoped operations, limited pricing/promotion control
- staff: store-scoped inventory and order support, no settings/user management
- customer: public account only

Enforcement points:
- route protection
- server action / route handler validation
- UI action visibility
- audit logging on sensitive mutations

## Product service plan
Services should provide:
- read all active products
- search products by keyword
- filter by category, brand, stock, discount, warranty, price
- sort by relevance/newest/price/rating/discount
- get product by slug
- get related products
- produce homepage groups like featured, deals, new arrivals, best sellers

Staff product service should support:
- create product
- edit product
- toggle status
- toggle featured
- update price and discount
- validate `specs_json`
- write audit log

## Category and brand service plan
Needed behavior:
- derive seed values from product catalog at start if no DB content
- allow staff management in V1 admin/manager views
- provide public listing filter data
- maintain slugs and status

## Cart service plan
Cart requirements:
- anonymous cart support allowed
- logged-in customer cart support preferred
- cart does not reduce inventory
- keep price snapshot
- update quantity and remove items
- support persistence via cookie/local storage or DB depending on chosen implementation stage

## Order service plan
Checkout flow:
1. validate cart
2. collect customer/shipping/store pickup data
3. create demo order
4. create order items with snapshots
5. set initial status to `pending`
6. clear cart after success

Order management flow:
- pending
- confirmed
- packing
- ready_for_pickup
- shipping
- delivered
- cancelled
- returned

Rules:
- inventory decreases on `confirmed`
- restore on `cancelled` if already decreased
- maintain status history through audit log entries

## Inventory service plan
Inventory requirements:
- store-aware quantity
- low stock threshold
- update stock by store
- staff limited to assigned store
- manager/admin broader scope based on role
- every inventory mutation logs actor, delta, and reason

## Banner service plan
V1 behavior:
- create/edit banner
- activate/deactivate banner
- control homepage positions
- time-window fields optional in V1 UI but supported in model plan
- audit all changes

## Customer service plan
Customer support features:
- profile management
- address management
- order history lookup
- staff read-only customer view in portal

## Audit log plan
Track:
- product create/update/status
- inventory updates
- order status changes
- banner changes
- staff role changes
- settings changes

Each entry should include:
- actor user id
- action
- entity type
- entity id
- metadata JSON
- timestamp

## Validation plan
Use runtime validation for:
- auth inputs
- checkout form
- product create/edit forms
- inventory updates
- order status changes
- staff user changes

Zod allowed if dependency added later.
If avoiding extra dependency early, use simple manual validators and upgrade later.

## Error handling plan
Rules:
- public pages show friendly Vietnamese messages
- staff pages show actionable validation feedback
- route handlers return structured error responses
- handle not-found, unauthorized, forbidden, invalid input, and conflict states

## API / handler plan
Expected mutation surfaces:
- auth login/register/logout
- cart update endpoints if needed
- checkout create order
- staff product mutations
- staff inventory mutations
- staff order status updates
- staff category/brand/banner/user mutations

## Seed flow plan
Seed should create:
- stores
- staff demo users
- customer demo user
- categories
- brands
- products from JSON
- inventory by store
- banners
- sample orders
- audit logs if helpful for dashboard demo

## Deployment considerations
- environment variables documented in `.env.example`
- local SQLite path documented
- build must not depend on remote services
- Vercel-friendly setup preferred
- do not assume production secrets or domain access exist