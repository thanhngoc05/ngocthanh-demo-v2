# Review Plan

## Review Goals
Analyze the Phase B planning documents to ensure the project is feasible, complete, and free of scope creep before locking the scope for implementation.

## Review Checklist

### 1. Scope and Feasibility
- [x] **Scope Creep**: Are there features that exceed the "demo" nature of the project?
- [x] **Dead Pages**: Are there routes defined that have no clear purpose or backend support?
- [x] **Missing Backend Support**: Does every frontend page have a corresponding service or data model?
- [x] **Route Protection**: Are all `/staff` and `/tai-khoan` routes properly guarded in the plan?
- [x] **Role Permissions**: Are the RBAC rules (`admin`, `manager`, `staff`, `customer`) consistently applied across the backend and frontend plans?
- [x] **Data Integrity**: Does the data model support the required order and inventory workflows?

### 2. UX and Business Logic
- [x] **Product Discovery**: Is the search/filter/sort flow complete and intuitive?
- [x] **Checkout Flow**: Is the demo checkout end-to-end flow logical?
- [x] **Staff Operations**: Does the staff portal cover all necessary management tasks (products, inventory, orders, users)?
- [x] **Brand Alignment**: Does the design system reflect the "premium/minimal" and "tech-focused" direction?
- [x] **Vietnamese UI**: Is the route naming and UI copy plan consistent with Vietnamese retail standards?

### 3. Technical Constraints
- [x] **JS-Only**: No TypeScript or `.ts`/`.tsx` files planned?
- [x] **No 9router**: Next.js App Router used exclusively?
- [x] **Asset Preservation**: `data/` and `public/` folders preserved?
- [x] **Image Strategy**: Manifest-based resolution implemented to avoid hotlinking?

## Scope Division

### V1 In-Scope (Locked for Implementation)
- **Public Storefront**:
  - Homepage, Search, Category/Brand listings, Product Detail.
  - Cart and Demo Checkout (COD/Bank Transfer).
  - Customer Auth (Login/Register) and Account pages.
  - Policy and Support pages.
  - Store Locator.
- **Staff Portal**:
  - Protected `/staff` shell and Dashboard.
  - Product, Category, Brand management.
  - Store-aware Inventory management.
  - Order management (Status updates, fulfillment).
  - Customer view.
  - Banner/Promotion management.
  - RBAC and Audit Logs.
  - Admin-only User management.
- **Foundation**:
  - Next.js App Router + Tailwind CSS.
  - Product seed integration from JSON.
  - Local persistence (SQLite/Prisma) for operational data.
  - Basic QA and Deployment guide.

### Future / V1.1 (Out of Scope)
- Real payment gateway integration.
- Real installment/trade-in pricing engines.
- Real shipping provider API integration.
- Real SMS/Email OTP for auth.
- Loyalty program and advanced analytics.
- PWA offline mode.
- Advanced reporting/analytics in staff portal.

## Review Findings
*(To be filled during the review process)*
- **Issue 1**: [Description] -> **Resolution**: [Action]
- **Issue 2**: [Description] -> **Resolution**: [Action]

## Final Verdict
- [x] **Approved**: Plan is solid and ready for Scope Lock.
- [ ] **Needs Revision**: Specific areas require updates before locking.
