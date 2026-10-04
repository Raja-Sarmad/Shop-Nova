import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="container-page py-12">
      <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Checkout</p>
      <h1 className="mt-2 font-display text-5xl">Complete your order</h1>
      <div className="mt-12">
        <CheckoutForm />
      </div>
    </div>
  );
}
