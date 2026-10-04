# VELORA storefront

Customer-facing ecommerce app (Next.js 16, Tailwind CSS 4, TypeScript).

```bash
npm install
npm run dev
```

## Structure

```
src/
  app/                 # routes (home, shop, product, cart, checkout, account…)
  components/          # layout, product, shop, checkout, account
  context/             # cart, wishlist, mock auth (localStorage)
  lib/
    catalog.ts         # API seam — swap mock for NEXT_PUBLIC_API_URL
    data/              # mock products, collections, journal
    types.ts
```

Cart, wishlist, login, and orders persist in the browser until the backend is connected.
