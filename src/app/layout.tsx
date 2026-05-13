import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/ui/Nav";
import Cursor from "@/components/ui/Cursor";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/motion/ScrollProgress";
import BottomNav from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: "Skin by Emely | Espresso Editorial",
  description:
    "An editorial, results-driven skincare studio. Custom protocols, clinical care, intelligent skin systems."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6ee" },
    { media: "(prefers-color-scheme: dark)", color: "#2a1f17" }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-ivory text-ink pb-[calc(76px+env(safe-area-inset-bottom))] lg:pb-0"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:bg-ink focus:text-ivory focus:px-4 focus:py-2 focus:rounded-pill focus:text-[11px] focus:tracking-xl focus:uppercase focus:outline-none focus:ring-2 focus:ring-gold"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        <Cursor />
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
