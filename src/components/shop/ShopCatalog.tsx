"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/lib/types";
import {
  CATALOG_FILTERS,
  CATEGORIES,
  GENDERS,
  SORT_OPTIONS,
} from "@/lib/constants";
import {
  inStock,
  matchesCatalogFilter,
  matchesGender,
} from "@/lib/catalogFilters";
import { ProductGrid } from "@/components/product/ProductCard";
import { cn, formatPrice } from "@/lib/format";
import { useManagedProducts } from "@/hooks/useManagedProducts";

type Props = {
  products: Product[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  title?: string;
  subtitle?: string;
};

export function ShopCatalog({
  products,
  colors,
  sizes,
  title = "The shop",
  subtitle,
}: Props) {
  const managedProducts = useManagedProducts(products);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);

  const category = params.get("category") ?? "all";
  const gender = params.get("gender") ?? "all";
  const catalogFilter = params.get("filter") ?? "";
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

  const clearFilters = () => {
    const next = new URLSearchParams();
    if (sort && sort !== "featured") next.set("sort", sort);
    const q = next.toString();
    router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
  };

  const scopedProducts = useMemo(() => {
    let list = managedProducts.filter(inStock);
    if (category !== "all") list = list.filter((p) => p.category === category);
    list = list.filter((p) => matchesGender(p, gender));
    list = list.filter((p) => matchesCatalogFilter(p, catalogFilter));
    return list;
  }, [managedProducts, category, gender, catalogFilter]);

  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    for (const product of scopedProducts) {
      for (const c of product.colors) {
        if (!map.has(c.name)) map.set(c.name, c.hex);
      }
    }
    if (map.size === 0) return colors;
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [scopedProducts, colors]);

  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    for (const product of scopedProducts) {
      for (const s of product.sizes) set.add(s);
    }
    if (set.size === 0) return sizes;
    return Array.from(set).sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true }),
    );
  }, [scopedProducts, sizes]);

  const filtered = useMemo(() => {
    let list = [...scopedProducts];
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
  }, [scopedProducts, color, size, sort, max]);

  const activeFilterCount = [
    category !== "all",
    gender !== "all",
    Boolean(catalogFilter),
    Boolean(color),
    Boolean(size),
    max < 40000,
  ].filter(Boolean).length;

  const heading =
    gender === "men"
      ? "Men"
      : gender === "women"
        ? "Women"
        : category === "fragrance"
          ? catalogFilter === "new"
            ? "New perfumes"
            : catalogFilter === "bestseller"
              ? "Best-selling perfumes"
              : catalogFilter === "sale"
                ? "Perfume sale"
                : "Perfumes"
          : category === "shoes"
            ? catalogFilter === "new"
              ? "New shoes"
              : catalogFilter === "bestseller"
                ? "Best-selling shoes"
                : catalogFilter === "sale"
                  ? "Shoes on sale"
                  : "Shoes"
            : catalogFilter === "new"
              ? "New arrivals"
              : catalogFilter === "sale"
                ? "Sale"
                : catalogFilter === "bestseller"
                  ? "Best sellers"
                  : title;

  const Filters = (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Category</p>
        <div className="mt-3 flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setParam("category", "all")}
            className={cn(
              "rounded-xl px-3 py-2 text-left text-sm transition",
              category === "all"
                ? "bg-[#f4ebe0] font-medium text-ink"
                : "text-ink-soft hover:bg-[#f7f1e8]",
            )}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setParam("category", c.slug)}
              className={cn(
                "rounded-xl px-3 py-2 text-left text-sm transition",
                category === c.slug
                  ? "bg-[#f4ebe0] font-medium text-ink"
                  : "text-ink-soft hover:bg-[#f7f1e8]",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-muted">For</p>
        <div className="mt-3 flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setParam("gender", "all")}
            className={cn(
              "rounded-xl px-3 py-2 text-left text-sm transition",
              gender === "all"
                ? "bg-[#f4ebe0] font-medium text-ink"
                : "text-ink-soft hover:bg-[#f7f1e8]",
            )}
          >
            Everyone
          </button>
          {GENDERS.map((g) => (
            <button
              key={g.slug}
              type="button"
              onClick={() => setParam("gender", g.slug)}
              className={cn(
                "rounded-xl px-3 py-2 text-left text-sm transition",
                gender === g.slug
                  ? "bg-[#f4ebe0] font-medium text-ink"
                  : "text-ink-soft hover:bg-[#f7f1e8]",
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Collection</p>
        <div className="mt-3 flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setParam("filter", "")}
            className={cn(
              "rounded-xl px-3 py-2 text-left text-sm transition",
              !catalogFilter
                ? "bg-[#f4ebe0] font-medium text-ink"
                : "text-ink-soft hover:bg-[#f7f1e8]",
            )}
          >
            All pieces
          </button>
          {CATALOG_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() =>
                setParam("filter", catalogFilter === f.value ? "" : f.value)
              }
              className={cn(
                "rounded-xl px-3 py-2 text-left text-sm transition",
                catalogFilter === f.value
                  ? "bg-[#f4ebe0] font-medium text-ink"
                  : "text-ink-soft hover:bg-[#f7f1e8]",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {availableColors.length > 0 ? (
        <div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-muted">
            {category === "fragrance" ? "Notes / tone" : "Colour"}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {availableColors.map((c) => (
              <button
                key={c.name}
                type="button"
                title={c.name}
                onClick={() => setParam("color", color === c.name ? "" : c.name)}
                className={cn(
                  "h-7 w-7 rounded-full border transition",
                  color === c.name
                    ? "border-ink ring-1 ring-ink ring-offset-2"
                    : "border-ink/10",
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      ) : null}

      {availableSizes.length > 0 ? (
        <div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-muted">
            {category === "fragrance" ? "Volume" : "Size"}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {availableSizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setParam("size", size === s ? "" : s)}
                className={cn(
                  "min-w-10 rounded-full border px-2.5 py-1.5 text-xs transition",
                  size === s
                    ? "border-ink bg-ink text-cream"
                    : "border-sand hover:border-ink",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : null}

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

      {activeFilterCount > 0 ? (
        <button
          type="button"
          onClick={clearFilters}
          className="text-xs tracking-[0.16em] uppercase text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          Clear filters
        </button>
      ) : null}
    </div>
  );

  return (
    <div className="container-page py-8 sm:py-10">
      <div className="max-w-2xl">
        <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Catalog</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl">{heading}</h1>
        {subtitle ? (
          <p className="mt-4 text-sm leading-7 text-ink-soft">{subtitle}</p>
        ) : (
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            {gender === "men"
              ? "Men’s perfumes and shoes published from your dashboard."
              : gender === "women"
                ? "Women’s perfumes, shoes and sandals from your dashboard."
                : catalogFilter
                  ? "Only products tagged for this section in the dashboard appear here."
                  : "Shop shows the full live catalog. Use filters to narrow by category, gender, new, bestseller or sale."}
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-y border-sand py-4 sm:mt-10">
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-sand px-3.5 py-2 text-xs tracking-[0.16em] uppercase lg:hidden"
          onClick={() => setOpen(true)}
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeFilterCount > 0 ? (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[10px] text-cream">
              {activeFilterCount}
            </span>
          ) : null}
        </button>
        <p className="text-sm text-ink-soft">{filtered.length} pieces</p>
        <label className="flex items-center gap-2 rounded-full border border-sand px-3 py-2 text-sm">
          <span className="hidden text-muted sm:inline">Sort</span>
          <select
            value={sort}
            onChange={(e) => setParam("sort", e.target.value)}
            className="max-w-[160px] bg-transparent outline-none sm:max-w-none"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="hidden lg:block">{Filters}</aside>
        {filtered.length ? (
          <ProductGrid products={filtered} />
        ) : (
          <div className="rounded-3xl border border-dashed border-sand px-6 py-16 text-center">
            <p className="font-display text-2xl">No pieces match</p>
            <p className="mt-2 text-sm text-ink-soft">
              Mark products as New / Bestseller / Sale or set Men / Women in the
              dashboard to fill this view.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 text-xs tracking-[0.16em] uppercase underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {open ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
            aria-label="Close filters"
          />
          <aside className="absolute top-0 left-0 flex h-full w-[88%] max-w-sm flex-col overflow-y-auto bg-ivory p-6 drawer-in">
            <div className="mb-8 flex items-center justify-between">
              <p className="font-display text-2xl">Filters</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            {Filters}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-8 rounded-full bg-ink py-3.5 text-xs tracking-[0.18em] uppercase text-cream"
            >
              Show {filtered.length} results
            </button>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
