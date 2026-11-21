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
          alt="A considered Shop Nova edit"
          fill
          className="object-cover opacity-55"
        />
        <div className="container-page relative flex min-h-[60vh] items-end pb-16">
          <div className="max-w-2xl text-cream">
            <p className="text-[11px] tracking-[0.28em] uppercase text-gold">A little about us</p>
            <h1 className="mt-3 font-display text-6xl">A scent. A step. A signature.</h1>
          </div>
        </div>
      </section>
      <div className="container-page grid gap-16 py-20 lg:grid-cols-2">
        <div className="space-y-6 text-sm leading-8 text-ink-soft">
          <p>
            {BRAND.name} began with a simple idea: the things you reach for every day should feel special. We bring together expressive fragrances and thoughtfully made shoes, each chosen for comfort, character and lasting appeal.
          </p>
          <p>
            From a warm amber perfume to a pair of soft leather loafers, every part of the edit is selected to feel considered without feeling complicated. Our home is Lahore, and our customers are everywhere.
          </p>
          <p>
            We believe personal style is made in small choices: the note you remember, the pair you can wear all day, the details that feel like you. Shop Nova is here to make those choices a little easier.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["A scent", "Warm woods, fresh citrus and soft florals."],
            ["A step", "Everyday pairs with comfort built in."],
            ["A place", "Rooted in Lahore, delivered across Pakistan."],
            ["A feeling", "Personal pieces for memorable moments."],
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
