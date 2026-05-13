import { brandImages } from "@/lib/content";

export type JournalPost = {
  slug: string;
  title: string;
  description: string;
  category: "Acne" | "Barrier" | "Anti-Aging" | "Glow" | "Education";
  readTime: string;
  image: string;
  publishDate: string;
  takeaways: string[];
  sections: {
    heading: string;
    content: string;
    image?: string;
    imageAlt?: string;
  }[];
  faq: { q: string; a: string }[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "best-facial-for-acne-prone-skin-brandon",
    title: "Best Facial for Acne-Prone Skin in Brandon",
    description:
      "How to choose a corrective facial that calms active breakouts without compromising your barrier.",
    category: "Acne",
    readTime: "10 min read",
    image: brandImages.service1,
    publishDate: "May 2026",
    takeaways: [
      "Look for barrier-safe protocols, not aggressive stripping.",
      "Consistency beats intensity for long-term acne correction.",
      "Homecare and in-studio treatments should work together."
    ],
    sections: [
      {
        heading: "Why acne needs a system, not a single service",
        content:
          "Acne is rarely solved in one visit because breakouts are not one event; they are a pattern. Oil production, keratin buildup, inflammation, stress, and product mismatch all influence what you see on your skin week to week. A better strategy is to build a sequence: first calm inflammation and reduce congestion, then support barrier resilience, then maintain progress with lighter corrective touchpoints. This is why your treatment plan should evolve over 90 days rather than repeating one aggressive service and hoping for permanent change.",
        image: brandImages.service1,
        imageAlt: "Corrective acne facial treatment in progress"
      },
      {
        heading: "What to ask before booking",
        content:
          "Ask how extractions are handled, how post-treatment irritation is controlled, and how treatment intensity is adjusted when your skin is reactive. You should also ask what your at-home routine will look like between appointments. If the answer is vague or only focused on one in-studio service, you are likely missing the long-term framework. A quality provider can explain the first visit, the second visit, and how decisions change based on your skin response.",
        image: brandImages.science,
        imageAlt: "Esthetician preparing products for acne-prone skin protocol"
      },
      {
        heading: "What progress actually looks like in month one",
        content:
          "In the first month, success often looks like fewer inflamed breakouts, less tenderness, and shorter healing time, not perfect skin overnight. You may still purge or flare in specific areas as congestion clears, but your skin should feel more stable, less irritated, and easier to manage. Tracking this correctly helps you avoid abandoning a plan that is working simply because improvement is gradual.",
        image: brandImages.facial,
        imageAlt: "Client receiving calming treatment phase for acne control"
      },
      {
        heading: "At-home routine that supports treatment results",
        content:
          "Keep your routine simple: gentle cleanser, targeted corrective serum, moisturizer that supports barrier lipids, and daily SPF. Avoid stacking too many actives at once. If your skin feels tight or stings after cleansing, barrier stress is likely slowing your acne progress. The best homecare routine is not the most complicated one; it is the one you can follow consistently without triggering irritation."
      }
    ],
    faq: [
      {
        q: "Can facials make acne worse?",
        a: "Overly aggressive treatments can. Corrective, barrier-conscious protocols are designed to reduce flare risk."
      }
    ]
  },
  {
    slug: "how-to-repair-a-damaged-skin-barrier",
    title: "How to Repair a Damaged Skin Barrier",
    description:
      "A practical recovery framework for redness, stinging, dehydration, and reactive skin.",
    category: "Barrier",
    readTime: "11 min read",
    image: brandImages.service3,
    publishDate: "May 2026",
    takeaways: [
      "Pause active ingredients temporarily during acute irritation.",
      "Focus on hydration + lipid replenishment first.",
      "Barrier recovery often takes multiple weeks of consistency."
    ],
    sections: [
      {
        heading: "Signs your barrier is compromised",
        content:
          "Common signs include persistent tightness, stinging after water or gentle products, sudden redness, and a rough dehydrated texture that does not improve with heavier creams. You may also notice that products you previously tolerated now burn or cause patchy irritation. Barrier damage is often cumulative and can come from over-exfoliation, too many active ingredients, harsh cleansers, or repeated inflammation from untreated acne.",
        image: brandImages.service3,
        imageAlt: "Sensitive skin support treatment with soothing products"
      },
      {
        heading: "The first two weeks of recovery",
        content:
          "For the first two weeks, your priority is comfort and stability. Use a gentle cleanser, a supportive moisturizer, and broad-spectrum SPF every day. Skip strong exfoliants and high-potency retinoids until skin reactivity improves. Layer hydration under moisturizer if tightness persists. When redness, sting, and dryness calm down consistently, you can slowly reintroduce targeted actives one at a time.",
        image: brandImages.science,
        imageAlt: "Barrier-repair skincare products arranged for recovery routine"
      },
      {
        heading: "How to avoid re-damaging your barrier",
        content:
          "Most relapses happen when too many high-strength products are reintroduced too quickly. Keep a simple baseline routine and add only one variable at a time. If irritation returns, step back immediately. Seasonal changes, stress, and travel can all reduce tolerance, so your routine should have a fallback version for sensitive weeks.",
        image: brandImages.service4,
        imageAlt: "Minimal, barrier-first skincare setup in studio"
      },
      {
        heading: "When professional support helps most",
        content:
          "If your skin stays reactive for more than a few weeks, a guided treatment plan can reduce trial-and-error. In-studio care can calm inflammation while helping you identify what is disrupting recovery at home. This saves time, money, and frustration compared with repeatedly changing products without a clear strategy."
      }
    ],
    faq: [
      {
        q: "Should I exfoliate with a damaged barrier?",
        a: "Usually no. Most clients need a temporary exfoliation pause while inflammation settles."
      }
    ]
  },
  {
    slug: "dermaplaning-vs-microdermabrasion-which-is-better",
    title: "Dermaplaning vs Microdermabrasion: Which Is Better?",
    description:
      "A side-by-side comparison for texture, glow, sensitivity, and downtime expectations.",
    category: "Education",
    readTime: "9 min read",
    image: brandImages.service2,
    publishDate: "May 2026",
    takeaways: [
      "Dermaplaning is excellent for immediate smoothness and makeup finish.",
      "Microdermabrasion is useful for targeted texture refinement.",
      "Choice depends on skin sensitivity and treatment goals."
    ],
    sections: [
      {
        heading: "When dermaplaning makes sense",
        content:
          "Dermaplaning is ideal when your priority is immediate smoothness, brighter surface tone, and cleaner makeup application. It removes dead surface buildup and vellus hair, creating a polished finish with minimal downtime for many clients. It is especially helpful before events when you want a refined look quickly and safely.",
        image: brandImages.service2,
        imageAlt: "Dermaplaning-style texture refinement treatment in studio"
      },
      {
        heading: "When microdermabrasion is a better fit",
        content:
          "Microdermabrasion can be useful for persistent roughness and dull, uneven texture when a slightly stronger resurfacing approach is appropriate. It can create meaningful texture improvement over time when scheduled in the right cadence and paired with barrier support. The key is not choosing the strongest method, but choosing the one your skin can tolerate consistently.",
        image: brandImages.facial,
        imageAlt: "Client receiving advanced exfoliation treatment"
      },
      {
        heading: "Sensitivity, downtime, and maintenance",
        content:
          "If your skin is reactive, dermaplaning is often easier to recover from. If your main concern is stubborn roughness, microdermabrasion may provide more structural refinement. Either way, maintenance and homecare determine whether results last. Hydration and sun protection are non-negotiable after resurfacing services.",
        image: brandImages.science,
        imageAlt: "Post-treatment skincare products for recovery and hydration"
      },
      {
        heading: "How to decide with confidence",
        content:
          "Decision-making is simpler when you define your goal first: event glow, texture correction, or long-term resurfacing. A consultation should map your current tolerance level, timeline, and desired outcome. That context turns treatment selection from guesswork into strategy."
      }
    ],
    faq: [
      {
        q: "Can I combine both treatments?",
        a: "Some plans include both over time, but not always in the same session."
      }
    ]
  },
  {
    slug: "monthly-facial-benefits-for-long-term-results",
    title: "Monthly Facial Benefits for Long-Term Results",
    description:
      "How maintenance facials improve consistency, prevent setbacks, and support skin confidence.",
    category: "Glow",
    readTime: "9 min read",
    image: brandImages.facial,
    publishDate: "May 2026",
    takeaways: [
      "Monthly care helps prevent reactive recovery cycles.",
      "Maintenance improves treatment predictability.",
      "Membership structure supports better adherence."
    ],
    sections: [
      {
        heading: "Why cadence matters",
        content:
          "Skin responds best to rhythm. If treatments are too far apart, small gains can fade before the next visit and you spend each appointment rebuilding momentum. Monthly cadence creates continuity, allowing each treatment to build on the last one. This is especially true for acne, texture, sensitivity, and pigment pathways where consistency changes outcomes.",
        image: brandImages.facial,
        imageAlt: "Monthly facial treatment sequence in studio setting"
      },
      {
        heading: "What changes after 90 days",
        content:
          "After 90 days, clients often notice better hydration stability, fewer random flares, and improved skin texture that is easier to maintain. They also report less decision fatigue because the routine and treatment flow are already defined. This emotional clarity matters as much as visible improvement for long-term adherence.",
        image: brandImages.service1,
        imageAlt: "Client glow-focused facial session during maintenance phase"
      },
      {
        heading: "How membership structure supports progress",
        content:
          "Memberships improve outcomes because they remove friction. Scheduling is simpler, treatment planning is proactive, and your routine is adjusted before setbacks become major regressions. Instead of deciding from scratch every month, you follow a framework built for your skin goals.",
        image: brandImages.service4,
        imageAlt: "Studio treatment planning setup for recurring appointments"
      },
      {
        heading: "When to shift cadence seasonally",
        content:
          "Your skin may need a slightly different rhythm in high-heat months, colder seasons, or stressful life periods. The goal is not rigid perfection; it is adaptive consistency. A good plan can flex while still protecting long-term results."
      }
    ],
    faq: [
      {
        q: "Do I need monthly facials forever?",
        a: "Cadence can be adjusted seasonally, but consistency is key for maintaining results."
      }
    ]
  },
  {
    slug: "best-homecare-routine-after-a-facial",
    title: "Best Homecare Routine After a Facial",
    description:
      "Post-treatment aftercare to protect results and minimize irritation.",
    category: "Education",
    readTime: "8 min read",
    image: brandImages.science,
    publishDate: "May 2026",
    takeaways: [
      "Keep post-facial care simple for 48 hours.",
      "Hydration and SPF are non-negotiable.",
      "Avoid introducing new actives too soon."
    ],
    sections: [
      {
        heading: "First 24 hours",
        content:
          "In the first 24 hours, keep your routine intentionally simple: gentle cleanse, restorative moisturizer, and SPF. Skip intense workouts, steam rooms, and hot showers that can increase redness or dehydration. Your skin is more receptive after treatment, so calming support matters more than active correction immediately after a facial.",
        image: brandImages.science,
        imageAlt: "Post-facial homecare essentials laid out for use"
      },
      {
        heading: "Days 2-5",
        content:
          "During days 2 through 5, continue hydration and barrier support while watching for sensitivity signals. Reintroduce active ingredients only if skin remains calm and comfortable for at least 48 hours. If tingling, tightness, or redness increases, step back and return to your calming baseline.",
        image: brandImages.service3,
        imageAlt: "Hydrating facial product and moisturizer used for recovery"
      },
      {
        heading: "Makeup, workouts, and common mistakes",
        content:
          "Many clients can wear makeup later the same day, but clean tools and breathable formulas are important. The most common mistake is overloading skin with too many products to 'boost' results. More products do not equal better healing. Controlled, consistent care does.",
        image: brandImages.facial,
        imageAlt: "Client post-treatment with calm, hydrated skin"
      },
      {
        heading: "How to extend your results",
        content:
          "Set a repeatable weekly routine and keep one recovery-night protocol in your schedule. This helps you preserve hydration, glow, and skin comfort between appointments while reducing rebound irritation."
      }
    ],
    faq: [
      {
        q: "Can I wear makeup after a facial?",
        a: "Many clients can after several hours, but clean formulas and tools are recommended."
      }
    ]
  },
  {
    slug: "how-to-treat-hyperpigmentation-safely",
    title: "How to Treat Hyperpigmentation Safely",
    description:
      "A melanin-conscious strategy for brightening uneven tone while reducing rebound risk.",
    category: "Education",
    readTime: "11 min read",
    image: brandImages.service4,
    publishDate: "May 2026",
    takeaways: [
      "Pigment plans must prioritize inflammation control.",
      "Prepping skin improves outcomes before advanced treatments.",
      "SPF compliance determines long-term success."
    ],
    sections: [
      {
        heading: "Why pigmentation rebounds",
        content:
          "Pigment rebounds when inflammation is not controlled and UV exposure is underestimated. Even small repeated triggers can reactivate uneven tone. Aggressive treatment bursts may create temporary brightening, but without barrier support and strict protection, discoloration can return quickly. Sustainable brightening is built through controlled, melanin-conscious consistency.",
        image: brandImages.service4,
        imageAlt: "Pigment-correction skincare treatment with barrier-safe approach"
      },
      {
        heading: "The three-layer pigment protocol",
        content:
          "A resilient pigment plan has three layers: support barrier function, regulate melanin triggers with targeted actives, and protect daily with broad-spectrum SPF. Each layer supports the next. If one layer is weak, results become unstable. This framework allows you to brighten gradually while minimizing irritation and rebound risk.",
        image: brandImages.science,
        imageAlt: "Clinical-grade brightening and protection products in studio"
      },
      {
        heading: "Timeline expectations for visible change",
        content:
          "Some clients see early brightening in a few weeks, but deeper correction usually takes multiple months. Progress is usually non-linear, especially with hormonal triggers, heat, and sun exposure. Tracking photos monthly gives a more honest view of change than daily mirror checks.",
        image: brandImages.facial,
        imageAlt: "Client receiving brightening facial treatment session"
      },
      {
        heading: "Daily habits that protect brightening progress",
        content:
          "Apply SPF generously, reapply when outdoors, and pair brightening serums with anti-inflammatory support. Avoid over-exfoliating in pursuit of speed. Brightening should feel controlled and calm, not reactive and fragile."
      }
    ],
    faq: [
      {
        q: "How long does pigmentation correction take?",
        a: "Visible improvement often starts in weeks, with stronger correction over several months."
      }
    ]
  },
  {
    slug: "teen-facial-guide-for-clearer-skin",
    title: "Teen Facial Guide for Clearer Skin",
    description:
      "What teen clients and parents should know about corrective facials and skincare education.",
    category: "Acne",
    readTime: "9 min read",
    image: brandImages.service1,
    publishDate: "May 2026",
    takeaways: [
      "Teen protocols should be effective but gentle.",
      "Education is as important as treatment.",
      "Routine consistency drives results between sessions."
    ],
    sections: [
      {
        heading: "Building confidence with structured care",
        content:
          "Teens benefit most from clear, realistic structure. The goal is not a perfect routine with ten steps; it is a consistent plan that fits school, sports, and real life. When guidance is simple and specific, teens are more likely to follow through and see steady progress, which improves both skin and confidence.",
        image: brandImages.service1,
        imageAlt: "Teen-friendly corrective facial protocol in studio"
      },
      {
        heading: "What parents can support at home",
        content:
          "Parents can help by reinforcing consistency, keeping routines visible and simple, and avoiding frequent product swaps. Supportive reminders and realistic expectations matter more than buying more products. Emotional support is important too, because skin concerns can affect social confidence and self-esteem during teen years.",
        image: brandImages.science,
        imageAlt: "Simple homecare routine setup for teen acne support"
      },
      {
        heading: "What to expect in the first 8 to 12 weeks",
        content:
          "Most teens see progress as reduced inflammation, fewer painful breakouts, and better healing time before they see fully clear skin. This is normal. Consistent in-studio care plus predictable homecare creates the momentum needed for long-term correction.",
        image: brandImages.facial,
        imageAlt: "Teen-focused facial follow-up visit with progress planning"
      },
      {
        heading: "How to keep routines sustainable during busy seasons",
        content:
          "During exam weeks, sports seasons, or travel, simplify to essentials instead of abandoning the routine. Even a short baseline routine can protect gains and reduce setbacks when life gets busy."
      }
    ],
    faq: [
      {
        q: "How often should teens get facials?",
        a: "Many plans begin monthly, then adjust based on skin response and goals."
      }
    ]
  },
  {
    slug: "oxygen-facial-benefits-for-sensitive-skin",
    title: "Oxygen Facial Benefits for Sensitive Skin",
    description:
      "When oxygen-based protocols can help calm redness and support barrier comfort.",
    category: "Barrier",
    readTime: "8 min read",
    image: brandImages.facial,
    publishDate: "May 2026",
    takeaways: [
      "Oxygen facials can support calmer skin appearance.",
      "Sensitive clients benefit from low-irritation protocols.",
      "Pair with barrier repair homecare for best outcomes."
    ],
    sections: [
      {
        heading: "Who should consider oxygen facials",
        content:
          "Oxygen-focused facials can be helpful for clients with reactive, redness-prone, or post-breakout skin that needs calming support. These treatments are often chosen when the goal is comfort, hydration, and a smoother-looking complexion without heavy irritation. They are especially useful during phases when skin tolerance is low.",
        image: brandImages.facial,
        imageAlt: "Oxygen facial treatment focused on calming sensitive skin"
      },
      {
        heading: "How to maximize results",
        content:
          "To maximize results, pair treatment with hydration-focused homecare and avoid aggressive exfoliation between sessions. Keep your barrier intact and prioritize anti-inflammatory ingredients. This allows oxygen-based sessions to support visible calmness rather than competing with irritation from other products.",
        image: brandImages.service3,
        imageAlt: "Calming skincare products used after oxygen treatment"
      },
      {
        heading: "How oxygen facials fit into a larger plan",
        content:
          "Oxygen facials are often one part of a broader strategy that may include barrier repair, gentle resurfacing, and maintenance treatments. They are not a one-time cure, but they can be a strong stabilizing element when your skin needs a lower-stress corrective approach.",
        image: brandImages.science,
        imageAlt: "Treatment planning notes and products for sensitive-skin protocol"
      },
      {
        heading: "When to pause and reassess",
        content:
          "If redness or sensitivity worsens consistently, reassessment is important. Skin can change with weather, stress, hormones, and product use. A guided plan allows treatment intensity to adjust before irritation snowballs."
      }
    ],
    faq: [
      {
        q: "Are oxygen facials safe for rosacea-prone skin?",
        a: "They can be, depending on protocol intensity and your provider's assessment."
      }
    ]
  },
  {
    slug: "anti-aging-facials-that-look-natural",
    title: "Anti-Aging Facials That Look Natural",
    description:
      "How to improve firmness and smoothness without over-processing your skin.",
    category: "Anti-Aging",
    readTime: "10 min read",
    image: brandImages.service3,
    publishDate: "May 2026",
    takeaways: [
      "Natural-looking results come from progressive treatment planning.",
      "Collagen support should be paired with hydration strategy.",
      "Over-aggressive resurfacing can compromise barrier quality."
    ],
    sections: [
      {
        heading: "The natural-aging strategy",
        content:
          "Natural-looking anti-aging results come from texture quality and skin resilience, not only intensity. A strong strategy focuses on hydration, barrier integrity, and progressive collagen support over time. This approach helps skin look healthier and smoother without over-processing, which can create sensitivity and uneven results.",
        image: brandImages.service3,
        imageAlt: "Anti-aging facial treatment designed for natural-looking results"
      },
      {
        heading: "What to prioritize in your 30s and 40s",
        content:
          "In your 30s and 40s, prioritize barrier resilience, daily UV protection, antioxidant support, and consistent in-studio maintenance. These foundational layers preserve elasticity and texture while reducing cumulative stress on skin. Advanced treatments are most effective when this baseline is already strong.",
        image: brandImages.facial,
        imageAlt: "Client receiving collagen-support facial maintenance treatment"
      },
      {
        heading: "Mistakes that age skin faster",
        content:
          "The biggest mistakes are inconsistent SPF use, over-exfoliation, and jumping between aggressive trends. These habits can weaken barrier quality and increase inflammation, which can make fine lines and dullness appear worse. Gentle consistency usually outperforms sporadic intensity.",
        image: brandImages.science,
        imageAlt: "Skincare protocol emphasizing antioxidant and barrier support"
      },
      {
        heading: "How to build a long-term plan",
        content:
          "Build your anti-aging roadmap in phases: reset and hydrate, refine texture, and maintain with seasonal adjustments. A phased approach gives you visible improvement while protecting skin health for the long run."
      }
    ],
    faq: [
      {
        q: "When should I start anti-aging facials?",
        a: "Preventative maintenance can begin early, with treatment intensity matched to your skin condition."
      }
    ]
  },
  {
    slug: "facial-pricing-guide-what-youre-paying-for",
    title: "Facial Pricing Guide: What You Are Paying For",
    description:
      "Understanding treatment value, provider expertise, and why protocol depth matters.",
    category: "Education",
    readTime: "9 min read",
    image: brandImages.science,
    publishDate: "May 2026",
    takeaways: [
      "Price reflects expertise, protocol quality, and customization.",
      "A cheaper facial can cost more if results are inconsistent.",
      "Outcome-focused care delivers better long-term value."
    ],
    sections: [
      {
        heading: "What influences facial pricing",
        content:
          "Facial pricing reflects more than treatment time. It includes protocol design, product quality, treatment customization, provider expertise, and the level of ongoing planning around your progress. Two services with the same duration may produce very different outcomes depending on how precisely they are tailored to your skin.",
        image: brandImages.science,
        imageAlt: "Professional skincare tools and products used in customized treatments"
      },
      {
        heading: "How to evaluate value",
        content:
          "Evaluate value by outcome consistency over time, not just the price of a single visit. Ask whether your plan reduces setbacks, whether your provider tracks progress, and whether treatment choices evolve with your skin response. Lower upfront price can become expensive if results are unpredictable and routines keep changing.",
        image: brandImages.facial,
        imageAlt: "Consultation-focused treatment planning for long-term outcomes"
      },
      {
        heading: "When premium pricing is justified",
        content:
          "Premium pricing is justified when care includes thoughtful diagnostics, safer protocol depth, and clear guidance between appointments. If a service gives you a roadmap plus measurable progress, you are paying for clarity and consistency, not just one appointment slot.",
        image: brandImages.service4,
        imageAlt: "Luxury clinical treatment room and premium skincare setup"
      },
      {
        heading: "How memberships improve cost efficiency",
        content:
          "Membership structures often lower cost per outcome by improving cadence and reducing reactive correction visits. When treatment is proactive instead of crisis-driven, clients usually spend more efficiently while seeing better long-term results."
      }
    ],
    faq: [
      {
        q: "Are memberships better value than one-off visits?",
        a: "For most long-term goals, yes. Membership cadence improves consistency and often lowers cost per outcome."
      }
    ]
  }
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
