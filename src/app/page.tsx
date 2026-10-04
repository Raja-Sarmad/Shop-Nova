import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCollections, getJournal, getProducts } from "@/lib/catalog";
import { getTestimonials } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/ProductCard";
import { BRAND } from "@/lib/constants";
import { formatDate } from "@/lib/format";

export default async function HomePage() {
  const [collections, allProducts, journal] = await Promise.all([
    getCollections(),
    getProducts(),
    getJournal(),
  ]);
  const arrivals = allProducts.filter((p) => p.isNew).slice(0, 4);
  const bestsellers = allProducts.filter((p) => p.isBestseller).slice(0, 4);
  const testimonials = getTestimonials();

  return (
    <div>
      <section className="relative min-h-[88vh] overflow-hidden bg-ink">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80"
          alt="Velora campaign"
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" />
        <div className="container-page relative flex min-h-[88vh] flex-col justify-end pb-16 pt-32 text-cream">
          <p className="text-[11px] tracking-[0.32em] uppercase text-gold">Autumn atelier · 2026</p>
          <h1 className="mt-4 max-w-3xl font-display text-6xl leading-[0.95] md:text-8xl">
            Quiet luxury,
            <br />
            everyday.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-cream/80">
            Linen, silk, and leather cut in small runs from our Lahore studio.
            Pieces meant to be worn hard and kept long.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="bg-cream px-7 py-3.5 text-xs tracking-[0.2em] uppercase text-ink"
            >
              Shop the edit
            </Link>
            <Link
              href="/lookbook"
              className="border border-cream/40 px-7 py-3.5 text-xs tracking-[0.2em] uppercase text-cream"
            >
              Lookbook
            </Link>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-sand bg-cream py-3">
        <div className="animate-marquee flex w-max gap-12 text-[11px] tracking-[0.28em] uppercase text-ink-soft">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12 px-6">
              {[
                "European flax linen",
                "Vegetable-tanned leather",
                "Small-run cutting",
                "Complimentary shipping over Rs 15,000",
                "14-day returns",
                "Atelier, Lahore",
              ].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="container-page py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Collections</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Four ways to dress the season</h2>
          </div>
          <Link href="/collections" className="hidden items-center gap-2 text-xs tracking-[0.18em] uppercase md:flex">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {collections.map((c, i) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className={`group relative overflow-hidden bg-sand ${i === 0 ? "md:col-span-2 md:min-h-[520px]" : "min-h-[380px]"}`}
            >
              <Image
                src={c.image}
                alt={c.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                <p className="text-[11px] tracking-[0.22em] uppercase text-gold">{c.eyebrow}</p>
                <h3 className="mt-2 font-display text-3xl">{c.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Just arrived</p>
            <h2 className="mt-2 font-display text-4xl">New from the studio</h2>
          </div>
          <Link href="/shop?sort=newest" className="text-xs tracking-[0.18em] uppercase">
            See all
          </Link>
        </div>
        <ProductGrid products={arrivals} />
      </section>

      <section className="my-16 grid min-h-[70vh] lg:grid-cols-2">
        <div className="relative min-h-[420px]">
          <Image
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80"
            alt="Editorial"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-forest px-8 py-16 text-cream md:px-16">
          <p className="text-[11px] tracking-[0.28em] uppercase text-gold">The house</p>
          <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            Cut for the in-between hours.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-cream/80">
            {BRAND.name} started as a cutting table in Lahore and a stubborn idea:
            clothing should feel like a private thought, not a billboard. We still
            finish every run by hand.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex w-fit items-center gap-2 border-b border-cream/40 pb-1 text-xs tracking-[0.18em] uppercase"
          >
            Read the story <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Most loved</p>
            <h2 className="mt-2 font-display text-4xl">Bestsellers</h2>
          </div>
        </div>
        <ProductGrid products={bestsellers} />
      </section>

      <section className="bg-cream py-20">
        <div className="container-page">
          <p className="text-[11px] tracking-[0.22em] uppercase text-muted">From the atelier notes</p>
          <h2 className="mt-2 font-display text-4xl">Journal</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {journal.map((post) => (
              <Link key={post.slug} href={`/journal/${post.slug}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 text-[11px] tracking-[0.18em] uppercase text-muted">
                  {formatDate(post.date)} · {post.readTime}
                </p>
                <h3 className="mt-2 font-display text-2xl leading-snug">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t.author} className="border-t border-sand pt-8">
              <p className="font-display text-2xl leading-snug">“{t.quote}”</p>
              <footer className="mt-6 text-sm">
                <p>{t.author}</p>
                <p className="text-muted">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="container-page mb-8 grid gap-4 md:grid-cols-3">
        {[
          ["Materials you can name", "Flax, silk, vegetable-tanned hide, stoneware — listed on every page."],
          ["Small runs, not seasons of waste", "We cut what we can finish well. When a size is gone, it is gone."],
          ["Care that outlives the trend", "Each piece ships with fibre-specific notes. Keep it a decade."],
        ].map(([title, body]) => (
          <div key={title} className="border border-sand bg-cream p-8">
            <h3 className="font-display text-2xl">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-ink-soft">{body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
