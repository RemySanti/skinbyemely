# Square API Integration Guide
## SkinByEmely Website

---

## 🎯 Overview

Your SkinByEmely website is now **ready for Square API integration**. This will enable:

- ✅ **Embedded Booking System** - Custom appointment calendar matching your luxury design
- ✅ **Product Sales** - Display and sell skincare products directly on your site
- ✅ **Customer Management** - Track client history and preferences
- ✅ **Payment Processing** - Secure checkout with Square
- ✅ **Real-time Availability** - Show open appointment slots automatically
- ✅ **Email Confirmations** - Automated booking confirmations

---

## 📋 Quick Start Checklist

- [ ] Access Square Developer Dashboard
- [ ] Get your Access Token
- [ ] Get your Application ID
- [ ] Verify your Location ID
- [ ] Update `/config/square.ts` file
- [ ] Test in Sandbox mode
- [ ] Switch to Production when ready

---

## 🔧 Setup Instructions

### Step 1: Access Square Developer Dashboard

1. Go to [https://developer.squareup.com/apps](https://developer.squareup.com/apps)
2. Log in with your Square account
3. Create a new application or select your existing "SkinByEmely" app

### Step 2: Get Your Credentials

#### Access Token
- Navigate to **Credentials** tab
- For testing: Copy **Sandbox Access Token**
- For live site: Copy **Production Access Token**

#### Application ID
- Still in **Credentials** tab
- Copy the **Application ID**

#### Location ID
- You already have this: `LMVSQK9C6PR4T`
- This is your Brandon, FL location
- Verify in Square Dashboard → **Locations** if needed

### Step 3: Update Configuration File

Open the file `/config/square.ts` and replace these values:

```typescript
export const SQUARE_CONFIG = {
  // Paste your Access Token here (remove quotes around placeholder)
  accessToken: 'YOUR_SQUARE_ACCESS_TOKEN_HERE',  // ← REPLACE THIS
  
  // Paste your Application ID here
  applicationId: 'YOUR_SQUARE_APPLICATION_ID_HERE',  // ← REPLACE THIS
  
  // Already configured ✓
  locationId: 'LMVSQK9C6PR4T',
  
  // Start with 'sandbox' for testing
  environment: 'sandbox' as 'sandbox' | 'production',  // ← Change to 'production' when ready
};
```

### Step 4: Test Your Integration

**Visit the Setup Page:**
- Navigate to `/square-setup` on your website
- Follow the interactive setup guide
- Check the status banner to confirm configuration

**Test Booking:**
1. Go to `/services` or `/services/brandon`
2. Try booking an appointment
3. Verify availability loads correctly
4. Complete a test booking in Sandbox mode

**Test Products:**
1. Go to `/products`
2. Products should load from Square catalog
3. Test adding items to cart (when implemented)

### Step 5: Go Live

When ready to accept real bookings:

1. **Update Access Token** to Production token
2. **Change environment** to `'production'`
3. **Test thoroughly** with real scenarios
4. **Announce to clients** once confirmed working

---

## 📁 Files Created

### Configuration
- `/config/square.ts` - Square API credentials and settings

### Services
- `/services/squareService.ts` - API interaction layer
  - `SquareCatalogService` - Products and services
  - `SquareBookingsService` - Appointments and availability
  - `SquareCustomersService` - Customer management
  - `SquarePaymentsService` - Payment processing

### Components
- `/components/SquareProductCard.tsx` - Product display with cart
- `/components/SquareBooking.tsx` - Embedded booking widget
- `/components/SquareSetupGuide.tsx` - Interactive setup instructions

### Pages
- `/pages/SquareSetup.tsx` - Setup guide page (`/square-setup`)

---

## 🔐 Security Best Practices

### For Production Sites

**DO NOT hardcode API keys in production!** Instead:

1. Use environment variables:
```typescript
export const SQUARE_CONFIG = {
  accessToken: import.meta.env.VITE_SQUARE_ACCESS_TOKEN,
  applicationId: import.meta.env.VITE_SQUARE_APPLICATION_ID,
  // ... rest of config
};
```

2. Create a `.env` file (add to `.gitignore`):
```
VITE_SQUARE_ACCESS_TOKEN=your_token_here
VITE_SQUARE_APPLICATION_ID=your_app_id_here
```

3. **Never commit `.env` or real credentials to version control**

### Current Setup (Development)

The current configuration file uses placeholders and is safe for development. Once you add real credentials:

- Keep them private
- Don't share your Access Token
- Use Sandbox for testing
- Monitor your Square Dashboard for suspicious activity

---

## 🎨 How to Use Components

### Display Products from Square

```tsx
import { useEffect, useState } from 'react';
import { catalogService } from '../services/squareService';
import { SquareProductCard } from '../components/SquareProductCard';

function MyProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    catalogService.getProducts().then(setProducts);
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {products.map(product => (
        <SquareProductCard 
          key={product.id} 
          product={product}
          onAddToCart={(p) => console.log('Added:', p)}
        />
      ))}
    </div>
  );
}
```

### Embedded Booking Widget

```tsx
import { SquareBooking } from '../components/SquareBooking';

function MyBookingPage() {
  return (
    <SquareBooking
      serviceName="Custom Luxury Facial"
      serviceDuration={90}
      onBookingComplete={(id) => console.log('Booked:', id)}
    />
  );
}
```

---

## 🧪 Testing Scenarios

### Sandbox Testing

Before going live, test these scenarios in Sandbox mode:

- [ ] Load products from catalog
- [ ] Check appointment availability
- [ ] Create a test booking
- [ ] Cancel a booking
- [ ] Process a test payment
- [ ] Verify email confirmations send

### Production Testing

Before announcing to clients:

- [ ] Book a real appointment for yourself
- [ ] Verify it appears in Square Dashboard
- [ ] Check confirmation email arrives
- [ ] Test payment processing with small amount
- [ ] Verify customer data syncs correctly

---

## 📊 Square Dashboard Usage

### View Bookings
1. Log in to [squareup.com](https://squareup.com)
2. Go to **Appointments** → **Calendar**
3. See all bookings created through your website

### Manage Products
1. Go to **Items** → **Item Library**
2. Add/edit products
3. Changes sync automatically to your website

### Track Payments
1. Go to **Sales** → **Transactions**
2. View all online sales
3. Export for accounting

### Customer Data
1. Go to **Customers** → **Directory**
2. View customer profiles
3. See purchase history and notes

---

## 🚀 Feature Roadmap

### Currently Implemented ✅
- Configuration infrastructure
- Product catalog display
- Booking availability search
- Customer creation
- Payment processing foundation

### Coming Soon 🔄
- Shopping cart functionality
- Customer loyalty programs
- Gift card sales
- Package deals (e.g., "5 facials for $400")
- Email marketing integration

### Future Enhancements 💡
- SMS reminders for appointments
- Membership subscriptions
- Custom product bundles
- Advanced analytics dashboard
- Social proof (reviews/testimonials)

---

## 💳 Web Payments SDK

We use the `react-square-web-payments-sdk` to handle secure credit card processing.

### Installation

If you haven't already, install the package:

```bash
npm install react-square-web-payments-sdk
```

### Usage

Use the `SquarePaymentForm` component to accept payments:

```tsx
import { SquarePaymentForm } from './components/SquarePaymentForm';

// In your checkout page
<SquarePaymentForm 
  amount={150.00} 
  onPaymentComplete={(result) => {
    // Handle successful payment
    // e.g. Redirect to success page, clear cart, etc.
  }}
/>
```

The component automatically handles:
- Token generation
- Secure transmission to Square
- Backend payment creation via `paymentsService`
- Error handling and user feedback

---

## 🆘 Troubleshooting

### "Square API not configured" message

**Problem:** Placeholder values still in config file

**Solution:** Replace `YOUR_SQUARE_ACCESS_TOKEN_HERE` and `YOUR_SQUARE_APPLICATION_ID_HERE` with real values from Square Developer Dashboard

### Products not loading

**Problem:** Catalog might be empty or API error

**Solutions:**
- Check you have products in Square Item Library
- Verify Access Token is correct
- Check browser console for error messages
- Confirm you're using correct environment (sandbox vs production)

### Bookings not appearing in Square

**Problem:** Using Sandbox credentials with Production Square account

**Solution:** Match your credentials to environment:
- Sandbox token → View in Sandbox Dashboard
- Production token → View in Production Dashboard

### API errors

**Common causes:**
- Expired Access Token → Generate new one
- Wrong Location ID → Verify in Square Dashboard
- Network issues → Check internet connection
- Rate limiting → Space out API calls

---

## 📞 Support Resources

### Square Documentation
- [API Reference](https://developer.squareup.com/reference/square)
- [Appointments API](https://developer.squareup.com/docs/appointments-api/what-it-does)
- [Catalog API](https://developer.squareup.com/docs/catalog-api/what-it-does)
- [Payments API](https://developer.squareup.com/docs/payments-api/overview)

### Square Support
- Developer Forums: [developer.squareup.com/forums](https://developer.squareup.com/forums)
- Email: developers@squareup.com
- Phone: Check Square Dashboard for support number

### Website Support
- Visit `/square-setup` page for interactive guide
- Check browser console for detailed error messages
- Review `/services/squareService.ts` for API logic

---

## ✨ Next Steps

1. **Access** `/square-setup` page on your website
2. **Follow** the interactive setup guide
3. **Test** with Sandbox credentials
4. **Verify** bookings appear in Square Dashboard
5. **Switch** to Production when ready
6. **Announce** to your clients!

---

## 🎉 You're Ready!

Your website infrastructure is fully prepared for Square integration. Once you add your API credentials, you'll have a complete booking and e-commerce system that matches your clinical-luxury brand aesthetic.

**Questions?** Visit the `/square-setup` page for detailed, step-by-step guidance.

---

*Last Updated: December 2024*
*SkinByEmely - Clinical Luxury Skincare | Brandon, Florida*
