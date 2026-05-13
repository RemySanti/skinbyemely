# Square API - Quick Reference Guide
## SkinByEmely Website

---

## 🚀 **Get Started in 3 Minutes**

### 1️⃣ Get Your Credentials
Visit: https://developer.squareup.com/apps
- Click your app → **Credentials** tab
- Copy **Sandbox Access Token** (for testing)
- Copy **Application ID**

### 2️⃣ Update Config File
Open: `/config/square.ts`
```typescript
accessToken: 'paste_token_here',
applicationId: 'paste_id_here',
```

### 3️⃣ Test It
Visit: `/square-setup` on your website
Check for green "Connected" status ✅

---

## 📍 **Your Square Details**

| Item | Value |
|------|-------|
| **Location ID** | `LMVSQK9C6PR4T` |
| **Address** | 1111 Oakfield Dr Suite 115 G, Brandon, FL 33511 |
| **Environment** | Start with `sandbox`, switch to `production` when ready |

---

## 🔑 **Where to Find Things**

### Square Developer Dashboard
https://developer.squareup.com/apps
- **Credentials Tab** → Access Token, Application ID
- **Sandbox Tab** → Test data

### Square Business Dashboard  
https://squareup.com/dashboard
- **Appointments** → View bookings
- **Items** → Manage products
- **Customers** → Client database
- **Sales** → Transaction history

---

## 📦 **Files You Need to Know**

| File | Purpose | Action Required |
|------|---------|----------------|
| `/config/square.ts` | API credentials | ✏️ **Add your tokens** |
| `/services/squareService.ts` | API logic | ✅ Ready to use |
| `/components/SquareBooking.tsx` | Booking widget | ✅ Ready to use |
| `/components/SquareProductCard.tsx` | Product display | ✅ Ready to use |
| `/pages/SquareSetup.tsx` | Setup guide | 👀 Visit `/square-setup` |

---

## 🧪 **Testing Checklist**

### Sandbox Testing (Before Going Live)
- [ ] Visit `/square-setup` - check status is green
- [ ] Visit `/services` - try booking appointment
- [ ] Check Square Dashboard - see test booking
- [ ] Visit `/products` - verify products load
- [ ] Complete test purchase flow

### Production Switch (When Ready)
- [ ] Change token to **Production Access Token**
- [ ] Change `environment: 'production'` in config
- [ ] Test with real booking (yourself)
- [ ] Verify email confirmation arrives
- [ ] Check Square Dashboard shows real booking
- [ ] Announce to clients 🎉

---

## 🎯 **What You Can Do Now**

### ✅ **Implemented & Ready**
- Display products from Square catalog
- Show real-time appointment availability
- Create bookings directly in Square
- Manage customer profiles
- Process payments
- Mock data for testing without API

### 🔄 **Next Steps to Add**
- Shopping cart for products
- Full checkout flow
- Payment confirmation page
- Customer account area
- Loyalty rewards

---

## 🆘 **Common Issues & Fixes**

| Problem | Solution |
|---------|----------|
| "Square API not configured" | Add real tokens to `/config/square.ts` |
| Products not showing | Add items to Square Item Library first |
| Bookings not in Square | Check you're using correct environment (sandbox vs production) |
| API errors | Verify tokens are correct, check console for details |
| Can't find tokens | Visit https://developer.squareup.com/apps → Credentials |

---

## 📱 **Quick Links**

- **Setup Guide**: Visit `/square-setup` on your website
- **Square Developer**: https://developer.squareup.com/apps
- **Square Dashboard**: https://squareup.com/dashboard
- **API Docs**: https://developer.squareup.com/docs
- **Support Forum**: https://developer.squareup.com/forums

---

## 💡 **Pro Tips**

1. **Always start with Sandbox** - Test everything before going live
2. **Monitor your Square Dashboard** - Check bookings sync correctly
3. **Keep tokens secure** - Never share or commit to version control
4. **Use environment variables** - For production sites (see main README)
5. **Test on mobile** - Ensure booking flow works on phones

---

## 🎨 **Using the Components**

### Quick Example: Add Booking to Any Page

```tsx
import { SquareBooking } from '../components/SquareBooking';

function MyPage() {
  return (
    <SquareBooking 
      serviceName="Custom Luxury Facial"
      serviceDuration={90}
    />
  );
}
```

### Quick Example: Display Products

```tsx
import { useEffect, useState } from 'react';
import { catalogService } from '../services/squareService';
import { SquareProductCard } from '../components/SquareProductCard';

function MyProducts() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    catalogService.getProducts().then(setProducts);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map(p => (
        <SquareProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
```

---

## ✨ **You're All Set!**

Everything is ready to go. Just add your API credentials and start testing!

**Need help?** Visit `/square-setup` for detailed walkthrough.

---

*SkinByEmely - Brandon, Florida*
*Clinical Luxury Skincare*