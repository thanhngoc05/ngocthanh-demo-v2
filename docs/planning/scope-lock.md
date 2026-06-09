# Scope Lock

## Status: LOCKED
This document freezes the scope for V1 implementation. Any changes after this point require explicit user approval.

## 1. Page List (Frozen)

### Public Storefront
- Homepage (`/`)
- Search Results (`/search`)
- Category Listing (`/danh-muc/[slug]`)
- Brand Listing (`/thuong-hieu/[slug]`)
- Product Detail (`/san-pham/[slug]`)
- Promotions (`/khuyen-mai`)
- Cart (`/gio-hang`)
- Checkout (`/thanh-toan`)
- Order Success (`/don-hang/thanh-cong`)
- Store Locator (`/cua-hang`)
- Support/Contact (`/ho-tro`)
- Policy Pages (Shipping, Return, Warranty, Payment, Installment, Trade-in)

### Customer Account
- Login (`/login`)
- Register (`/register`)
- Forgot Password (`/forgot-password` - placeholder)
- Account Overview (`/tai-khoan`)
- Profile (`/tai-khoan/ho-so`)
- Address Book (`/tai-khoan/dia-chi`)
- Order History (`/tai-khoan/don-hang`)
- Order Detail (`/tai-khoan/don-hang/[code]`)

### Staff Portal
- Staff Login (`/staff/login`)
- Dashboard (`/staff`)
- Product Management (List, New, Edit)
- Category Management (List, New, Edit)
- Brand Management (List, New, Edit)
- Inventory Management (List, Product Detail)
- Order Management (List, Detail)
- Customer View (List, Detail)
- Banner Management (List, New, Edit)
- Staff User Management (Admin only)
- Audit Logs (Admin only)
- Settings (Admin only)

## 2. Entity List (Frozen)
- **User**: Auth, Role, Store assignment.
- **Store**: Location, Contact, Status.
- **Category**: Hierarchy, Slug, Status.
- **Brand**: Metadata, Slug, Status.
- **Product**: Catalog data, SKU, Specs JSON.
- **Inventory**: Store-aware quantity, Low stock threshold.
- **Cart / CartItem**: Session/User based temporary storage.
- **Order / OrderItem**: Transactional record with snapshots.
- **Banner**: Homepage promo content.
- **AuditLog**: Action tracking for staff operations.

## 3. User Roles & Permissions (Frozen)
- **admin**: Full system access.
- **manager**: Store-scoped operations, limited pricing/promotion control.
- **staff**: Store-scoped inventory and order support.
- **customer**: Public account, order history.

## 4. Workflows (Frozen)

### Order Workflow
`Pending` -> `Confirmed` (Inventory Decreases) -> `Packing` -> `Ready for Pickup` / `Shipping` -> `Delivered` / `Cancelled` (Inventory Restores).

### Inventory Workflow
- Cart: No change.
- Pending Order: No change.
- Confirmed Order: Decrease.
- Cancelled Order: Restore if previously decreased.
- All changes logged in `AuditLog`.

### Auth Flow
- Customer: `/login` -> Session -> `/tai-khoan`.
- Staff: `/staff/login` -> Session (Role Check) -> `/staff`.

## 5. Technical Constraints (Frozen)
- **Language**: JavaScript / JSX only.
- **Framework**: Next.js App Router.
- **Styling**: Tailwind CSS.
- **Database**: SQLite + Prisma (Local Demo).
- **Seed Source**: `data/tech_products_100_demo.json`.
- **Image Strategy**: SKU-based mapping via `data/product-image-manifest.json`.

## 6. Brand Assets (Frozen)
- **Horizontal Logo**: Header, Footer, Auth pages.
- **Icon Logo**: Favicon, Browser tab, Staff sidebar (collapsed).
- **Colors**: Teal/Cyan, Royal Blue, Orange accent.

## 7. V1 vs Future (Frozen)

### V1 In-Scope
- All pages and entities listed above.
- Demo checkout (COD/Bank Transfer).
- RBAC and Audit logging.
- Local seed integration.

### Future (Out of Scope)
- Real payment gateways.
- Real shipping APIs.
- SMS/Email OTP.
- Loyalty programs.
- Advanced analytics.