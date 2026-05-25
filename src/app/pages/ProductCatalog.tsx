/**
 * Product Catalog - Displays all products from Square API
 * This page helps you see what products are available in your Square catalog
 */

import { useEffect, useState } from 'react';
import { catalogService } from '../services/squareService';
import type { SquareProduct } from '../services/squareService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Package, DollarSign, Tag, Image as ImageIcon, Copy, Check } from 'lucide-react';
import { SQUARE_CONFIG } from '../config/square';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { stripHtml } from '../components/ui/utils';

export default function ProductCatalog() {
  const [products, setProducts] = useState<SquareProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawData, setRawData] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  
  // Dialog state for manual copying fallback
  const [openCopyDialog, setOpenCopyDialog] = useState(false);
  const [copyDialogText, setCopyDialogText] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching products from Square API...');
      const fetchedProducts = await catalogService.getProducts();
      console.log('Products fetched:', fetchedProducts);
      
      setProducts(fetchedProducts);
      setRawData(fetchedProducts);
      
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to fetch products from Square API';
      setError(errorMessage);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const copySelection = async () => {
    const ids = Array.from(selectedIds);
    const text = JSON.stringify(ids, null, 2);
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(`Copied ${ids.length} Product IDs to clipboard`);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Clipboard write failed, falling back to manual copy:', err);
      setCopyDialogText(text);
      setOpenCopyDialog(true);
    }
  };

  const selectAll = () => {
    if (selectedIds.size === products.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(products.map(p => p.squareItemId || p.id)));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="mb-8">Loading Products...</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-[#1A1A1A] border-[#2A2A2A]">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 bg-[#2A2A2A]" />
                  <Skeleton className="h-4 w-full bg-[#2A2A2A] mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full bg-[#2A2A2A]" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-[#1A1A1A] border-red-900">
            <CardHeader>
              <CardTitle className="text-red-500">Error Loading Products</CardTitle>
              <CardDescription className="text-gray-400">{error}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4">Square Product Catalog</h1>
          <p className="text-gray-400 max-w-3xl">
            Below are all the products currently available in your Square catalog. 
            You can use these product IDs to feature items on your website.
          </p>
          <div className="mt-4 flex items-center justify-between gap-4">
            <Badge variant="outline" className="bg-[#C9A063]/10 text-[#C9A063] border-[#C9A063]/30">
              <Package className="w-3 h-3 mr-1" />
              {products.length} Products Found
            </Badge>

            {selectedIds.size > 0 && (
              <div className="flex items-center gap-2">
                <Badge className="bg-[#C9A063] text-black">
                  {selectedIds.size} Selected
                </Badge>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  onClick={copySelection}
                  className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  Copy IDs
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setSelectedIds(new Set())}
                  className="text-gray-400 hover:text-white"
                >
                  Clear
                </Button>
              </div>
            )}

            <Button size="sm" variant="outline" onClick={selectAll} className="text-xs">
              {selectedIds.size === products.length ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
          
          {/* API Status Info */}
          <Card className="mt-6 bg-[#1A1A1A] border-[#C9A063]/20">
            <CardContent className="pt-6">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">API Endpoint:</span>
                  <code className="text-[#C9A063] text-xs bg-[#0A0A0A] px-2 py-1 rounded">
                    {SQUARE_CONFIG.baseUrl}/v2/catalog/list
                  </code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Environment:</span>
                  <Badge className="bg-[#C9A063]/20 text-[#C9A063]">
                    {SQUARE_CONFIG.environment}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Location ID:</span>
                  <code className="text-white text-xs">{SQUARE_CONFIG.locationId}</code>
                </div>
                <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-900/50 rounded text-xs text-yellow-200">
                  <p className="font-bold mb-1">⚠️ CORS Restriction</p>
                  <p>
                    Square API blocks direct browser requests. To see your REAL products:
                  </p>
                  <ol className="list-decimal list-inside mt-1 ml-1 space-y-1 text-yellow-200/80">
                    <li>Open your terminal</li>
                    <li>Run: <code className="bg-black/50 px-1 rounded">node update-products.js</code></li>
                    <li>Refresh this page</li>
                  </ol>
                  <p className="mt-2 opacity-75">
                    This will fetch your live catalog and save it to <code className="bg-black/50 px-1 rounded">config/square-products.json</code> for the app to use.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
            <CardHeader>
              <CardTitle>No Products Found</CardTitle>
              <CardDescription className="text-gray-400">
                Your Square catalog doesn't have any products yet.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-400 space-y-2">
              <p>To add products:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Log into your Square Dashboard</li>
                <li>Go to Items & Orders → Items</li>
                <li>Click "Create Item" to add products</li>
                <li>Refresh this page to see them appear</li>
              </ol>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const productId = product.squareItemId || product.id;
              const isSelected = selectedIds.has(productId);
              
              return (
              <Card 
                key={product.id} 
                className={`bg-[#1A1A1A] border transition-all cursor-pointer ${
                  isSelected ? 'border-[#C9A063] ring-1 ring-[#C9A063]' : 'border-[#2A2A2A] hover:border-[#C9A063]/50'
                }`}
                onClick={() => toggleSelection(productId)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        checked={isSelected}
                        onCheckedChange={() => toggleSelection(productId)}
                        className="mt-1 data-[state=checked]:bg-[#C9A063] data-[state=checked]:border-[#C9A063]"
                      />
                      <div>
                        <CardTitle className="text-xl text-white">{product.name}</CardTitle>
                        {product.category && (
                          <Badge variant="secondary" className="bg-[#C9A063]/10 text-[#C9A063] shrink-0 mt-2">
                            <Tag className="w-3 h-3 mr-1" />
                            {product.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-gray-400 line-clamp-2 mt-2">
                    {stripHtml(product.description || 'No description available')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#C9A063]" />
                    <span className="text-2xl text-white">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-gray-500 text-sm">{product.currency}</span>
                  </div>

                  {/* Product ID */}
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Product ID</p>
                    <code className="block px-3 py-2 bg-[#0A0A0A] rounded text-xs text-[#C9A063] font-mono break-all">
                      {product.squareItemId || product.id}
                    </code>
                  </div>

                  {/* Variations */}
                  {product.variations && product.variations.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">Variations</p>
                      <div className="space-y-2">
                        {product.variations.map((variation) => (
                          <div key={variation.id} className="bg-[#0A0A0A] rounded p-2 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-white">{variation.name}</span>
                              <span className="text-sm text-[#C9A063]">${variation.price.toFixed(2)}</span>
                            </div>
                            <code className="block text-xs text-gray-500 font-mono break-all">
                              {variation.id}
                            </code>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Image */}
                  {product.imageUrl && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <ImageIcon className="w-4 h-4" />
                      <span>Has product image</span>
                    </div>
                  )}

                  {/* Benefits */}
                  {product.benefits && product.benefits.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Benefits</p>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#C9A063] mt-1">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )})}
          </div>
        )}

        {/* Usage Instructions */}
        {products.length > 0 && (
          <Card className="mt-12 bg-[#1A1A1A] border-[#C9A063]/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#C9A063]" />
                How to Use These Products
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-400">
              <div>
                <h3 className="text-white mb-2">Option 1: Use SquareProductCard Component</h3>
                <pre className="bg-[#0A0A0A] p-4 rounded text-xs overflow-x-auto">
                  <code className="text-[#C9A063]">
{`import { SquareProductCard } from './components/SquareProductCard';

// In your component:
<SquareProductCard productId="${products[0]?.squareItemId || products[0]?.id}" />`}
                  </code>
                </pre>
              </div>

              <div>
                <h3 className="text-white mb-2">Option 2: Fetch All Products Programmatically</h3>
                <pre className="bg-[#0A0A0A] p-4 rounded text-xs overflow-x-auto">
                  <code className="text-[#C9A063]">
{`import { catalogService } from './services/squareService';

const products = await catalogService.getProducts();
// Use products array to display on your page`}
                  </code>
                </pre>
              </div>

              <div>
                <h3 className="text-white mb-2">Option 3: Use Mock Products (Development)</h3>
                <p className="text-sm mb-2">
                  If Square API is not configured, the service will automatically return mock products for development.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      {/* Manual Copy Dialog */}
      <Dialog open={openCopyDialog} onOpenChange={setOpenCopyDialog}>
        <DialogContent className="bg-[#1A1A1A] border-[#2A2A2A] text-white">
          <DialogHeader>
            <DialogTitle>Copy Product IDs</DialogTitle>
            <DialogDescription>
              We couldn't automatically access your clipboard. Please copy the IDs below manually.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Textarea 
              className="min-h-[200px] bg-[#0A0A0A] border-[#333] font-mono text-xs text-[#C9A063]"
              value={copyDialogText}
              readOnly
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            />
            <Button 
              className="w-full mt-4 bg-[#C9A063] text-black hover:bg-[#b88e4b]"
              onClick={() => setOpenCopyDialog(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}