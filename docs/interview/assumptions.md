# Assumptions

- Brand visible name: NgocThanh
- Public style: premium/minimal
- UI language: Vietnamese
- `logo-horizontal.png` used in header, footer, and auth pages
- `logo-icon.png` used as favicon and staff sidebar icon

## Commerce assumptions
- Checkout creates demo orders end-to-end
- Payment methods: COD + bank transfer placeholder
- Installment is informational only
- Trade-in is informational only
- Prices use national pricing, not per-store pricing

## Store assumptions
- Demo stores exist in 3 cities
- Cities: TP. Hồ Chí Minh, Hà Nội, Đà Nẵng
- Staff only manages assigned store data
- Manager can edit prices with limits
- Staff can manage stock and orders only, not core product content

## Deployment assumptions
- Preferred deployment target: Vercel
- Staff portal route: `/staff`
- Domain ownership and DNS access are not assumed unless confirmed

## Fallback behavior
- If user does not answer later questions, these assumptions remain active
- Any future change request overrides these assumptions only after explicit approval