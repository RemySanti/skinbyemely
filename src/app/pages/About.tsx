import { Button } from '../components/ui/button';
import { Award, Shield, Star, Heart, Clock, MapPin, Mail, Phone, Loader2, ShoppingBag } from 'lucide-react';
import emelyPhoto from 'figma:asset/34268fb14c0e84b9f3e7d02962fe4885d03f7cf9.png';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { stripeService, StripeProduct } from '../services/stripeService';
import { cartService } from '../services/cartService';
import { Link } from 'react-router-dom';
import { FadeInSection } from '../components/motion/FadeInSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { toast } from 'sonner';
import { SQUARE_BOOKING_URL } from '../components/BookingRedirect';
import { GoogleFiveStarVisual } from '../components/GoogleFiveStarVisual';

export default function About() {
  const [featuredProducts, setFeaturedProducts] = useState<StripeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const allProducts = await stripeService.getProducts();
        setFeaturedProducts(allProducts.slice(0, 3));
      } catch (err) {
        console.error('Failed to load featured products', err);
      } finally {
        setLoading(false);
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

  return (
    <div className="bg-[#faf8f5]">
      {/* 1. Bio Section */}
      <section className="pt-20 pb-16 md:pt-24 md:pb-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
            <FadeInSection className="relative">
              <div className="aspect-[3/4] relative overflow-hidden">
                <ImageWithFallback
                  src={emelyPhoto}
                  alt="Emely - Licensed Aesthetician & Owner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-[#b8956a]/30 -z-10 hidden md:block" />
            </FadeInSection>
            
            <FadeInSection delay={0.2}>
              <span className="text-sm tracking-wider text-[#b8956a] mb-4 block uppercase font-medium">Licensed esthetician & Owner</span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2c2c2c] mb-6">
                Emely
              </h2>
              <div className="w-16 h-px bg-gradient-bronze mb-6" />
              
              <div className="space-y-5 text-lg text-[#4a4a4a] leading-relaxed">
                <p>
                  As a Licensed Esthetician with five years of experience and the proud owner of Skin by Emely LLC for the past four years in Florida, I've dedicated my career to providing personalized and intentional skincare services. My mission is to create a safe and welcoming environment where every guest can not only achieve healthy skin but also find a sense of relaxation for their mind, body, and soul.
                </p>
                <p>
                  At Skin by Emely, my approach to skincare goes beyond the surface. I have built a reputation for my magic touch, particularly known for the exceptional neck, shoulder, and scalp massages I integrate into my treatments. These elements not only enhance the effectiveness of the services but also elevate the overall experience for my guests.
                </p>
                <p>
                  Skincare is not just about the products or techniques; it's about the relationship I build with my clients. I take pride in the bonds I've formed and strive to ensure that everyone who steps into my space leaves feeling not only beautiful but also deeply cared for.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#b8956a]/15">
                <p className="text-xs uppercase tracking-[0.2em] text-[#b8956a] mb-4 font-medium">
                  Professional Credentials
                </p>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <img
                    src="/certifications/circadia-acne-specialist.png"
                    alt="Circadia Skin Specialist certification in Acne"
                    className="w-36 h-36 object-contain flex-shrink-0"
                    width={144}
                    height={144}
                    loading="lazy"
                  />
                  <div className="text-center sm:text-left">
                    <p className="font-serif text-xl text-[#2c2c2c] mb-2">
                      Circadia Skin Specialist
                    </p>
                    <p className="text-[#6b6b6b] text-base leading-relaxed">
                      Certified in acne-focused skincare through Circadia, a professional-grade line trusted in clinical settings.
                    </p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="pt-12 pb-10 md:pt-14 md:pb-12 px-4 bg-[#faf8f5]">
        <FadeInSection className="max-w-3xl mx-auto">
          <GoogleFiveStarVisual />
        </FadeInSection>
      </section>

      {/* 2. Curated Products */}
      <section className="pb-16 md:pb-20 px-4 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          <FadeInSection className="text-center mb-10 md:mb-12">
            <div className="w-16 h-px bg-gradient-bronze mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-serif text-[#2c2c2c] mb-4">
              Curated For You
            </h2>
            <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto">
              Hand-picked skincare essentials chosen specifically for our community
            </p>
          </FadeInSection>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#b8956a] animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <FadeInSection key={product.id} className="bg-white group hover:shadow-2xl transition-all duration-500 border border-[#b8956a]/10 overflow-hidden flex flex-col">
                  {/* Product Image */}
                  <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-gradient-to-br from-[#faf8f5] to-[#f5f0e8]">
                    {product.images && product.images.length > 0 ? (
                      <ImageWithFallback
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-8">
                         <div className="w-20 h-20 rounded-full bg-white border-2 border-[#b8956a]/20 flex items-center justify-center">
                            <span className="text-3xl font-serif text-[#b8956a]">
                              {product.name.charAt(0)}
                            </span>
                         </div>
                      </div>
                    )}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-bronze"></div>
                  </Link>
                  
                  {/* Product Details */}
                  <div className="p-8 flex flex-col flex-grow text-center">
                    <Link to={`/products/${product.id}`}>
                        <h3 className="font-serif text-2xl text-[#2c2c2c] mb-3 leading-tight group-hover:text-[#b8956a] transition-colors">
                        {product.name}
                        </h3>
                    </Link>

                    {product.price && (
                      <div className="mb-4">
                        <span className="text-2xl font-serif text-[#b8956a]">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    )}
                    
                    <div className="mt-auto space-y-3">
                      <Button
                        onClick={() => handleAddToCart(product)}
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
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          )}
          
          <FadeInSection delay={0.3} className="text-center mt-10">
            <Link to="/products">
              <Button className="btn-outline-bronze px-8 py-3 rounded hover:shadow-md transition-all">
                View All Favorites
              </Button>
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* 3. Reviews */}
      <TestimonialsSection />

      {/* 4. Contact & Hours */}
      <section className="py-16 md:py-20 px-4 bg-[#faf8f5]">
        <div className="max-w-5xl mx-auto">
          <FadeInSection className="text-center mb-10 md:mb-12">
             <div className="w-16 h-px bg-gradient-bronze mx-auto mb-6" />
             <h2 className="text-4xl font-serif text-[#2c2c2c] mb-4">Contact & Hours</h2>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Column */}
            <FadeInSection className="bg-white p-10 border border-[#b8956a]/10 shadow-sm text-center md:text-left">
              <h3 className="text-sm font-bold tracking-widest uppercase text-[#2c2c2c] mb-8 border-b border-[#b8956a]/20 pb-4 inline-block md:block">
                Get In Touch
              </h3>
              
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#faf8f5] flex items-center justify-center text-[#b8956a] flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-serif text-lg text-[#2c2c2c] mb-1">Email Us</p>
                    <a href="mailto:skinbyemely@gmail.com" className="text-[#6b6b6b] hover:text-[#b8956a] transition-colors">
                      skinbyemely@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#faf8f5] flex items-center justify-center text-[#b8956a] flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-serif text-lg text-[#2c2c2c] mb-1">Call Us</p>
                    <a href="tel:9142997739" className="text-[#6b6b6b] hover:text-[#b8956a] transition-colors">
                      (914) 299-7739
                    </a>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#faf8f5] flex items-center justify-center text-[#b8956a] flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-serif text-lg text-[#2c2c2c] mb-1">Visit Us</p>
                    <p className="text-[#6b6b6b] leading-relaxed">
                      1206 Millennium Parkway, Suite 2004<br/>
                      Brandon, FL 33511
                    </p>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Hours Column */}
            <FadeInSection delay={0.2} className="bg-white p-10 border border-[#b8956a]/10 shadow-sm text-center md:text-left">
              <h3 className="text-sm font-bold tracking-widest uppercase text-[#2c2c2c] mb-8 border-b border-[#b8956a]/20 pb-4 inline-block md:block">
                Studio Hours
              </h3>

              <div className="space-y-4">
                {[
                  { day: "Monday", hours: "Closed" },
                  { day: "Tuesday", hours: "11:00 am – 4:00 pm" },
                  { day: "Wednesday", hours: "10:30 am – 8:00 pm" },
                  { day: "Thursday", hours: "10:30 am – 8:00 pm" },
                  { day: "Friday", hours: "10:00 am – 8:00 pm" },
                  { day: "Saturday", hours: "9:00 am – 4:00 pm" },
                  { day: "Sunday", hours: "9:00 am – 3:00 pm" },
                ].map((schedule, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[#6b6b6b] border-b border-dashed border-[#b8956a]/10 last:border-0 pb-2 last:pb-0">
                    <span className="font-medium text-[#2c2c2c]">{schedule.day}</span>
                    <span className="text-sm">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center md:text-left">
                 <a
                    href={SQUARE_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="btn-bronze px-8 py-3 rounded hover:shadow-md transition-all w-full md:w-auto">
                      Book Appointment
                    </Button>
                </a>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>
    </div>
  );
}