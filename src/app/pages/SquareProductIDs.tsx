import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Copy, CheckCircle2, AlertCircle, Loader2, ShoppingBag } from 'lucide-react';
import { SQUARE_CONFIG } from '../config/square';

interface CatalogItem {
  id: string;
  type: string;
  item_data?: {
    name?: string;
    description?: string;
    variations?: Array<{
      id: string;
      type: string;
      item_variation_data?: {
        name?: string;
        item_id?: string;
        price_money?: {
          amount?: number;
          currency?: string;
        };
      };
    }>;
  };
}

export default function SquareProductIDs() {
  const [products, setProducts] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch catalog items from Square
      const response = await fetch(`${SQUARE_CONFIG.baseUrl}/v2/catalog/list`, {
        method: 'POST',
        headers: {
          'Square-Version': '2024-12-18',
          'Authorization': `Bearer ${SQUARE_CONFIG.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          types: ['ITEM'],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.detail || `API Error: ${response.status}`);
      }

      const data = await response.json();
      const items = data.objects || [];

      // Filter for retail products (items that DON'T have service duration)
      const retailProducts = items.filter((item: CatalogItem) => {
        return !item.item_data?.variations?.some(
          v => v.item_variation_data?.service_duration
        );
      });

      setProducts(retailProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      console.error('Error fetching Square products:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getProductPrice = (item: CatalogItem): string => {
    const amount = item.item_data?.variations?.[0]?.item_variation_data?.price_money?.amount;
    if (!amount) return 'N/A';
    return `$${(amount / 100).toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <section className="py-20 px-4 bg-[#2c2c2c] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-bronze rounded flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="w-10 h-10 text-white" />
          </div>
          <div className="w-16 h-px bg-gradient-bronze mx-auto mb-8" />
          <h1 className="mb-6">Square Product IDs</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Your retail products from Square with their Item IDs for ecommerce checkout links
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Instructions */}
          <div className="bg-white p-8 rounded border border-[#b8956a]/15 mb-8">
            <h2 className="text-2xl font-serif text-[#2c2c2c] mb-4">How to Use These IDs</h2>
            <ol className="space-y-3 text-[#4a4a4a] leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#b8956a] font-bold">1.</span>
                <span>Find your product in the list below</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#b8956a] font-bold">2.</span>
                <span>Click the "Copy ID" button next to the product</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#b8956a] font-bold">3.</span>
                <span>Open the Products.tsx and Home.tsx files (look for the mockProducts array)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#b8956a] font-bold">4.</span>
                <span>Replace "YOUR_SQUARE_ITEM_ID" with the copied Item ID for each matching product</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#b8956a] font-bold">5.</span>
                <span>Save the file and test the purchase buttons - they will open Square checkout</span>
              </li>
            </ol>
            <div className="mt-6 p-4 bg-[#faf8f5] rounded">
              <p className="text-sm text-[#6b6b6b]">
                <strong className="text-[#2c2c2c]">Note:</strong> The checkout URL format is: 
                <code className="ml-2 text-[#b8956a]">https://square.link/u/[ITEM_ID]</code>
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white p-16 rounded border border-[#b8956a]/15 text-center">
              <Loader2 className="w-12 h-12 text-[#b8956a] mx-auto mb-4 animate-spin" />
              <p className="text-[#6b6b6b]">Fetching your Square products...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 p-8 rounded">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Products</h3>
                  <p className="text-red-700 mb-4">{error}</p>
                  <Button 
                    onClick={fetchProducts}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Products List */}
          {!loading && !error && products.length === 0 && (
            <div className="bg-white p-16 rounded border border-[#b8956a]/15 text-center">
              <AlertCircle className="w-12 h-12 text-[#b8956a] mx-auto mb-4" />
              <h3 className="text-xl font-serif text-[#2c2c2c] mb-2">No Products Found</h3>
              <p className="text-[#6b6b6b] mb-6">
                No retail products were found in your Square account.
              </p>
              <p className="text-[#6b6b6b] mb-4">
                Make sure you've created products (not services) in:<br />
                <strong>Square Dashboard → Items → Create an Item</strong>
              </p>
              <a
                href="https://squareup.com/dashboard/items/library"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="btn-bronze">
                  Go to Square Dashboard
                </Button>
              </a>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="space-y-4">
              <div className="bg-white p-6 rounded border border-[#b8956a]/15 mb-6">
                <p className="text-[#4a4a4a] mb-2">
                  <strong className="text-[#2c2c2c]">Found {products.length} product{products.length !== 1 ? 's' : ''}</strong>
                </p>
                <p className="text-sm text-[#6b6b6b]">
                  Use the Item ID shown below for your purchase links
                </p>
              </div>

              {products.map((product) => {
                const productName = product.item_data?.name || 'Unnamed Product';
                const description = product.item_data?.description || '';
                const price = getProductPrice(product);

                return (
                  <div
                    key={product.id}
                    className="bg-white p-8 rounded border border-[#b8956a]/15 hover:border-[#b8956a]/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-serif text-[#2c2c2c]">
                            {productName}
                          </h3>
                          <span className="text-lg text-[#b8956a] font-serif">
                            {price}
                          </span>
                        </div>
                        {description && (
                          <p className="text-[#6b6b6b] text-sm mb-3">{description}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Item ID - THIS IS WHAT YOU NEED */}
                      <div className="bg-gradient-to-br from-[#b8956a]/10 to-[#b8956a]/5 p-4 rounded border-2 border-[#b8956a]/30">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-[#b8956a] mb-1">
                              ✅ Item ID (use this for checkout links):
                            </p>
                            <code className="text-sm text-[#2c2c2c] font-mono break-all font-semibold">
                              {product.id}
                            </code>
                            <p className="text-xs text-[#6b6b6b] mt-2">
                              Checkout URL: <code className="text-[#b8956a]">https://square.link/u/{product.id}</code>
                            </p>
                          </div>
                          <Button
                            onClick={() => copyToClipboard(product.id, product.id)}
                            className="btn-bronze flex items-center gap-2 flex-shrink-0"
                          >
                            {copiedId === product.id ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                Copy ID
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Test Link */}
                      <div className="pt-2">
                        <a
                          href={`https://square.link/u/${product.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#b8956a] hover:text-[#9d7d54] transition-colors inline-flex items-center gap-2"
                        >
                          Test Checkout Link →
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Help Section */}
          {!loading && !error && products.length > 0 && (
            <div className="bg-white p-8 rounded border border-[#b8956a]/15 mt-8">
              <h3 className="text-lg font-serif text-[#2c2c2c] mb-4">Next Steps</h3>
              <div className="space-y-3 text-[#4a4a4a]">
                <p>
                  <strong className="text-[#2c2c2c]">Map Products to Your Website:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Gentle Cleanser → Find matching product above and copy its ID</li>
                  <li>Vitamin C + E Serum → Find matching product above and copy its ID</li>
                  <li>Hyaluronic Complex → Find matching product above and copy its ID</li>
                  <li>Retinol Treatment → Find matching product above and copy its ID</li>
                  <li>SPF 50 Mineral Shield → Find matching product above and copy its ID</li>
                  <li>Exfoliating Treatment Mask → Find matching product above and copy its ID</li>
                  <li>Eye Renewal Complex → Find matching product above and copy its ID</li>
                  <li>Peptide Recovery Cream → Find matching product above and copy its ID</li>
                  <li>Niacinamide Brightening Serum → Find matching product above and copy its ID</li>
                </ul>
                <p className="pt-4 text-sm text-[#6b6b6b]">
                  <strong>Note:</strong> Your Square product names might be different from your website. 
                  Match them by description or price, then copy the Item ID and replace "YOUR_SQUARE_ITEM_ID" in the code.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
