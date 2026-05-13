# 🔗 Square Service ID Configuration Guide

## ✅ What's Been Updated

All "Book This Treatment" buttons across your website now deep-link directly to specific services in Square. When clients click a button, they'll skip the service selection page and go straight to booking **that exact treatment**.

---

## 📍 Where to Find Your Square Service IDs

### **Step-by-Step Instructions:**

1. **Go to Square Dashboard**
   - Visit: https://squareup.com/dashboard/appointments/services
   - Or: Dashboard → Appointments → Services

2. **View Your Services List**
   - You'll see all your services (facials, treatments, etc.)

3. **Click on a Service**
   - Click "Edit" or the service name to view details

4. **Find the Service ID**
   - Look in the browser's URL bar
   - The URL will look like: `https://squareup.com/dashboard/.../services/[SERVICE_ID]`
   - Copy the **SERVICE_ID** part

**Example URL:**
```
https://squareup.com/dashboard/appointments/services/ABCD1234EFGH5678
                                                      ↑
                                            This is your Service ID
```

---

## 🔧 Where to Add Your Service IDs

You need to update **THREE files** with your actual Square Service IDs:

### **1. /pages/Services.tsx**
Look for lines 15-60 (the `treatments` array):

```typescript
{
  title: "Custom Luxury Facial",
  squareServiceId: "YOUR_CUSTOM_LUXURY_FACIAL_SERVICE_ID" // ← Replace this
}
```

Replace with:
```typescript
{
  title: "Custom Luxury Facial",
  squareServiceId: "ABCD1234EFGH5678" // ← Your actual Square Service ID
}
```

### **2. /pages/ServicesBrandon.tsx**
Same structure, lines 5-30

### **3. /pages/ServicesTampa.tsx**
Same structure, lines 5-30

---

## 📋 Service ID Mapping

**Match your Square service names to your website treatments:**

| **Website Treatment Name** | **Square Service Name** | **Service ID** |
|----------------------------|-------------------------|----------------|
| Custom Luxury Facial       | (Your Square name)      | `____________` |
| Age-Defying Facial         | (Your Square name)      | `____________` |
| Clarity Restoration Facial | (Your Square name)      | `____________` |
| Hydration Infusion Facial  | (Your Square name)      | `____________` |
| Brightening Clarity Facial | (Your Square name)      | `____________` |
| Express Renewal Facial     | (Your Square name)      | `____________` |

**Note:** Your Square service names might be slightly different. Just match them by description or duration.

---

## 🎯 Example Update

**Before:**
```typescript
{
  icon: <Award className="w-6 h-6" />,
  title: "Custom Luxury Facial",
  duration: "90 minutes",
  price: "Custom Pricing",
  description: "A fully customized treatment...",
  squareServiceId: "YOUR_CUSTOM_LUXURY_FACIAL_SERVICE_ID"
}
```

**After:**
```typescript
{
  icon: <Award className="w-6 h-6" />,
  title: "Custom Luxury Facial",
  duration: "90 minutes",
  price: "Custom Pricing",
  description: "A fully customized treatment...",
  squareServiceId: "ABCD1234EFGH5678"
}
```

---

## ✨ How It Works

**Before (Old Behavior):**
1. Client clicks "Book This Treatment"
2. Opens Square booking page → Shows ALL services
3. Client selects the service they want
4. Proceeds to date/time selection

**After (New Behavior):**
1. Client clicks "Book This Treatment"
2. Opens Square booking directly to THAT service
3. Client sees only that service's booking calendar
4. Proceeds straight to date/time selection

**Result:** Faster, more streamlined booking experience!

---

## ⚠️ Important Notes

1. **Service IDs are NOT the same as:**
   - Item IDs (from Square Item Library)
   - Category IDs
   - Location IDs (you already have this: `LMVSQK9C6PR4T`)

2. **If you can't find Service IDs:**
   - Make sure you've created services in Square Appointments (not just Items)
   - Go to: Dashboard → Appointments → Services
   - If no services exist, create them first

3. **Each service needs its own unique ID:**
   - Don't use the same ID for multiple treatments
   - If you have 6 treatments on your website, you need 6 Service IDs from Square

4. **Test after updating:**
   - Click each "Book This Treatment" button
   - Verify it opens directly to that service
   - If it doesn't work, double-check the Service ID

---

## 🆘 Can't Find Service IDs?

### **Alternative Method (API):**

If the URL method doesn't work, you can use the Square API:

1. Go to: https://developer.squareup.com/explorer/square/catalog-api/list-catalog
2. Set **types** to: `ITEM`
3. Click "Run Request"
4. Look for objects with `"type": "APPOINTMENT_SERVICE"`
5. Copy the `"id"` field for each service

---

## 🎉 Benefits of Direct Service Links

✅ **Faster booking** - Fewer clicks for clients  
✅ **Better conversion** - Direct path to appointment  
✅ **Clear intent** - Client already chose the treatment  
✅ **Professional UX** - Seamless, luxury experience  
✅ **Mobile friendly** - Simplified mobile booking flow

---

## 📞 Need Help?

If you're having trouble finding your Service IDs:

1. **Check Square Support:** https://squareup.com/help/us/en/contact
2. **Square Developer Discord:** https://discord.gg/squaredev
3. **Or:** Keep the current setup (buttons go to services list) - it still works perfectly!

---

**Last Updated:** December 12, 2024  
**Status:** ⚠️ Awaiting Service IDs - Buttons will work once you add your actual Square Service IDs
