"use client";

import Link from "next/link";
import { AccountNav } from "@/components/account/AccountNav";
import { useStore } from "@/context/StoreProvider";
import { formatDate, formatPrice } from "@/lib/format";

export default function OrdersPage() {
  const { user, orders } = useStore();
  if (!user) {
    return (
      <div className="container-page py-20">
        <Link href="/login" className="text-xs tracking-[0.18em] uppercase">
          Sign in to view orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-5xl">Orders</h1>
      <div className="mt-8">
        <AccountNav />
      </div>
      {orders.length === 0 ? (
        <p className="mt-12 text-ink-soft">You have not placed an order yet.</p>
      ) : (
        <ul className="mt-10 divide-y divide-sand border-y border-sand">
          {orders.map((o) => (
            <li key={o.id} className="grid gap-2 py-6 sm:grid-cols-4 sm:items-center">
              <Link href={`/account/orders/${o.id}`} className="font-medium">
                {o.id}
              </Link>
              <span className="text-sm text-muted">{formatDate(o.placedAt)}</span>
              <span className="text-sm capitalize">{o.status}</span>
              <span className="sm:text-right">{formatPrice(o.total)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
