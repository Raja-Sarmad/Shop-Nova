"use client";

import Link from "next/link";
import { use } from "react";
import { AccountNav } from "@/components/account/AccountNav";
import { useStore } from "@/context/StoreProvider";
import { formatDate, formatPrice } from "@/lib/format";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { orders } = useStore();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="container-page py-20">
        <p className="font-display text-4xl">Order not found</p>
        <Link href="/account/orders" className="mt-4 inline-block text-sm underline">
          Back to orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <p className="text-[11px] tracking-[0.22em] uppercase text-muted">{order.status}</p>
      <h1 className="mt-2 font-display text-5xl">{order.id}</h1>
      <p className="mt-2 text-sm text-ink-soft">{formatDate(order.placedAt)}</p>
      <div className="mt-8">
        <AccountNav />
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <ul className="divide-y divide-sand border-y border-sand">
          {order.items.map((item) => (
            <li key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between py-4 text-sm">
              <span>
                {item.name}
                <span className="block text-muted">
                  {item.color} · {item.size} ×{item.quantity}
                </span>
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="border border-sand bg-cream p-6 text-sm">
          <p className="text-[11px] tracking-[0.18em] uppercase text-muted">Ship to</p>
          <p className="mt-3">
            {order.address.fullName}
            <br />
            {order.address.line1}
            <br />
            {order.address.city}, {order.address.region} {order.address.postalCode}
          </p>
          <p className="mt-6 flex justify-between">
            <span>Total</span>
            <span className="font-display text-2xl">{formatPrice(order.total)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
