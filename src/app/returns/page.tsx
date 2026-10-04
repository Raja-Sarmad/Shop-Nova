import type { Metadata } from "next";

export const metadata: Metadata = { title: "Returns" };

export default function ReturnsPage() {
  return (
    <div className="container-page max-w-2xl py-16">
      <h1 className="font-display text-5xl">Returns</h1>
      <div className="mt-8 space-y-5 text-sm leading-8 text-ink-soft">
        <p>Unworn pieces with tags may be returned within 14 days of delivery. We arrange pickup in Lahore, Karachi, and Islamabad.</p>
        <p>Jewellery with broken seals, worn footwear, and sale items are final. Home objects must be unused and in original packing.</p>
        <p>Refunds return to the original method once warehouse intake is confirmed — currently simulated in the storefront.</p>
      </div>
    </div>
  );
}
