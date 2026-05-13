/**
 * Utility to fetch and display all products from Square Catalog API
 * Run this to see what products you can feature on your website
 */

import { SQUARE_CONFIG, getSquareHeaders, isSquareConfigured } from '../config/square';

interface CatalogItem {
  id: string;
  type: string;
  updated_at: string;
  version: number;
  is_deleted: boolean;
  present_at_all_locations: boolean;
  item_data?: {
    name: string;
    description?: string;
    category_id?: string;
    product_type?: string;
    variations?: Array<{
      id: string;
      type: string;
      item_variation_data?: {
        item_id: string;
        name: string;
        ordinal?: number;
        pricing_type?: string;
        price_money?: {
          amount: number;
          currency: string;
        };
      };
    }>;
    image_ids?: string[];
  };
}

interface ProductListing {
  id: string;
  name: string;
  description: string;
  category: string;
  variations: Array<{
    id: string;
    name: string;
    price: number;
    currency: string;
  }>;
  images: string[];
}

/**
 * Fetch all catalog items from Square
 */
async function fetchSquareCatalog(): Promise<CatalogItem[]> {
  if (!isSquareConfigured()) {
    console.error('❌ Square API is not configured properly');
    return [];
  }

  try {
    const response = await fetch(`${SQUARE_CONFIG.baseUrl}/v2/catalog/list`, {
      method: 'POST',
      headers: getSquareHeaders(),
      body: JSON.stringify({
        types: ['ITEM'], // Fetch only items (products)
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Square API Error:', errorData);
      throw new Error(`Square API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.objects || [];
  } catch (error) {
    console.error('Error fetching catalog:', error);
    throw error;
  }
}

/**
 * Format catalog items for display
 */
function formatProducts(items: CatalogItem[]): ProductListing[] {
  return items
    .filter(item => item.type === 'ITEM' && !item.is_deleted && item.item_data)
    .map(item => {
      const itemData = item.item_data!;
      
      return {
        id: item.id,
        name: itemData.name,
        description: itemData.description || 'No description available',
        category: itemData.category_id || 'Uncategorized',
        variations: (itemData.variations || []).map(variation => ({
          id: variation.id,
          name: variation.item_variation_data?.name || 'Standard',
          price: (variation.item_variation_data?.price_money?.amount || 0) / 100,
          currency: variation.item_variation_data?.price_money?.currency || 'USD',
        })),
        images: itemData.image_ids || [],
      };
    });
}

/**
 * Display products in a readable format
 */
function displayProducts(products: ProductListing[]): void {
  console.log('\n' + '='.repeat(80));
  console.log('SQUARE CATALOG PRODUCTS');
  console.log('='.repeat(80) + '\n');

  if (products.length === 0) {
    console.log('❌ No products found in your Square catalog.\n');
    console.log('To add products:');
    console.log('1. Log into your Square Dashboard');
    console.log('2. Go to Items & Orders > Items');
    console.log('3. Create new items/products\n');
    return;
  }

  console.log(`✅ Found ${products.length} product(s) in your catalog:\n`);

  products.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name}`);
    console.log(`   ID: ${product.id}`);
    console.log(`   Description: ${product.description}`);
    console.log(`   Category: ${product.category}`);
    
    if (product.variations.length > 0) {
      console.log(`   Variations:`);
      product.variations.forEach(variation => {
        console.log(`      - ${variation.name}: $${variation.price.toFixed(2)} ${variation.currency}`);
        console.log(`        Variation ID: ${variation.id}`);
      });
    }
    
    if (product.images.length > 0) {
      console.log(`   Images: ${product.images.length} image(s)`);
      product.images.forEach(imgId => {
        console.log(`      - Image ID: ${imgId}`);
      });
    }
    
    console.log('');
  });

  console.log('='.repeat(80));
  console.log('HOW TO USE THESE PRODUCTS:');
  console.log('='.repeat(80));
  console.log('\n1. Copy the Product IDs and Variation IDs above');
  console.log('2. Use them in your SquareProductCard component');
  console.log('3. Example:');
  console.log('   <SquareProductCard productId="YOUR_PRODUCT_ID" />');
  console.log('\n4. Or fetch products programmatically:');
  console.log('   import { catalogService } from "./services/squareService";');
  console.log('   const products = await catalogService.getProducts();\n');
}

/**
 * Main function to fetch and display products
 */
export async function listSquareProducts(): Promise<ProductListing[]> {
  try {
    console.log('🔄 Fetching products from Square...');
    const items = await fetchSquareCatalog();
    const products = formatProducts(items);
    displayProducts(products);
    return products;
  } catch (error) {
    console.error('Failed to fetch Square products:', error);
    return [];
  }
}

// Export for use in other components
export type { ProductListing };
