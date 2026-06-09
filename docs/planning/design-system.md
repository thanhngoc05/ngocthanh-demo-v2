# Design System Plan

## Brand direction
Visual direction for NgocThanh:
- bright
- modern
- clean
- tech-focused
- masculine
- trustworthy
- not noisy
- not pastel-soft

## Logo usage

### `public/assets/brand/logo-horizontal.png`
Use for:
- public site header
- footer
- customer auth pages
- brand sections where horizontal layout fits

### `public/assets/brand/logo-icon.png`
Use for:
- favicon
- browser tab icon
- app icon / PWA icon
- mobile icon
- collapsed staff sidebar icon

## Color system
Base palette direction:
- teal/cyan for freshness and trust
- electric blue / royal blue for strong tech identity
- orange accent for offers and CTA highlights
- white / off-white backgrounds
- subtle neutral borders
- subtle shadows

## Suggested token palette
Working tokens for implementation:
- `brand.primary`: teal/cyan
- `brand.secondary`: royal/electric blue
- `brand.accent`: orange
- `surface.base`: white
- `surface.muted`: off-white / light gray
- `border.base`: soft neutral gray
- `text.primary`: dark slate / near-black
- `text.secondary`: muted gray
- `success`: green
- `warning`: amber/orange
- `danger`: red

## Typography
Style goals:
- easy to read
- strong pricing emphasis
- compact but not cramped
- modern retail UI feel

Guidelines:
- bold headings for retail sections
- medium-weight product names
- strong numeric styling for prices
- secondary gray metadata for ratings, reviews, stock, warranty
- Vietnamese copy should remain clear and not overly decorative

## Spacing
Spacing rules:
- generous outer page spacing on desktop
- compact card spacing on mobile
- consistent gaps between product cards and filter groups
- strong section spacing on homepage for scannability

Suggested spacing rhythm:
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- 2xl: 32px
- 3xl: 48px

## Layout rules
- mobile-first responsive grid
- max-width container for desktop readability
- sticky public header
- clear filter area on listing pages
- fixed or sticky summary for checkout when space allows
- staff layout optimized for table workflows

## Product card rules
Product cards must show:
- consistent image box ratio
- product name clamp for uniform height
- current price prominent
- old price muted with strike-through when discounted
- discount badge visible but not overwhelming
- short specs summary
- rating and review count
- stock state
- strong CTA button

Behavior:
- hover elevation on desktop
- clear tap target on mobile
- no image stretching
- fallback placeholder if product image missing

## Button rules
Button classes should follow clear hierarchy:
- primary: strong brand action
- secondary: supporting action
- outline: neutral action
- danger: destructive action
- ghost/text: low-emphasis inline action

Interaction rules:
- visible hover state
- visible focus state
- disabled state clearly different
- loading state for mutations

## Badge rules
Badge use cases:
- discount percent
- featured
- in stock
- low stock
- out of stock
- order status
- role labels

Rules:
- high contrast
- small and readable
- color not sole meaning indicator when status critical

## Price display rules
- current price large and bold
- original price smaller, muted, strikethrough
- discount percent visible nearby
- VND formatting consistent
- avoid clutter with too many price labels

## Form rules
Public and staff forms should use:
- clear labels
- helper text where needed
- inline validation feedback
- accessible focus states
- required field indication
- clean field grouping

Examples:
- checkout contact section
- address section
- store pickup selection
- staff product edit form
- staff inventory update form

## Table rules
Staff tables should support:
- sticky headers where useful
- readable row density
- status badges
- action column
- filters above table
- mobile fallback cards for smaller screens

## Navigation rules

### Public navigation
- search-first
- category shortcuts visible
- cart and account quick access
- trust signals near top
- no staff/admin links

### Staff navigation
- role-aware sidebar
- dashboard first
- grouped operations
- logout always visible
- square brand icon works in collapsed state

## Empty, loading, and error states
Need shared styles for:
- no search results
- no orders
- no products in section
- loading cards/skeletons
- form submit errors
- protected access messages

Tone:
- clear
- helpful
- concise
- Vietnamese-first UI copy

## Shadow and border rules
- light card shadow
- stronger shadow only for modals/dropdowns
- rounded corners modern but not overly soft
- borders subtle and consistent
- avoid heavy visual clutter

## Imagery rules
- use local product images only
- use manifest mapping by SKU
- use placeholder when missing
- maintain consistent gallery presentation
- do not hotlink external images

## Accessibility rules
- keyboard focus visible
- image alt text required
- sufficient color contrast
- labels on all fields
- status not communicated by color alone
- icon buttons need accessible names

## Implementation notes
Tailwind implementation should define:
- reusable utility patterns or components
- consistent section container rules
- reusable button/card/badge/input/table styles
- metadata setup for favicon using logo icon