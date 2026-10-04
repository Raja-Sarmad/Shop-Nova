"use client";

import { useState, type ChangeEvent, type FormEvent, type InputHTMLAttributes } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreProvider";
import { formatPrice } from "@/lib/format";
import { FLAT_SHIPPING, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export function CheckoutForm() {
  const { cart, user, placeOrder } = useStore();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: user?.email ?? "",
    fullName: user?.name ?? "",
    line1: "",
    city: "Lahore",
    region: "Punjab",
    postalCode: "",
    phone: "",
    card: "",
    expiry: "",
    cvc: "",
  });

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  const set = (key: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  if (cart.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-display text-4xl">Nothing to check out</p>
        <button type="button" onClick={() => router.push("/shop")} className="mt-6 text-xs tracking-[0.18em] uppercase">
          Return to shop
        </button>
      </div>
    );
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const order = placeOrder({
      email: form.email,
      address: {
        fullName: form.fullName,
        line1: form.line1,
        city: form.city,
        region: form.region,
        postalCode: form.postalCode,
        phone: form.phone,
      },
    });
    router.push(`/checkout/success?order=${order.id}`);
  };

  const Field = ({
    label,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
    <label className="block text-sm">
      <span className="text-[11px] tracking-[0.16em] uppercase text-muted">{label}</span>
      <input
        {...props}
        className="mt-2 w-full border-b border-sand bg-transparent py-2.5 outline-none focus:border-ink"
      />
    </label>
  );

  return (
    <form onSubmit={submit} className="grid gap-12 lg:grid-cols-[1fr_360px]">
      <div>
        <ol className="mb-10 flex gap-6 text-[11px] tracking-[0.2em] uppercase text-muted">
          {["Details", "Delivery", "Payment"].map((label, i) => (
            <li key={label} className={step === i + 1 ? "text-ink" : ""}>
              0{i + 1} {label}
            </li>
          ))}
        </ol>

        {step === 1 ? (
          <div className="space-y-6">
            <Field label="Email" type="email" required value={form.email} onChange={set("email")} />
            <Field label="Full name" required value={form.fullName} onChange={set("fullName")} />
            <Field label="Phone" required value={form.phone} onChange={set("phone")} />
            <button
              type="button"
              onClick={() => setStep(2)}
              className="mt-4 bg-ink px-8 py-3.5 text-xs tracking-[0.2em] uppercase text-cream"
            >
              Continue to delivery
            </button>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-6">
            <Field label="Address" required value={form.line1} onChange={set("line1")} />
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="City" required value={form.city} onChange={set("city")} />
              <Field label="Region" required value={form.region} onChange={set("region")} />
            </div>
            <Field label="Postal code" required value={form.postalCode} onChange={set("postalCode")} />
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="px-6 py-3.5 text-xs tracking-[0.18em] uppercase">
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-ink px-8 py-3.5 text-xs tracking-[0.2em] uppercase text-cream"
              >
                Continue to payment
              </button>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-6">
            <p className="text-sm text-ink-soft">
              This is a frontend checkout. Card fields are presentational until the payment API is connected.
            </p>
            <Field
              label="Card number"
              required
              placeholder="4242 4242 4242 4242"
              value={form.card}
              onChange={set("card")}
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Expiry" required placeholder="MM / YY" value={form.expiry} onChange={set("expiry")} />
              <Field label="CVC" required placeholder="123" value={form.cvc} onChange={set("cvc")} />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="px-6 py-3.5 text-xs tracking-[0.18em] uppercase">
                Back
              </button>
              <button
                type="submit"
                className="bg-ink px-8 py-3.5 text-xs tracking-[0.2em] uppercase text-cream"
              >
                Place order · {formatPrice(total)}
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <aside className="h-fit border border-sand bg-cream p-6">
        <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Summary</p>
        <ul className="mt-5 space-y-4">
          {cart.map((item) => (
            <li key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between gap-4 text-sm">
              <span>
                {item.name}
                <span className="block text-xs text-muted">
                  {item.color} · {item.size} · ×{item.quantity}
                </span>
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 space-y-2 border-t border-sand pt-4 text-sm">
          <p className="flex justify-between">
            <span className="text-ink-soft">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-ink-soft">Shipping</span>
            <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
          </p>
          <p className="flex justify-between pt-2 font-display text-2xl">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </p>
        </div>
      </aside>
    </form>
  );
}
