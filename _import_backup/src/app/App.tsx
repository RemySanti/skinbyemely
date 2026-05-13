import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import SquareSetup from './pages/SquareSetup';
import SquareServiceIDs from './pages/SquareServiceIDs';
import SquareProductIDs from './pages/SquareProductIDs';
import ProductCatalog from './pages/ProductCatalog';
import QuickProductList from './pages/QuickProductList';
import StripeMigration from './pages/StripeMigration';
import OwnerDashboard from './pages/OwnerDashboard';
import DesignSystem from './pages/DesignSystem';
import OrderSuccess from './pages/OrderSuccess';
import NewClientFacial from './pages/services/NewClientFacial';
import Microdermabrasion from './pages/services/Microdermabrasion';
import DermaplaneDeluxe from './pages/services/DermaplaneDeluxe';
import CranberryPeel from './pages/services/CranberryPeel';
import Nanoneedling from './pages/services/Nanoneedling';
import { Toaster } from './components/ui/sonner';

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
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services/new-client-facial" element={<NewClientFacial />} />
          <Route path="services/microdermabrasion" element={<Microdermabrasion />} />
          <Route path="services/dermaplane-deluxe" element={<DermaplaneDeluxe />} />
          <Route path="services/cranberry-peel" element={<CranberryPeel />} />
          <Route path="services/nanoneedling" element={<Nanoneedling />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="square-setup" element={<SquareSetup />} />
          <Route path="square-service-ids" element={<SquareServiceIDs />} />
          <Route path="square-product-ids" element={<SquareProductIDs />} />
          <Route path="product-catalog" element={<ProductCatalog />} />
          <Route path="quick-products" element={<QuickProductList />} />
          <Route path="stripe-migration" element={<StripeMigration />} />
          <Route path="owner-dashboard" element={<OwnerDashboard />} />
          <Route path="design-system" element={<DesignSystem />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;