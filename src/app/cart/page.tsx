"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useStore, itemKey } from "@/context/StoreProvider";
import { formatPrice } from "@/lib/format";
import { FLAT_SHIPPING, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export default function CartPage() {
  const { cart, updateQty, removeFromCart } = useStore();
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;

  return (
    <div className="container-page py-12">
      <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Bag</p>
      <h1 className="mt-2 font-display text-5xl">Your selection</h1>

      {cart.length === 0 ? (
        <div className="mt-16 max-w-lg">
          <p className="text-ink-soft">The bag is empty. The linen edit is a good place to begin.</p>
          <Link href="/shop" className="mt-6 inline-block bg-ink px-6 py-3 text-xs tracking-[0.18em] uppercase text-cream">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_340px]">
          <ul className="divide-y divide-sand border-y border-sand">
            {cart.map((item) => (
              <li key={itemKey(item)} className="flex gap-5 py-6">
                <Link href={`/product/${item.slug}`} className="relative h-36 w-28 shrink-0 bg-sand">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <div>
                      <Link href={`/product/${item.slug}`}>{item.name}</Link>
                      <p className="mt-1 text-sm text-muted">
                        {item.color} · {item.size}
                      </p>
                    </div>
                    <p>{formatPrice(item.price * item.quantity)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-sand">
                      <button type="button" className="px-3 py-2" onClick={() => updateQty(itemKey(item), item.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button type="button" className="px-3 py-2" onClick={() => updateQty(itemKey(item), item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(itemKey(item))}
                      className="flex items-center gap-2 text-xs tracking-[0.14em] uppercase text-muted hover:text-ink"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit border border-sand bg-cream p-6">
            <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Summary</p>
            <div className="mt-6 space-y-3 text-sm">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
              </p>
              <p className="flex justify-between border-t border-sand pt-4 font-display text-2xl">
                <span>Total</span>
                <span>{formatPrice(subtotal + shipping)}</span>
              </p>
            </div>
            <Link
              href="/checkout"
              className="mt-6 flex h-12 items-center justify-center bg-ink text-xs tracking-[0.2em] uppercase text-cream"
            >
              Checkout
            </Link>
            <p className="mt-4 text-xs leading-5 text-muted">
              Taxes calculated at fulfilment. Complimentary shipping over {formatPrice(FREE_SHIPPING_THRESHOLD)}.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
