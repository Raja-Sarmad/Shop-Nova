"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Address, CartItem, Order, User } from "@/lib/types";
import { FLAT_SHIPPING, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

type Toast = { id: number; message: string };

type Store = {
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  orders: Order[];
  addresses: Address[];
  cartOpen: boolean;
  searchOpen: boolean;
  toast: Toast | null;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  updateQty: (key: string, quantity: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  login: (user: User) => void;
  logout: () => void;
  placeOrder: (input: {
    email: string;
    address: Omit<Address, "id" | "label">;
  }) => Order;
  addAddress: (address: Address) => void;
  notify: (message: string) => void;
};

const StoreContext = createContext<Store | null>(null);

const cartKey = (item: Pick<CartItem, "productId" | "size" | "color">) =>
  `${item.productId}-${item.size}-${item.color}`;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCart(read("velora-cart", []));
    setWishlist(read("velora-wishlist", []));
    setUser(read("velora-user", null));
    setOrders(read("velora-orders", []));
    setAddresses(read("velora-addresses", []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("velora-cart", JSON.stringify(cart));
  }, [cart, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("velora-wishlist", JSON.stringify(wishlist));
  }, [wishlist, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("velora-user", JSON.stringify(user));
  }, [user, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("velora-orders", JSON.stringify(orders));
  }, [orders, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("velora-addresses", JSON.stringify(addresses));
  }, [addresses, ready]);

  const notify = useCallback((message: string) => {
    const id = Date.now();
    setToast({ id, message });
    window.setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 2400);
  }, []);

  const addToCart = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      const quantity = item.quantity ?? 1;
      setCart((prev) => {
        const key = cartKey(item);
        const existing = prev.find((p) => cartKey(p) === key);
        if (existing) {
          return prev.map((p) =>
            cartKey(p) === key ? { ...p, quantity: p.quantity + quantity } : p,
          );
        }
        return [...prev, { ...item, quantity }];
      });
      setCartOpen(true);
      notify("Added to bag");
    },
    [notify],
  );

  const updateQty = useCallback((key: string, quantity: number) => {
    setCart((prev) =>
      prev
        .map((p) => (cartKey(p) === key ? { ...p, quantity } : p))
        .filter((p) => p.quantity > 0),
    );
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) => prev.filter((p) => cartKey(p) !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => {
        const has = prev.includes(productId);
        notify(has ? "Removed from wishlist" : "Saved to wishlist");
        return has ? prev.filter((id) => id !== productId) : [...prev, productId];
      });
    },
    [notify],
  );

  const login = useCallback((next: User) => {
    setUser(next);
    notify(`Welcome, ${next.name.split(" ")[0]}`);
  }, [notify]);

  const logout = useCallback(() => {
    setUser(null);
    notify("Signed out");
  }, [notify]);

  const placeOrder = useCallback(
    (input: { email: string; address: Omit<Address, "id" | "label"> }) => {
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
      const order: Order = {
        id: `VL-${Math.floor(1000 + Math.random() * 9000)}`,
        placedAt: new Date().toISOString(),
        status: "processing",
        items: cart,
        subtotal,
        shipping,
        total: subtotal + shipping,
        email: input.email,
        address: input.address,
      };
      setOrders((prev) => [order, ...prev]);
      setCart([]);
      setCartOpen(false);
      return order;
    },
    [cart],
  );

  const addAddress = useCallback((address: Address) => {
    setAddresses((prev) => [address, ...prev]);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      user,
      orders,
      addresses,
      cartOpen,
      searchOpen,
      toast,
      setCartOpen,
      setSearchOpen,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      login,
      logout,
      placeOrder,
      addAddress,
      notify,
    }),
    [
      cart,
      wishlist,
      user,
      orders,
      addresses,
      cartOpen,
      searchOpen,
      toast,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      login,
      logout,
      placeOrder,
      addAddress,
      notify,
    ],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      {toast ? (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 fade-in">
          <div className="rounded-full bg-ink px-5 py-2.5 text-sm tracking-wide text-cream shadow-lg">
            {toast.message}
          </div>
        </div>
      ) : null}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function itemKey(item: Pick<CartItem, "productId" | "size" | "color">) {
  return `${item.productId}-${item.size}-${item.color}`;
}
