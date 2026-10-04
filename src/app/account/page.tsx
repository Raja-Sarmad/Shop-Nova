"use client";

import Link from "next/link";
import { AccountNav } from "@/components/account/AccountNav";
import { useStore } from "@/context/StoreProvider";
import { formatPrice } from "@/lib/format";

export default function AccountPage() {
  const { user, orders, wishlist, logout } = useStore();

  if (!user) {
    return (
      <div className="container-page py-20">
        <h1 className="font-display text-5xl">Sign in to see your atelier</h1>
        <Link href="/login" className="mt-6 inline-block bg-ink px-6 py-3 text-xs tracking-[0.18em] uppercase text-cream">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Account</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-5xl">Hello, {user.name.split(" ")[0]}</h1>
        <button type="button" onClick={logout} className="text-xs tracking-[0.16em] uppercase text-muted">
          Sign out
        </button>
      </div>
      <div className="mt-8">
        <AccountNav />
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          [String(orders.length), "Orders placed"],
          [String(wishlist.length), "Saved pieces"],
          [user.email, "Signed in as"],
        ].map(([value, label]) => (
          <div key={label} className="border border-sand bg-cream p-6">
            <p className="text-[11px] tracking-[0.18em] uppercase text-muted">{label}</p>
            <p className="mt-3 font-display text-2xl">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <h2 className="font-display text-3xl">Recent orders</h2>
        {orders.length === 0 ? (
          <p className="mt-4 text-sm text-ink-soft">No orders yet.</p>
        ) : (
          <ul className="mt-6 divide-y divide-sand border-y border-sand">
            {orders.slice(0, 3).map((o) => (
              <li key={o.id} className="flex items-center justify-between py-4 text-sm">
                <Link href={`/account/orders/${o.id}`} className="hover:underline">
                  {o.id}
                </Link>
                <span className="capitalize text-muted">{o.status}</span>
                <span>{formatPrice(o.total)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
