"use client";

import type { Product } from "@/lib/types";
import { useManagedProducts } from "@/hooks/useManagedProducts";
import { HomeProductCard } from "@/components/product/HomeProductCard";

export function ManagedNewArrivals({ initialProducts }: { initialProducts: Product[] }) {
  const products = useManagedProducts(initialProducts);
  const arrivals = [...products]
    .filter((product) => product.stockQuantity === undefined || product.stockQuantity > 0)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
      {arrivals.map((product) => (
        <HomeProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
