"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/context/StoreProvider";

export default function LoginPage() {
  const { login } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="container-page grid min-h-[70vh] items-center py-16 lg:grid-cols-2">
      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Account</p>
        <h1 className="mt-2 font-display text-5xl">Welcome back</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-ink-soft">
          Sign-in is local for now. When the auth API is live, this same form will
          post to <code className="text-ink">/auth/login</code>.
        </p>
      </div>
      <form
        className="space-y-6 border border-sand bg-cream p-8"
        onSubmit={(e) => {
          e.preventDefault();
          login({ name: name || "Guest", email });
          router.push("/account");
        }}
      >
        <label className="block text-sm">
          <span className="text-[11px] tracking-[0.16em] uppercase text-muted">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full border-b border-sand bg-transparent py-2 outline-none"
            placeholder="Ayesha Khan"
          />
        </label>
        <label className="block text-sm">
          <span className="text-[11px] tracking-[0.16em] uppercase text-muted">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border-b border-sand bg-transparent py-2 outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="text-[11px] tracking-[0.16em] uppercase text-muted">Password</span>
          <input type="password" required className="mt-2 w-full border-b border-sand bg-transparent py-2 outline-none" />
        </label>
        <button type="submit" className="w-full bg-ink py-3.5 text-xs tracking-[0.2em] uppercase text-cream">
          Sign in
        </button>
        <p className="text-sm text-ink-soft">
          New here?{" "}
          <Link href="/register" className="text-ink underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
