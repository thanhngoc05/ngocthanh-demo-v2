# Data Model Plan

## Model strategy
Use product seed JSON for catalog source.
If database added in V1, use Prisma with SQLite and map seed data into relational tables.

## Roles
Allowed roles:
- admin
- manager
- staff
- customer

## Core entities

### User
Fields:
- id
- name
- email
- phone
- passwordHash
- role
- status
- storeId optional
- createdAt
- updatedAt

Notes:
- customer accounts use role `customer`
- staff portal users use `admin`, `manager`, or `staff`
- `storeId` required for store-scoped staff users
- status examples: `active`, `disabled`

### Store
Fields:
- id
- name
- city
- address
- phone
- openingHours
- status

V1 default stores:
- TP. Hồ Chí Minh
- Hà Nội
- Đà Nẵng

### Category
Fields:
- id
- name
- slug
- description
- status
- sortOrder

Notes:
- may be derived first from product seed
- public listing and staff management both use this entity

### Brand
Fields:
- id
- name
- slug
- description
- status

Notes:
- may be derived first from product seed
- staff can manage visibility and metadata in V1

### Product
Fields:
- id
- sku
- name
- slug
- categoryId
- brandId
- priceVnd
- originalPriceVnd
- discountPercent
- stock
- rating
- reviewCount
- warrantyMonths
- imageUrl
- description
- specsJson
- isFeatured
- status
- createdAt
- updatedAt

Seed mapping:
- `price_vnd` -> `priceVnd`
- `original_price_vnd` -> `originalPriceVnd`
- `review_count` -> `reviewCount`
- `warranty_months` -> `warrantyMonths`
- `image_url` -> `imageUrl`
- `specs_json` -> `specsJson`
- `is_featured` -> `isFeatured`
- `created_at` -> `createdAt`

Notes:
- `sku` is stable key
- local image resolution should use `sku` + image manifest
- `specsJson` stored as text or JSON depending on persistence choice
- `stock` field from seed is catalog-level number; store-aware inventory lives in `Inventory`

### Inventory
Fields:
- id
- productId
- storeId
- quantity
- lowStockThreshold
- updatedAt

Notes:
- source of truth for staff inventory workflow
- public product availability can show aggregated or generic in-stock state
- staff views show per-store detail
- quantity changes must create audit logs

### Cart
Fields:
- id
- userId optional
- sessionId optional
- createdAt
- updatedAt

Notes:
- supports anonymous and logged-in customer carts
- `userId` and `sessionId` should not both be empty

### CartItem
Fields:
- id
- cartId
- productId
- quantity
- priceSnapshot

Notes:
- keep price snapshot at add/update stage if needed
- cart does not reduce inventory

### Order
Fields:
- id
- orderCode
- userId optional
- customerName
- customerPhone
- customerEmail
- shippingAddress
- storeId optional
- fulfillmentType
- paymentMethod
- status
- subtotal
- discountTotal
- shippingFee
- total
- note
- createdAt
- updatedAt

Status values:
- pending
- confirmed
- packing
- ready_for_pickup
- shipping
- delivered
- cancelled
- returned

Notes:
- `storeId` can represent pickup store or assigned fulfillment store
- `fulfillmentType` examples: `delivery`, `pickup`
- `paymentMethod` examples: `cod`, `bank_transfer`
- customer account order history reads from this model

### OrderItem
Fields:
- id
- orderId
- productId
- productNameSnapshot
- skuSnapshot
- quantity
- priceSnapshot
- total

Notes:
- snapshots protect historical accuracy if product changes later

### Banner
Fields:
- id
- title
- subtitle
- imageUrl
- linkUrl
- position
- status
- startsAt
- endsAt

Notes:
- used for homepage hero/promo areas
- staff can activate/deactivate

### AuditLog
Fields:
- id
- actorUserId
- action
- entityType
- entityId
- metadataJson
- createdAt

Notes:
- store JSON metadata for before/after values, reasons, deltas, status transitions
- staff dashboard can show recent entries

## Relationships

### User relationships
- one optional Store for staff assignment
- one-to-many Orders
- one-to-many AuditLogs as actor
- one-to-many Cart records if historical carts stored

### Store relationships
- one-to-many Users
- one-to-many Inventory records
- one-to-many Orders
- optional store-based scoping for managers/staff

### Category relationships
- one-to-many Products

### Brand relationships
- one-to-many Products

### Product relationships
- belongs to one Category
- belongs to one Brand
- one-to-many Inventory
- one-to-many CartItem
- one-to-many OrderItem

### Cart relationships
- optional belongs to one User
- one-to-many CartItem

### Order relationships
- optional belongs to one User
- optional belongs to one Store
- one-to-many OrderItem

## Operational rules

### Auth and user rules
- customer cannot access staff area
- staff roles must be checked on every protected action
- disabled users cannot log in

### Product rules
- SKU unique
- slug unique
- product status controls public visibility
- `isFeatured` controls featured placement eligibility

### Inventory rules
- cart does not reduce inventory
- pending order does not reduce inventory by default
- confirmed order reduces inventory
- cancelled order restores inventory if reduction already happened
- every inventory change must be auditable

### Order rules
- order code unique
- order snapshots required
- status transitions should be validated
- cancellation rules depend on current status and prior inventory mutation state

### Audit rules
Must log:
- product create/update/status
- inventory update
- order status update
- staff role update
- banner create/update/status
- settings change

## Seed and demo data plan
Initial seed should create:
- 3 stores
- catalog categories from seed products
- catalog brands from seed products
- products from `data/tech_products_100_demo.json`
- inventory per store derived from product stock
- demo admin, manager, staff, customer users
- sample banners
- sample orders for dashboard realism

## Suggested derived fields and helpers
Helpful computed values:
- effective price
- in-stock boolean
- short specs summary from `specsJson`
- discount badge text
- aggregate inventory count
- low-stock boolean per store

## V1 vs future
V1:
- core entities above
- demo persistence
- separate auth
- RBAC
- audit log

Future:
- wishlist
- loyalty
- payment transaction table
- shipment tracking table
- OTP/password reset tokens
- reviews/comments moderation