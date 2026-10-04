"use client";

import { useState } from "react";
import Link from "next/link";
import { AccountNav } from "@/components/account/AccountNav";
import { useStore } from "@/context/StoreProvider";

export default function AddressesPage() {
  const { user, addresses, addAddress } = useStore();
  const [form, setForm] = useState({
    label: "Home",
    fullName: user?.name ?? "",
    line1: "",
    city: "Lahore",
    region: "Punjab",
    postalCode: "",
    phone: "",
  });

  if (!user) {
    return (
      <div className="container-page py-20">
        <Link href="/login" className="text-xs tracking-[0.18em] uppercase">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-5xl">Addresses</h1>
      <div className="mt-8">
        <AccountNav />
      </div>
      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <ul className="space-y-4">
          {addresses.length === 0 ? (
            <p className="text-sm text-ink-soft">No saved addresses yet.</p>
          ) : (
            addresses.map((a) => (
              <li key={a.id} className="border border-sand bg-cream p-6 text-sm">
                <p className="text-[11px] tracking-[0.18em] uppercase text-muted">{a.label}</p>
                <p className="mt-2">
                  {a.fullName}
                  <br />
                  {a.line1}
                  <br />
                  {a.city}, {a.region} {a.postalCode}
                </p>
              </li>
            ))
          )}
        </ul>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            addAddress({ ...form, id: crypto.randomUUID() });
            setForm((f) => ({ ...f, line1: "", postalCode: "", phone: "" }));
          }}
        >
          {(["label", "fullName", "line1", "city", "region", "postalCode", "phone"] as const).map((key) => (
            <label key={key} className="block text-sm">
              <span className="text-[11px] tracking-[0.16em] uppercase text-muted">{key}</span>
              <input
                required
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className="mt-2 w-full border-b border-sand bg-transparent py-2 outline-none"
              />
            </label>
          ))}
          <button type="submit" className="bg-ink px-6 py-3 text-xs tracking-[0.18em] uppercase text-cream">
            Save address
          </button>
        </form>
      </div>
    </div>
  );
}
