"use client";

import { useState } from "react";
import { BRAND } from "@/lib/constants";
import { useStore } from "@/context/StoreProvider";

export default function ContactPage() {
  const { notify } = useStore();
  const [sent, setSent] = useState(false);

  return (
    <div className="container-page grid gap-16 py-16 lg:grid-cols-2">
      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Visit</p>
        <h1 className="mt-2 font-display text-5xl">Write, call, or come by.</h1>
        <p className="mt-6 max-w-md text-sm leading-7 text-ink-soft">
          Fittings by appointment, Tuesday to Saturday. The shop floor is quiet on
          purpose — come if you want cloth in the hand, not a crowd.
        </p>
        <dl className="mt-10 space-y-6 text-sm">
          <div>
            <dt className="text-[11px] tracking-[0.18em] uppercase text-muted">Atelier</dt>
            <dd className="mt-2">{BRAND.address}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.18em] uppercase text-muted">Email</dt>
            <dd className="mt-2">{BRAND.email}</dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.18em] uppercase text-muted">Phone</dt>
            <dd className="mt-2">{BRAND.phone}</dd>
          </div>
        </dl>
      </div>
      <form
        className="space-y-6 border border-sand bg-cream p-8"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
          notify("Message received — we will write back.");
        }}
      >
        <label className="block text-sm">
          <span className="text-[11px] tracking-[0.16em] uppercase text-muted">Name</span>
          <input required className="mt-2 w-full border-b border-sand bg-transparent py-2 outline-none" />
        </label>
        <label className="block text-sm">
          <span className="text-[11px] tracking-[0.16em] uppercase text-muted">Email</span>
          <input type="email" required className="mt-2 w-full border-b border-sand bg-transparent py-2 outline-none" />
        </label>
        <label className="block text-sm">
          <span className="text-[11px] tracking-[0.16em] uppercase text-muted">Message</span>
          <textarea required rows={5} className="mt-2 w-full border-b border-sand bg-transparent py-2 outline-none" />
        </label>
        <button type="submit" className="bg-ink px-8 py-3.5 text-xs tracking-[0.2em] uppercase text-cream">
          {sent ? "Sent" : "Send note"}
        </button>
      </form>
    </div>
  );
}
