# Frontend Plan

## Frontend goals
Build polished Vietnamese consumer-tech storefront and separate staff portal with:
- clear navigation
- fast product discovery
- responsive layouts
- real search, filter, sort
- usable cart and checkout demo
- role-aware staff UI

## Public storefront structure

### Public layout
Public shell should include:
- top trust strip
- sticky header
- logo area
- search-first interaction
- category navigation
- city/store selector
- cart shortcut
- login/account shortcut
- responsive mobile menu
- footer with support and policy links

### Homepage
Homepage sections:
- trust strip
- hero banner
- category shortcut grid
- featured products
- phones section
- laptops section
- accessories section
- deals section
- new arrivals
- best sellers
- support/policy cards
- store/support section

### Product listing surfaces
Listing experience should support:
- category browsing
- keyword search
- brand filter
- category filter
- price filter
- stock filter
- discount filter
- warranty filter
- sorting options
- URL query sync where practical
- empty, loading, and error states

### Product card rules
Each product card should show:
- product image from manifest or placeholder
- product name
- current price
- old price if discounted
- discount badge
- short specs summary
- rating
- review count
- stock state
- CTA actions

### Product detail page
Product detail page should include:
- image gallery
- title
- price block
- discount block
- rating summary
- warranty info
- stock/store availability
- key specs
- full specs table
- promotion info box
- installment info box
- trade-in info box
- quantity selector
- add to cart
- buy now
- related products

### Cart and checkout
Cart flow should include:
- cart drawer or page
- quantity update
- remove item
- subtotal and summary
- checkout form
- customer info
- delivery vs store pickup
- COD
- bank transfer placeholder
- order success page

### Customer account
Customer pages:
- login
- register
- forgot-password placeholder
- account overview
- profile
- address book
- order history

### Policy and support pages
Needed pages:
- shipping policy
- return policy
- warranty policy
- payment policy
- installment info
- trade-in info
- store locator
- contact/support

## Staff portal structure

### Staff shell
Staff UI should include:
- separate login page
- protected staff layout
- square logo in sidebar
- role-aware sidebar navigation
- topbar
- quick actions
- logout

### Staff dashboard
Dashboard blocks:
- total products
- total orders
- pending orders
- low stock products
- demo revenue metric
- store inventory summary
- recent orders
- recent audit logs

### Staff modules
Required modules:
- products
- categories
- brands
- inventory
- orders
- customers
- banners/promotions
- staff users
- audit logs
- settings

### Staff UX rules
- operational, not marketing-oriented
- strong table layout
- clear filters
- readable badges
- validation on forms
- role-aware action visibility
- guard rails on destructive actions

## Responsive behavior
Support:
- mobile-first layout
- sticky search/header behavior on mobile
- stacked filter drawer on small screens
- multi-column desktop product grids
- responsive tables with fallback card view
- touch-friendly cart and checkout controls

## State patterns
Use simple React patterns:
- server-rendered catalog pages where practical
- client components for search controls, cart, forms, and staff interactions
- shared loading, empty, and error components
- URL query state for search/filter/sort
- local/session storage acceptable for demo cart if needed

## Accessibility
Minimum accessibility plan:
- keyboard navigation
- visible focus states
- semantic headings
- alt text on images
- labeled forms
- readable color contrast
- status text not color-only

## Frontend implementation order
1. shared layout and design tokens
2. public shell
3. homepage
4. listing/search/filter/sort
5. product detail
6. cart and checkout
7. customer auth/account
8. staff shell and auth
9. staff modules
10. policy/support pages
11. polish and QA