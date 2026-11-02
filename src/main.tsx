import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./app/App.tsx";
import { stripeService } from "./app/services/stripeService";
import "./styles/index.css";

// Prerendered shop pages embed the product list so the first client render matches the HTML.
const prerendered = (window as any).__SBE_PRODUCTS__;
if (Array.isArray(prerendered)) stripeService.seedProducts(prerendered);

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);
