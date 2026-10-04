"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/lib/data/catalog-data";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/context/StoreProvider";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!searchOpen) setQuery("");
  }, [searchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 6);
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.includes(q) ||
          p.tags.some((t) => t.includes(q)),
      )
      .slice(0, 8);
  }, [query]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[75] bg-ivory/96 fade-in">
      <div className="container-page py-8">
        <div className="flex items-center gap-4 border-b border-ink/15 pb-4">
          <Search size={20} className="text-muted" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchOpen(false);
                router.push(`/search?q=${encodeURIComponent(query)}`);
              }
              if (e.key === "Escape") setSearchOpen(false);
            }}
            placeholder="Search linen, silk, loafers…"
            className="w-full bg-transparent font-display text-3xl outline-none placeholder:text-mist md:text-5xl"
          />
          <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">
            <X size={22} />
          </button>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-[200px_1fr]">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Suggestions</p>
            <div className="mt-4 flex flex-col gap-2">
              {["linen", "silk", "loafers", "jewelry", "home"].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="text-left text-sm capitalize text-ink-soft hover:text-ink"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/product/${p.slug}`}
                  onClick={() => setSearchOpen(false)}
                  className="flex gap-4"
                >
                  <div className="relative h-24 w-20 overflow-hidden bg-sand">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm">{p.name}</p>
                    <p className="mt-1 text-xs text-muted">{p.subtitle}</p>
                    <p className="mt-2 text-sm">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
