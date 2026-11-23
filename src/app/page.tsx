import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CreditCard, Gem, ShieldCheck, Truck } from "lucide-react";
import { getProducts, getTestimonials } from "@/lib/catalog";
import { ManagedNewArrivals } from "@/components/home/ManagedNewArrivals";
import { CategoryProductRail } from "@/components/home/CategoryProductRail";
import { HeroSlider } from "@/components/home/HeroSlider";
import type { Product } from "@/lib/types";

const pad = "mx-auto w-full max-w-[1800px] px-4 sm:px-6 xl:px-10 2xl:px-14";

function SectionTitle({ title, href }: { title: string; href?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-3">
      <h2 className="font-display text-3xl font-bold leading-tight text-[#201c18] sm:text-4xl lg:text-[40px]">
        {title}
      </h2>
      {href ? (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-[#655d54] hover:text-[#a26a22]"
        >
          View All <ArrowRight size={15} />
        </Link>
      ) : null}
    </div>
  );
}

function pickImage(
  products: Product[],
  fallback: string,
  category?: Product["category"],
) {
  const match = products.find(
    (product) =>
      product.images?.[0] && (!category || product.category === category),
  );
  return match?.images[0] ?? fallback;
}

export default async function HomePage() {
  const [allProducts, testimonials] = await Promise.all([
    getProducts(),
    Promise.resolve(getTestimonials()),
  ]);

  const perfumes = allProducts.filter((p) => p.category === "fragrance");
  const shoes = allProducts.filter((p) => p.category === "shoes");
  const galleryImages = allProducts
    .map((p) => p.images[0])
    .filter(Boolean)
    .slice(0, 7);

  const perfumeBanner = pickImage(
    perfumes,
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1400&q=80",
    "fragrance",
  );
  const shoesBanner = pickImage(
    shoes,
    "https://images.unsplash.com/photo-1614252235816-8c852fd85888?auto=format&fit=crop&w=1400&q=80",
    "shoes",
  );
  const offerImage = pickImage(
    allProducts,
    "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=2000&q=80",
  );

  const collections = [
    {
      title: "Perfume edit",
      subtitle: "Scents from your catalog",
      image: pickImage(
        perfumes,
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80",
        "fragrance",
      ),
      href: "/shop?category=fragrance",
    },
    {
      title: "Signature notes",
      subtitle: "Long-lasting picks",
      image:
        perfumes[1]?.images[0] ||
        pickImage(
          perfumes,
          "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80",
          "fragrance",
        ),
      href: "/shop?category=fragrance",
    },
    {
      title: "Footwear edit",
      subtitle: "Steps from your catalog",
      image: pickImage(
        shoes,
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80",
        "shoes",
      ),
      href: "/shop?category=shoes",
    },
    {
      title: "Everyday shoes",
      subtitle: "Clean and versatile",
      image:
        shoes[1]?.images[0] ||
        pickImage(
          shoes,
          "https://images.unsplash.com/photo-1614252235816-8c852fd85888?auto=format&fit=crop&w=700&q=80",
          "shoes",
        ),
      href: "/shop?category=shoes",
    },
  ];

  return (
    <div className="home-storefront w-full bg-[#faf7f2]">
      <HeroSlider products={allProducts} />

      <section className="w-full bg-[#201b17] text-white">
        <div className={`${pad} grid grid-cols-2 gap-5 py-6 sm:grid-cols-4 sm:gap-6 sm:py-7`}>
          {[
            [Gem, "100% Authentic", "Original products only"],
            [Truck, "Fast Delivery", "Across Pakistan"],
            [ShieldCheck, "Easy Returns", "7-day hassle-free returns"],
            [CreditCard, "Secure Payments", "Multiple payment options"],
          ].map(([Icon, title, body]) => (
            <div key={title as string} className="flex items-start gap-3">
              <Icon size={24} className="mt-0.5 shrink-0 text-[#d5b36f]" />
              <div>
                <p className="text-sm font-semibold sm:text-base">{title as string}</p>
                <p className="mt-1 text-xs leading-snug text-white/70 sm:text-sm">
                  {body as string}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex w-full flex-col gap-10 py-8 sm:gap-12 sm:py-12 lg:gap-14 lg:py-14">
        <section
          id="offer"
          className="relative w-full min-h-[260px] overflow-hidden bg-[#241b16] text-white sm:min-h-[300px] lg:min-h-[320px]"
        >
          <Image
            src={offerImage}
            alt="Limited time offer"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-50"
            unoptimized={offerImage.includes("res.cloudinary.com")}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1d1511]/95 via-[#1d1511]/70 to-[#1d1511]/20" />
          <div
            className={`${pad} relative flex min-h-[260px] items-center py-10 sm:min-h-[300px] lg:min-h-[320px]`}
          >
            <div className="max-w-xl">
              <p className="font-display text-xl italic text-[#e5cb9d] sm:text-2xl">
                Limited-Time Offer
              </p>
              <h2 className="mt-1 font-display text-5xl font-semibold leading-none sm:text-6xl">
                Up to 30% Off
              </h2>
              <p className="mt-4 text-base text-white/85 sm:text-lg">
                On selected perfumes &amp; shoes from your live catalog
              </p>
              <Link
                href="/shop"
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#d4ae69] px-6 py-3 text-sm font-semibold text-[#21180f]"
              >
                Shop the Offer <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className={`${pad} grid gap-4 md:grid-cols-2 lg:gap-5`}>
          <Link
            href="/shop?category=fragrance"
            className="group relative flex min-h-[280px] items-center overflow-hidden bg-[#eee0ce] p-8 lg:min-h-[340px] lg:p-10"
          >
            <Image
              src={perfumeBanner}
              alt="Perfumes"
              fill
              sizes="50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized={perfumeBanner.includes("res.cloudinary.com")}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f2e8dc]/96 via-[#f2e8dc]/75 to-transparent" />
            <div className="relative max-w-[70%]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8a6230]">
                Fragrance
              </p>
              <h2 className="mt-2 font-display text-4xl font-bold text-[#171411] lg:text-5xl">
                Perfumes
              </h2>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-[#352c23]">
                Luxury fragrances curated from your dashboard — only live products show here.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#ad7938] px-5 py-3 text-sm font-semibold text-white">
                Explore Perfumes <ArrowRight size={15} />
              </span>
            </div>
          </Link>
          <Link
            href="/shop?category=shoes"
            className="group relative flex min-h-[280px] items-center overflow-hidden bg-[#e9e0d7] p-8 lg:min-h-[340px] lg:p-10"
          >
            <Image
              src={shoesBanner}
              alt="Shoes"
              fill
              sizes="50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized={shoesBanner.includes("res.cloudinary.com")}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f4eee7]/96 via-[#f4eee7]/75 to-transparent" />
            <div className="relative max-w-[70%]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8a6230]">
                Footwear
              </p>
              <h2 className="mt-2 font-display text-4xl font-bold text-[#171411] lg:text-5xl">
                Shoes
              </h2>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-[#352c23]">
                Sneakers, formals and everyday pairs — powered by the products you publish.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#ad7938] px-5 py-3 text-sm font-semibold text-white">
                Explore Shoes <ArrowRight size={15} />
              </span>
            </div>
          </Link>
        </section>

        <section className={pad}>
          <SectionTitle title="Featured Collections" href="/shop" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            {collections.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative flex min-h-[170px] items-end overflow-hidden bg-[#f8f4ee] p-5 lg:min-h-[210px]"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized={item.image.includes("res.cloudinary.com")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="relative text-white">
                  <p className="text-base font-semibold lg:text-lg">{item.title}</p>
                  <p className="mt-1 text-sm text-white/75">{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <CategoryProductRail
          initialProducts={allProducts}
          category="fragrance"
          title="Perfumes"
          href="/shop?category=fragrance"
        />

        <CategoryProductRail
          initialProducts={allProducts}
          category="shoes"
          title="Shoes"
          href="/shop?category=shoes"
        />

        <section className={pad}>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-3xl font-bold text-[#201c18] sm:text-4xl lg:text-[40px]">
              New Arrivals
            </h2>
            <Link
              href="/shop?sort=newest"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#655d54] hover:text-[#a26a22]"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <ManagedNewArrivals initialProducts={allProducts} />
        </section>

        <section className={pad}>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-3xl font-bold text-[#201c18] sm:text-4xl lg:text-[40px]">
              Customer Reviews
            </h2>
            <p className="flex items-center gap-1.5 text-base font-semibold">
              <span className="text-[#b27a27]">★</span> 4.8/5{" "}
              <span className="text-sm font-normal text-[#766f67]">(12,860+ Reviews)</span>
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {testimonials.slice(0, 3).map((review, index) => (
              <article
                key={review.author}
                className="rounded-2xl border border-[#ece7df] bg-white p-6 shadow-[0_8px_24px_rgba(40,30,20,0.04)] lg:p-7"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={`https://images.unsplash.com/${["photo-1500648767791-00dcc994a43e", "photo-1534528741775-53994a69daeb", "photo-1506794778202-cad84cf45f1d"][index]}?auto=format&fit=crop&w=120&h=120&q=75`}
                    alt={review.author}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-base font-semibold">
                      {review.author}{" "}
                      <BadgeCheck size={15} className="inline text-[#b37d2f]" />
                    </p>
                    <p className="text-sm tracking-[0.1em] text-[#b37d2f]">★★★★★</p>
                  </div>
                </div>
                <p className="mt-5 text-[15px] leading-7 text-[#38322b]">“{review.quote}”</p>
                <p className="mt-4 text-sm text-[#777068]">
                  {index === 2 ? "1 week ago" : `${index + 2} days ago`}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className={pad}>
          <SectionTitle title="Our Story" href="/about" />
          <div className="grid items-stretch overflow-hidden border border-[#ece7df] bg-white sm:grid-cols-2">
            <div className="relative min-h-[280px] bg-[#dac8a9] lg:min-h-[380px]">
              <Image
                src={pickImage(
                  allProducts,
                  "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80",
                )}
                alt="Shop Nova story"
                fill
                sizes="50vw"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
              <h3 className="font-display text-3xl font-bold text-[#201c18] lg:text-4xl">
                Two worlds. One destination.
              </h3>
              <p className="mt-5 text-base leading-8 text-[#49423a]">
                Shop Nova brings together luxury fragrances and modern footwear in one carefully
                curated store — and the homepage now shows the products you actually publish.
              </p>
              <Link
                href="/about"
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg border border-[#b5884b] px-5 py-3 text-sm font-medium text-[#855d2c] hover:bg-[#faf5ed]"
              >
                Learn More <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section className={pad}>
          <div className="mb-6 flex items-end justify-between gap-3">
            <h2 className="font-display text-3xl font-bold text-[#201c18] sm:text-4xl lg:text-[40px]">
              From the collection
            </h2>
            <Link href="/shop" className="text-sm text-[#5f5850] hover:text-[#a26a22]">
              Browse shop
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-7 lg:gap-3">
            {(galleryImages.length
              ? galleryImages
              : [
                  "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&h=400&q=75",
                  "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&h=400&q=75",
                  "https://images.unsplash.com/photo-1614252235816-8c852fd85888?auto=format&fit=crop&w=400&h=400&q=75",
                ]
            ).map((image, index) => (
              <Link
                key={`${image}-${index}`}
                href="/shop"
                aria-label={`Product gallery ${index + 1}`}
                className="relative aspect-square overflow-hidden bg-[#eee8df]"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="14vw"
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  unoptimized={image.includes("res.cloudinary.com")}
                />
              </Link>
            ))}
          </div>
        </section>

        <section className="relative w-full overflow-hidden bg-[#30251b] text-white">
          <Image
            src={offerImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
            unoptimized={offerImage.includes("res.cloudinary.com")}
          />
          <div
            className={`${pad} relative flex flex-col gap-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-14`}
          >
            <div>
              <h2 className="font-display text-3xl font-semibold lg:text-4xl">
                Join Our Newsletter
              </h2>
              <p className="mt-2 text-base text-white/80">
                Exclusive offers, new arrivals, and style updates.
              </p>
            </div>
            <form className="flex w-full overflow-hidden rounded-xl bg-white sm:max-w-md">
              <input
                type="email"
                aria-label="Email address"
                placeholder="Enter your email address"
                className="min-w-0 flex-1 px-4 py-4 text-base text-[#27211a] outline-none"
              />
              <button
                type="button"
                className="flex items-center gap-1.5 bg-[#d3ad68] px-6 text-sm font-semibold text-[#221a11]"
              >
                Subscribe <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
