# Medusa.js E-commerce Integration

This application now uses **Medusa.js** as the headless e-commerce platform, with Stripe as the payment processor.

## Overview

The shop has been fully migrated to Medusa.js, providing:
- ✅ Product catalog management via Medusa Admin
- ✅ Shopping cart functionality
- ✅ Stripe payment integration
- ✅ Order management
- ✅ Inventory tracking

## Setup Instructions

### 1. Set Up Medusa Backend

You need a Medusa backend server running. Choose one of these options:

#### Option A: Local Development
```bash
npx create-medusa-app@latest
cd my-medusa-store
medusa develop
```

#### Option B: Deploy to Railway/Heroku
Follow the official Medusa deployment guides:
- https://docs.medusajs.com/deployments/server/deploying-on-railway
- https://docs.medusajs.com/deployments/server/deploying-on-heroku

#### Option C: Medusa Cloud (Recommended for Production)
Sign up for Medusa Cloud at https://medusajs.com/cloud/

### 2. Configure Stripe in Medusa

In your Medusa backend, ensure Stripe is configured:

1. Install the Stripe plugin (if not already included):
```bash
yarn add @medusajs/medusa-payment-stripe
```

2. Add to `medusa-config.js`:
```javascript
plugins: [
  {
    resolve: `@medusajs/medusa-payment-stripe`,
    options: {
      api_key: process.env.STRIPE_SECRET_KEY,
    },
  },
]
```

3. Set your Stripe secret key in `.env`:
```
STRIPE_SECRET_KEY=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
```

### 3. Configure Frontend

Update `/config/medusa.ts` with your Medusa backend URL:

```typescript
export const MEDUSA_BACKEND_URL = 'https://your-medusa-backend.com';
```

For local development:
```typescript
export const MEDUSA_BACKEND_URL = 'http://localhost:9000';
```

### 4. Add Products in Medusa Admin

1. Access your Medusa Admin Dashboard (usually at `http://localhost:7001` or your deployed admin URL)
2. Create products with:
   - Product name
   - Description
   - Images
   - Variants (at least one, even if it's just "Default")
   - Pricing

### 5. Test the Integration

1. Visit the `/products` page
2. Products should load from your Medusa backend
3. Add items to cart
4. Proceed to checkout
5. Complete payment with Stripe

## Architecture

```
┌─────────────────┐
│   React Frontend │
│   (This App)     │
└────────┬─────────┘
         │
         │ Medusa.js Client
         ▼
┌─────────────────┐
│  Medusa Backend  │
│   (Headless API) │
└────────┬─────────┘
         │
         ├──► Stripe (Payment Processing)
         ├──► PostgreSQL (Product Data)
         └──► Redis (Caching)
```

## Files Modified/Created

### New Files:
- `/services/medusaService.ts` - Medusa API client
- `/components/MedusaCheckout.tsx` - Checkout component
- `/pages/Cart.tsx` - Shopping cart page
- `/config/medusa.ts` - Medusa configuration

### Modified Files:
- `/pages/Products.tsx` - Now fetches from Medusa
- `/components/Layout.tsx` - Added cart icon with badge
- `/App.tsx` - Added cart route

## Features

### Products Page (`/products`)
- Displays all active products from Medusa
- "Add to Cart" button
- "Buy Now" button (adds to cart and opens checkout)
- Responsive product grid

### Cart Page (`/cart`)
- View all cart items
- Update quantities
- Remove items
- See order totals
- Proceed to checkout

### Checkout
- Integrated Stripe payment form
- Order summary
- Secure payment processing
- Order completion in Medusa

## Environment Variables

No additional environment variables needed in the frontend. The Medusa backend URL is configured in `/config/medusa.ts`.

## Troubleshooting

### Products not loading
- Ensure Medusa backend is running
- Check that `MEDUSA_BACKEND_URL` is correct
- Verify products are published in Medusa Admin

### Checkout fails
- Confirm Stripe is configured in Medusa backend
- Verify Stripe keys match (live/test)
- Check browser console for errors

### CORS errors
- Ensure Medusa backend has CORS enabled for your frontend domain
- Update `medusa-config.js`:
```javascript
projectConfig: {
  store_cors: "http://localhost:5173,https://your-domain.com",
}
```

## Migration from Stripe-only

The previous Stripe-only integration has been replaced. If you need to migrate existing products:

1. Export products from Stripe
2. Import them into Medusa via Admin or API
3. Products will now be managed entirely in Medusa

## Next Steps

- [ ] Set up shipping options in Medusa
- [ ] Configure tax calculations
- [ ] Add product variants (sizes, colors, etc.)
- [ ] Implement customer accounts
- [ ] Add order tracking

## Support

- Medusa Documentation: https://docs.medusajs.com
- Medusa Discord: https://discord.gg/medusajs
- Stripe Documentation: https://stripe.com/docs
