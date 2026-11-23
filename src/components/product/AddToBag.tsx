"use client";

import { Heart, MessageCircle, Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice, cn } from "@/lib/format";
import { useStore } from "@/context/StoreProvider";
import { productOrderMessage, whatsappHref } from "@/lib/whatsapp";

export function AddToBag({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist, setCartOpen } = useStore();
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [qty, setQty] = useState(1);
  const saved = wishlist.includes(product.id);
  const maxQuantity = product.stockQuantity ?? Number.POSITIVE_INFINITY;
  const isPerfume = product.category === "fragrance";

  const waHref = whatsappHref(
    productOrderMessage(product, { size, color, quantity: qty }),
  );

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.22em] uppercase text-muted">
            {isPerfume ? "Perfume" : product.category}
          </p>
          <h1 className="mt-2 font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
            {product.name}
          </h1>
          {product.subtitle ? (
            <p className="mt-2 text-sm text-ink-soft">{product.subtitle}</p>
          ) : null}
        </div>
        <div className="shrink-0 text-left sm:text-right">
          {product.compareAtPrice ? (
            <p className="text-sm text-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </p>
          ) : null}
          <p className="font-display text-3xl">{formatPrice(product.price)}</p>
        </div>
      </div>

      <p className="mt-6 text-sm leading-7 text-ink-soft">{product.description}</p>

      {product.colors.length > 0 ? (
        <div className="mt-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted">
            {isPerfume ? "Variant" : "Colour"} — {color || "Select"}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColor(c.name)}
                title={c.name}
                className={cn(
                  "h-9 w-9 rounded-full border transition",
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

      {product.sizes.length > 0 ? (
        <div className="mt-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted">
            {isPerfume ? "Size / volume" : "Size"}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  "min-w-12 rounded-full border px-3.5 py-2 text-sm transition",
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

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="flex items-center justify-between rounded-full border border-sand px-1 sm:justify-start">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-[#f4ebe0]"
            onClick={() => setQty((n) => Math.max(1, n - 1))}
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center text-sm font-medium">{qty}</span>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-[#f4ebe0] disabled:opacity-40"
            disabled={qty >= maxQuantity}
            onClick={() => setQty((n) => Math.min(maxQuantity, n + 1))}
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>

        <button
          type="button"
          disabled={maxQuantity === 0}
          onClick={() => {
            addToCart({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.images[0],
              size: size || "One size",
              color: color || "Default",
              quantity: qty,
            });
            setCartOpen(true);
          }}
          className="flex-1 rounded-full bg-ink py-3.5 text-xs tracking-[0.2em] uppercase text-cream disabled:cursor-not-allowed disabled:opacity-50"
        >
          {maxQuantity === 0 ? "Out of stock" : "Add to bag"}
        </button>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border self-center sm:self-auto",
            saved ? "border-terracotta text-terracotta" : "border-sand",
          )}
          aria-label="Wishlist"
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      <a
        href={waHref}
        target="_blank"
        rel="noreferrer"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-5 py-3.5 text-sm font-semibold text-[#128C7E] transition hover:bg-[#25D366]/18"
      >
        <MessageCircle size={18} />
        Order on WhatsApp
      </a>

      <p className="mt-3 text-xs leading-5 text-muted">
        Prefer chatting? WhatsApp opens with your product, size and quantity ready to send.
      </p>
    </div>
  );
}
