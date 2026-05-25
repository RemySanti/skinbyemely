# Square Product Catalog Guide

## How to View Your Products

I've created several ways for you to view the products available in your Square catalog:

### Option 1: View in Browser (Recommended)
Navigate to: **`/product-catalog`**

This will show you a beautiful visual display of all your products with:
- Product names and descriptions
- Pricing information
- Product IDs and Variation IDs (for use in your code)
- Category information
- Images (if available)
- Usage instructions

### Option 2: Quick Console List

Here's a summary of the **mock products** that are currently configured in your system (these appear when Square API is not available or as fallback):

#### Mock Products Available:

1. **Clinical Gentle Cleanser**
   - Price: $45.00
   - Category: Cleanser
   - Description: pH-balanced formula removing impurities while preserving barrier integrity

2. **Vitamin C + E Serum**
   - Price: $85.00
   - Category: Serum
   - Description: Clinical-grade antioxidants for brightening and environmental protection

3. **Hyaluronic Complex**
   - Price: $68.00
   - Category: Moisturizer
   - Description: Multi-weight hyaluronic acid for deep hydration and plumping

4. **Retinol Treatment**
   - Price: $95.00
   - Category: Treatment
   - Description: Advanced retinol protocol for cellular renewal and line reduction

5. **SPF 50 Mineral Shield**
   - Price: $52.00
   - Category: Protection
   - Description: Broad spectrum mineral protection with invisible finish

6. **Exfoliating Treatment Mask**
   - Price: $72.00
   - Category: Mask
   - Description: Weekly enzyme treatment refining texture and clarity

---

## Fetching Real Products from Square

Your Square API is configured with:
- **Access Token**: Configured ✓
- **Location ID**: LMVSQK9C6PR4T (Brandon)
- **Environment**: Production

### To fetch your actual Square products:

1. **Navigate to the Product Catalog page**: `/product-catalog`
   - This will automatically fetch from your Square account
   - Shows real products if they exist in your Square catalog
   - Falls back to mock products if none are found

2. **Use the API directly in your code**:
   ```typescript
   import { catalogService } from './services/squareService';
   
   // Fetch all products
   const products = await catalogService.getProducts();
   
   // Each product contains:
   // - id: Unique product ID
   // - name: Product name
   // - description: Product description
   // - price: Price in dollars
   // - squareItemId: Use this for Square checkout
   // - variations: Different sizes/options
   ```

3. **Using products in components**:
   ```tsx
   import { SquareProductCard } from './components/SquareProductCard';
   
   // Display a specific product
   <SquareProductCard productId="YOUR_PRODUCT_ID_HERE" />
   ```

---

## Adding Products to Your Square Account

If you don't have products in Square yet:

1. Log into your **Square Dashboard** at https://squareup.com/dashboard
2. Go to **Items & Orders** → **Items**
3. Click **Create Item**
4. Fill in:
   - Item name (e.g., "Vitamin C Serum")
   - Category (e.g., "Skincare")
   - Price
   - Description
   - Upload an image (recommended)
5. Click **Save**

Once saved, the products will automatically appear when you visit `/product-catalog` or use the API.

---

## Product Categories to Consider

Based on your luxury skincare business, here are suggested product categories:

### Skincare Products:
- **Cleansers**: Gentle cleansers, foaming cleansers, oil cleansers
- **Toners**: Hydrating toners, exfoliating toners
- **Serums**: Vitamin C, Hyaluronic acid, Retinol, Peptides
- **Moisturizers**: Day creams, night creams, eye creams
- **Treatments**: Spot treatments, masks, peels
- **Sun Protection**: SPF products, after-sun care
- **Tools**: Facial tools, applicators, skincare accessories

### Professional Products:
- **Post-Treatment Care**: Recovery serums, healing balms
- **Professional-Grade**: Clinical strength formulas
- **Treatment Kits**: Multi-step treatment sets

---

## Using Products on Your Website

Since you've hidden e-commerce features, you can still feature products as:

1. **Recommended Products** (informational)
   - Display during booking process
   - Show in "Recommended Products" section
   - Link to Square checkout for purchase

2. **Post-Treatment Recommendations**
   - Show recommended products after service selection
   - "Continue your glow at home" section

3. **Professional Product Line Page**
   - Showcase your curated product selection
   - Link individual products to Square checkout

---

## Next Steps

1. ✅ Visit `/product-catalog` to see what products are available
2. 📦 Add products to your Square account (if needed)
3. 🎨 Decide how you want to feature products (informational vs. purchasable)
4. 💡 Integrate products into your service pages or create a dedicated products showcase

---

## Need Help?

If you see "No products found":
- Check that products are created in your Square Dashboard
- Verify your Square API credentials are correct
- Products must be in the same location (Brandon - LMVSQK9C6PR4T)
- Check browser console for any API errors
