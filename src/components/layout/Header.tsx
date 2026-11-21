"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  Heart,
  Leaf,
  Menu,
  Search,
  ShoppingBag,
  Truck,
  UserRound,
  X,
} from "lucide-react";
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

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <div className="border-b border-white/10 bg-[#161311] text-white">
        <div className="mx-auto flex w-full max-w-[1800px] items-center justify-center gap-3 px-4 py-2.5 text-sm sm:px-6 xl:px-10 2xl:px-14">
          <Truck size={16} className="shrink-0 text-[#d4ae69]" />
          <p className="text-center font-medium tracking-wide text-white/90">
            Free shipping on orders over PKR 10,000
          </p>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-[#e8dfd2] bg-[#fffcf8]/96 shadow-[0_10px_30px_rgba(40,28,16,0.08)] backdrop-blur-xl"
            : "border-[#efe6da] bg-[#fffcf8]",
        )}
      >
        <div className="mx-auto grid h-[68px] w-full max-w-[1800px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:h-[76px] sm:gap-6 sm:px-6 xl:px-10 2xl:px-14">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#3f3831] hover:bg-[#f3ebe1] lg:hidden"
              onClick={() => setMobile(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            <Link
              href="/"
              className="group flex shrink-0 items-center gap-2.5 text-[#171513]"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#f3ebe0] ring-1 ring-[#e4d7c5] transition-colors group-hover:bg-[#eadcc8]">
                <Leaf size={20} className="fill-[#a8732f] text-[#a8732f]" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[26px] font-semibold tracking-[-0.02em] sm:text-[30px]">
                  {BRAND.name}
                </span>
                <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.22em] text-[#8a7d6c] sm:block">
                  Perfumes &amp; Shoes
                </span>
              </span>
            </Link>
          </div>

          <nav className="hidden items-center justify-center gap-1 lg:flex xl:gap-2">
            {NAV.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href.split("?")[0]));
              const hasDropdown =
                item.label === "Perfumes" || item.label === "Shoes";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium tracking-[0.01em] transition-colors xl:px-4 xl:text-base",
                    active
                      ? "bg-[#f4ebe0] text-[#8f5f22]"
                      : item.label === "Sale"
                        ? "text-[#b84532] hover:bg-[#faf3eb]"
                        : "text-[#2f2a24] hover:bg-[#f7f1e8] hover:text-[#8f5f22]",
                  )}
                >
                  {item.label}
                  {hasDropdown ? (
                    <ChevronDown
                      size={15}
                      className="opacity-70 transition-transform duration-300 group-hover:rotate-180"
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end">
            <div className="flex items-center gap-0.5 rounded-full border border-[#eadfce] bg-white/80 p-1 shadow-[0_2px_10px_rgba(48,35,19,0.04)] sm:gap-1 sm:px-1.5">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#4a4239] transition-colors hover:bg-[#f4ebe0] hover:text-[#8f5f22] sm:h-10 sm:w-10"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <button
                type="button"
                onClick={() => router.push(user ? "/account" : "/login")}
                className="hidden h-10 w-10 items-center justify-center rounded-full text-[#4a4239] transition-colors hover:bg-[#f4ebe0] hover:text-[#8f5f22] sm:flex"
                aria-label="Account"
              >
                <UserRound size={18} />
              </button>
              <Link
                href="/wishlist"
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#4a4239] transition-colors hover:bg-[#f4ebe0] hover:text-[#8f5f22] sm:h-10 sm:w-10"
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
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#4a4239] transition-colors hover:bg-[#f4ebe0] hover:text-[#8f5f22] sm:h-10 sm:w-10"
                aria-label="Bag"
              >
                <ShoppingBag size={18} />
                {count > 0 ? (
                  <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1c1612] px-1 text-[11px] font-semibold text-[#faf6f0]">
                    {count}
                  </span>
                ) : null}
              </button>
            </div>
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
          <aside className="relative flex h-full w-[88%] max-w-sm flex-col bg-[#fffcf8] p-7 drawer-in">
            <div className="mb-10 flex items-center justify-between">
              <span className="flex items-center gap-2.5 font-display text-3xl">
                <Leaf size={22} className="fill-[#a8732f] text-[#a8732f]" />
                {BRAND.name}
              </span>
              <button type="button" onClick={() => setMobile(false)} aria-label="Close">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobile(false)}
                  className="rounded-xl px-3 py-3 font-display text-3xl text-[#241f1a] hover:bg-[#f4ebe0]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobile(false)}
                className="rounded-xl px-3 py-3 font-display text-3xl text-[#241f1a] hover:bg-[#f4ebe0]"
              >
                Contact
              </Link>
            </nav>
            <div className="mt-auto space-y-3 text-base text-ink-soft">
              <Link href={user ? "/account" : "/login"} className="block font-medium">
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
