import { SOCIAL } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import type { CartItem, Product } from "@/lib/types";

export function whatsappHref(message: string) {
  return `${SOCIAL.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function productOrderMessage(product: Product, opts: {
  size?: string;
  color?: string;
  quantity?: number;
}) {
  const lines = [
    `Assalam o Alaikum Shop Nova!`,
    ``,
    `I want to order:`,
    `• ${product.name}`,
    opts.size ? `• Size: ${opts.size}` : null,
    opts.color ? `• Option: ${opts.color}` : null,
    `• Qty: ${opts.quantity ?? 1}`,
    `• Price: ${formatPrice(product.price)}`,
    ``,
    `Please confirm availability and delivery.`,
  ];
  return lines.filter(Boolean).join("\n");
}

export function checkoutOrderMessage(input: {
  name: string;
  phone: string;
  city: string;
  address: string;
  payment: string;
  items: CartItem[];
  total: number;
}) {
  const itemLines = input.items.map(
    (item) =>
      `• ${item.name} (${item.size}${item.color ? `, ${item.color}` : ""}) ×${item.quantity} — ${formatPrice(item.price * item.quantity)}`,
  );
  return [
    `Assalam o Alaikum Shop Nova!`,
    ``,
    `New order request:`,
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `City: ${input.city}`,
    `Address: ${input.address}`,
    `Payment: ${input.payment}`,
    ``,
    `Items:`,
    ...itemLines,
    ``,
    `Total: ${formatPrice(input.total)}`,
    ``,
    `Please confirm my order. Thank you!`,
  ].join("\n");
}
