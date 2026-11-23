export const BRAND = {
  name: "Shop Nova",
  tagline: "A scent. A step. A signature.",
  email: "support@shopnova.pk",
  phone: "+92 300 555 0148",
  address: "12 A, MM Alam Road, Lahore",
};

export const SOCIAL = {
  instagram: "https://instagram.com/shopnovastore",
  facebook: "https://facebook.com/shopnovastore",
  whatsapp: "https://wa.me/923005550148",
};

export const FREE_SHIPPING_THRESHOLD = 10000;
export const FLAT_SHIPPING = 350;

export type NavChild = { href: string; label: string; hint?: string };

export type NavItem = {
  href: string;
  label: string;
  children?: NavChild[];
};

export const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/shop?category=fragrance",
    label: "Perfumes",
    children: [
      { href: "/shop?category=fragrance", label: "All perfumes", hint: "Full fragrance edit" },
      {
        href: "/shop?category=fragrance&filter=new",
        label: "New arrivals",
        hint: "Marked new in dashboard",
      },
      {
        href: "/shop?category=fragrance&filter=bestseller",
        label: "Best sellers",
        hint: "Marked bestseller",
      },
      {
        href: "/shop?category=fragrance&filter=sale",
        label: "On sale",
        hint: "Compare-at price set",
      },
    ],
  },
  {
    href: "/shop?category=shoes",
    label: "Shoes",
    children: [
      { href: "/shop?category=shoes", label: "All shoes", hint: "Full footwear edit" },
      {
        href: "/shop?category=shoes&filter=new",
        label: "New arrivals",
        hint: "Marked new in dashboard",
      },
      {
        href: "/shop?category=shoes&filter=bestseller",
        label: "Best sellers",
        hint: "Marked bestseller",
      },
      {
        href: "/shop?category=shoes&filter=sale",
        label: "On sale",
        hint: "Compare-at price set",
      },
    ],
  },
  { href: "/shop?filter=new", label: "New Arrivals" },
  { href: "/shop?filter=sale", label: "Sale" },
  { href: "/#offer", label: "Offers" },
];

export const CATEGORIES = [
  { slug: "shoes", label: "Shoes" },
  { slug: "fragrance", label: "Perfumes" },
] as const;

export const GENDERS = [
  { slug: "men", label: "Men" },
  { slug: "women", label: "Women" },
  { slug: "unisex", label: "Unisex" },
] as const;

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
] as const;

export const CATALOG_FILTERS = [
  { value: "new", label: "New arrivals" },
  { value: "bestseller", label: "Best sellers" },
  { value: "sale", label: "On sale" },
] as const;

export const PAYMENT_METHODS = [
  { id: "cod", label: "Cash on Delivery", hint: "Pay when your order arrives" },
  { id: "jazzcash", label: "JazzCash", hint: "Mobile wallet payment" },
  { id: "easypaisa", label: "easypaisa", hint: "Mobile wallet payment" },
  { id: "card", label: "Card", hint: "Visa / Mastercard" },
] as const;
