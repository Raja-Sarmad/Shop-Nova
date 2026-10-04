import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <div className="container-page max-w-2xl py-16">
      <h1 className="font-display text-5xl">Terms</h1>
      <div className="mt-8 space-y-5 text-sm leading-8 text-ink-soft">
        <p>
          Velora is a student FYP storefront. Prices, stock, and checkout are
          demonstration-only until payment and inventory services are live.
        </p>
        <p>
          Product copy, photography (Unsplash), and layout are for academic and
          portfolio use. Do not treat mock orders as real purchases.
        </p>
      </div>
    </div>
  );
}
