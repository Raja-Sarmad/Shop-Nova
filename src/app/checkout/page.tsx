import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="container-page py-8 sm:py-12">
      <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Checkout</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl">
        Complete your order
      </h1>
      <p className="mt-3 max-w-xl text-sm text-ink-soft">
        Enter your details, choose a payment method, or send the order straight on WhatsApp.
      </p>
      <div className="mt-8 sm:mt-12">
        <CheckoutForm />
      </div>
    </div>
  );
}
