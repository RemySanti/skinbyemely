module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        espresso: "var(--espresso)",
        mocha: "var(--mocha)",
        bark: "var(--bark)",
        umber: "var(--umber)",
        clay: "var(--clay)",
        "clay-light": "var(--clay-light)",
        ivory: "var(--ivory)",
        cream: "var(--cream)",
        linen: "var(--linen)",
        bone: "var(--bone)",
        sand: "var(--sand)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        light: "var(--light)",
        "light-soft": "var(--light-soft)",
        gold: "var(--gold)",
        "gold-deep": "var(--gold-deep)",
        // legacy aliases
        sage: "var(--gold-deep)",
        "sage-deep": "var(--gold-deep)",
        "sage-light": "var(--gold)"
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        display: ["Cormorant Garamond", "serif"],
        sans: ["DM Sans", "sans-serif"]
      },
      letterSpacing: {
        wide: "0.12em",
        xl: "0.18em",
        xxl: "0.22em"
      },
      borderRadius: {
        xl2: "20px",
        pill: "999px"
      },
      boxShadow: {
        glass: "0 24px 60px rgba(31, 22, 15, 0.18)",
        soft: "0 1px 0 rgba(42,31,23,0.04), 0 12px 32px rgba(42,31,23,0.06)",
        product: "0 30px 80px rgba(31, 22, 15, 0.35)",
        innerGold: "inset 0 0 0 1px rgba(200,168,119,0.4)"
      },
      backgroundImage: {
        "espresso-radial":
          "radial-gradient(circle at 60% 30%, rgba(168,144,116,0.18), transparent 55%)",
        "ivory-grain":
          "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.6), transparent 50%), radial-gradient(circle at 80% 80%, rgba(212,200,174,0.4), transparent 55%)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        floaty: "floaty 5s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite"
      }
    }
  },
  plugins: []
};
