import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Shield, Droplets, CheckCircle2, ChevronRight, ShoppingBag, Loader2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { stripeService, StripeProduct } from '../../services/stripeService';
import { cartService } from '../../services/cartService';
import { toast } from 'sonner';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import microdermabrasionImage from 'figma:asset/e014296d9c8b4212c1d37bb102b46017af36a931.png';
import microdermabrasionHeroImage from 'figma:asset/04c3fcccdb46be205fd0417730be327613bbf0fb.png';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import { StripeCheckout } from '../../components/StripeCheckout';

import { TestimonialsSection } from '../../components/TestimonialsSection';
import { fetchServicePrices, getDefaultServicePrices, getServiceById } from '../../config/service-prices';

export default function Microdermabrasion() {
  const squareBookingUrl = "https://book.squareup.com/appointments/f7dcst2ljp85dq/location/LMVSQK9C6PR4T/services";

  const [featuredProducts, setFeaturedProducts] = useState<StripeProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const defaultService = getDefaultServicePrices().find(s => s.id === 'microdermabrasion')!;
  const [servicePrice, setServicePrice] = useState(defaultService.price);
  const [serviceDuration, setServiceDuration] = useState(defaultService.duration);

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

    // Fetch dynamic service price
    fetchServicePrices().then(services => {
      const svc = getServiceById(services, 'microdermabrasion');
      if (svc) {
        setServicePrice(svc.price);
        setServiceDuration(svc.duration);
      }
    }).catch(() => {});
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

  const combos = [
    {
      service: 'Nanoneedling',
      benefit: 'Deep product penetration after exfoliation',
      description: 'Ultimate Tampa Bay facial combo for texture transformation',
      link: '/services/nanoneedling'
    },
    {
      service: 'Oxygen Infusion Add-On',
      benefit: 'Immediate hydration boost',
      description: 'Perfect pairing for post-exfoliation glow',
      link: squareBookingUrl
    },
    {
      service: 'LED Light Therapy Add-On',
      benefit: 'Accelerates healing and collagen production',
      description: 'Enhances anti-aging results',
      link: squareBookingUrl
    }
  ];

  const faqs = [
    {
      question: "Is microdermabrasion painful?",
      answer: "Not at all. Most clients describe the sensation as a gentle scratching or vibration on the skin. It's completely tolerable and many find it quite relaxing. There's no pain involved—just effective exfoliation that reveals fresher, smoother skin."
    },
    {
      question: "Will I have downtime after treatment?",
      answer: "Minimal to no downtime. Your skin may appear slightly pink immediately after treatment, similar to a mild sunburn, but this typically subsides within a few hours. You can resume normal activities immediately. This makes it an ideal Brandon facial for busy professionals who can't afford recovery time."
    },
    {
      question: "How quickly will I see results?",
      answer: "Results are immediate and progressive. You'll notice smoother texture and a brighter complexion right after your first treatment. However, optimal results develop over a series of treatments (typically 4-6 sessions spaced 2-4 weeks apart) as cell turnover increases and deeper concerns are addressed."
    },
    {
      question: "How often should I get microdermabrasion?",
      answer: "For corrective treatments addressing specific concerns like hyperpigmentation or texture issues, we recommend a series of 4-6 treatments every 2-4 weeks. For maintenance, monthly treatments align beautifully with your skin's natural renewal cycle and keep your complexion consistently radiant."
    },
    {
      question: "Can I combine microdermabrasion with other treatments?",
      answer: "Absolutely! Microdermabrasion is one of the best facial treatments in Tampa Bay for layering. It creates the perfect canvas for other treatments like nanoneedling, chemical peels (with appropriate timing), or oxygen infusion. We'll create a custom treatment plan based on your skin goals."
    },
    {
      question: "Is this safe for sensitive skin?",
      answer: "It depends on your specific sensitivity type. During your consultation, we'll assess whether microdermabrasion is appropriate for your skin or if a gentler exfoliation method would be better suited. We never compromise skin health for results—your skin barrier integrity is our top priority."
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen">
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
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden texture-grain">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${microdermabrasionHeroImage}")` }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-4">
              <span className="text-xs md:text-sm tracking-[0.2em] text-white/90 uppercase font-medium">Clinical Exfoliation</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight">
              Microdermabrasion <br className="hidden md:block" />Facial
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
              Renew Skin Texture & Reveal Your Radiance
            </p>
            
            <p className="text-base text-white/80 max-w-lg mx-auto">
              A trusted facial in Brandon, Florida for clients seeking clinical-grade exfoliation with visible results
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <a href={squareBookingUrl} target="_blank" rel="noopener noreferrer">
                <Button className="btn-bronze px-10 py-6 text-base rounded-sm hover:shadow-lg transition-all duration-300">
                  Book Appointment
                </Button>
              </a>
              <Button 
                variant="outline" 
                className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white px-10 py-6 text-base rounded-sm transition-all duration-300"
                onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Discover More
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-xs md:text-sm text-white/70 pt-8 mt-8 border-t border-white/10 max-w-2xl mx-auto">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                <span className="uppercase tracking-wider">{serviceDuration}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                <span className="uppercase tracking-wider">$135</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                <span className="uppercase tracking-wider">Minimal Downtime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What This Facial Is Best For */}
      <section id="details" className="py-20 md:py-32 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn} className="relative order-2 lg:order-1">
              <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
                <ImageWithFallback 
                  src={microdermabrasionImage}
                  alt="Microdermabrasion treatment" 
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#faf8f5] -z-10 rounded-full hidden md:block" />
              <div className="absolute -top-10 -left-10 w-40 h-40 border border-[#b8956a]/20 -z-10 rounded-full hidden md:block" />
            </motion.div>

            <motion.div 
              {...fadeIn} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <span className="text-[#b8956a] uppercase tracking-widest text-sm font-medium mb-4 block">The Benefits</span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#2c2c2c] mb-8 leading-tight">
                What This Facial <br />Is Best For
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-serif text-[#2c2c2c] mb-4 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-[#b8956a]"></span>
                    Ideal Candidates
                  </h3>
                  <ul className="space-y-4 ml-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#b8956a] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-[#2c2c2c]">Results-driven clients</p>
                        <p className="text-sm text-[#6b6b6b] font-light">Seeking clinical-grade exfoliation</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#b8956a] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-[#2c2c2c]">Pre-event preparation</p>
                        <p className="text-sm text-[#6b6b6b] font-light">Weddings, photoshoots, special occasions</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#b8956a] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-[#2c2c2c]">Maintenance-focused</p>
                        <p className="text-sm text-[#6b6b6b] font-light">Perfect monthly skin health routine</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#b8956a] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-[#2c2c2c]">Anti-aging focus</p>
                        <p className="text-sm text-[#6b6b6b] font-light">Proactive approach to skin health</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#faf8f5] p-8 border-l-2 border-[#b8956a]">
                  <h3 className="text-lg font-serif text-[#2c2c2c] mb-4">Targeting Concerns</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="font-medium text-[#2c2c2c]">Rough Texture</p>
                      <p className="text-xs text-[#6b6b6b]">Smooths skin surface</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-[#2c2c2c]">Dull Tone</p>
                      <p className="text-xs text-[#6b6b6b]">Reveals fresh radiance</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-[#2c2c2c]">Fine Lines</p>
                      <p className="text-xs text-[#6b6b6b]">Stimulates renewal</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-[#2c2c2c]">Sun Damage</p>
                      <p className="text-xs text-[#6b6b6b]">Fades hyperpigmentation</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results & Benefits */}
      <section className="py-24 px-4 bg-[#2c2c2c] text-white texture-grain">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <span className="text-[#d4af37] uppercase tracking-widest text-sm font-medium mb-3 block">Why Choose SkinByEmely</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Results & Benefits</h2>
            <div className="w-24 h-[1px] bg-[#d4af37] mx-auto opacity-50" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 border border-white/10 hover:border-[#d4af37]/50 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-[#d4af37]/20 rounded-full flex items-center justify-center mb-6 text-[#d4af37]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-white mb-4">Immediate Results</h3>
              <ul className="space-y-3 text-white/70 font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  Instantly smoother texture
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  Brighter, more even complexion
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  Refined pore appearance
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  Enhanced product absorption
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 border border-white/10 hover:border-[#d4af37]/50 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-[#d4af37]/20 rounded-full flex items-center justify-center mb-6 text-[#d4af37]">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-white mb-4">Progressive Benefits</h3>
              <ul className="space-y-3 text-white/70 font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  Reduction in fine lines
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  Fading of dark spots
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  Improved elasticity
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  Clearer complexion
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 border border-white/10 hover:border-[#d4af37]/50 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-[#d4af37]/20 rounded-full flex items-center justify-center mb-6 text-[#d4af37]">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-white mb-4">Expert Care</h3>
              <ul className="space-y-3 text-white/70 font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  Customized pressure
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  Professional-grade equipment
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  Comprehensive facial included
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  Strategic treatment planning
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client-Favorite Combos */}
      <section id="combos" className="py-24 px-4 bg-[#faf8f5]">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-[#2c2c2c] mb-4">Enhance Your Experience</h2>
            <p className="text-lg text-[#6b6b6b] font-light">Amplify your results with these powerful pairings</p>
          </motion.div>

          <div className="space-y-6">
            {combos.map((combo, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white p-8 card-premium"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-serif text-[#2c2c2c] mb-2 group-hover:text-[#b8956a] transition-colors">{combo.service}</h3>
                    <p className="text-[#6b6b6b] mb-2 font-light">{combo.benefit}</p>
                    <p className="text-sm text-[#b8956a] italic font-medium">{combo.description}</p>
                  </div>
                  {combo.link.startsWith('/') ? (
                    <Link to={combo.link}>
                      <Button className="btn-outline-bronze rounded-sm min-w-[140px]">
                        Learn More
                      </Button>
                    </Link>
                  ) : (
                    <a href={combo.link} target="_blank" rel="noopener noreferrer">
                      <Button className="btn-outline-bronze rounded-sm min-w-[140px]">
                        Add to Booking
                      </Button>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Recommended Products */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <span className="text-[#b8956a] uppercase tracking-widest text-sm font-medium mb-3 block">Curated Skincare</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#2c2c2c] mb-4">Maintain Your Glow</h2>
            <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto font-light">
              Professional-grade products to support your results
            </p>
          </motion.div>

          {productsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#b8956a] animate-spin" />
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map((product, idx) => (
                <div 
                  key={idx} 
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
                      <div className="absolute -top-10 -right-10 w-32 h-32 border border-[#b8956a]/10 rounded-full"></div>
                      <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-[#b8956a]/5 rounded-full"></div>
                      
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
                </div>
              ))}
            </div>
          ) : null}

          <div className="text-center">
            <Link to="/products">
              <Button className="btn-bronze text-white px-10 py-6 text-sm tracking-widest uppercase rounded-sm">
                Shop All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 px-4 bg-[#faf8f5]">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-[#2c2c2c] mb-4">Common Questions</h2>
            <div className="w-16 h-[1px] bg-[#b8956a] mx-auto" />
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className="bg-white border border-transparent hover:border-[#b8956a]/20 px-6 py-2 transition-colors"
              >
                <AccordionTrigger className="text-left font-serif text-lg text-[#2c2c2c] hover:text-[#b8956a] hover:no-underline transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#6b6b6b] leading-relaxed font-light pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Final CTA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-20 text-center p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#2c2c2c] z-0" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0" />
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-6">Book One of the Best Facials in Brandon</h3>
              <p className="text-lg mb-10 text-white/80 max-w-2xl mx-auto font-light">
                Join Tampa Bay clients experiencing clinical-grade exfoliation in a luxurious setting
              </p>
              <a href={squareBookingUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-[#2c2c2c] hover:bg-[#d4af37] hover:text-white px-12 py-6 text-base tracking-widest uppercase rounded-sm transition-all duration-300">
                  Book Your Appointment
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 px-4 bg-white border-t border-neutral-100">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-serif text-[#2c2c2c] mb-8">Other Treatments You Might Like</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/services/new-client-facial">
              <Button variant="outline" className="border-[#e5e5e5] text-[#6b6b6b] hover:border-[#b8956a] hover:text-[#b8956a] rounded-full px-6">
                New Client Facial
              </Button>
            </Link>
            <Link to="/services/dermaplane-deluxe">
              <Button variant="outline" className="border-[#e5e5e5] text-[#6b6b6b] hover:border-[#b8956a] hover:text-[#b8956a] rounded-full px-6">
                Dermaplane Deluxe
              </Button>
            </Link>
            <Link to="/services/nanoneedling">
              <Button variant="outline" className="border-[#e5e5e5] text-[#6b6b6b] hover:border-[#b8956a] hover:text-[#b8956a] rounded-full px-6">
                Nanoneedling
              </Button>
            </Link>
            <Link to="/services/cranberry-peel">
              <Button variant="outline" className="border-[#e5e5e5] text-[#6b6b6b] hover:border-[#b8956a] hover:text-[#b8956a] rounded-full px-6">
                Cranberry Peel
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}