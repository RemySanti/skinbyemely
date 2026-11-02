export const SITE_URL = 'https://www.skinbyemely.com';
export const SITE_NAME = 'Skin by Emely';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface PageSeo {
  title: string;
  description: string;
  noindex?: boolean;
}

const DEFAULT_DESCRIPTION =
  'Skin by Emely — licensed esthetician in Brandon, FL offering customized facials, chemical peels, dermaplaning and professional skincare. Book online.';

/** Public pages: prerendered at build time and listed in the sitemap. */
export const PUBLIC_PAGES: Record<string, PageSeo> = {
  '/': {
    title: 'Skin by Emely | Facials & Skincare in Brandon, FL',
    description: DEFAULT_DESCRIPTION,
  },
  '/about': {
    title: 'About Emely | Licensed Esthetician in Brandon, FL',
    description:
      'Meet Emely, the licensed esthetician behind Skin by Emely in Brandon, FL. Results-driven facials and skincare with a relaxing, personal approach.',
  },
  '/contact': {
    title: 'Contact & Hours | Skin by Emely, Brandon FL',
    description:
      'Visit Skin by Emely at 1206 Millennium Parkway, Suite 2004, Brandon, FL. Call or text (914) 299-7739, or book your appointment online 24/7.',
  },
  '/products': {
    title: 'Shop Professional Skincare | Skin by Emely',
    description:
      'Shop esthetician-recommended professional skincare products from Skin by Emely in Brandon, FL. Cleansers, serums, moisturizers and SPF.',
  },
};

/** Private or transactional pages: kept out of search results. */
const PRIVATE_PAGES: Record<string, PageSeo> = {
  '/cart': { title: 'Your Cart | Skin by Emely', description: DEFAULT_DESCRIPTION, noindex: true },
  '/order-success': { title: 'Order Confirmed | Skin by Emely', description: DEFAULT_DESCRIPTION, noindex: true },
  '/owner-dashboard': { title: 'Owner Dashboard | Skin by Emely', description: DEFAULT_DESCRIPTION, noindex: true },
  '/square-setup': { title: 'Square Setup | Skin by Emely', description: DEFAULT_DESCRIPTION, noindex: true },
  '/square-service-ids': { title: 'Square Service IDs | Skin by Emely', description: DEFAULT_DESCRIPTION, noindex: true },
  '/square-product-ids': { title: 'Square Product IDs | Skin by Emely', description: DEFAULT_DESCRIPTION, noindex: true },
  '/product-catalog': { title: 'Product Catalog | Skin by Emely', description: DEFAULT_DESCRIPTION, noindex: true },
  '/quick-products': { title: 'Quick Products | Skin by Emely', description: DEFAULT_DESCRIPTION, noindex: true },
  '/stripe-migration': { title: 'Stripe Migration | Skin by Emely', description: DEFAULT_DESCRIPTION, noindex: true },
  '/design-system': { title: 'Design System | Skin by Emely', description: DEFAULT_DESCRIPTION, noindex: true },
};

export const NOT_FOUND_SEO: PageSeo = {
  title: 'Page Not Found | Skin by Emely',
  description: DEFAULT_DESCRIPTION,
  noindex: true,
};

export function seoForPath(pathname: string): PageSeo {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (path.startsWith('/products/')) {
    // ProductDetails sets its own tags once the product is known.
    return { title: 'Shop | Skin by Emely', description: PUBLIC_PAGES['/products'].description };
  }
  return PUBLIC_PAGES[path] ?? PRIVATE_PAGES[path] ?? NOT_FOUND_SEO;
}

/** Trim to a meta-description-friendly length on a word boundary. */
export function toMetaDescription(text: string | null | undefined, fallback: string): string {
  const clean = (text ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!clean) return fallback;
  if (clean.length <= 155) return clean;
  return `${clean.slice(0, 152).replace(/\s+\S*$/, '')}…`;
}
