"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/context/StoreProvider";
import { customerApi, hasApi, setCustomerToken } from "@/lib/api-client";

const DASHBOARD_URL = (
  process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001"
).replace(/\/$/, "");

export default function LoginPage() {
  const { login } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <div className="container-page grid min-h-[70vh] items-center py-16 lg:grid-cols-2">
      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Account</p>
        <h1 className="mt-2 font-display text-5xl">Welcome back</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-ink-soft">
          Customers open their account here. Admin credentials automatically open the Shop Nova
          dashboard.
        </p>
      </div>
      <form
        className="space-y-6 border border-sand bg-cream p-8"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          setPending(true);
          try {
            if (hasApi()) {
              const res = await customerApi<{
                token: string;
                user: { name: string; email: string; role: string };
              }>("/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
              });

              if (res.user.role === "admin") {
                window.location.assign(
                  `${DASHBOARD_URL}/login?token=${encodeURIComponent(res.token)}`,
                );
                return;
              }

              setCustomerToken(res.token);
              login({ name: res.user.name, email: res.user.email });
            } else {
              login({ name: email.split("@")[0] || "Guest", email });
            }
            router.push("/account");
          } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
          } finally {
            setPending(false);
          }
        }}
      >
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
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border-b border-sand bg-transparent py-2 outline-none"
          />
        </label>
        {error ? <p className="text-sm text-terracotta">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="w-full bg-ink py-3.5 text-xs tracking-[0.2em] uppercase text-cream disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign in"}
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
