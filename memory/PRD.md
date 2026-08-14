# ZIHAMO — Product Requirements Document

## Original Problem Statement
Build a premium web app named **ZIHAMO** to showcase non-medical corporate gifting products to
corporate pharma clients, who can browse the platform and place orders/requests. Categories:
stationery, healthy food, wellness, grooming, audio, and work accessories. Must feel unique & premium.

## User Choices (from clarification)
- Ordering model: **Enquiry / quote request** (cart + submit, no online payment)
- Admin: **None** — catalogue hardcoded on frontend
- Categories: all six
- Design: design expert decided premium look
- Auth: **Guest** enquiry with company-details form (no login)

## Architecture
- **Frontend**: React 19 (CRA + CRACO), Tailwind, framer-motion (scroll reveals, masked hero reveal,
  parallax), Lenis (smooth momentum scroll), react-fast-marquee (editorial ribbon), zustand (cart store),
  sonner (toasts). Single-page editorial layout.
- **Backend**: FastAPI + Motor (MongoDB). Enquiries persisted.
- **Design system**: "Pharmaceutical Precision meets Botanical Warmth" — Cormorant Garamond + Manrope,
  emerald/sand/terracotta palette, sharp edges, grain overlay. See `/app/design_guidelines.json`.

## Personas
- **Pharma procurement / brand manager**: builds a gifting programme, submits an enquiry at scale.
- **Corporate client contact**: browses catalogue, assembles a request list, shares company details.

## Core Requirements (static)
- Kinetic premium hero, six category showcase, product catalogue with category filters,
  add-to-enquiry cart, guest enquiry form (company, contact, email, phone, message), brand ethos + studio story.

## Implemented (2026-08-13)
- Kinetic hero with masked line-by-line reveal + parallax on a bespoke dark editorial image.
- Editorial marquee ribbon; 6-category showcase; numbered 4-chapter manifesto (Ethos).
- Catalogue: 24 products across 6 categories, filter pills, hover "Add to enquiry".
- Slide-out Enquiry cart (zustand) with qty steppers, two-step: review -> company details form.
- Backend `POST /api/enquiries` + `GET /api/enquiries` (MongoDB). Verified end-to-end (record persists).
- Sticky glass navbar (light-on-dark at top, dark when scrolled), footer with contact + CTA.
- Verified: 24 products, 6 categories, 7 filters, 0 broken images (32/32 load), cart + submit flow, no console errors.

## Backlog / Remaining
- P1: Admin dashboard to view/manage enquiries and edit catalogue.
- P1: Email notification to sales on new enquiry (Resend).
- P2: Product detail pages / quick-view; per-item quantity presets (e.g. 50/100/500).
- P2: Multi-image galleries per product; personalisation/branding upload.

## Next Tasks
- Add sales email notification on enquiry submit.
- Add lightweight admin to review incoming enquiries.

## Update (2026-08-13) — Real catalog integrated
- Extracted the actual ZIHAMO logo from the client PDF (transparent PNG at `/frontend/public/zihamo-logo.png`), used in navbar + footer.
- Replaced sample catalogue with 96 real products across 10 real categories (Stationery, Drinkware, Audio, Tech Accessories, Desk Accessories, Wellness & Fitness, Bags & Luggage, Apparel, Trophies & Awards, Gift Hampers) with real names, SKUs and specs from the PDF.
- Applied real company details: tagline, about, studio address (Iscon Emporio, Satellite, Ahmedabad), `sales@zihamo.in`, `www.zihamo.in`, and ONLY the first mobile number (+91 97264 71223) per request.
- Verified: 96 products, 10 categories, 11 filters, 0 broken images (110/110), logo loads, no console errors.

## Update (2026-06) — Real product photos + catalogue search
- Extracted all 96 real product photos per SKU from the client PDF (bbox matching of SKU text → nearest image, watermark/logo images excluded, caption text trimmed). Saved to `/frontend/public/products/{sku}.jpg`.
- `products.js` now derives each product's `sku` and image path from its note; category tiles also use real photos. All Unsplash stock imagery removed.
- Product cards switched to `object-contain` on white tiles so full product shots are visible.
- Added catalogue search box (`data-testid="catalogue-search"`): filters by name, SKU, or note; live item count, empty state, clear button. Works combined with category filter pills.
- Verified via Playwright: SKU search (BOT101→1), name search (parker→1, mug→6), empty state, clear→96, 96 images 0 broken.

## Update (2026-06) — WhatsApp tap-to-chat
- Floating WhatsApp button (`WhatsAppButton.jsx`, `data-testid="whatsapp-button"`), bottom-left, opens wa.me/919726471223 with a pre-filled enquiry message; hover-expanding "Chat with us" label. Verified live.

## Update (2026-06) — "/shop" Myntra-style shopping app
- New route structure (`App.js`): `/` = existing landing (Lenis kept there only), `/shop/*` = app experience (`src/shop/`). "Shop" button added to landing navbar (`nav-shop-link`).
- Fun opening: animated splash (emerald, logo spring + letter stagger, once per session) → shop home.
- Shop home: search + category chips + 2-4 col grid, cards show price/MRP-strikethrough/% off, quick-add "+" with toast, floating cart bar with live count+total.
- Product page `/shop/p/:id`: large image, price block, qty stepper, add-to-cart, "Go to cart", related rail.
- Cart `/shop/cart`: qty steppers, remove, price details (MRP/discount/free delivery/total), persisted via zustand persist (localStorage `zihamo-shop-cart`).
- Checkout `/shop/checkout` (no login): name, phone, email, company, GST (optional), address, city, 6-digit pincode → POST `/api/orders`.
- Success page: canvas-confetti burst, order number (ZHxxxxxx), continue shopping. Cart cleared.
- Placeholder prices: editable `PRICES` map keyed by SKU in `products.js` (96 SKUs).
- Backend: `POST /api/orders` (400 on empty cart), `GET /api/orders`, stored in `orders` collection with order_no.
- Testing agent iteration_1: backend 100%, frontend 100% (splash, browse, filters, search, add, cart persistence, checkout, success, landing regression all pass).

