export const BRAND = {
  name: "VELORA",
  tagline: "Quiet luxury, everyday.",
  email: "atelier@velora.store",
  phone: "+92 300 555 0148",
  address: "12 A, MM Alam Road, Lahore",
};

export const FREE_SHIPPING_THRESHOLD = 15000;
export const FLAT_SHIPPING = 350;

export const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export const CATEGORIES = [
  { slug: "apparel", label: "Apparel" },
  { slug: "shoes", label: "Shoes" },
  { slug: "bags", label: "Bags" },
  { slug: "jewelry", label: "Jewelry" },
  { slug: "home", label: "Home" },
] as const;

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
] as const;
