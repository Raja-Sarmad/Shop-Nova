"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/format";

const links = [
  { href: "/account", label: "Overview" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/wishlist", label: "Wishlist" },
];

export function AccountNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-5 border-b border-sand pb-4 text-[13px] tracking-[0.16em] uppercase">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={cn(pathname === l.href ? "text-ink" : "text-muted hover:text-ink")}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
