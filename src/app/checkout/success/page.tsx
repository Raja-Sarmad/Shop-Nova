"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useStore } from "@/context/StoreProvider";
import { formatPrice, formatDate } from "@/lib/format";

function SuccessInner() {
  const params = useSearchParams();
  const id = params.get("order");
  const { orders } = useStore();
  const order = orders.find((o) => o.id === id) ?? orders[0];

  return (
    <div className="container-page max-w-2xl py-20 text-center">
      <p className="text-[11px] tracking-[0.22em] uppercase text-gold">Thank you</p>
      <h1 className="mt-3 font-display text-5xl">Your order is with the atelier</h1>
      {order ? (
        <div className="mt-10 border border-sand bg-cream p-8 text-left">
          <p className="text-sm text-ink-soft">
            Order <span className="text-ink">{order.id}</span> · {formatDate(order.placedAt)}
          </p>
          <p className="mt-4 font-display text-3xl">{formatPrice(order.total)}</p>
          <ul className="mt-6 space-y-2 text-sm">
            {order.items.map((item) => (
              <li key={`${item.productId}-${item.size}-${item.color}`}>
                {item.name} · {item.color} · {item.size} ×{item.quantity}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-soft">
            A confirmation will sit in your account. Payment is simulated until the backend is connected.
          </p>
        </div>
      ) : (
        <p className="mt-8 text-ink-soft">We could not find that order locally.</p>
      )}
      <div className="mt-10 flex justify-center gap-4">
        <Link href="/account/orders" className="bg-ink px-6 py-3 text-xs tracking-[0.18em] uppercase text-cream">
          View orders
        </Link>
        <Link href="/shop" className="px-6 py-3 text-xs tracking-[0.18em] uppercase">
          Keep shopping
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <SuccessInner />
    </Suspense>
  );
}
