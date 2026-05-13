export type SkinIntent =
  | "acne"
  | "texture"
  | "aging"
  | "glow"
  | "sensitivity";

export type Recommendation = {
  primary: string;
  secondary: string[];
  atHome?: string;
  outcome: string;
  downtime: string;
  why: string;
  socialProof: string;
};

export const concernTags: Record<SkinIntent, string> = {
  acne: "acne_intent",
  texture: "texture_intent",
  aging: "antiaging_intent",
  glow: "maintenance_intent",
  sensitivity: "barrier_repair_intent"
};

export const recommendations: Record<SkinIntent, Recommendation> = {
  acne: {
    primary: "Clarifying Acne Reset Facial",
    secondary: ["Blue LED Add-On", "Calming Enzyme Peel"],
    atHome: "BHA + Niacinamide Balance Kit",
    outcome: "Reduced active breakouts and calmer inflammation.",
    downtime: "None to low redness for 2-4 hours.",
    why: "Targets congestion and acne bacteria while protecting barrier function.",
    socialProof: "Best for inflamed and hormonal breakouts."
  },
  texture: {
    primary: "Resurfacing Texture Renewal",
    secondary: ["Dermaplane Upgrade", "Pore Refining Mask"],
    atHome: "Gentle Retinol + Enzyme Duo",
    outcome: "Smoother skin texture and visibly smaller-looking pores.",
    downtime: "Mild flaking for up to 48 hours.",
    why: "Combines exfoliation and turnover support to clear congestion.",
    socialProof: "Ideal for roughness, dullness, and clogged pores."
  },
  aging: {
    primary: "Collagen Lift Signature",
    secondary: ["Microcurrent Sculpt", "LED Therapy"],
    atHome: "Peptide + Vitamin C Repair Set",
    outcome: "Firmer appearance and softened fine lines.",
    downtime: "No downtime.",
    why: "Stimulates collagen pathways while deeply hydrating the skin.",
    socialProof: "Most booked for fine lines and loss of elasticity."
  },
  glow: {
    primary: "Radiance Maintenance Facial",
    secondary: ["Oxygen Infusion", "Hydration Booster"],
    atHome: "Daily Glow Essentials Bundle",
    outcome: "Brighter tone with smoother, hydrated finish.",
    downtime: "None.",
    why: "Maintains healthy cell turnover and hydration for sustained glow.",
    socialProof: "Perfect monthly maintenance for healthy skin."
  },
  sensitivity: {
    primary: "Barrier Repair Recovery Facial",
    secondary: ["Red LED Calm Session", "Microbiome Mask"],
    atHome: "Barrier Rebuild Skincare Kit",
    outcome: "Less redness, less irritation, stronger skin comfort.",
    downtime: "None.",
    why: "Focuses on anti-inflammatory support and lipid replenishment.",
    socialProof: "Designed for sensitized, reactive skin."
  }
};

export const lifecycleStages = [
  "new_visitor",
  "lead",
  "booked_client",
  "returning_client",
  "vip_client",
  "inactive_client"
];

export const memberships = [
  {
    name: "Glow Membership",
    description: "Monthly express facial, product discounts, and priority booking.",
    idealFor: "Clients focused on maintenance, hydration, and consistent radiance."
  },
  {
    name: "Acne Recovery Membership",
    description: "Monthly corrective facial, progress check-ins, and homecare guidance.",
    idealFor: "Clients managing breakouts, post-inflammatory marks, and barrier stress."
  },
  {
    name: "Luxury Ritual Membership",
    description: "Premium monthly treatment with seasonal upgrades and VIP perks.",
    idealFor: "Clients wanting high-touch anti-aging and elevated self-care rituals."
  }
];

export const emelyMethod = [
  "Analyze",
  "Correct",
  "Strengthen",
  "Maintain",
  "Transform"
];

export const personas = [
  {
    title: "Skin Recovery Professional",
    profile: "Age 26-38, high-achieving, overwhelmed by acne and inconsistent routines.",
    needs: "Clinical trust, clear plan, emotional reassurance."
  },
  {
    title: "Luxury Self-Care Client",
    profile: "Age 30-50, wellness-focused, invests in elevated experiences.",
    needs: "Calm rituals, visible results, premium consistency."
  },
  {
    title: "Preventative Gen Z Client",
    profile: "Age 18-27, social-first, interested in glow and prevention.",
    needs: "Educational content, visual proof, trend-aligned care."
  },
  {
    title: "Male Grooming Client",
    profile: "Professionals with texture, beard-area breakouts, and ingrowns.",
    needs: "Neutral messaging, performance-driven skincare maintenance."
  }
];

export const seoKeywords = [
  "Best facial Brandon FL",
  "Acne facial Tampa",
  "Dermaplaning Brandon FL",
  "Luxury facial Tampa",
  "Sensitive skin facial Brandon"
];

export const brandImages = {
  hero: "/d6da4352e74888a3d0e5b25b14407b8a6dd8efa3.png",
  founder: "/34268fb14c0e84b9f3e7d02962fe4885d03f7cf9.png",
  science: "/b66e647ec4d5cc9d4d4331ac9d43ce631d6207b8.png",
  facial: "/52e70ed822f015234a068fbbac1d71aa8bb344e3.png",
  service1: "/9216485faed7ea841dbf97e63a06906a4f46ca09.png",
  service2: "/e014296d9c8b4212c1d37bb102b46017af36a931.png",
  service3: "/3f03dd72ae79d0ca0cb8025c13489963aa642a54.png",
  service4: "/5dbd79ceeebd187fe907867e0823cb5787e06705.png"
};

export const marketTrends = [
  "Preventative skincare is pulling younger clients into professional treatment earlier.",
  "Personalized treatment plans are outperforming static service menus.",
  "Clinical luxury is now preferred over pure relaxation-only spa positioning.",
  "Skin barrier health and gentle corrective care continue to dominate conversion language.",
  "Membership ecosystems are becoming core to recurring revenue."
];

export const strategicAdvantages = [
  "Warmer and more personalized than transactional medspas.",
  "More corrective and results-oriented than traditional day spas.",
  "More premium and systemized than typical solo esthetician brands.",
  "High-trust positioning through acne transformation and oncology-informed care."
];

/* -------------------------------------------------------------- *
 *  THE 3 SKIN SYSTEMS — narrative core for the homepage          *
 *  Three named systems give the studio's full menu a simple,     *
 *  understandable shape. Reset → Restore → Refine.               *
 * -------------------------------------------------------------- */
export type SkinSystem = {
  number: string;
  slug: "reset" | "restore" | "refine";
  name: string;
  promise: string;
  forWho: string;
  outcomes: string[];
  treatments: string[];
  duration: string;
  startingAt: string;
  image: string;
  intent: SkinIntent;
};

export const skinSystems: SkinSystem[] = [
  {
    number: "01",
    slug: "reset",
    name: "Reset",
    promise: "Calm flare-ups and help your skin feel steady again.",
    forWho: "Breakouts, sensitivity, inflammation, and a weakened skin barrier.",
    outcomes: [
      "Noticeably calmer skin after your first session",
      "Fewer active breakouts over a guided 90-day plan",
      "A stronger barrier that feels comfortable day to day"
    ],
    treatments: [
      "Clarifying Acne Reset Facial",
      "Barrier Repair Recovery Facial",
      "Blue · Red LED therapy"
    ],
    duration: "60 min",
    startingAt: "$165",
    image: brandImages.service1,
    intent: "acne"
  },
  {
    number: "02",
    slug: "restore",
    name: "Restore",
    promise: "Refine texture and bring back healthy glow.",
    forWho: "Congestion, roughness, uneven tone, and dull-looking skin.",
    outcomes: [
      "Smoother texture and softer rough patches",
      "Brighter tone with more even-looking skin",
      "A realistic routine your skin can sustain"
    ],
    treatments: [
      "Resurfacing Texture Renewal",
      "Radiance Maintenance Facial",
      "Dermaplane · enzyme upgrades"
    ],
    duration: "75 min",
    startingAt: "$185",
    image: brandImages.service2,
    intent: "texture"
  },
  {
    number: "03",
    slug: "refine",
    name: "Refine",
    promise: "Support firmness and keep your results looking fresh.",
    forWho: "Fine lines, reduced firmness, and long-term skin maintenance.",
    outcomes: [
      "A firmer, more lifted overall look",
      "Softer-looking lines with collagen support",
      "Maintenance visits that protect and build results"
    ],
    treatments: [
      "Collagen Lift Signature",
      "Microcurrent Sculpt",
      "Peptide · Vitamin C protocols"
    ],
    duration: "90 min",
    startingAt: "$245",
    image: brandImages.service3,
    intent: "aging"
  }
];

/* -------------------------------------------------------------- *
 *  USER JOURNEY — the 4 steps of working with Skin by Emely      *
 * -------------------------------------------------------------- */
export type JourneyStep = {
  number: string;
  title: string;
  detail: string;
  meta: string;
};

export const userJourney: JourneyStep[] = [
  {
    number: "01",
    title: "Share your skin story",
    detail:
      "Start with a short consult so we understand what your skin is doing now, what has not worked before, and what you want to feel confident in.",
    meta: "Free · 15 min · in-studio or virtual"
  },
  {
    number: "02",
    title: "Get your custom plan",
    detail:
      "We map out your first 90 days with the right treatment path, the right timing, and simple at-home support that fits your life.",
    meta: "Personalized roadmap"
  },
  {
    number: "03",
    title: "Begin your treatment phase",
    detail:
      "Your visits follow the system your skin needs most. We adjust as your skin responds, so your plan stays effective and realistic.",
    meta: "Real treatments · real progress"
  },
  {
    number: "04",
    title: "Maintain and protect results",
    detail:
      "When your skin is stable, move into a membership to keep momentum, prevent setbacks, and make great skin the new baseline.",
    meta: "Optional · cancel anytime"
  }
];

