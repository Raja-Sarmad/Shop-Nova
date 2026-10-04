"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/context/StoreProvider";

export default function RegisterPage() {
  const { login } = useStore();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="container-page grid min-h-[70vh] items-center py-16 lg:grid-cols-2">
      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Join</p>
        <h1 className="mt-2 font-display text-5xl">Create your atelier account</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-ink-soft">
          Orders, addresses, and wishlist will sync to the backend once auth is wired.
        </p>
      </div>
      <form
        className="space-y-6 border border-sand bg-cream p-8"
        onSubmit={(e) => {
          e.preventDefault();
          login({ name, email });
          router.push("/account");
        }}
      >
        <label className="block text-sm">
          <span className="text-[11px] tracking-[0.16em] uppercase text-muted">Full name</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full border-b border-sand bg-transparent py-2 outline-none" />
        </label>
        <label className="block text-sm">
          <span className="text-[11px] tracking-[0.16em] uppercase text-muted">Email</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full border-b border-sand bg-transparent py-2 outline-none" />
        </label>
        <label className="block text-sm">
          <span className="text-[11px] tracking-[0.16em] uppercase text-muted">Password</span>
          <input type="password" required minLength={6} className="mt-2 w-full border-b border-sand bg-transparent py-2 outline-none" />
        </label>
        <button type="submit" className="w-full bg-ink py-3.5 text-xs tracking-[0.2em] uppercase text-cream">
          Create account
        </button>
        <p className="text-sm text-ink-soft">
          Already with us?{" "}
          <Link href="/login" className="text-ink underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
