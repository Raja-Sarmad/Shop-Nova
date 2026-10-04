import Link from "next/link";
import { BRAND } from "@/lib/constants";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All products" },
      { href: "/shop?category=apparel", label: "Apparel" },
      { href: "/shop?category=shoes", label: "Shoes" },
      { href: "/shop?category=bags", label: "Bags" },
      { href: "/shop?category=jewelry", label: "Jewelry" },
      { href: "/shop?category=home", label: "Home" },
    ],
  },
  {
    title: "House",
    links: [
      { href: "/about", label: "Our atelier" },
      { href: "/journal", label: "Journal" },
      { href: "/lookbook", label: "Lookbook" },
      { href: "/collections", label: "Collections" },
      { href: "/contact", label: "Visit / contact" },
    ],
  },
  {
    title: "Care",
    links: [
      { href: "/shipping", label: "Shipping" },
      { href: "/returns", label: "Returns" },
      { href: "/faq", label: "FAQ" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-sand bg-cream">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-display text-3xl tracking-[0.22em]">{BRAND.name}</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-ink-soft">
            Quiet luxury cut in Lahore. Natural fibres, small runs, and objects
            that earn their keep.
          </p>
          <form className="mt-8 flex max-w-md border-b border-ink/20">
            <input
              type="email"
              placeholder="Email for atelier notes"
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted"
            />
            <button type="button" className="px-2 text-xs tracking-[0.18em] uppercase">
              Join
            </button>
          </form>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-[11px] tracking-[0.22em] uppercase text-muted">{col.title}</p>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-sand">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {BRAND.name}. Atelier, Lahore.</p>
          <p>{BRAND.address} · {BRAND.phone}</p>
        </div>
      </div>
    </footer>
  );
}
