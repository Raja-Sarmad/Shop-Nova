"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { MessageCircle } from "lucide-react";
import { useStore } from "@/context/StoreProvider";
import { formatPrice, formatDate } from "@/lib/format";
import { checkoutOrderMessage, whatsappHref } from "@/lib/whatsapp";

function SuccessInner() {
  const params = useSearchParams();
  const id = params.get("order");
  const viaWhatsApp = params.get("via") === "whatsapp";
  const { orders } = useStore();
  const order = orders.find((o) => o.id === id) ?? orders[0];

  const waHref = order
    ? whatsappHref(
        checkoutOrderMessage({
          name: order.address.fullName,
          phone: order.address.phone,
          city: order.address.city,
          address: order.address.line1,
          payment: order.paymentMethod ?? "Cash on Delivery",
          items: order.items,
          total: order.total,
        }),
      )
    : undefined;

  return (
    <div className="container-page max-w-2xl py-14 text-center sm:py-20">
      <p className="text-[11px] tracking-[0.22em] uppercase text-gold">Thank you</p>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl">
        {viaWhatsApp ? "Your WhatsApp order is ready" : "Your order is confirmed"}
      </h1>
      {order ? (
        <div className="mt-8 rounded-3xl border border-sand bg-cream p-5 text-left sm:mt-10 sm:p-8">
          <p className="text-sm text-ink-soft">
            Order <span className="text-ink">{order.id}</span> · {formatDate(order.placedAt)}
          </p>
          {order.paymentMethod ? (
            <p className="mt-2 text-sm text-ink-soft">Payment: {order.paymentMethod}</p>
          ) : null}
          <p className="mt-4 font-display text-2xl sm:text-3xl">{formatPrice(order.total)}</p>
          <ul className="mt-6 space-y-2 text-sm">
            {order.items.map((item) => (
              <li key={`${item.productId}-${item.size}-${item.color}`}>
                {item.name} · {item.color} · {item.size} ×{item.quantity}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-soft">
            {viaWhatsApp
              ? "If WhatsApp did not open, tap the button below to message us with your order details."
              : "We saved this order in your account. You can also confirm it on WhatsApp."}
          </p>
        </div>
      ) : (
        <p className="mt-8 text-ink-soft">We could not find that order locally.</p>
      )}
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
        {waHref ? (
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-6 py-3 text-xs font-semibold tracking-[0.12em] uppercase text-[#128C7E] sm:w-auto"
          >
            <MessageCircle size={16} />
            Confirm on WhatsApp
          </a>
        ) : null}
        <Link
          href="/account/orders"
          className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-xs tracking-[0.18em] uppercase text-cream sm:w-auto"
        >
          View orders
        </Link>
        <Link
          href="/shop"
          className="inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-xs tracking-[0.18em] uppercase sm:w-auto"
        >
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
