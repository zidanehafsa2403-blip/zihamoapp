# ZIHAMO Shop — Standalone App Export

Myntra-style corporate-gifting shopping app (React + FastAPI + MongoDB). No login;
guest checkout with delivery details. Extracted from the ZIHAMO website project so it
can live as its own Emergent project.

## What's inside
```
frontend/
  src/App.js                 -> BrowserRouter + ShopApp (shop is the root route "/")
  src/shop/                  -> ShopApp, Splash, ShopHome, ProductPage, CartPage,
                                CheckoutPage, SuccessPage, ShopHeader, CartBar
  src/store/shopCart.js      -> zustand cart (persisted to localStorage)
  src/data/products.js       -> 96 products, 10 categories, PRICES map (placeholder INR, edit freely)
  src/index.css              -> fonts (Cormorant Garamond + Manrope), palette, helpers
  public/zihamo-logo.png     -> brand logo
  public/products/*.jpg      -> 96 real product photos, named by SKU (e.g. bot101.jpg)
backend/
  server.py                  -> FastAPI: POST /api/orders, GET /api/orders (MongoDB)
```

## Setup in a fresh Emergent project (React + FastAPI + MongoDB template)
1. Copy `frontend/src/*` over the template's `src/` (replace App.js and index.css).
2. Copy `frontend/public/*` into the template's `public/`.
3. Replace `backend/server.py` with the one here.
4. Install frontend deps: `yarn add framer-motion zustand canvas-confetti react-router-dom sonner lucide-react`
   (template usually already has react-router-dom, sonner, lucide-react and Tailwind).
5. Backend uses existing template deps (fastapi, motor, pydantic[email], python-dotenv). Ensure
   `pydantic[email]` / `email-validator` is installed for EmailStr.
6. `.env` files: keep the template's `REACT_APP_BACKEND_URL`, `MONGO_URL`, `DB_NAME` untouched.
   Frontend calls `${REACT_APP_BACKEND_URL}/api/orders` (see CheckoutPage.jsx).

## Routes
- `/` shop home (splash plays once per session), `/p/:id` product, `/cart`, `/checkout`, `/success`

## API
- `POST /api/orders` — body: {name, phone, email, company, gstin?, address, city, pincode, items[], subtotal, total};
  returns order with `order_no` (ZHxxxxxx). 400 if items empty.
- `GET /api/orders` — list all orders, newest first.

## Notes
- Prices are placeholders in `PRICES` (keyed by SKU) in `src/data/products.js` — edit there.
- Contact/company details live in the `COMPANY` object in `src/data/products.js`.
- All interactive elements carry `data-testid` attributes for testing.
