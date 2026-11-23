"use client";

import { useState, type ChangeEvent, type FormEvent, type InputHTMLAttributes } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { useStore } from "@/context/StoreProvider";
import { formatPrice, cn } from "@/lib/format";
import { FLAT_SHIPPING, FREE_SHIPPING_THRESHOLD, PAYMENT_METHODS } from "@/lib/constants";
import { checkoutOrderMessage, whatsappHref } from "@/lib/whatsapp";

export function CheckoutForm() {
  const { cart, user, placeOrder } = useStore();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState<(typeof PAYMENT_METHODS)[number]["id"]>("cod");
  const [form, setForm] = useState({
    email: user?.email ?? "",
    fullName: user?.name ?? "",
    line1: "",
    city: "Lahore",
    region: "Punjab",
    postalCode: "",
    phone: "",
    walletNumber: "",
    card: "",
    expiry: "",
    cvc: "",
  });

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;
  const paymentLabel = PAYMENT_METHODS.find((m) => m.id === payment)?.label ?? payment;

  const set = (key: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center sm:py-24">
        <p className="font-display text-3xl sm:text-4xl">Nothing to check out</p>
        <button
          type="button"
          onClick={() => router.push("/shop")}
          className="mt-6 text-xs tracking-[0.18em] uppercase"
        >
          Return to shop
        </button>
      </div>
    );
  }

  const buildOrder = () =>
    placeOrder({
      email: form.email,
      paymentMethod: paymentLabel,
      address: {
        fullName: form.fullName,
        line1: form.line1,
        city: form.city,
        region: form.region,
        postalCode: form.postalCode,
        phone: form.phone,
      },
    });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const order = buildOrder();
    router.push(`/checkout/success?order=${order.id}`);
  };

  const orderViaWhatsApp = () => {
    if (!form.fullName || !form.phone || !form.line1 || !form.city) {
      setStep(form.fullName && form.phone ? 2 : 1);
      return;
    }
    const href = whatsappHref(
      checkoutOrderMessage({
        name: form.fullName,
        phone: form.phone,
        city: form.city,
        address: form.line1,
        payment: paymentLabel,
        items: cart,
        total,
      }),
    );
    const order = buildOrder();
    window.open(href, "_blank", "noopener,noreferrer");
    router.push(`/checkout/success?order=${order.id}&via=whatsapp`);
  };

  const Field = ({
    label,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
    <label className="block text-sm">
      <span className="text-[11px] tracking-[0.16em] uppercase text-muted">{label}</span>
      <input
        {...props}
        className="mt-2 w-full rounded-xl border border-sand bg-white px-3.5 py-3 outline-none transition focus:border-ink"
      />
    </label>
  );

  return (
    <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
      <div>
        <ol className="mb-8 flex flex-wrap gap-4 text-[11px] tracking-[0.2em] uppercase text-muted sm:mb-10 sm:gap-6">
          {["Details", "Delivery", "Payment"].map((label, i) => (
            <li
              key={label}
              className={cn(
                "rounded-full px-3 py-1.5",
                step === i + 1 ? "bg-[#f4ebe0] text-ink" : "",
              )}
            >
              0{i + 1} {label}
            </li>
          ))}
        </ol>

        {step === 1 ? (
          <div className="space-y-5 sm:space-y-6">
            <Field label="Email" type="email" required value={form.email} onChange={set("email")} />
            <Field label="Full name" required value={form.fullName} onChange={set("fullName")} />
            <Field
              label="Phone (WhatsApp preferred)"
              required
              value={form.phone}
              onChange={set("phone")}
              placeholder="03XX XXXXXXX"
            />
            <button
              type="button"
              onClick={() => setStep(2)}
              className="mt-2 w-full rounded-full bg-ink px-8 py-3.5 text-xs tracking-[0.2em] uppercase text-cream sm:w-auto"
            >
              Continue to delivery
            </button>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-5 sm:space-y-6">
            <Field label="Address" required value={form.line1} onChange={set("line1")} />
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <Field label="City" required value={form.city} onChange={set("city")} />
              <Field label="Region" required value={form.region} onChange={set("region")} />
            </div>
            <Field label="Postal code" required value={form.postalCode} onChange={set("postalCode")} />
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-full px-6 py-3.5 text-xs tracking-[0.18em] uppercase"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="rounded-full bg-ink px-8 py-3.5 text-xs tracking-[0.2em] uppercase text-cream"
              >
                Continue to payment
              </button>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-6">
            <div>
              <p className="text-[11px] tracking-[0.16em] uppercase text-muted">Payment method</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPayment(method.id)}
                    className={cn(
                      "rounded-2xl border px-4 py-3.5 text-left transition",
                      payment === method.id
                        ? "border-ink bg-[#f7f1e8]"
                        : "border-sand hover:border-ink/40",
                    )}
                  >
                    <span className="block text-sm font-semibold text-ink">{method.label}</span>
                    <span className="mt-0.5 block text-xs text-muted">{method.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            {payment === "card" ? (
              <div className="space-y-5 rounded-2xl border border-sand bg-cream/60 p-4 sm:p-5">
                <Field
                  label="Card number"
                  required
                  placeholder="4242 4242 4242 4242"
                  value={form.card}
                  onChange={set("card")}
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Expiry"
                    required
                    placeholder="MM / YY"
                    value={form.expiry}
                    onChange={set("expiry")}
                  />
                  <Field
                    label="CVC"
                    required
                    placeholder="123"
                    value={form.cvc}
                    onChange={set("cvc")}
                  />
                </div>
              </div>
            ) : null}

            {(payment === "jazzcash" || payment === "easypaisa") && (
              <Field
                label={`${paymentLabel} account / number`}
                required
                placeholder="03XX XXXXXXX"
                value={form.walletNumber}
                onChange={set("walletNumber")}
              />
            )}

            {payment === "cod" ? (
              <p className="rounded-2xl border border-sand bg-cream/60 px-4 py-3 text-sm text-ink-soft">
                Pay cash when your parcel arrives. No advance payment needed.
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-full px-6 py-3.5 text-xs tracking-[0.18em] uppercase"
              >
                Back
              </button>
              <button
                type="submit"
                className="rounded-full bg-ink px-8 py-3.5 text-xs tracking-[0.2em] uppercase text-cream"
              >
                Place order · {formatPrice(total)}
              </button>
              <button
                type="button"
                onClick={orderViaWhatsApp}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-6 py-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-[#128C7E]"
              >
                <MessageCircle size={16} />
                Order on WhatsApp
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <aside className="h-fit rounded-3xl border border-sand bg-cream p-5 sm:p-6 lg:sticky lg:top-28">
        <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Summary</p>
        <ul className="mt-5 space-y-4">
          {cart.map((item) => (
            <li
              key={`${item.productId}-${item.size}-${item.color}`}
              className="flex justify-between gap-4 text-sm"
            >
              <span>
                {item.name}
                <span className="block text-xs text-muted">
                  {item.color} · {item.size} · ×{item.quantity}
                </span>
              </span>
              <span className="shrink-0">{formatPrice(item.price * item.quantity)}</span>
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
          <p className="flex justify-between pt-2 font-display text-2xl sm:text-3xl">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </p>
        </div>
      </aside>
    </form>
  );
}
