"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useStore, itemKey } from "@/context/StoreProvider";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart } = useStore();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[75]">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40 fade-in"
        onClick={() => setCartOpen(false)}
        aria-label="Close bag"
      />
      <aside className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-ivory drawer-in">
        <div className="flex items-center justify-between border-b border-sand px-6 py-5">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Your bag</p>
            <p className="font-display text-2xl">{cart.length} piece{cart.length === 1 ? "" : "s"}</p>
          </div>
          <button type="button" onClick={() => setCartOpen(false)} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-display text-3xl">Your bag is empty</p>
              <p className="mt-2 text-sm text-ink-soft">Start with the linen edit or evening atelier.</p>
              <Link
                href="/shop"
                onClick={() => setCartOpen(false)}
                className="mt-6 bg-ink px-6 py-3 text-xs tracking-[0.18em] uppercase text-cream"
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {cart.map((item) => (
                <li key={itemKey(item)} className="flex gap-4">
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={() => setCartOpen(false)}
                    className="relative h-28 w-20 shrink-0 overflow-hidden bg-sand"
                  >
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="text-sm"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-xs text-muted">
                          {item.color} · {item.size}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(itemKey(item))}
                        className="text-muted hover:text-ink"
                        aria-label="Remove"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-sand">
                        <button
                          type="button"
                          className="px-2 py-1"
                          onClick={() => updateQty(itemKey(item), item.quantity - 1)}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          className="px-2 py-1"
                          onClick={() => updateQty(itemKey(item), item.quantity + 1)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-sm">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 ? (
          <div className="border-t border-sand px-6 py-5">
            <div className="mb-4 h-1 overflow-hidden bg-sand">
              <div
                className="h-full bg-forest transition-all"
                style={{
                  width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                }}
              />
            </div>
            <p className="mb-4 text-xs text-ink-soft">
              {remaining === 0
                ? "Complimentary shipping unlocked."
                : `${formatPrice(remaining)} away from complimentary shipping.`}
            </p>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-ink-soft">Subtotal</span>
              <span className="font-display text-2xl">{formatPrice(subtotal)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="flex h-12 items-center justify-center bg-ink text-xs tracking-[0.2em] uppercase text-cream"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={() => setCartOpen(false)}
              className="mt-3 flex h-11 items-center justify-center text-xs tracking-[0.18em] uppercase"
            >
              View bag
            </Link>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
