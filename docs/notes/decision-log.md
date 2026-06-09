# Decision Log

## 2026-06-09 — Project Foundation
- **Decision**: Use default assumptions for branding, commerce, and store operations.
- **Reason**: User explicitly approved using default assumptions to accelerate start.
- **Impact**: Brand name is `NgocThanh`, style is `premium/minimal`, UI is Vietnamese, and standard demo store/auth flows are adopted.

- **Decision**: Use Next.js App Router with JavaScript only.
- **Reason**: Strict project requirement to avoid TypeScript and `9router`.
- **Impact**: All files will be `.js` or `.jsx`.

- **Decision**: Separate Customer and Staff Auth flows.
- **Reason**: Security and UX separation between public shoppers and internal operators.
- **Impact**: Separate login pages (`/login` vs `/staff/login`) and distinct session management.

- **Decision**: Use `data/tech_products_100_demo.json` as primary catalog source.
- **Reason**: Provided as the main product seed data.
- **Impact**: Product services will read from this file; database seed will import from here.

- **Decision**: Resolve images via `sku` and `data/product-image-manifest.json`.
- **Reason**: Ensures stable image mapping and prevents hotlinking external placeholders.
- **Impact**: Product cards and details will use manifest paths or local placeholders.

- **Decision**: Implement RBAC with `admin`, `manager`, `staff`, and `customer` roles.
- **Reason**: Required for store-aware inventory and operational security.
- **Impact**: Route protection and action visibility will be role-dependent.