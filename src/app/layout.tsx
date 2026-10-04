import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { StoreProvider } from "@/context/StoreProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { BRAND } from "@/lib/constants";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    "Quiet luxury cut in Lahore. Linen, silk, leather, and objects for a considered wardrobe.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ivory font-sans text-ink">
        <StoreProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
        </StoreProvider>
      </body>
    </html>
  );
}
