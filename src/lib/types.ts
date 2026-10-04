export type Category = "apparel" | "shoes" | "bags" | "jewelry" | "home";

export type ProductColor = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: Category;
  collection: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  fabric?: string;
  care: string[];
  details: string[];
  createdAt: string;
};

export type Collection = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  featured?: boolean;
};

export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
};

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  body: string[];
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
};

export type Address = {
  id: string;
  label: string;
  fullName: string;
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  phone: string;
};

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export type Order = {
  id: string;
  placedAt: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  email: string;
  address: Omit<Address, "id" | "label">;
};

export type User = {
  name: string;
  email: string;
};

export type ProductFilters = {
  query?: string;
  category?: Category | "all";
  collection?: string;
  color?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "featured" | "newest" | "price-asc" | "price-desc" | "rating";
};
