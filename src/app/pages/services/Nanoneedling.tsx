import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Shield, Droplets, CheckCircle2, ChevronRight, Loader2, ShoppingBag } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion';
import { useState, useEffect } from 'react';
import { stripeService, StripeProduct } from '../../services/stripeService';
import { cartService } from '../../services/cartService';
import { toast } from 'sonner';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import nanoneedlingImage from 'figma:asset/5dbd79ceeebd187fe907867e0823cb5787e06705.png';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import { StripeCheckout } from '../../components/StripeCheckout';

import { TestimonialsSection } from '../../components/TestimonialsSection';
import { fetchServicePrices, getDefaultServicePrices, getServiceById } from '../../config/service-prices';

export default function Nanoneedling() {
  const squareBookingUrl = "https://book.squareup.com/appointments/f7dcst2ljp85dq/location/LMVSQK9C6PR4T/services";

  const [featuredProducts, setFeaturedProducts] = useState<StripeProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const defaultService = getDefaultServicePrices().find(s => s.id === 'nanoneedling')!;
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
      const svc = getServiceById(services, 'nanoneedling');
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
      service: 'Microdermabrasion',
      benefit: 'Pre-nano exfoliation for enhanced penetration',
      description: 'Popular Tampa Bay facial combo for texture transformation',
      link: '/services/microdermabrasion'
    },
    {
      service: 'Dermaplane Deluxe',
      benefit: 'Removes vellus hair and dead skin first',
      description: 'Schedule 2 weeks before nano for best results',
      link: '/services/dermaplane-deluxe'
    },
    {
      service: 'LED Light Therapy Add-On',
      benefit: 'Accelerates healing and collagen production',
      description: 'Perfect post-nano enhancement',
      link: squareBookingUrl
    }
  ];

  const faqs = [
    {
      question: "Does nanoneedling hurt?",
      answer: "Not at all. Unlike traditional microneedling which uses actual needles, nanoneedling uses microscopic silicone tips that don't penetrate the skin. They create micro-channels on the surface. Most clients find the sensation relaxing, similar to a gentle massage. There's no pain, no bleeding, and no discomfort."
    },
    {
      question: "Is there any downtime after nanoneedling?",
      answer: "Zero downtime. Your skin may appear slightly pink immediately after treatment (similar to a light workout flush), but this typically subsides within 1-2 hours. You can resume all normal activities, wear makeup the next day, and go about your regular routine. This makes it one of the best facials near Brandon for professionals with busy schedules."
    },
    {
      question: "How soon will I see results?",
      answer: "Results are both immediate and progressive. You'll notice an instant glow and smoother texture right after treatment due to enhanced product absorption and gentle exfoliation. Over the following weeks, you'll see continued improvement in texture, firmness, and overall radiance as collagen production increases. Optimal results develop with a series of 3-6 treatments."
    },
    {
      question: "How often should I get nanoneedling?",
      answer: "For corrective concerns like texture issues, scarring, or significant aging signs, we recommend a series of treatments every 2-4 weeks. For maintenance and ongoing skin health, monthly or quarterly treatments work beautifully. Many Tampa Bay clients incorporate nanoneedling into their regular facial rotation for consistent, cumulative results."
    },
    {
      question: "Can nanoneedling be combined with other treatments?",
      answer: "Absolutely! Nanoneedling is one of the most versatile treatments we offer. It pairs beautifully with microdermabrasion (for pre-exfoliation), chemical peels (scheduled strategically), and our customized facials. The micro-channels created during nanoneedling allow for deeper product penetration, making it an excellent complement to virtually any treatment."
    },
    {
      question: "Is nanoneedling safe for sensitive skin?",
      answer: "Yes! Because nanoneedling doesn't actually penetrate the skin like traditional microneedling, it's much gentler and suitable for most skin types, including sensitive skin. During your consultation, we'll assess your specific concerns and determine if nanoneedling is the right choice. We can also adjust the pressure and technique based on your skin's tolerance."
    }
  ];

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
          style={{ backgroundImage: `url("${nanoneedlingImage}")` }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-20">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <p className="text-sm tracking-wider text-bronze-light">COLLAGEN STIMULATION</p>
          </div>
          <h1 className="mb-6">Nanoneedling Facial</h1>
          <p className="text-2xl text-white/90 mb-4 font-light">
            Advanced Infusion for Texture, Firmness & Radiance
          </p>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            A gentle yet powerful Brandon facial for clients seeking anti-aging results without needles or downtime
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a href={squareBookingUrl} target="_blank" rel="noopener noreferrer">
              <Button className="btn-bronze px-10 py-6 text-base">
                Book Your Facial
              </Button>
            </a>
            <Button 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 px-10 py-6 text-base"
              onClick={() => document.getElementById('combos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Popular Combos
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70 pt-6 border-t border-white/20">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-bronze-light" />
              <span>{serviceDuration}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-bronze-light" />
              <span>$170</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-bronze-light" />
              <span>Zero Downtime</span>
            </div>
          </div>
        </div>
      </section>

      {/* What This Facial Is Best For */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-[#2c2c2c] mb-4">What This Facial Is Best For</h2>
            <div className="w-24 h-px bg-gradient-bronze mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-serif text-[#2c2c2c] mb-6">Ideal For:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-bronze rounded-full flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#2c2c2c]">Anti-aging focused clients</p>
                    <p className="text-sm text-[#6b6b6b]">Proactive approach to firmness and texture</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-bronze rounded-full flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#2c2c2c]">Needle-averse clients</p>
                    <p className="text-sm text-[#6b6b6b]">Want microneedling benefits without penetration</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-bronze rounded-full flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#2c2c2c]">Tampa Bay professionals</p>
                    <p className="text-sm text-[#6b6b6b]">Need powerful results with zero downtime</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-bronze rounded-full flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#2c2c2c]">Product penetration maximizers</p>
                    <p className="text-sm text-[#6b6b6b]">Enhance efficacy of professional-grade serums</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-[#2c2c2c] mb-6">Targets These Concerns:</h3>
              <div className="space-y-3">
                <div className="p-4 bg-[#faf8f5] border border-[#b8956a]/15">
                  <p className="font-medium text-[#2c2c2c] mb-1">Fine Lines & Wrinkles</p>
                  <p className="text-sm text-[#6b6b6b]">Stimulates collagen for smoother skin</p>
                </div>
                <div className="p-4 bg-[#faf8f5] border border-[#b8956a]/15">
                  <p className="font-medium text-[#2c2c2c] mb-1">Dull, Lackluster Tone</p>
                  <p className="text-sm text-[#6b6b6b]">Enhances radiance and cellular turnover</p>
                </div>
                <div className="p-4 bg-[#faf8f5] border border-[#b8956a]/15">
                  <p className="font-medium text-[#2c2c2c] mb-1">Uneven Texture</p>
                  <p className="text-sm text-[#6b6b6b]">Smooths rough patches and scarring</p>
                </div>
                <div className="p-4 bg-[#faf8f5] border border-[#b8956a]/15">
                  <p className="font-medium text-[#2c2c2c] mb-1">Loss of Firmness</p>
                  <p className="text-sm text-[#6b6b6b]">Promotes elasticity and plumpness</p>
                </div>
                <div className="p-4 bg-[#faf8f5] border border-[#b8956a]/15">
                  <p className="font-medium text-[#2c2c2c] mb-1">Enlarged Pores</p>
                  <p className="text-sm text-[#6b6b6b]">Refines and minimizes appearance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 bg-gradient-bronze-subtle border border-[#b8956a]/20">
            <p className="text-lg text-[#2c2c2c] leading-relaxed">
              <span className="font-semibold">Why this is one of the best facials in Tampa Bay:</span> Nanoneedling delivers the anti-aging, texture-refining benefits of microneedling without needles, pain, or recovery time. It's perfect for Brandon clients who want visible improvements but can't afford downtime or discomfort.
            </p>
          </div>
        </div>
      </section>

      {/* Results & Benefits */}
      <section className="py-24 px-4 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-[#2c2c2c] mb-4">Results, Benefits & The SkinByEmely Difference</h2>
            <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto">
              Advanced technology meets expert technique in this transformative treatment
            </p>
            <div className="w-24 h-px bg-gradient-bronze mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 card-premium">
              <div className="w-14 h-14 bg-gradient-bronze rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-serif text-[#2c2c2c] mb-4">Immediate Visible Results</h3>
              <ul className="space-y-2 text-[#6b6b6b]">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#b8956a] shrink-0 mt-1" />
                  <span>Luminous, glowing complexion</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#b8956a] shrink-0 mt-1" />
                  <span>Smoother, refined texture</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#b8956a] shrink-0 mt-1" />
                  <span>Plumper, more hydrated skin</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#b8956a] shrink-0 mt-1" />
                  <span>Enhanced product absorption at home</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 card-premium">
              <div className="w-14 h-14 bg-gradient-bronze rounded-full flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-serif text-[#2c2c2c] mb-4">Progressive Benefits</h3>
              <ul className="space-y-2 text-[#6b6b6b]">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#b8956a] shrink-0 mt-1" />
                  <span>Collagen production increases over time</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#b8956a] shrink-0 mt-1" />
                  <span>Fine lines soften with each treatment</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#b8956a] shrink-0 mt-1" />
                  <span>Skin firmness and elasticity improve</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#b8956a] shrink-0 mt-1" />
                  <span>Cumulative texture refinement</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 card-premium">
              <div className="w-14 h-14 bg-gradient-bronze rounded-full flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-serif text-[#2c2c2c] mb-4">Complete Treatment</h3>
              <ul className="space-y-2 text-[#6b6b6b]">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#b8956a] shrink-0 mt-1" />
                  <span>Full facial with extractions included</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#b8956a] shrink-0 mt-1" />
                  <span>Enzyme exfoliation pre-treatment</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#b8956a] shrink-0 mt-1" />
                  <span>Relaxing massage and custom mask</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#b8956a] shrink-0 mt-1" />
                  <span>Oxygen infusion add-on included</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-10 border-l-4 border-[#b8956a]">
            <h3 className="text-2xl font-serif text-[#2c2c2c] mb-4">The SkinByEmely Difference</h3>
            <p className="text-[#6b6b6b] leading-relaxed mb-4">
              We don't just perform nanoneedling. We include a complete customized facial treatment with every session. This means cleansing, enzyme exfoliation, extractions, massage, custom mask, and oxygen infusion, all carefully sequenced to prepare your skin for optimal nano infusion results.
            </p>
            <p className="text-[#6b6b6b] leading-relaxed">
              We also use professional-grade serums during the nanoneedling process, not basic formulations. The micro-channels created allow these potent ingredients to penetrate deeply for maximum efficacy. This comprehensive approach is what makes our nanoneedling treatment truly transformative, not just a quick add-on service.
            </p>
          </div>
        </div>
      </section>

      {/* Client-Favorite Combos */}
      <section id="combos" className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-[#2c2c2c] mb-4">Client-Favorite Combos & Enhancements</h2>
            <p className="text-lg text-[#6b6b6b]">Amplify your results with strategic treatment pairing</p>
            <div className="w-24 h-px bg-gradient-bronze mx-auto mt-6" />
          </div>

          <div className="space-y-6">
            {combos.map((combo, idx) => (
              <div key={idx} className="bg-[#faf8f5] p-8 border border-[#b8956a]/15 hover:border-[#b8956a]/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-serif text-[#2c2c2c] mb-2">{combo.service}</h3>
                    <p className="text-[#6b6b6b] mb-2">{combo.benefit}</p>
                    <p className="text-sm text-[#b8956a] italic">{combo.description}</p>
                  </div>
                  {combo.link.startsWith('/') ? (
                    <Link to={combo.link}>
                      <Button className="btn-outline-bronze whitespace-nowrap">
                        Learn More
                      </Button>
                    </Link>
                  ) : (
                    <a href={combo.link} target="_blank" rel="noopener noreferrer">
                      <Button className="btn-outline-bronze whitespace-nowrap">
                        Add to Booking
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8 bg-gradient-bronze-subtle border border-[#b8956a]/20">
            <p className="text-lg text-[#2c2c2c] mb-4">
              <span className="font-semibold">Most popular Brandon facial combo:</span> Microdermabrasion + Nanoneedling series
            </p>
            <p className="text-sm text-[#6b6b6b]">
              This powerhouse pairing delivers dramatic improvements in texture, firmness, and overall skin quality
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Recommended Products */}
      <section className="py-24 px-4 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-[#2c2c2c] mb-4">Products That Support Your Results</h2>
            <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto">
              Maximize your investment with these professional-grade formulations
            </p>
            <div className="w-24 h-px bg-gradient-bronze mx-auto mt-6" />
          </div>

          {productsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#b8956a] animate-spin" />
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8 mb-10">
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
              <Button className="btn-outline-bronze px-10 py-6 text-base">
                View All Products
              </Button>
            </Link>
          </div>

          <div className="mt-12 text-center text-sm text-[#6b6b6b] max-w-2xl mx-auto">
            <p>
              After nanoneedling, your skin's ability to absorb active ingredients is significantly enhanced. We'll recommend serums and treatments that work synergistically with your in-office results.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-[#2c2c2c] mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-[#6b6b6b]">Everything you need to know about nanoneedling</p>
            <div className="w-24 h-px bg-gradient-bronze mx-auto mt-6" />
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className="bg-[#faf8f5] border border-[#b8956a]/15 px-6"
              >
                <AccordionTrigger className="text-left font-serif text-lg text-[#2c2c2c] hover:text-[#b8956a] transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#6b6b6b] leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Final CTA */}
          <div className="mt-16 text-center p-12 bg-gradient-bronze text-white">
            <h3 className="text-3xl font-serif mb-4">Experience the Best Facial Brandon FL Offers for Anti-Aging</h3>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Join Tampa Bay clients discovering the power of nanoneedling: all the benefits, none of the downtime
            </p>
            <a href={squareBookingUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-[#2c2c2c] hover:bg-white/90 px-12 py-6 text-base font-medium">
                Schedule Your Tampa Bay Facial Today
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 px-4 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-serif text-[#2c2c2c] text-center mb-8">Explore Other Treatments</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/services/new-client-facial">
              <Button variant="outline" className="border-[#b8956a]/30 text-[#2c2c2c] hover:bg-[#b8956a]/10">
                New Client Facial
              </Button>
            </Link>
            <Link to="/services/dermaplane-deluxe">
              <Button variant="outline" className="border-[#b8956a]/30 text-[#2c2c2c] hover:bg-[#b8956a]/10">
                Dermaplane Deluxe
              </Button>
            </Link>
            <Link to="/services/microdermabrasion">
              <Button variant="outline" className="border-[#b8956a]/30 text-[#2c2c2c] hover:bg-[#b8956a]/10">
                Microdermabrasion
              </Button>
            </Link>
            <Link to="/services/cranberry-peel">
              <Button variant="outline" className="border-[#b8956a]/30 text-[#2c2c2c] hover:bg-[#b8956a]/10">
                Cranberry Turnover Peel
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="border-[#b8956a]/30 text-[#2c2c2c] hover:bg-[#b8956a]/10">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}