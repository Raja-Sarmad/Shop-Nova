"use client";

import type { Product } from "@/lib/types";
import { useManagedProducts } from "@/hooks/useManagedProducts";
import { HomeProductCard } from "@/components/product/HomeProductCard";
import { inStock, matchesCatalogFilter } from "@/lib/catalogFilters";

export function ManagedNewArrivals({ initialProducts }: { initialProducts: Product[] }) {
  const products = useManagedProducts(initialProducts);
  const arrivals = [...products]
    .filter(inStock)
    .filter((product) => matchesCatalogFilter(product, "new"))
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 4);

  if (!arrivals.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#e4d9c8] bg-white px-6 py-14 text-center">
        <p className="text-base text-[#6d665e]">
          Mark products as <strong>New</strong> in the dashboard to show them here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
      {arrivals.map((product) => (
        <HomeProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
