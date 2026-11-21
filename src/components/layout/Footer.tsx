import Link from "next/link";
import { ArrowRight, Camera, Leaf } from "lucide-react";
import { BRAND } from "@/lib/constants";

const footerColumns = [
  {
    title: "Shop",
    links: [
      ["Perfumes", "/shop?category=fragrance"],
      ["Shoes", "/shop?category=shoes"],
      ["New Arrivals", "/shop?sort=newest"],
      ["Best Sellers", "/shop?sort=rating"],
      ["Sale", "/shop?sort=price-asc"],
      ["Offers", "/#offer"],
    ],
  },
  {
    title: "Help",
    links: [
      ["Track Order", "/account/orders"],
      ["Returns & Refunds", "/returns"],
      ["Shipping Info", "/shipping"],
      ["Size Guide", "/faq"],
      ["Fragrance Guide", "/journal"],
      ["FAQ", "/faq"],
    ],
  },
  {
    title: "About",
    links: [
      ["Our Story", "/about"],
      ["Contact Us", "/contact"],
      ["Store Locator", "/contact"],
      ["Blog", "/journal"],
      ["Careers", "/contact"],
    ],
  },
];

export function Footer({ inline = false }: { inline?: boolean }) {
  return (
    <footer
      className={`site-footer bg-[#191817] text-white ${inline ? "mt-0 rounded-lg xl:mt-auto" : ""}`}
    >
      <div className="mx-auto grid w-full max-w-[1800px] gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.35fr_0.75fr_0.85fr_0.85fr_1.15fr] xl:px-10 2xl:px-14">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display text-3xl font-semibold"
          >
            <Leaf size={26} className="fill-[#c08c3e] text-[#c08c3e]" />
            {BRAND.name}
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/75">
            <Link href="/shop?category=fragrance">Perfumes</Link>
            <span className="text-white/30">|</span>
            <Link href="/shop?category=shoes">Shoes</Link>
            <span className="text-white/30">|</span>
            <Link href="/shop">Lifestyle</Link>
          </div>
          <p className="mt-4 max-w-sm text-[15px] leading-7 text-white/65">
            A premium destination for luxury perfumes and modern footwear, curated for every
            generation.
          </p>
          <Link
            href="https://instagram.com"
            className="mt-4 inline-flex text-white/80 hover:text-white"
            aria-label="Instagram"
          >
            <Camera size={20} />
          </Link>
        </div>
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h2 className="text-base font-semibold tracking-wide">{column.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {column.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-[15px] text-white/65 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="text-base font-semibold tracking-wide">Stay Updated</h2>
          <form className="mt-4 flex overflow-hidden rounded-xl bg-white">
            <input
              type="email"
              aria-label="Email address"
              placeholder="Enter your email address"
              className="min-w-0 flex-1 px-3.5 py-3 text-sm text-[#221e19] outline-none"
            />
            <button type="button" aria-label="Subscribe" className="px-3.5 text-[#211a12]">
              <ArrowRight size={16} />
            </button>
          </form>
          <p className="mt-4 text-sm text-white/60">Secure payments</p>
          <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-bold text-[#25201b]">
            {["VISA", "Mastercard", "easypaisa", "JazzCash", "COD"].map((payment) => (
              <span key={payment} className="rounded-md bg-white px-2 py-1.5">
                {payment}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-3 px-4 py-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 xl:px-10 2xl:px-14">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy">Privacy Policy</Link>
            <span className="text-white/25">|</span>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <span className="text-white/25">|</span>
            <Link href="/returns">Return &amp; Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
