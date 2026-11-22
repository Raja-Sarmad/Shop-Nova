"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { useManagedProducts } from "@/hooks/useManagedProducts";
import { HomeProductCard } from "@/components/product/HomeProductCard";

export function CategoryProductRail({
  initialProducts,
  category,
  title,
  href,
}: {
  initialProducts: Product[];
  category: "fragrance" | "shoes";
  title: string;
  href: string;
}) {
  const products = useManagedProducts(initialProducts);
  const items = products
    .filter((product) => product.category === category)
    .filter((product) => product.stockQuantity === undefined || product.stockQuantity > 0)
    .slice(0, 4);

  if (!items.length) {
    return (
      <section className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 xl:px-10 2xl:px-14">
        <div className="mb-6 flex items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-bold text-[#201c18] sm:text-4xl lg:text-[40px]">
            {title}
          </h2>
          <Link href={href} className="text-sm font-medium text-[#655d54] hover:text-[#a26a22]">
            View All <ArrowRight size={14} className="ml-1 inline" />
          </Link>
        </div>
        <div className="rounded-2xl border border-dashed border-[#e4d9c8] bg-white px-6 py-14 text-center">
          <p className="text-base text-[#6d665e]">
            No {category === "fragrance" ? "perfumes" : "shoes"} live yet. Add them from the
            dashboard.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 xl:px-10 2xl:px-14">
      <div className="mb-6 flex items-end justify-between gap-3">
        <h2 className="font-display text-3xl font-bold text-[#201c18] sm:text-4xl lg:text-[40px]">
          {title}
        </h2>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#655d54] hover:text-[#a26a22]"
        >
          View All <ArrowRight size={15} />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {items.map((product) => (
          <HomeProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
