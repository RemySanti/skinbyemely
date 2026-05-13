import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Gift } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cartService } from '../services/cartService';
import { CartDrawer } from './CartDrawer';
import { fadeUpVariants, staggerContainer, EASE_LUXURY } from '../utils/motion';

const NAV_ITEMS = [
  { path: '/services/new-client-facial', label: 'Services', dropdown: true },
  { path: '/products', label: 'Shop' },
  { path: 'https://www.circadiaretailer.com/dealer/497593?_kx=XXrn6waUCdTfzkbdRt4zWeRTu2pNDFFKNVuByldqoJE.UTWvrc&utm_source=ig&utm_medium=social&utm_content=link_in_bio', label: 'Circadia', external: true },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' }
];

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    const handleOpenDrawer = () => setCartDrawerOpen(true);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('open-cart-drawer', handleOpenDrawer);
    
    // Subscribe to cart changes using the service
    setCartCount(cartService.getItemCount());
    const unsubscribeCart = cartService.subscribeToCart((cart) => {
        setCartCount(cart.itemCount);
    });

    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('open-cart-drawer', handleOpenDrawer);
        unsubscribeCart();
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    // Removed duplicate cart update logic here as subscription handles it
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
      
      {/* Utility Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_LUXURY, delay: 0.1 }}
        className="bg-white border-b border-neutral-100 py-2 px-4 md:px-8"
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium">
          <a href="tel:9142997739" className="hover:text-[#b8956a] transition-colors">
            (914) 299-7739
          </a>
          <a 
            href="https://www.google.com/maps/search/?api=1&query=1111+Oakfield+Dr+Brandon+FL+33511"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#b8956a] transition-colors text-right"
          >
            Brandon, FL
          </a>
        </div>
      </motion.div>

      {/* Main Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_LUXURY }}
        className={`sticky top-0 z-50 bg-[#faf8f5]/95 backdrop-blur-sm transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-6 md:py-8'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="relative flex items-center justify-between">
            
            {/* Desktop Navigation (Left) */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="hidden lg:flex items-center gap-8 flex-1 justify-start"
            >
              {NAV_ITEMS.map((item) => (
                <motion.div key={item.label} variants={fadeUpVariants} className="relative group">
                  {item.external ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative py-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 font-medium text-neutral-500 hover:text-[#b8956a]`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link 
                      to={item.path}
                      className={`relative py-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 font-medium ${
                        location.pathname === item.path || (item.dropdown && location.pathname.startsWith('/services'))
                          ? 'text-[#171717]' 
                          : 'text-neutral-500 hover:text-[#b8956a]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.dropdown && (
                    <div className="absolute top-full left-0 mt-6 w-64 bg-white border border-neutral-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-[0_2px_20px_rgba(0,0,0,0.04)] p-2">
                      <Link to="/services/new-client-facial" className="block px-4 py-3 text-xs uppercase tracking-widest text-neutral-500 hover:bg-[#faf8f5] hover:text-[#b8956a] transition-colors">
                        New Client Facial
                      </Link>
                      <Link to="/services/microdermabrasion" className="block px-4 py-3 text-xs uppercase tracking-widest text-neutral-500 hover:bg-[#faf8f5] hover:text-[#b8956a] transition-colors">
                        Microdermabrasion
                      </Link>
                      <Link to="/services/dermaplane-deluxe" className="block px-4 py-3 text-xs uppercase tracking-widest text-neutral-500 hover:bg-[#faf8f5] hover:text-[#b8956a] transition-colors">
                        Dermaplane Deluxe
                      </Link>
                      <Link to="/services/cranberry-peel" className="block px-4 py-3 text-xs uppercase tracking-widest text-neutral-500 hover:bg-[#faf8f5] hover:text-[#b8956a] transition-colors">
                        Cranberry Peel
                      </Link>
                      <Link to="/services/nanoneedling" className="block px-4 py-3 text-xs uppercase tracking-widest text-neutral-500 hover:bg-[#faf8f5] hover:text-[#b8956a] transition-colors">
                        Nanoneedling
                      </Link>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile: Hamburger (Left) */}
            <div className="lg:hidden z-20 flex-1 flex justify-start">
              <button 
                className="p-2 -ml-2 text-[#171717] hover:text-[#b8956a] transition-colors"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Logo (Absolute Center) */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-auto text-center">
              <Link to="/" className="group block">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: EASE_LUXURY }}
                  className="flex flex-col items-center"
                >
                  <h2 
                    className={`font-bold tracking-tight text-[#171717] leading-[0.8] transition-all duration-500 ${
                      scrolled ? 'text-4xl md:text-5xl' : 'text-5xl md:text-7xl'
                    }`}
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    SKIN
                  </h2>
                  <p 
                    className={`text-neutral-500 relative z-10 transition-all duration-500 ${
                      scrolled 
                        ? 'text-lg md:text-xl -mt-1 md:-mt-1 ml-6 md:ml-8' 
                        : 'text-xl md:text-3xl -mt-1 md:-mt-2 ml-8 md:ml-12'
                    }`}
                    style={{ fontFamily: "'Pinyon Script', cursive" }}
                  >
                    by Emely
                  </p>
                </motion.div>
              </Link>
            </div>

            {/* Desktop: CTAs (Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE_LUXURY, delay: 0.2 }}
              className="hidden lg:flex items-center gap-8 flex-1 justify-end"
            >
              {/* Desktop Cart Icon */}
              <button 
                onClick={() => setCartDrawerOpen(true)}
                className="relative text-neutral-500 hover:text-[#b8956a] transition-colors p-1"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#b8956a] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>

              <a 
                href="https://squareup.com/gift/ML0X3P3R6NZSY/order"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.15em] text-neutral-500 hover:text-[#b8956a] transition-colors font-medium"
              >
                Gift Cards
              </a>
              <a 
                href="https://book.squareup.com/appointments/f7dcst2ljp85dq/location/LMVSQK9C6PR4T/services?buttonTextColor=ffffff&color=000000&locale=en&referrer=so"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#d4bb8f] hover:bg-[#cbbea7] text-white px-8 py-3 text-xs uppercase tracking-[0.15em] font-medium transition-colors min-w-[140px]"
                >
                  Book Now
                </motion.button>
              </a>
            </motion.div>

            {/* Mobile: Book Now (Right) */}
            <div className="lg:hidden flex items-center justify-end flex-1 z-20 gap-4">
              {cartCount > 0 && (
                <button onClick={() => setCartDrawerOpen(true)} className="relative text-[#171717]">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-[#b8956a] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                </button>
              )}
              <a 
                href="https://book.squareup.com/appointments/f7dcst2ljp85dq/location/LMVSQK9C6PR4T/services?buttonTextColor=ffffff&color=000000&locale=en&referrer=so"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-[#d4bb8f] text-white px-5 py-2 text-[10px] uppercase tracking-[0.15em] font-medium">
                  Book
                </button>
              </a>
            </div>

          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Portal (Moved outside header to avoid transform clipping) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "tween", ease: EASE_LUXURY, duration: 0.5 }}
              className="fixed inset-y-0 right-0 w-[300px] bg-[#faf8f5] z-[101] lg:hidden shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-end p-6">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#171717] hover:text-[#b8956a] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="px-8 pb-12 flex flex-col space-y-8">
                {NAV_ITEMS.map((item, index) => (
                  <motion.div 
                    key={item.label} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (index * 0.1), duration: 0.4 }}
                    className="w-full text-left"
                  >
                    {item.dropdown ? (
                      <div className="space-y-4">
                        <span className="block text-2xl font-serif text-[#171717]">
                          {item.label}
                        </span>
                        <div className="flex flex-col gap-4 pl-4 border-l border-neutral-200/50">
                           <Link 
                            to="/services/new-client-facial" 
                            className="text-sm text-neutral-500 uppercase tracking-widest"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            New Client Facial
                          </Link>
                          <Link 
                            to="/services/microdermabrasion" 
                            className="text-sm text-neutral-500 uppercase tracking-widest"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Microdermabrasion
                          </Link>
                          <Link 
                            to="/services/dermaplane-deluxe" 
                            className="text-sm text-neutral-500 uppercase tracking-widest"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Dermaplane Deluxe
                          </Link>
                          <Link 
                            to="/services/cranberry-peel" 
                            className="text-sm text-neutral-500 uppercase tracking-widest"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Cranberry Peel
                          </Link>
                           <Link 
                            to="/services/nanoneedling" 
                            className="text-sm text-neutral-500 uppercase tracking-widest"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Nanoneedling
                          </Link>
                        </div>
                      </div>
                    ) : item.external ? (
                       <a 
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-2xl font-serif text-[#171717]"
                       >
                        {item.label}
                       </a>
                    ) : (
                      <Link 
                        to={item.path} 
                        className="block text-2xl font-serif text-[#171717]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                
                <div className="w-12 h-px bg-[#b8956a]/30 my-4" />
                
                <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.6 }}
                   className="flex flex-col gap-4"
                >
                  <a 
                    href="https://squareup.com/gift/ML0X3P3R6NZSY/order"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full border border-[#b8956a] text-[#b8956a] px-6 py-3 text-xs uppercase tracking-widest font-medium rounded flex items-center justify-center gap-2 hover:bg-[#b8956a] hover:text-white transition-all">
                      <Gift className="w-4 h-4" />
                      Gift Cards
                    </button>
                  </a>
                  <a 
                    href="https://book.squareup.com/appointments/f7dcst2ljp85dq/location/LMVSQK9C6PR4T/services?buttonTextColor=ffffff&color=000000&locale=en&referrer=so"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full bg-[#d4bb8f] text-white px-8 py-3 text-xs uppercase tracking-widest font-medium rounded hover:bg-[#cbbea7] transition-all">
                      Book Now
                    </button>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-32 py-20 px-4 bg-[#2c2c2c] text-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            <div>
              <div className="mb-6">
                <h3 
                  className="text-4xl font-bold tracking-tight text-[#d4bb8f] leading-[0.8]"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  SKIN
                </h3>
                <p 
                  className="text-xl text-[#faf8f5]/80 -mt-2 ml-10 relative z-10"
                  style={{ fontFamily: "'Pinyon Script', cursive" }}
                >
                  by Emely
                </p>
              </div>
              <div className="w-12 h-px bg-gradient-bronze mb-6" />
              <p className="text-[#faf8f5]/80 leading-relaxed">
                Brandon's premier destination for clinical luxury skincare. Experience the perfect fusion of expertise, science, and sophistication.
              </p>
            </div>
            <div>
              <h4 className="mb-6 tracking-wider">LOCATION</h4>
              <div className="space-y-3 text-[#faf8f5]/80">
                <p>1111 Oakfield Dr</p>
                <p>Brandon, FL 33511</p>
                <a href="tel:9142997739" className="block hover:text-[#d4bb8f] transition-colors">
                  (914) 299-7739
                </a>
              </div>
            </div>
            <div>
              <h4 className="mb-6 tracking-wider">EXPLORE</h4>
              <div className="space-y-3">
                <Link to="/products" className="block text-[#faf8f5]/80 hover:text-[#d4bb8f] transition-colors">
                  Professional Products
                </Link>
                <Link to="/about" className="block text-[#faf8f5]/80 hover:text-[#d4bb8f] transition-colors">
                  About
                </Link>
                <Link to="/product-catalog" className="block text-[#faf8f5]/80 hover:text-[#d4bb8f] transition-colors">
                  Product Catalog
                </Link>
              </div>
            </div>
          </div>
          
          {/* Footer CTA */}
          <div className="border-t border-[#faf8f5]/10 pt-12 pb-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-xl font-serif text-[#d4bb8f] mb-2">Ready to Transform Your Skin?</h4>
                <p className="text-[#faf8f5]/70">Book your personalized treatment today</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <button className="px-8 py-4 rounded hover:shadow-lg transition-all flex items-center gap-2 bg-transparent border-2 border-[#b8956a] text-[#d4bb8f] hover:bg-[#b8956a]/10">
                    <ShoppingBag className="w-5 h-5" />
                    Shop Products
                  </button>
                </Link>
                <a 
                  href="https://book.squareup.com/appointments/f7dcst2ljp85dq/location/LMVSQK9C6PR4T/services?buttonTextColor=ffffff&color=000000&locale=en&referrer=so"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-gradient-to-r from-[#b8956a] to-[#d4bb8f] text-white px-8 py-4 rounded hover:shadow-lg transition-all">
                    Book Now
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#faf8f5]/10 text-center text-[#faf8f5]/60 text-sm relative">
            <p>Serving discerning clients in Brandon, Valrico, and Tampa Bay</p>
            <p className="mt-2">&copy; {new Date().getFullYear()} SkinByEmely. All rights reserved.</p>
            <Link 
              to="/owner-dashboard" 
              className="absolute bottom-0 right-4 text-[#faf8f5]/40 hover:text-[#b8956a] transition-colors text-xs"
            >
              Owner
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}