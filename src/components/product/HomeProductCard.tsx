"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/format";
import { useStore } from "@/context/StoreProvider";

export function HomeProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const saved = wishlist.includes(product.id);
  const oldPrice = product.compareAtPrice ?? Math.round((product.price * 1.12) / 100) * 100;
  const discount = Math.max(1, Math.round((1 - product.price / oldPrice) * 100));
  const size = product.sizes[0] ?? "One size";
  const color = product.colors[0]?.name ?? "Default";

  return (
    <article className="overflow-hidden rounded-xl border border-[#eadfce] bg-white shadow-[0_2px_8px_rgba(59,43,25,0.06)]">
      <div className="relative aspect-[1.7/1] overflow-hidden bg-[#f8f5f1]">
        <Link href={`/product/${product.slug}`} className="absolute inset-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 18vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 hover:scale-[1.04]"
          />
        </Link>
        <span
          className={cn(
            "absolute top-2.5 left-2.5 rounded-md px-2.5 py-1 text-[11px] font-semibold text-white",
            product.isNew
              ? "bg-[#b58a45]"
              : product.isBestseller
                ? "bg-[#b58a45]"
                : "bg-[#c74e3b]",
          )}
        >
          {product.isNew ? "New" : product.isBestseller ? "Best Seller" : `${discount}% Off`}
        </span>
        <button
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#342c26]"
        >
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-4">
        <Link
          href={`/product/${product.slug}`}
          className="block text-[15px] font-semibold leading-snug text-[#28231e]"
        >
          {product.name}
        </Link>
        <p className="mt-1.5 truncate text-sm text-[#6d665e]">{product.subtitle}</p>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-[#a66f1f]">
          <Star size={14} fill="currentColor" /> {product.rating.toFixed(1)}{" "}
          <span className="text-[#77716b]">({product.reviewCount} Reviews)</span>
        </p>
        <div className="mt-3 flex h-7 items-center gap-1.5 overflow-hidden">
          {product.sizes.slice(0, 5).map((item) => (
            <span
              key={item}
              className={cn(
                "flex h-6 min-w-7 items-center justify-center rounded-md border px-1.5 text-[11px]",
                item === size
                  ? "border-[#b18443] bg-[#b18443] text-white"
                  : "border-[#e6ddd0] text-[#514941]",
              )}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base font-bold text-[#241f1a]">
            PKR {product.price.toLocaleString("en-PK")}
          </span>
          <span className="text-xs text-[#898078] line-through">
            PKR {oldPrice.toLocaleString("en-PK")}
          </span>
          <span className="ml-auto rounded-md bg-[#fff0e9] px-1.5 py-0.5 text-[11px] font-semibold text-[#c64f3e]">
            -{discount}%
          </span>
        </div>
        <p className="mt-1.5 text-xs font-medium text-[#41834b]">● In Stock</p>
        <div className="mt-3 grid grid-cols-[1fr_1fr] gap-2">
          <button
            type="button"
            onClick={() =>
              addToCart({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0],
                size,
                color,
              })
            }
            className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-[#b58a45] px-2 text-sm font-medium text-white hover:bg-[#9f7434]"
          >
            <ShoppingCart size={14} /> Quick Add
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="flex h-10 items-center justify-center rounded-lg border border-[#d8c8ad] text-sm text-[#3d352c] hover:bg-[#faf6ef]"
          >
            Quick View
          </Link>
        </div>
      </div>
    </article>
  );
}
