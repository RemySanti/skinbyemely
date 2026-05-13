/**
 * Quick Product List - Simple text-based product listing
 * Navigate to /quick-products to see a simple list
 */

import { useEffect, useState } from 'react';
import { catalogService } from '../services/squareService';
import type { SquareProduct } from '../services/squareService';

export default function QuickProductList() {
  const [products, setProducts] = useState<SquareProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await catalogService.getProducts();
      setProducts(fetchedProducts);
      
      // Also log to console for easy copying
      console.log('\n' + '='.repeat(80));
      console.log('SQUARE PRODUCTS LIST');
      console.log('='.repeat(80));
      console.log(`\nTotal Products: ${fetchedProducts.length}\n`);
      
      fetchedProducts.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name}`);
        console.log(`   Price: $${product.price.toFixed(2)} ${product.currency}`);
        console.log(`   Product ID: ${product.squareItemId || product.id}`);
        if (product.description) {
          console.log(`   Description: ${product.description}`);
        }
        if (product.category) {
          console.log(`   Category: ${product.category}`);
        }
        if (product.variations && product.variations.length > 0) {
          console.log(`   Variations:`);
          product.variations.forEach(v => {
            console.log(`      - ${v.name}: $${v.price.toFixed(2)} (ID: ${v.id})`);
          });
        }
        console.log('');
      });
      
      console.log('='.repeat(80) + '\n');
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-400">Loading products from Square...</p>
          <p className="text-sm text-gray-500 mt-2">Check your browser console for details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8">Square Product List</h1>
        
        <div className="bg-[#1A1A1A] rounded-lg p-6 mb-8 border border-[#2A2A2A]">
          <p className="text-gray-400 mb-2">
            📋 <strong className="text-white">Total Products:</strong> {products.length}
          </p>
          <p className="text-sm text-gray-500">
            💡 Open your browser console to see the full formatted list
          </p>
        </div>

        {products.length === 0 ? (
          <div className="bg-[#1A1A1A] rounded-lg p-8 border border-[#2A2A2A]">
            <h2 className="text-xl mb-4">No Products Found</h2>
            <p className="text-gray-400 mb-4">
              Your Square catalog doesn't have any products yet.
            </p>
            <div className="space-y-2 text-gray-400">
              <p>To add products:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4 text-sm">
                <li>Log into your Square Dashboard</li>
                <li>Go to <strong>Items & Orders</strong> → <strong>Items</strong></li>
                <li>Click <strong>Create Item</strong></li>
                <li>Fill in product details and save</li>
                <li>Refresh this page</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="bg-[#1A1A1A] rounded-lg p-6 border border-[#2A2A2A] hover:border-[#C9A063]/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[#C9A063] mr-3">{index + 1}.</span>
                    <span className="text-xl">{product.name}</span>
                  </div>
                  <span className="text-[#C9A063] font-mono">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                {product.description && (
                  <p className="text-gray-400 mb-3 ml-7">{product.description}</p>
                )}

                <div className="ml-7 space-y-2">
                  {product.category && (
                    <div className="text-sm">
                      <span className="text-gray-500">Category:</span>{' '}
                      <span className="text-gray-300">{product.category}</span>
                    </div>
                  )}

                  <div className="text-sm">
                    <span className="text-gray-500">Product ID:</span>{' '}
                    <code className="text-[#C9A063] bg-[#0A0A0A] px-2 py-1 rounded font-mono text-xs">
                      {product.squareItemId || product.id}
                    </code>
                  </div>

                  {product.variations && product.variations.length > 0 && (
                    <div className="text-sm">
                      <span className="text-gray-500">Variations:</span>
                      <div className="mt-1 space-y-1 ml-4">
                        {product.variations.map((variation) => (
                          <div key={variation.id} className="flex items-center justify-between bg-[#0A0A0A] rounded px-3 py-1">
                            <span className="text-gray-300">{variation.name}</span>
                            <span className="text-[#C9A063]">${variation.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-[#C9A063]/10 rounded-lg p-6 border border-[#C9A063]/30">
          <h2 className="text-xl mb-4 text-[#C9A063]">How to Use These Products</h2>
          <div className="space-y-4 text-gray-400 text-sm">
            <div>
              <h3 className="text-white mb-2">1. In React Components:</h3>
              <pre className="bg-[#0A0A0A] p-3 rounded overflow-x-auto">
                <code className="text-[#C9A063] text-xs">
{`import { catalogService } from './services/squareService';

const products = await catalogService.getProducts();`}
                </code>
              </pre>
            </div>

            <div>
              <h3 className="text-white mb-2">2. Display Specific Product:</h3>
              <pre className="bg-[#0A0A0A] p-3 rounded overflow-x-auto">
                <code className="text-[#C9A063] text-xs">
{`import { SquareProductCard } from './components/SquareProductCard';

<SquareProductCard productId="PRODUCT_ID_HERE" />`}
                </code>
              </pre>
            </div>

            <div>
              <h3 className="text-white mb-2">3. For More Details:</h3>
              <p>
                Visit <a href="/product-catalog" className="text-[#C9A063] underline">/product-catalog</a> for a visual display
                or check <code className="bg-[#0A0A0A] px-2 py-1 rounded">PRODUCT_LIST_GUIDE.md</code> in your project root.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
