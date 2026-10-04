"use client";

import { Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice, cn } from "@/lib/format";
import { useStore } from "@/context/StoreProvider";

export function AddToBag({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [qty, setQty] = useState(1);
  const saved = wishlist.includes(product.id);

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-muted">
            {product.category}
          </p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-2 text-sm text-ink-soft">{product.subtitle}</p>
        </div>
        <div className="text-right">
          {product.compareAtPrice ? (
            <p className="text-sm text-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </p>
          ) : null}
          <p className="font-display text-3xl">{formatPrice(product.price)}</p>
        </div>
      </div>

      <p className="mt-6 text-sm leading-7 text-ink-soft">{product.description}</p>

      <div className="mt-8">
        <p className="text-[11px] tracking-[0.2em] uppercase text-muted">Colour — {color}</p>
        <div className="mt-3 flex gap-2">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setColor(c.name)}
              title={c.name}
              className={cn(
                "h-8 w-8 rounded-full border",
                color === c.name ? "border-ink ring-1 ring-ink ring-offset-2" : "border-ink/10",
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-[11px] tracking-[0.2em] uppercase text-muted">Size</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={cn(
                "min-w-12 border px-3 py-2 text-sm",
                size === s ? "border-ink bg-ink text-cream" : "border-sand hover:border-ink",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <div className="flex items-center border border-sand">
          <button type="button" className="px-3 py-3" onClick={() => setQty((n) => Math.max(1, n - 1))}>
            <Minus size={14} />
          </button>
          <span className="w-8 text-center">{qty}</span>
          <button type="button" className="px-3 py-3" onClick={() => setQty((n) => n + 1)}>
            <Plus size={14} />
          </button>
        </div>
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
              quantity: qty,
            })
          }
          className="flex-1 bg-ink text-xs tracking-[0.2em] uppercase text-cream"
        >
          Add to bag
        </button>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "flex h-12 w-12 items-center justify-center border",
            saved ? "border-terracotta text-terracotta" : "border-sand",
          )}
          aria-label="Wishlist"
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}
