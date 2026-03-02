# Mercado Libro

E-commerce book marketplace built with Next.js (Pages Router).

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run lint` — ESLint

## Tech Stack

- Next.js 13 (Pages Router), React 18, JavaScript (no TypeScript)
- Tailwind CSS + CSS Modules (`styles/*.module.css`, `components/ui/*.module.css`)
- react-hook-form for forms, SweetAlert2 for alerts, react-icons

## Architecture

```
pages/             → Routes (Pages Router, not App Router)
  admin/           → Admin panel (books, coupons, sales)
  api/             → API routes
  books/           → Book listing/details
  categories/      → Category browsing
components/        → React components
  layout/          → Navbar, Footer, Layout wrapper
  book-details/    → Book detail sub-components
  ui/              → Button, Loader, Modal
context/           → AppContext.jsx (React Context for global state)
utils/             → Service layer (one file per GraphQL operation)
config.js          → GraphQL endpoint URL
```

## Data Layer

- **GraphQL backend** hosted on Railway (`config.js` → `ENDPOINT`)
- `utils/fetchSetter.js` — shared GraphQL client using `fetch` POST to `ENDPOINT`
- Each `utils/*.js` file is a single operation: `getBooks`, `setBook`, `setBookToCart`, `startPayment`, etc.
- Naming: `get*` for queries, `set*` for mutations, `remove*` for deletions

## Auth

- Google OAuth via `@react-oauth/google` (see `components/Google.jsx`)
- JWT decoded client-side with `jwt-decode`, stored in `localStorage`
- `components/ProtectedRoute.jsx` guards authenticated pages

## Payments

- MercadoPago integration via `utils/startPayment.js`
- Checkout flow in `pages/checkout/`

## Images

Allowed domains in `next.config.js`: `s3.amazonaws.com`, `m.media-amazon.com`, `cdn.pixabay.com`, `i.ibb.co`

## State Management

Single React Context (`context/AppContext.jsx`) provided in `pages/_app.js`. No Redux or external state library.
