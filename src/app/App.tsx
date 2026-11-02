import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import OrderSuccess from './pages/OrderSuccess';
import BookingRedirect from './components/BookingRedirect';
import { RouteSeo } from './components/Seo';
import { BrandingProvider } from './context/BrandingContext';
import { Toaster } from './components/ui/sonner';

// Internal tools: loaded on demand so they stay out of the public bundle
const SquareSetup = lazy(() => import('./pages/SquareSetup'));
const SquareServiceIDs = lazy(() => import('./pages/SquareServiceIDs'));
const SquareProductIDs = lazy(() => import('./pages/SquareProductIDs'));
const ProductCatalog = lazy(() => import('./pages/ProductCatalog'));
const QuickProductList = lazy(() => import('./pages/QuickProductList'));
const StripeMigration = lazy(() => import('./pages/StripeMigration'));
const OwnerDashboard = lazy(() => import('./pages/OwnerDashboard'));
const DesignSystem = lazy(() => import('./pages/DesignSystem'));

const internal = (page: ReactNode) => <Suspense fallback={null}>{page}</Suspense>;

function App() {
  // Google Tag (gtag.js) - Google Ads AW-17772761578
  useEffect(() => {
    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17772761578';
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'AW-17772761578');

    return () => {
      // Cleanup script on unmount
      document.head.removeChild(script);
    };
  }, []);

  // Microsoft Clarity - Project ID: vtryr1sh4s
  useEffect(() => {
    (function(c: any, l: any, a: any, r: string, i: string) {
      c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments); };
      const t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = 'https://www.clarity.ms/tag/' + i;
      const y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', 'vtryr1sh4s');
  }, []);

  return (
    <BrandingProvider>
      <RouteSeo />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services/*" element={<BookingRedirect />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="square-setup" element={internal(<SquareSetup />)} />
          <Route path="square-service-ids" element={internal(<SquareServiceIDs />)} />
          <Route path="square-product-ids" element={internal(<SquareProductIDs />)} />
          <Route path="product-catalog" element={internal(<ProductCatalog />)} />
          <Route path="quick-products" element={internal(<QuickProductList />)} />
          <Route path="stripe-migration" element={internal(<StripeMigration />)} />
          <Route path="owner-dashboard" element={internal(<OwnerDashboard />)} />
          <Route path="design-system" element={internal(<DesignSystem />)} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </BrandingProvider>
  );
}

export default App;