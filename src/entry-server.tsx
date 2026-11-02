import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import App from "./app/App.tsx";
import { stripeService, type StripeProduct } from "./app/services/stripeService";

export { PUBLIC_PAGES, SITE_URL } from "./app/config/seo";

/** Render one route to HTML for scripts/prerender.mjs. */
export function render(url: string, products: StripeProduct[] | null) {
  if (products) stripeService.seedProducts(products);
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );
  const h = helmetContext.helmet!;
  const head = [h.title, h.priority, h.meta, h.link, h.script].map((part) => part.toString()).join("\n    ");
  return { html, head };
}
