import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import SquareSetup from "../pages/SquareSetup";
import SquareServiceIDs from "../pages/SquareServiceIDs";
import SquareProductIDs from "../pages/SquareProductIDs";
import ProductCatalog from "../pages/ProductCatalog";
import QuickProductList from "../pages/QuickProductList";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "square-setup", Component: SquareSetup },
      { path: "square-service-ids", Component: SquareServiceIDs },
      { path: "square-product-ids", Component: SquareProductIDs },
      { path: "product-catalog", Component: ProductCatalog },
      { path: "quick-products", Component: QuickProductList },
      { path: "*", Component: NotFound },
    ],
  },
]);