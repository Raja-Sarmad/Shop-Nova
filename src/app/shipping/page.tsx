import type { Metadata } from "next";

export const metadata: Metadata = { title: "Shipping" };

export default function ShippingPage() {
  return (
    <div className="container-page max-w-2xl py-16">
      <h1 className="font-display text-5xl">Shipping</h1>
      <div className="mt-8 space-y-5 text-sm leading-8 text-ink-soft">
        <p>We ship from the Lahore atelier, packed in recycled tissue and a cotton bag you can keep.</p>
        <p>Major cities (Lahore, Karachi, Islamabad, Rawalpindi): 2–4 working days.</p>
        <p>Rest of Pakistan: 4–7 working days. Complimentary shipping over Rs 15,000; otherwise a flat Rs 350.</p>
        <p>International shipping will open with the live logistics API. Until then, Pakistani addresses only.</p>
      </div>
    </div>
  );
}
