import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ShoppingBag, Loader2, ArrowLeft, Minus, Plus } from 'lucide-react';
import { stripeService, StripeProduct } from '../services/stripeService';
import { cartService } from '../services/cartService';
import { toast } from 'sonner';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<StripeProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const products = await stripeService.getProducts();
        const found = products.find(p => p.id === id);
        
        if (found) {
          setProduct(found);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Unable to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = async (buyNow = false) => {
    if (!product || !product.price || !product.priceId) return;

    try {
      setAddingToCart(true);
      cartService.addToCart({
        id: product.id,
        priceId: product.priceId,
        name: product.name,
        description: product.description,
        image: product.images?.[0] || null,
        price: product.price,
      }, quantity);

      if (buyNow) {
        navigate('/cart');
      } else {
        toast.success(`${product.name} added to cart`);
      }
    } catch (err: any) {
      console.error('Error adding to cart:', err);
      toast.error(err.message || 'Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#b8956a] animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center p-4">
        <p className="text-[#6b6b6b] mb-4">{error || 'Product not found'}</p>
        <Link to="/products">
          <Button className="btn-bronze rounded px-8">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center text-[#6b6b6b] hover:text-[#b8956a] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image Section */}
          <div className="bg-white p-8 rounded-lg border border-[#b8956a]/10 shadow-sm overflow-hidden">
            <div className="relative aspect-square bg-gradient-to-br from-[#faf8f5] to-[#f5f0e8] rounded flex items-center justify-center overflow-hidden">
                {product.images && product.images.length > 0 ? (
                    <ImageWithFallback 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <>
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-bronze"></div>
                        <div className="absolute -top-10 -right-10 w-48 h-48 border border-[#b8956a]/10 rounded-full"></div>
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-[#b8956a]/5 rounded-full"></div>
                        
                        {/* Product Initial/Monogram - Fallback if no image */}
                        <div className="relative z-10 text-center">
                          <div className="w-32 h-32 mx-auto rounded-full bg-white border-2 border-[#b8956a]/20 flex items-center justify-center shadow-sm">
                            <span className="text-5xl font-serif text-[#b8956a]">
                              {product.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                    </>
                )}
            </div>
          </div>

          {/* Details Section */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-serif text-[#2c2c2c] mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-8">
                {product.price ? (
                    <span className="text-3xl font-serif text-[#b8956a]">
                        ${product.price.toFixed(2)}
                    </span>
                ) : (
                    <span className="text-xl text-[#b8956a]">Contact for pricing</span>
                )}
            </div>

            <div className="prose prose-stone mb-10">
              <p className="text-lg text-[#6b6b6b] leading-relaxed whitespace-pre-line">
                {product.description || 'No description available.'}
              </p>
            </div>

            {product.price && (
              <div className="space-y-6 pt-6 border-t border-[#b8956a]/10">
                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="text-[#2c2c2c] font-medium">Quantity</span>
                  <div className="flex items-center border border-[#b8956a]/20 rounded-full overflow-hidden bg-white">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="px-4 py-2 hover:bg-[#b8956a]/10 transition-colors disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-[#2c2c2c]">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="px-4 py-2 hover:bg-[#b8956a]/10 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleAddToCart(false)}
                    disabled={addingToCart}
                    className="w-full btn-outline-bronze rounded py-6 text-lg hover:shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {addingToCart ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleAddToCart(true)}
                    disabled={addingToCart}
                    className="w-full btn-bronze rounded py-6 text-lg hover:shadow-lg transition-all"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            )}
            
            {/* Additional Info / Trust */}
            <div className="mt-12 grid grid-cols-2 gap-6 pt-10 border-t border-[#b8956a]/10">
                <div>
                    <h4 className="font-serif text-[#2c2c2c] mb-2">Authentic Luxury</h4>
                    <p className="text-sm text-[#6b6b6b]">Guaranteed authentic products sourced directly.</p>
                </div>
                <div>
                    <h4 className="font-serif text-[#2c2c2c] mb-2">Expert Advice</h4>
                    <p className="text-sm text-[#6b6b6b]">Questions? Contact us for personalized recommendations.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
