"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Gender, Product } from "@/lib/types";
import { useManagedProducts } from "@/hooks/useManagedProducts";
import { HomeProductCard } from "@/components/product/HomeProductCard";
import { inStock, matchesGender } from "@/lib/catalogFilters";

export function GenderProductRail({
  initialProducts,
  gender,
  title,
  subtitle,
  href,
}: {
  initialProducts: Product[];
  gender: Extract<Gender, "men" | "women">;
  title: string;
  subtitle: string;
  href: string;
}) {
  const products = useManagedProducts(initialProducts);
  const items = products
    .filter(inStock)
    .filter((product) => matchesGender(product, gender))
    .slice(0, 4);

  return (
    <section className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 xl:px-10 2xl:px-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-bold text-[#201c18] sm:text-4xl lg:text-[40px]">
            {title}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[#6d665e] sm:text-base">{subtitle}</p>
        </div>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#655d54] hover:text-[#a26a22]"
        >
          View All <ArrowRight size={15} />
        </Link>
      </div>

      {items.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {items.map((product) => (
            <HomeProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#e4d9c8] bg-white px-6 py-14 text-center">
          <p className="text-base text-[#6d665e]">
            No {gender === "men" ? "men’s" : "women’s"} products live yet. Set
            gender to {gender === "men" ? "Men" : "Women"} (or Unisex) when you
            publish from the dashboard.
          </p>
        </div>
      )}
    </section>
  );
}
