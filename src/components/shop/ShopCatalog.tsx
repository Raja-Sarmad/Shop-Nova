"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { CATEGORIES, SORT_OPTIONS } from "@/lib/constants";
import { ProductGrid } from "@/components/product/ProductCard";
import { cn, formatPrice } from "@/lib/format";

type Props = {
  products: Product[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  title?: string;
  subtitle?: string;
};

export function ShopCatalog({ products, colors, sizes, title = "The shop", subtitle }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);

  const category = params.get("category") ?? "all";
  const color = params.get("color") ?? "";
  const size = params.get("size") ?? "";
  const sort = params.get("sort") ?? "featured";
  const max = Number(params.get("max") ?? 40000);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    const q = next.toString();
    router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (color) list = list.filter((p) => p.colors.some((c) => c.name === color));
    if (size) list = list.filter((p) => p.sizes.includes(size));
    list = list.filter((p) => p.price <= max);
    switch (sort) {
      case "newest":
        list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => Number(b.isBestseller) - Number(a.isBestseller));
    }
    return list;
  }, [products, category, color, size, sort, max]);

  const Filters = (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Category</p>
        <div className="mt-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setParam("category", "all")}
            className={cn("text-left text-sm", category === "all" ? "text-ink" : "text-ink-soft")}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setParam("category", c.slug)}
              className={cn("text-left text-sm", category === c.slug ? "text-ink" : "text-ink-soft")}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Colour</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={c.name}
              type="button"
              title={c.name}
              onClick={() => setParam("color", color === c.name ? "" : c.name)}
              className={cn(
                "h-6 w-6 rounded-full border",
                color === c.name ? "border-ink ring-1 ring-ink ring-offset-2" : "border-ink/10",
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Size</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setParam("size", size === s ? "" : s)}
              className={cn(
                "min-w-10 border px-2 py-1 text-xs",
                size === s ? "border-ink bg-ink text-cream" : "border-sand",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-muted">
          Up to {formatPrice(max)}
        </p>
        <input
          type="range"
          min={3000}
          max={40000}
          step={500}
          value={max}
          onChange={(e) => setParam("max", e.target.value)}
          className="mt-3 w-full accent-terracotta"
        />
      </div>
    </div>
  );

  return (
    <div className="container-page py-10">
      <div className="max-w-2xl">
        <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Catalog</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">{title}</h1>
        {subtitle ? <p className="mt-4 text-sm leading-7 text-ink-soft">{subtitle}</p> : null}
      </div>

      <div className="mt-10 flex items-center justify-between gap-4 border-y border-sand py-4">
        <button
          type="button"
          className="flex items-center gap-2 text-xs tracking-[0.16em] uppercase lg:hidden"
          onClick={() => setOpen(true)}
        >
          <SlidersHorizontal size={14} /> Filters
        </button>
        <p className="text-sm text-ink-soft">{filtered.length} pieces</p>
        <label className="flex items-center gap-2 text-sm">
          <span className="hidden text-muted sm:inline">Sort</span>
          <select
            value={sort}
            onChange={(e) => setParam("sort", e.target.value)}
            className="bg-transparent outline-none"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">{Filters}</aside>
        <ProductGrid products={filtered} />
      </div>

      {open ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
            aria-label="Close filters"
          />
          <aside className="absolute top-0 left-0 h-full w-[86%] max-w-sm overflow-y-auto bg-ivory p-6 drawer-in">
            <div className="mb-8 flex items-center justify-between">
              <p className="font-display text-2xl">Filters</p>
              <button type="button" onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>
            {Filters}
          </aside>
        </div>
      ) : null}
    </div>
  );
}
