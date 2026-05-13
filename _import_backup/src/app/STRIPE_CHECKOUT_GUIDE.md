# Stripe Checkout Integration Guide

## Overview

The SkinByEmely website now features a complete Stripe-based e-commerce solution with:
- ✅ Direct Stripe product integration
- ✅ Shopping cart with localStorage persistence
- ✅ Full checkout flow with Stripe Payment Element
- ✅ Cart badge in navigation
- ✅ Toast notifications for user feedback

## Architecture

```
Frontend (React)
├── Products Page → Fetches products from backend
├── Cart Service → Manages cart in localStorage
├── Cart Page → View & manage cart items
└── Stripe Checkout → Process payments via Stripe

Backend (Supabase Edge Function)
├── /stripe-products → Get cached products
├── /stripe-products-refresh → Refresh product cache from Stripe
└── /stripe-create-payment-intent → Create payment for checkout
```

## Key Files

### Services
- `/services/stripeService.ts` - Stripe API communication
- `/services/cartService.ts` - Shopping cart management

### Components
- `/components/StripeCheckout.tsx` - Checkout modal with Stripe Payment Element
- `/components/Layout.tsx` - Navigation with cart badge

### Pages
- `/pages/Products.tsx` - Product catalog
- `/pages/Cart.tsx` - Shopping cart

### Backend
- `/supabase/functions/server/index.tsx` - Stripe endpoints

## How It Works

### 1. Product Display

Products are fetched from the backend which caches them from Stripe:

```typescript
// Backend caches products from Stripe
GET /stripe-products-refresh
↓
Stripe API → Backend KV Store → Frontend

// Frontend fetches cached products
GET /stripe-products
↓
Display products on /products page
```

### 2. Adding to Cart

When a user clicks "Add to Cart":

```typescript
cartService.addToCart({
  id: product.id,
  priceId: product.priceId,
  name: product.name,
  description: product.description,
  image: product.images[0],
  price: product.price
}, quantity)
↓
Saved to localStorage as 'stripe_cart'
↓
Cart badge updates in navigation
↓
Toast notification shows success
```

### 3. Viewing Cart

The cart page reads from localStorage:

```typescript
const cart = cartService.getCart()
↓
{
  items: CartItem[],
  total: number,
  itemCount: number
}
↓
Displays items with quantity controls
```

### 4. Checkout Process

When user clicks "Proceed to Checkout":

```typescript
1. StripeCheckout component opens
2. Reads cart from cartService
3. Calls backend: POST /stripe-create-payment-intent
   - Sends cart items
   - Backend creates Stripe PaymentIntent
   - Returns clientSecret
4. Stripe Elements loads Payment Element
5. User enters payment details
6. Click "Complete Order"
7. stripe.confirmPayment() processes payment
8. On success:
   - Cart is cleared
   - Success toast shown
   - Checkout modal closes
```

## Setup Instructions

### 1. Add Products to Stripe

Use the Stripe Dashboard or Migration Tool:
- Go to `/stripe-migration`
- Upload products from Square or manually
- Products are created in Stripe with prices

### 2. Refresh Product Cache

After adding products in Stripe:
- Go to `/owner-dashboard`
- Click "Refresh Product Cache"
- This fetches all products from Stripe and caches them

### 3. Products Will Appear

Once cached, products automatically appear on:
- `/products` page
- Customers can browse and shop

## Testing

### Test the Full Flow

1. **View Products**: Visit `/products`
   - Products should load from Stripe
   - Each product shows image, name, description, price

2. **Add to Cart**: Click "+" button or "Buy Now"
   - Toast notification appears
   - Cart badge updates (top right)

3. **View Cart**: Click cart icon or visit `/cart`
   - See all items
   - Update quantities with +/- buttons
   - Remove items with trash icon

4. **Checkout**: Click "Proceed to Checkout"
   - Checkout modal opens
   - Order summary shows all items
   - Stripe payment form loads
   - Enter test card: `4242 4242 4242 4242`
   - Any future date, any CVC

5. **Complete Order**: Submit payment
   - Payment processes
   - Success toast appears
   - Cart is cleared
   - Modal closes

## Cart Service API

### Get Cart
```typescript
const cart = cartService.getCart();
// Returns: { items: CartItem[], total: number, itemCount: number }
```

### Add Item
```typescript
cartService.addToCart({
  id: 'prod_123',
  priceId: 'price_123',
  name: 'Product Name',
  description: 'Description',
  image: 'https://...',
  price: 29.99
}, quantity);
```

### Update Quantity
```typescript
cartService.updateQuantity(itemId, newQuantity);
```

### Remove Item
```typescript
cartService.removeItem(itemId);
```

### Clear Cart
```typescript
cartService.clearCart();
```

### Get Item Count
```typescript
const count = cartService.getItemCount();
```

## Stripe Service API

### Get Products
```typescript
const products = await stripeService.getProducts();
// Returns cached products from backend
```

### Refresh Cache
```typescript
const result = await stripeService.refreshProductCache();
// Fetches latest products from Stripe and updates cache
```

### Create Payment Intent
```typescript
const { clientSecret } = await stripeService.createPaymentIntent([
  { price: 29.99, quantity: 2 },
  { price: 49.99, quantity: 1 }
]);
// Creates Stripe PaymentIntent for checkout
```

## Environment Variables

The following secrets are already configured in Supabase:
- `STRIPE_SECRET_KEY` - Live Stripe secret key

The frontend uses the hardcoded live publishable key:
```typescript
pk_live_51Se5i1Bsgl91aCgif55G7Rajo4jtlgoILzOe9tpUPUcwxdPf8qjJFhlgnUVOCMACmMPcfNxWZ8eSK4w3QIUAzw6RTbp77rz8PCouITNuIVPNVx61xuAQ1aB6iHk6gAMnQh803TGQccoCx
```

## Features

### Cart Persistence
- Cart is saved to `localStorage`
- Persists across page refreshes
- Survives browser restarts

### Real-time Updates
- Cart badge updates instantly
- Cart page shows current state
- Quantity changes reflect immediately

### Error Handling
- Toast notifications for errors
- Proper error messages in checkout
- Retry mechanisms for failed requests

### Enhanced UX
- Loading states throughout
- Disabled buttons during actions
- Success/error feedback
- Smooth transitions and animations

## Troubleshooting

### Products Not Loading
1. Check if products exist in Stripe Dashboard
2. Refresh product cache: `/owner-dashboard` → "Refresh Product Cache"
3. Check browser console for errors
4. Verify backend is responding: `/stripe-products`

### Cart Not Updating
1. Check browser localStorage for `stripe_cart`
2. Clear localStorage and try again
3. Check browser console for errors

### Checkout Fails
1. Verify Stripe keys match (live with live, test with test)
2. Check network tab for failed requests
3. Ensure STRIPE_SECRET_KEY is set in Supabase secrets
4. Check backend logs for payment intent errors

### Payment Element Not Loading
1. Verify clientSecret is being received
2. Check Stripe publishable key is correct
3. Ensure Payment Element has time to mount (uses `onReady` callback)
4. Check browser console for Stripe errors

## Migration Notes

### From Medusa to Direct Stripe

The previous Medusa.js integration has been replaced with direct Stripe integration for:
- **Simplicity**: No need for separate Medusa backend
- **Performance**: Faster product loading with caching
- **Control**: Direct access to Stripe features
- **Maintenance**: Easier to debug and maintain

Old Medusa files are still present but unused:
- `/services/medusaService.ts`
- `/components/MedusaCheckout.tsx`

## Next Steps

Potential enhancements:
- [ ] Add product variants (sizes, colors)
- [ ] Implement discount codes
- [ ] Add shipping calculation
- [ ] Order history for customers
- [ ] Email receipts
- [ ] Inventory management
- [ ] Product reviews and ratings
- [ ] Wishlist functionality

## Support

For issues or questions:
1. Check browser console for errors
2. Review backend logs in Supabase
3. Test with Stripe test cards
4. Verify all environment variables are set
