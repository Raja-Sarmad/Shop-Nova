"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "photo-1594035910387-fea47794261f",
    alt: "Warm amber perfume bottle",
    eyebrow: "A signature, made yours",
    title: (
      <>
        Discover Your
        <br />
        Signature Style
      </>
    ),
    copy: "Premium fragrances and footwear, curated for modern living.",
    primary: "Shop Perfumes",
    href: "/shop?category=fragrance",
  },
  {
    image: "photo-1615634260167-c8cdede054de",
    alt: "A refined fragrance for every occasion",
    eyebrow: "Find the note that feels like you",
    title: (
      <>
        Leave a little
        <br />
        Impression.
      </>
    ),
    copy: "Explore expressive scents made for your everyday rituals and memorable nights.",
    primary: "Explore Fragrances",
    href: "/shop?category=fragrance",
  },
  {
    image: "photo-1614252235816-8c852fd85888",
    alt: "Classic leather shoes in warm light",
    eyebrow: "Comfort, with character",
    title: (
      <>
        Every Step,
        <br />
        Your Own.
      </>
    ),
    copy: "Thoughtful footwear that takes you from the first plan to the last stop.",
    primary: "Shop Shoes",
    href: "/shop?category=shoes",
  },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, []);

  const move = (direction: number) =>
    setActive((current) => (current + direction + slides.length) % slides.length);
  const slide = slides[active];

  return (
    <section className="relative w-full min-h-[72vh] overflow-hidden bg-[#211711] text-white sm:min-h-[78vh] lg:min-h-[85vh]">
      {slides.map((item, index) => (
        <Image
          key={item.image}
          src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=2400&q=85`}
          alt={item.alt}
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-1000 ${
            active === index ? "opacity-80" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1b130f]/92 via-[#1b130f]/55 to-[#1b130f]/15" />

      <div className="relative mx-auto flex min-h-[72vh] w-full max-w-[1800px] items-center px-4 py-16 sm:min-h-[78vh] sm:px-6 lg:min-h-[85vh] xl:px-10 2xl:px-14">
        <div key={active} className="max-w-2xl animate-[rise_.65s_ease_both]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#e4c17e] sm:text-sm">
            {slide.eyebrow}
          </p>
          <h1 className="max-w-xl font-display text-5xl font-semibold leading-[0.96] sm:text-6xl lg:text-7xl xl:text-[78px]">
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
              href={
                slide.href.includes("fragrance")
                  ? "/shop?category=shoes"
                  : "/shop?category=fragrance"
              }
              className="inline-flex items-center gap-2 rounded-lg border border-white/75 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {slide.href.includes("fragrance") ? "Shop Shoes" : "Shop Perfumes"}{" "}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 mx-auto flex w-full max-w-[1800px] items-center justify-between px-4 sm:bottom-8 sm:px-6 xl:px-10 2xl:px-14">
        <div className="flex items-center gap-2" aria-label="Choose hero slide">
          {slides.map((item, index) => (
            <button
              key={item.image}
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
