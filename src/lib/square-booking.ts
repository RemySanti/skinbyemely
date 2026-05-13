export type SquareService = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  priceCents: number;
  category: "facials" | "body";
};

export const squareBookingUrl =
  "https://book.squareup.com/appointments/f7dcst2ljp85dq/location/LMVSQK9C6PR4T/services";

// Synced from Skin by Emely Square booking widget payload.
export const squareServices: SquareService[] = [
  {
    id: "TL3H5JSD6HJ25QVEJJ547SDK",
    name: "New Client Customized Facial",
    description:
      "Experience a tailored facial treatment with deep cleanse, skin analysis, enzyme exfoliation, manual extractions, custom mask, neck and shoulder massage, and finishing products.",
    durationMinutes: 50,
    priceCents: 8000,
    category: "facials"
  },
  {
    id: "D6FCJIOG7HTDQPJXO6AVRJPD",
    name: "60 Min Customized Facial",
    description:
      "A 60-minute customized facial tailored to your skin needs with personalized cleansing, exfoliation, and hydration techniques.",
    durationMinutes: 60,
    priceCents: 9000,
    category: "facials"
  },
  {
    id: "CXJDKY7E7OACHQWNGHWEOAZF",
    name: "Dermaplane Deluxe Facial",
    description:
      "A non-invasive dermaplaning facial that removes dull surface buildup for smoother texture and brighter skin.",
    durationMinutes: 90,
    priceCents: 13500,
    category: "facials"
  },
  {
    id: "NZG55N3UOOSAIWHZWSZTJODH",
    name: "Express Dermaplane Facial",
    description:
      "Express glow in 30 minutes with double cleanse, dermaplane, and finishing products.",
    durationMinutes: 30,
    priceCents: 6000,
    category: "facials"
  },
  {
    id: "TCZ2PVXYFBGQZPQXVUIEEIKE",
    name: "Microdermabrasion Facial",
    description:
      "Results-focused resurfacing facial designed to improve texture and overall radiance.",
    durationMinutes: 60,
    priceCents: 13500,
    category: "facials"
  },
  {
    id: "XUTMCP2HDCRM7WDTB2E3MGLK",
    name: "Circadia Oxygen Rx Facial",
    description:
      "Oxygen treatment that supports brighter, calmer skin and is especially helpful for acne- and redness-prone complexions.",
    durationMinutes: 60,
    priceCents: 15000,
    category: "facials"
  },
  {
    id: "UDRH32PBBRI3F6W467TRCFAK",
    name: "Teen Facial",
    description:
      "Teen-focused facial with double cleanse, analysis, exfoliation, extractions, and customized mask to support clearer skin.",
    durationMinutes: 45,
    priceCents: 7000,
    category: "facials"
  },
  {
    id: "SGJDBPBHXUTFH2AO7I6F34F5",
    name: "Back Facial",
    description:
      "Back treatment with cleanse, analysis, enzyme exfoliation, extractions, high-frequency therapy, and hot stone massage.",
    durationMinutes: 60,
    priceCents: 11000,
    category: "body"
  }
];

export const membershipPlans = [
  {
    slug: "glow-maintenance",
    name: "Glow Maintenance",
    monthlyPrice: 129,
    description:
      "For clients who want consistent texture, hydration, and glow support every month.",
    includes: [
      "1 Express Dermaplane or Teen Facial per month",
      "Member-only add-on pricing",
      "Priority weekday booking windows"
    ]
  },
  {
    slug: "corrective-clear",
    name: "Corrective Clear",
    monthlyPrice: 179,
    description:
      "For acne, congestion, and barrier-repair journeys that need structured follow-through.",
    includes: [
      "1 Customized Facial (50-60 min) per month",
      "Quarterly progress mapping",
      "10% off qualifying corrective add-ons"
    ]
  },
  {
    slug: "editorial-luxe",
    name: "Editorial Luxe",
    monthlyPrice: 249,
    description:
      "For high-touch care with advanced treatments and elevated studio support.",
    includes: [
      "1 Deluxe treatment (90 min tier) per month",
      "VIP rescheduling flexibility",
      "15% off retail homecare recommendations"
    ]
  }
] as const;

export function formatUsdFromCents(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  }).format(cents / 100);
}
