import { Button } from '../components/ui/button';
import { ShoppingBag, Loader2, Search, Heart, ChevronRight, X } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { stripeService, StripeProduct } from '../services/stripeService';
import { cartService } from '../services/cartService';
import { toast } from 'sonner';
import { LoadingAnimation } from '../components/LoadingAnimation';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router-dom';
import { FadeInSection } from '../components/motion/FadeInSection';

type SortOption = 'featured' | 'price-asc' | 'price-desc';
type PriceRange = 'all' | '0-50' | '50-100' | '100-200' | '200-99999';

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<StripeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  
  // Sort and Filter State
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const stripeProducts = await stripeService.getProducts();
        setProducts(stripeProducts);
        setError(null);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Unable to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Hide loading animation after 2 seconds
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product: StripeProduct) => {
    if (!product.price || !product.priceId) {
      toast.error('This product is not available for purchase');
      return;
    }

    try {
      setAddingToCart(product.id);
      cartService.addToCart({
        id: product.id,
        priceId: product.priceId,
        name: product.name,
        description: product.description,
        image: product.images?.[0] || null,
        price: product.price,
      }, 1);
      
      toast.success(`${product.name} added to cart!`);
    } catch (err: any) {
      console.error('Error adding to cart:', err);
      toast.error(err.message || 'Failed to add to cart');
    } finally {
      setAddingToCart(null);
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply keyword filter
    if (searchQuery) {
      filtered = filtered.filter(product => {
        const searchText = `${product.name} ${product.description || ''}`.toLowerCase();
        return searchText.includes(searchQuery.toLowerCase());
      });
    }

    // Apply price range filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        const price = product.price || 0;
        return (min === 0 && price < max) || (max === 0 && price > min) || (price >= min && price <= max);
      });
    }

    // Apply sort
    switch (sortBy) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      default:
        // 'featured'
        break;
    }

    return filtered;
  }, [products, sortBy, priceRange, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fffcf8]">
      {showLoading && <LoadingAnimation />}

      {/* Header Banner - Modeled after reference */}
      <div className="bg-[#f2efe9] py-20 px-4 mb-12">
        <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-[#2c2c2c] tracking-wide uppercase">Catalog</h1>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#6b6b6b] uppercase tracking-wider">
                <Link to="/" className="hover:text-[#b8956a] transition-colors">Home</Link>
                <span>\</span>
                <span className="text-[#2c2c2c]">Catalog</span>
            </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 lg:px-12 pb-24">
        <div className="lg:flex gap-16">
          
          {/* Sidebar Filters */}
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24 space-y-12">
                
                {/* Mobile: Close Button */}
                <div className="flex justify-between items-center lg:hidden mb-6">
                    <span className="font-serif text-xl">Filters</span>
                    <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Search */}
                <div className="hidden lg:block">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#2c2c2c] mb-6">Search</h3>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-full bg-transparent border-b border-[#b8956a]/30 py-2 pr-8 text-sm focus:outline-none focus:border-[#b8956a] placeholder:text-[#6b6b6b]/50"
                        />
                        <Search className="w-4 h-4 text-[#b8956a] absolute right-0 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                {/* Categories (Visual Mock) */}
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#2c2c2c] mb-6">Category</h3>
                    <ul className="space-y-3 text-sm text-[#6b6b6b]">
                        <li>
                            <button className="hover:text-[#b8956a] transition-colors text-[#b8956a] font-medium flex items-center gap-2">
                                All Products
                            </button>
                        </li>
                        <li><button className="hover:text-[#b8956a] transition-colors cursor-not-allowed opacity-50">Face Care</button></li>
                        <li><button className="hover:text-[#b8956a] transition-colors cursor-not-allowed opacity-50">Body Care</button></li>
                        <li><button className="hover:text-[#b8956a] transition-colors cursor-not-allowed opacity-50">Sets & Kits</button></li>
                    </ul>
                </div>

                {/* Price Filter */}
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#2c2c2c] mb-6">Price</h3>
                    <ul className="space-y-3 text-sm text-[#6b6b6b]">
                        {[
                            { label: 'All', value: 'all' },
                            { label: 'Under $50', value: '0-50' },
                            { label: '$50 - $100', value: '50-100' },
                            { label: '$100 - $200', value: '100-200' },
                            { label: '$200+', value: '200-99999' },
                        ].map((option) => (
                            <li key={option.value}>
                                <button
                                    onClick={() => setPriceRange(option.value as PriceRange)}
                                    className={`hover:text-[#b8956a] transition-colors ${priceRange === option.value ? 'text-[#b8956a] font-medium' : ''}`}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            
            {/* Mobile Search - Always Visible */}
            <div className="lg:hidden mb-6">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full bg-white border border-[#b8956a]/20 rounded px-4 py-3 pl-10 text-sm focus:outline-none focus:border-[#b8956a] placeholder:text-[#6b6b6b]/50 shadow-sm"
                    />
                    <Search className="w-4 h-4 text-[#b8956a] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
            </div>

            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-4 border-b border-[#b8956a]/10 gap-4">
                <div className="flex items-center gap-4">
                    {/* Mobile Filter Toggle */}
                    <Button 
                        onClick={() => setShowFilters(!showFilters)}
                        variant="outline" 
                        className="lg:hidden border-[#b8956a]/30 text-[#2c2c2c]"
                    >
                        Filter
                    </Button>
                    
                    <span className="text-sm text-[#6b6b6b] uppercase tracking-wider">
                        {filteredProducts.length} Goods
                    </span>
                </div>

                {/* Desktop Sort */}
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#6b6b6b] uppercase tracking-wider hidden sm:inline">Sort Price:</span>
                    <div className="flex items-center gap-1">
                        <button 
                            onClick={() => setSortBy('featured')}
                            className={`px-2 py-1 ${sortBy === 'featured' ? 'text-[#2c2c2c] font-medium' : 'text-[#6b6b6b] hover:text-[#b8956a]'}`}
                        >
                            Default
                        </button>
                        <span className="text-[#6b6b6b]/30">/</span>
                        <button 
                            onClick={() => setSortBy('price-asc')}
                            className={`px-2 py-1 ${sortBy === 'price-asc' ? 'text-[#2c2c2c] font-medium' : 'text-[#6b6b6b] hover:text-[#b8956a]'}`}
                        >
                            Low
                        </button>
                        <span className="text-[#6b6b6b]/30">/</span>
                        <button 
                            onClick={() => setSortBy('price-desc')}
                            className={`px-2 py-1 ${sortBy === 'price-desc' ? 'text-[#2c2c2c] font-medium' : 'text-[#6b6b6b] hover:text-[#b8956a]'}`}
                        >
                            High
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    {filteredProducts.map((product) => (
                        <div 
                            key={product.id}
                            className="group cursor-pointer"
                            onClick={() => handleProductClick(product.id)}
                        >
                            {/* Image Container */}
                            <div className="aspect-[4/5] relative bg-[#f4f4f4] mb-4 overflow-hidden">
                                {product.images?.[0] ? (
                                    <ImageWithFallback
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#b8956a]/20">
                                        <span className="text-4xl font-serif">{product.name.charAt(0)}</span>
                                    </div>
                                )}
                                
                                {/* Quick Actions */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="p-2 bg-white rounded-full shadow-sm hover:bg-[#b8956a] hover:text-white transition-colors">
                                        <Heart className="w-4 h-4" />
                                    </button>
                                </div>
                                
                                {/* Add to Cart Overlay (Desktop) */}
                                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                     <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(product);
                                        }}
                                        disabled={addingToCart === product.id}
                                        className="w-full btn-bronze text-xs py-2 h-9"
                                    >
                                        {addingToCart === product.id ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Add to Cart'}
                                    </Button>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="text-center sm:text-left">
                                <h3 className="font-serif text-lg text-[#2c2c2c] mb-1 group-hover:text-[#b8956a] transition-colors truncate">
                                    {product.name}
                                </h3>
                                <div className="flex items-center justify-center sm:justify-between">
                                    <span className="text-sm font-medium text-[#6b6b6b]">
                                        ${product.price?.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && filteredProducts.length === 0 && (
                 <div className="py-20 text-center text-[#6b6b6b]">
                    No products found matching your criteria.
                 </div>
            )}
            
            {/* Pagination Mock */}
            {!loading && filteredProducts.length > 0 && (
                <div className="mt-16 flex justify-end text-sm text-[#6b6b6b] gap-2">
                    <span>Back</span>
                    <span className="text-[#2c2c2c] font-medium">1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>...</span>
                    <span>Next</span>
                </div>
            )}

          </main>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="bg-[#f2efe9] py-20 px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-serif text-[#2c2c2c] mb-4">Subscribe to our newsletter</h2>
                    <p className="text-[#6b6b6b] mb-8">Join our list for exclusive skincare tips, new product launches, and special offers.</p>
                    <div className="flex gap-4 max-w-md mx-auto md:mx-0">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="flex-1 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#b8956a]"
                        />
                        <Button className="btn-bronze px-8">Subscribe</Button>
                    </div>
                </div>
                <div className="flex-1 w-full max-w-xs md:max-w-sm">
                    <div className="aspect-square bg-white p-4 shadow-xl rotate-3 transform transition-transform hover:rotate-0">
                        <img 
                            src="https://images.unsplash.com/photo-1598214173466-82d8411951b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
                            alt="Skincare texture"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
      </section>

    </div>
  );
}