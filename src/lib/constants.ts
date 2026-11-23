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

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop?category=fragrance", label: "Perfumes" },
  { href: "/shop?category=shoes", label: "Shoes" },
  { href: "/shop?sort=newest", label: "New Arrivals" },
  { href: "/shop?sort=price-asc", label: "Sale" },
  { href: "/#offer", label: "Offers" },
];

export const CATEGORIES = [
  { slug: "shoes", label: "Shoes" },
  { slug: "fragrance", label: "Perfumes" },
] as const;

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
] as const;
