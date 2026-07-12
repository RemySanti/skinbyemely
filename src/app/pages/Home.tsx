import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Award, Shield, Star, Clock, ShoppingBag, Loader2 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import scienceSophisticationImage from 'figma:asset/b66e647ec4d5cc9d4d4331ac9d43ce631d6207b8.png';

const HERO_VIDEO_SRC = '/hero-video.mp4';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { StripeCheckout } from '../components/StripeCheckout';
import { stripeService, StripeProduct } from '../services/stripeService';
import { SQUARE_BOOKING_URL } from '../components/BookingRedirect';
import { cartService } from '../services/cartService';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { FadeInSection } from '../components/motion/FadeInSection';
import { fadeUpVariants, staggerContainer, EASE_LUXURY } from '../utils/motion';

import { TestimonialsSection } from '../components/TestimonialsSection';
import { GoogleFiveStarVisual } from '../components/GoogleFiveStarVisual';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<StripeProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  
  // Stripe Checkout State
  const [showCheckout, setShowCheckout] = useState(false);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const allProducts = await stripeService.getProducts();
        // Take the first 3 products for the home page
        setFeaturedProducts(allProducts.slice(0, 3));
      } catch (err) {
        console.error('Failed to load featured products', err);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchFeatured();
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

  const handleBuyNow = (product: StripeProduct) => {
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
      setShowCheckout(true);
    } catch (err: any) {
      console.error('Error:', err);
      toast.error(err.message || 'Failed to proceed to checkout');
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <div>
      {/* Stripe Checkout Dialog */}
      <Dialog open={showCheckout} onOpenChange={(open) => !open && setShowCheckout(false)}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-center font-serif text-2xl">Checkout</DialogTitle>
            <DialogDescription className="hidden">
              Complete your purchase
            </DialogDescription>
          </DialogHeader>
          
          <StripeCheckout onClose={() => setShowCheckout(false)} />
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[90vh] flex items-center texture-grain overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: EASE_LUXURY }}
          className="absolute inset-0 bg-[#2c2c2c]"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setHeroVideoReady(true)}
            className={`w-full h-full object-cover motion-reduce:hidden transition-opacity duration-500 ${
              heroVideoReady ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 bg-[#2c2c2c] hidden motion-reduce:block"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2c2c2c]/70 via-[#2c2c2c]/50 to-transparent" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.div variants={fadeUpVariants} className="w-16 h-px bg-gradient-bronze mb-8" />
            <motion.h1 variants={fadeUpVariants} className="text-5xl md:text-7xl text-white mb-6 leading-tight">
              Personalized Skincare
            </motion.h1>
            <motion.p variants={fadeUpVariants} className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-xl">
              Expert care, thoughtfully tailored to your skin.
            </motion.p>
            <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-6">
              <a
                href={SQUARE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="btn-bronze px-10 py-6 rounded hover:shadow-lg transition-all">
                  Book Now
                </Button>
              </a>
              <Link to="/products">
                <Button className="btn-outline-bronze px-10 py-6 rounded bg-white hover:shadow-lg transition-all">
                  Shop Products
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Google 5-star social proof — off hero so the video stays unobstructed */}
      <section className="py-12 md:py-14 px-4 bg-[#faf8f5] border-b border-[#b8956a]/10">
        <FadeInSection className="max-w-3xl mx-auto">
          <GoogleFiveStarVisual />
        </FadeInSection>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-4 gap-8 md:gap-10 text-center"
          >
            {[
              { icon: <Award className="w-8 h-8" />, title: 'Expert Care', desc: 'Clinical precision meets luxury' },
              { icon: <Shield className="w-8 h-8" />, title: 'Premium Results', desc: 'Science-backed treatments' },
              { icon: <Star className="w-8 h-8" />, title: 'Personalized Service', desc: 'Customized for you' },
              { icon: <Clock className="w-8 h-8" />, title: '5 Years', desc: 'Industry excellence' }
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeUpVariants}>
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-[#b8956a]">
                  {item.icon}
                </div>
                <h3 className="text-xl font-serif text-[#2c2c2c] mb-2">{item.title}</h3>
                <p className="text-[#6b6b6b] text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="pt-16 pb-10 md:pt-20 md:pb-12 px-4 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <FadeInSection>
              <div className="w-16 h-px bg-gradient-bronze mb-6" />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2c2c2c] mb-8 leading-tight">
                Where Results Meet Relaxation
              </h2>
              <p className="text-2xl md:text-3xl font-serif text-[#2c2c2c] leading-snug mb-5">
                Clinical precision. Luxury care. Real results.
              </p>
              <p className="text-xl md:text-2xl text-[#4a4a4a] leading-relaxed mb-10 max-w-xl">
                Every treatment is tailored to your skin. Advanced techniques, premium products, and a restorative experience built around you.
              </p>
              <Link to="/about">
                <Button className="btn-outline-bronze px-8 py-4 rounded hover:shadow-md transition-all">
                  Discover Our Philosophy
                </Button>
              </Link>
            </FadeInSection>
            <FadeInSection delay={0.2} className="relative">
              <div className="aspect-[3/4] relative overflow-hidden">
                <ImageWithFallback
                  src={scienceSophisticationImage}
                  alt="Luxury skincare treatment"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-[#b8956a]/30 -z-10 hidden md:block" />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="pt-10 pb-16 md:pt-12 md:pb-20 px-4 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          <FadeInSection className="text-center mb-10 md:mb-12">
            <div className="w-16 h-px bg-gradient-bronze mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-serif text-[#2c2c2c] mb-4">
              Shop Favorites
            </h2>
            <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto">
              Curated essentials for your daily ritual
            </p>
          </FadeInSection>

          {productsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#b8956a] animate-spin" />
            </div>
          ) : featuredProducts.length > 0 ? (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {featuredProducts.map((product, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeUpVariants}
                  className="bg-white group hover:shadow-2xl transition-all duration-500 border border-[#b8956a]/10 overflow-hidden cursor-pointer"
                  onClick={() => handleBuyNow(product)}
                >
                  {/* Product Image */}
                  {product.images && product.images.length > 0 ? (
                    <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-[#faf8f5] to-[#f5f0e8]">
                      <ImageWithFallback
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-bronze"></div>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#faf8f5] to-[#f5f0e8] p-8 pt-12 pb-10">
                      {/* Decorative Elements */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-bronze"></div>
                      <div className="absolute -top-10 -right-10 w-32 h-32 border border-[#b8956a]/10 rounded-full hidden md:block"></div>
                      <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-[#b8956a]/5 rounded-full hidden md:block"></div>
                      
                      {/* Product Initial/Monogram */}
                      <div className="relative z-10 text-center mb-6">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white border-2 border-[#b8956a]/20 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                          <span className="text-3xl font-serif text-[#b8956a]">
                            {product.name.charAt(0)}
                          </span>
                        </div>
                        <div className="w-12 h-px bg-gradient-bronze mx-auto"></div>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-serif text-2xl text-[#2c2c2c] text-center mb-4 leading-tight min-h-[3.5rem] flex items-center justify-center px-2">
                        {product.name}
                      </h3>

                      {/* Price Badge */}
                      {product.price && (
                        <div className="text-center">
                          <div className="inline-block px-6 py-2 bg-white rounded-full shadow-sm border border-[#b8956a]/20">
                            <span className="text-2xl font-serif text-[#b8956a]">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Product Details */}
                  <div className="p-8">
                    {/* Product Name */}
                    <h3 className="font-serif text-2xl text-[#2c2c2c] text-center mb-3 leading-tight">
                      {product.name}
                    </h3>

                    {/* Price */}
                    {product.price && (
                      <div className="text-center mb-4">
                        <span className="text-2xl font-serif text-[#b8956a]">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {product.description && (
                      <p className="text-sm text-[#6b6b6b] leading-relaxed mb-6 text-center line-clamp-3">
                        {product.description}
                      </p>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        disabled={addingToCart === product.id}
                        className="w-full btn-outline-bronze rounded py-3 hover:shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        {addingToCart === product.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyNow(product);
                        }}
                        disabled={addingToCart === product.id}
                        className="w-full btn-bronze rounded py-3 hover:shadow-lg transition-all"
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : null}

          <FadeInSection delay={0.3} className="text-center mt-10">
            <Link to="/products">
              <Button className="btn-outline-bronze px-8 py-3 rounded hover:shadow-md transition-all">
                View All Products
              </Button>
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* Testimonial Section */}
      <TestimonialsSection />

      {/* Location Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeInSection className="text-center">
            <div className="w-16 h-px bg-gradient-bronze mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-serif text-[#2c2c2c] mb-4">
              Serving Brandon, Valrico & Tampa
            </h2>
            <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto mb-8">
              Conveniently located to serve discerning clients throughout Tampa Bay
            </p>
            <Link to="/contact">
              <Button className="btn-outline-bronze px-8 py-3 rounded hover:shadow-md transition-all">
                Visit Us
              </Button>
            </Link>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}