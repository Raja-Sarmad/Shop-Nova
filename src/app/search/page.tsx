"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/data/catalog-data";
import { ProductGrid } from "@/components/product/ProductCard";

function SearchInner() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.subtitle.toLowerCase().includes(needle) ||
        p.tags.some((t) => t.includes(needle)) ||
        p.category.includes(needle),
    );
  }, [q]);

  return (
    <div className="container-page py-12">
      <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Search</p>
      <h1 className="mt-2 font-display text-5xl">{q ? `Results for “${q}”` : "Search the catalog"}</h1>
      <p className="mt-3 text-sm text-ink-soft">{results.length} pieces</p>
      <div className="mt-10">
        <ProductGrid products={results} />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchInner />
    </Suspense>
  );
}
