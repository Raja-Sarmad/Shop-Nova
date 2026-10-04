"use client";

import Link from "next/link";
import { products } from "@/lib/data/catalog-data";
import { ProductGrid } from "@/components/product/ProductCard";
import { useStore } from "@/context/StoreProvider";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="container-page py-12">
      <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Saved</p>
      <h1 className="mt-2 font-display text-5xl">Wishlist</h1>
      {saved.length === 0 ? (
        <div className="mt-16 max-w-lg">
          <p className="text-ink-soft">
            Nothing saved yet. Tap the heart on a piece and it will wait here.
          </p>
          <Link href="/shop" className="mt-6 inline-block bg-ink px-6 py-3 text-xs tracking-[0.18em] uppercase text-cream">
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="mt-12">
          <ProductGrid products={saved} />
        </div>
      )}
    </div>
  );
}
