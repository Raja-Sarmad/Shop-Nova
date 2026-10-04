"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice, cn } from "@/lib/format";
import { useStore } from "@/context/StoreProvider";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { wishlist, toggleWishlist } = useStore();
  const saved = wishlist.includes(product.id);

  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <Link href={`/product/${product.slug}`} className="block h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.images[1] ? (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          ) : null}
        </Link>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 backdrop-blur-sm transition-colors",
            saved ? "text-terracotta" : "text-ink",
          )}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart size={16} fill={saved ? "currentColor" : "none"} />
        </button>
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew ? (
            <span className="bg-ivory px-2 py-1 text-[10px] tracking-[0.18em] uppercase">
              New
            </span>
          ) : null}
          {product.compareAtPrice ? (
            <span className="bg-terracotta px-2 py-1 text-[10px] tracking-[0.18em] uppercase text-cream">
              Sale
            </span>
          ) : null}
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link href={`/product/${product.slug}`} className="text-sm">
            {product.name}
          </Link>
          <p className="mt-1 text-xs text-muted">{product.subtitle}</p>
        </div>
        <div className="text-right text-sm">
          {product.compareAtPrice ? (
            <p className="text-xs text-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </p>
          ) : null}
          <p>{formatPrice(product.price)}</p>
        </div>
      </div>
      <div className="mt-3 flex gap-1.5">
        {product.colors.slice(0, 4).map((c) => (
          <span
            key={c.name}
            title={c.name}
            className="h-3 w-3 rounded-full border border-ink/10"
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </article>
  );
}

export function ProductGrid({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-display text-4xl">Nothing here yet</p>
        <p className="mt-2 text-sm text-ink-soft">Try another filter or collection.</p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 4} />
      ))}
    </div>
  );
}
