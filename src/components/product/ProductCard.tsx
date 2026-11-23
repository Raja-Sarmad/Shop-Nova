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
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-sand sm:rounded-3xl">
        <Link href={`/product/${product.slug}`} className="block h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.images[1] ? (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          ) : null}
        </Link>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-ivory/90 backdrop-blur-sm transition-colors sm:top-3 sm:right-3 sm:h-9 sm:w-9",
            saved ? "text-terracotta" : "text-ink",
          )}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart size={16} fill={saved ? "currentColor" : "none"} />
        </button>
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 sm:top-3 sm:left-3">
          {product.isNew ? (
            <span className="rounded-full bg-ivory px-2 py-1 text-[10px] tracking-[0.16em] uppercase sm:px-2.5 sm:text-[11px]">
              New
            </span>
          ) : null}
          {product.compareAtPrice ? (
            <span className="rounded-full bg-terracotta px-2 py-1 text-[10px] tracking-[0.16em] uppercase text-cream sm:px-2.5 sm:text-[11px]">
              Sale
            </span>
          ) : null}
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-2 sm:mt-4 sm:gap-3">
        <div className="min-w-0">
          <Link
            href={`/product/${product.slug}`}
            className="line-clamp-2 text-sm font-medium sm:text-[15px]"
          >
            {product.name}
          </Link>
          {product.subtitle ? (
            <p className="mt-1 line-clamp-1 text-xs text-muted sm:mt-1.5 sm:text-sm">
              {product.subtitle}
            </p>
          ) : null}
        </div>
        <div className="shrink-0 text-right text-sm font-medium sm:text-[15px]">
          {product.compareAtPrice ? (
            <p className="text-xs text-muted line-through sm:text-sm">
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
    <div
      className={cn(
        "grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 4} />
      ))}
    </div>
  );
}
