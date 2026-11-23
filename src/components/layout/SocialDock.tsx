"use client";

import { usePathname } from "next/navigation";
import { SOCIAL } from "@/lib/constants";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.33.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.91 0-3.18-1.24-6.17-3.45-8.43ZM12.07 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.44 9.88-9.89 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

const items = [
  {
    label: "Instagram",
    href: SOCIAL.instagram,
    className: "bg-[#E1306C] text-white shadow-[0_10px_24px_rgba(225,48,108,0.35)]",
    Icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: SOCIAL.facebook,
    className: "bg-[#1877F2] text-white shadow-[0_10px_24px_rgba(24,119,242,0.35)]",
    Icon: FacebookIcon,
  },
  {
    label: "WhatsApp",
    href: SOCIAL.whatsapp,
    className: "bg-[#25D366] text-white shadow-[0_10px_24px_rgba(37,211,102,0.35)]",
    Icon: WhatsAppIcon,
  },
] as const;

export function SocialDock() {
  const pathname = usePathname();
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/login")
  ) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed top-1/2 left-0 z-[80] hidden -translate-y-1/2 flex-col gap-3 sm:flex"
      aria-label="Social links"
    >
      {items.map(({ label, href, className, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
          className={`pointer-events-auto group relative flex h-11 w-11 -translate-x-2 items-center justify-center rounded-r-2xl transition-transform duration-300 ease-out hover:translate-x-0 focus-visible:translate-x-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d0a65f] sm:h-12 sm:w-12 sm:-translate-x-3 ${className}`}
        >
          <Icon />
          <span className="pointer-events-none absolute left-full ml-3 -translate-x-1 whitespace-nowrap rounded-full bg-[#1c1612] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
