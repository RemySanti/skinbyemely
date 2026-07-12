export type HomeTaglineVariant =
  | 'classic'
  | 'headline-subtitle'
  | 'dual-cta'
  | 'trust-pillars'
  | 'rotating-focus'
  | 'stat-strip'
  | 'credential-highlight'
  | 'marquee-keywords'
  | 'split-editorial'
  | 'action-bar';

export interface HomeTaglineBlock {
  id: string;
  label: string;
  description: string;
  variant: HomeTaglineVariant;
  headline: string;
  subtitle?: string;
}

/** 10 homepage block options — each with distinct layout and features */
export const HOME_TAGLINE_BLOCKS: HomeTaglineBlock[] = [
  {
    id: 'intentional-touch',
    label: 'Classic Statement',
    description: 'Bronze divider with elegant serif headline — clean and minimal.',
    variant: 'classic',
    headline: 'Intentional Touch',
  },
  {
    id: 'headline-subtitle',
    label: 'Headline + Subtitle',
    description: 'Main phrase with a supporting line of brand copy underneath.',
    variant: 'headline-subtitle',
    headline: 'Intentional Touch',
    subtitle: 'Clinical luxury skincare, thoughtfully tailored to you.',
  },
  {
    id: 'dual-cta',
    label: 'Headline + Buttons',
    description: 'Tagline with Book Now and About links for immediate action.',
    variant: 'dual-cta',
    headline: 'Your Skin, Elevated',
    subtitle: 'Book a treatment or explore our philosophy.',
  },
  {
    id: 'trust-pillars',
    label: 'Trust Pillars',
    description: 'Three icon badges — Licensed, Circadia, Personalized — under the headline.',
    variant: 'trust-pillars',
    headline: 'Care With Purpose',
  },
  {
    id: 'rotating-focus',
    label: 'Rotating Focus',
    description: 'Animated words cycle through your core services every few seconds.',
    variant: 'rotating-focus',
    headline: 'Expert care for',
  },
  {
    id: 'stat-strip',
    label: 'Stat Strip',
    description: 'Quick credibility row — years of experience, licensing, and location.',
    variant: 'stat-strip',
    headline: 'Clinical Luxury',
  },
  {
    id: 'credential-highlight',
    label: 'Credential Highlight',
    description: 'Circadia Skin Specialist badge with acne certification callout.',
    variant: 'credential-highlight',
    headline: 'Science-Backed Skincare',
    subtitle: 'Circadia Skin Specialist · Acne Certified',
  },
  {
    id: 'marquee-keywords',
    label: 'Marquee Scroll',
    description: 'Continuous scrolling brand keywords for a dynamic, editorial feel.',
    variant: 'marquee-keywords',
    headline: 'Beyond the Surface',
  },
  {
    id: 'split-editorial',
    label: 'Split Editorial',
    description: 'Headline on the left, brand quote on the right — magazine-style layout.',
    variant: 'split-editorial',
    headline: 'Where Skin Feels Seen',
    subtitle:
      'Skincare is not just about products or techniques — it is about the relationship built with every guest.',
  },
  {
    id: 'action-bar',
    label: 'Action Bar',
    description: 'Headline with phone number and Book Now button in one horizontal bar.',
    variant: 'action-bar',
    headline: 'Ready for Your Next Visit?',
    subtitle: 'Brandon · Valrico · Tampa Bay',
  },
];

export const DEFAULT_HOME_TAGLINE_ID = 'intentional-touch';

export function getHomeTaglineById(id: string): HomeTaglineBlock {
  return HOME_TAGLINE_BLOCKS.find((t) => t.id === id) ?? HOME_TAGLINE_BLOCKS[0];
}

/** @deprecated Use HOME_TAGLINE_BLOCKS */
export const HOME_TAGLINES = HOME_TAGLINE_BLOCKS;
