"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";

type Slide = {
  key: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  copy: string;
  primary: string;
  href: string;
  secondary: string;
  secondaryHref: string;
};

const fallbackSlides: Slide[] = [
  {
    key: "fallback-perfume",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=2400&q=85",
    alt: "Warm amber perfume bottle",
    eyebrow: "A signature, made yours",
    title: "Discover Your Signature Style",
    copy: "Premium fragrances and footwear, curated for modern living.",
    primary: "Shop Perfumes",
    href: "/shop?category=fragrance",
    secondary: "Shop Shoes",
    secondaryHref: "/shop?category=shoes",
  },
  {
    key: "fallback-shoes",
    image:
      "https://images.unsplash.com/photo-1614252235816-8c852fd85888?auto=format&fit=crop&w=2400&q=85",
    alt: "Classic leather shoes in warm light",
    eyebrow: "Comfort, with character",
    title: "Every Step, Your Own",
    copy: "Thoughtful footwear that takes you from the first plan to the last stop.",
    primary: "Shop Shoes",
    href: "/shop?category=shoes",
    secondary: "Shop Perfumes",
    secondaryHref: "/shop?category=fragrance",
  },
];

function buildSlides(products: Product[]): Slide[] {
  const withImages = products.filter((p) => p.images?.[0]);
  const perfume = withImages.find((p) => p.category === "fragrance");
  const shoes = withImages.find((p) => p.category === "shoes");
  const extras = withImages
    .filter((p) => p.id !== perfume?.id && p.id !== shoes?.id)
    .slice(0, 1);

  const slides: Slide[] = [];

  if (perfume) {
    slides.push({
      key: perfume.id,
      image: perfume.images[0],
      alt: perfume.name,
      eyebrow: "New in fragrance",
      title: perfume.name,
      copy: perfume.subtitle || "A refined scent made for everyday rituals and memorable nights.",
      primary: "Shop this perfume",
      href: `/product/${perfume.slug}`,
      secondary: "All perfumes",
      secondaryHref: "/shop?category=fragrance",
    });
  }

  if (shoes) {
    slides.push({
      key: shoes.id,
      image: shoes.images[0],
      alt: shoes.name,
      eyebrow: "New in footwear",
      title: shoes.name,
      copy: shoes.subtitle || "Designed for comfort, presence, and every kind of day.",
      primary: "Shop these shoes",
      href: `/product/${shoes.slug}`,
      secondary: "All shoes",
      secondaryHref: "/shop?category=shoes",
    });
  }

  for (const product of extras) {
    slides.push({
      key: product.id,
      image: product.images[0],
      alt: product.name,
      eyebrow: product.category === "fragrance" ? "Featured perfume" : "Featured footwear",
      title: product.name,
      copy: product.subtitle || "Added to the Shop Nova collection.",
      primary: "View product",
      href: `/product/${product.slug}`,
      secondary: product.category === "fragrance" ? "All perfumes" : "All shoes",
      secondaryHref:
        product.category === "fragrance"
          ? "/shop?category=fragrance"
          : "/shop?category=shoes",
    });
  }

  return slides.length ? slides : fallbackSlides;
}

export function HeroSlider({ products = [] }: { products?: Product[] }) {
  const slides = useMemo(() => buildSlides(products), [products]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [slides.length]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || slides.length < 2) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      5200,
    );
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const move = (direction: number) =>
    setActive((current) => (current + direction + slides.length) % slides.length);
  const slide = slides[active] ?? slides[0];

  return (
    <section className="relative w-full min-h-[72vh] overflow-hidden bg-[#211711] text-white sm:min-h-[78vh] lg:min-h-[85vh]">
      {slides.map((item, index) => (
        <Image
          key={item.key}
          src={item.image}
          alt={item.alt}
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-1000 ${
            active === index ? "opacity-90 scale-105" : "opacity-0 scale-100"
          }`}
          unoptimized={item.image.includes("res.cloudinary.com")}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#140f0c]/92 via-[#140f0c]/55 to-[#140f0c]/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,174,105,0.18),transparent_45%)]" />

      <div className="relative mx-auto flex min-h-[72vh] w-full max-w-[1800px] items-center px-4 py-16 sm:min-h-[78vh] sm:px-6 lg:min-h-[85vh] xl:px-10 2xl:px-14">
        <div key={slide.key} className="max-w-2xl animate-[rise_.65s_ease_both]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#e4c17e] sm:text-sm">
            {slide.eyebrow}
          </p>
          <h1 className="max-w-xl font-display text-5xl font-semibold leading-[0.96] sm:text-6xl lg:text-7xl xl:text-[76px]">
            {slide.title}
          </h1>
          <p className="mt-5 max-w-md text-base leading-8 text-white/90 sm:text-lg">
            {slide.copy}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 rounded-lg bg-[#d0a65f] px-7 py-3.5 text-sm font-semibold text-[#211a12] shadow-sm transition-colors hover:bg-[#e3c080]"
            >
              {slide.primary} <ArrowRight size={16} />
            </Link>
            <Link
              href={slide.secondaryHref}
              className="inline-flex items-center gap-2 rounded-lg border border-white/75 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {slide.secondary} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 mx-auto flex w-full max-w-[1800px] items-center justify-between px-4 sm:bottom-8 sm:px-6 xl:px-10 2xl:px-14">
        <div className="flex items-center gap-2" aria-label="Choose hero slide">
          {slides.map((item, index) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-current={active === index}
              className={`h-1.5 rounded-full transition-all ${
                active === index ? "w-8 bg-[#e7c27d]" : "w-2 bg-white/55 hover:bg-white"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-black/10 transition-colors hover:bg-white/20"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-black/10 transition-colors hover:bg-white/20"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
