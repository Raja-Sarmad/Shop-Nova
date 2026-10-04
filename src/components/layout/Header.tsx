"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BRAND, NAV } from "@/lib/constants";
import { cn } from "@/lib/format";
import { useStore } from "@/context/StoreProvider";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart, wishlist, user, setCartOpen, setSearchOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const count = cart.reduce((n, i) => n + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobile(false);
  }, [pathname]);

  return (
    <>
      <div className="bg-ink text-cream">
        <div className="container-page flex items-center justify-center gap-3 py-2 text-[11px] tracking-[0.22em] uppercase">
          <span>Complimentary shipping over Rs 15,000</span>
          <span className="hidden text-gold sm:inline">·</span>
          <span className="hidden sm:inline">14-day returns</span>
        </div>
      </div>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-sand/80 bg-ivory/90 backdrop-blur-md"
            : "border-transparent bg-ivory",
        )}
      >
        <div className="container-page grid h-[72px] grid-cols-3 items-center">
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[13px] tracking-[0.16em] uppercase transition-colors",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "text-ink"
                    : "text-ink-soft hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            onClick={() => setMobile(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <Link
            href="/"
            className="justify-self-center font-display text-[28px] font-medium tracking-[0.28em] text-ink"
          >
            {BRAND.name}
          </Link>

          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center text-ink-soft transition-colors hover:text-ink"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button
              type="button"
              onClick={() => router.push(user ? "/account" : "/login")}
              className="hidden h-10 w-10 items-center justify-center text-ink-soft transition-colors hover:text-ink sm:flex"
              aria-label="Account"
            >
              <UserRound size={18} />
            </button>
            <Link
              href="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center text-ink-soft transition-colors hover:text-ink"
              aria-label="Wishlist"
            >
              <Heart size={18} />
              {wishlist.length > 0 ? (
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-terracotta" />
              ) : null}
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center text-ink-soft transition-colors hover:text-ink"
              aria-label="Bag"
            >
              <ShoppingBag size={18} />
              {count > 0 ? (
                <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] text-cream">
                  {count}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      {mobile ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40 fade-in"
            onClick={() => setMobile(false)}
            aria-label="Close menu"
          />
          <aside className="relative flex h-full w-[86%] max-w-sm flex-col bg-ivory p-7 drawer-in">
            <div className="mb-10 flex items-center justify-between">
              <span className="font-display text-2xl tracking-[0.2em]">{BRAND.name}</span>
              <button type="button" onClick={() => setMobile(false)} aria-label="Close">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-5">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-display text-3xl"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/contact" className="font-display text-3xl">
                Contact
              </Link>
            </nav>
            <div className="mt-auto space-y-3 text-sm text-ink-soft">
              <Link href={user ? "/account" : "/login"} className="block">
                {user ? "Account" : "Sign in"}
              </Link>
              <p>{BRAND.email}</p>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
