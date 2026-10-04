import type { Metadata } from "next";
import Image from "next/image";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div>
      <section className="relative min-h-[60vh] bg-ink">
        <Image
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=2000&q=80"
          alt="Atelier"
          fill
          className="object-cover opacity-55"
        />
        <div className="container-page relative flex min-h-[60vh] items-end pb-16">
          <div className="max-w-2xl text-cream">
            <p className="text-[11px] tracking-[0.28em] uppercase text-gold">The house</p>
            <h1 className="mt-3 font-display text-6xl">A cutting table in Lahore, and a long view.</h1>
          </div>
        </div>
      </section>
      <div className="container-page grid gap-16 py-20 lg:grid-cols-2">
        <div className="space-y-6 text-sm leading-8 text-ink-soft">
          <p>
            {BRAND.name} began with leftover linen, a borrowed iron, and the belief that a
            wardrobe should feel like a private thought. We still cut in small runs so a
            piece can be finished properly — buttons sewn through, hems steamed, labels
            set by hand.
          </p>
          <p>
            We work with mills we can name, vegetable tanneries, and a ceramic studio a
            short drive from MM Alam. When a fibre cannot be traced, we do not buy it.
          </p>
          <p>
            This storefront is the customer face of a larger system. Inventory, orders,
            and the atelier dashboard will sit in sibling apps — the cloth and the
            cutting stay here.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["2019", "First linen overshirt sold from a rooftop table."],
            ["2022", "Opened the MM Alam atelier for fittings by appointment."],
            ["2024", "Home objects joined the closet — candles, throws, stoneware."],
            ["2026", "This house, rebuilt as a proper shop."],
          ].map(([year, text]) => (
            <div key={year} className="border border-sand bg-cream p-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted">{year}</p>
              <p className="mt-3 font-display text-2xl leading-snug">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
