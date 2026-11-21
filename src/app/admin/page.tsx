"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle, ArrowDownToLine, ArrowLeft, Boxes, Check,
  CircleDollarSign, ImagePlus, LayoutDashboard, Menu, Package, Plus,
  Search, Settings2, ShoppingBag, Trash2, TrendingUp, Upload, X,
} from "lucide-react";
import type { Category, Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { getStarterProducts, saveManagedProducts } from "@/lib/admin-catalog";
import { useManagedProducts } from "@/hooks/useManagedProducts";

type Section = "Overview" | "Products" | "Inventory" | "Orders";
type FormState = {
  name: string; subtitle: string; description: string; price: string;
  compareAtPrice: string; category: Category; collection: string;
  quantity: string; images: string; sizes: string; fabric: string;
};
const blankForm: FormState = {
  name: "", subtitle: "", description: "", price: "", compareAtPrice: "",
  category: "fragrance", collection: "signature-scents", quantity: "0",
  images: "", sizes: "", fabric: "",
};
const sections: { name: Section; icon: typeof LayoutDashboard }[] = [
  { name: "Overview", icon: LayoutDashboard }, { name: "Products", icon: Package },
  { name: "Inventory", icon: Boxes }, { name: "Orders", icon: ShoppingBag },
];
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function AdminPage() {
  const products = useManagedProducts(getStarterProducts());
  const [section, setSection] = useState<Section>("Overview");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(blankForm);
  const [notice, setNotice] = useState("");
  const [mobileNav, setMobileNav] = useState(false);

  const lowStock = products.filter((product) => (product.stockQuantity ?? (product.inStock ? 10 : 0)) <= 5);
  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesQuery = `${product.name} ${product.slug}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (category === "all" || product.category === category);
  }), [products, query, category]);
  const stockValue = products.reduce((sum, product) => sum + product.price * (product.stockQuantity ?? (product.inStock ? 10 : 0)), 0);

  const beginCreate = () => {
    setEditing(null); setForm(blankForm); setShowForm(true);
  };
  const beginEdit = (product: Product) => {
    setEditing(product);
    setForm({
      name: product.name, subtitle: product.subtitle, description: product.description,
      price: String(product.price), compareAtPrice: product.compareAtPrice ? String(product.compareAtPrice) : "",
      category: product.category, collection: product.collection,
      quantity: String(product.stockQuantity ?? (product.inStock ? 10 : 0)),
      images: product.images.join("\n"), sizes: product.sizes.join(", "), fabric: product.fabric ?? "",
    });
    setShowForm(true);
  };
  const setField = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submitProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = form.name.trim();
    const slugBase = slugify(name);
    const slug = editing?.slug ?? slugBase;
    const quantity = Math.max(0, Number(form.quantity) || 0);
    const images = form.images.split("\n").map((image) => image.trim()).filter(Boolean);
    const nextProduct: Product = {
      ...(editing ?? {
        id: `p-${Date.now()}`, rating: 0, reviewCount: 0, colors: [], tags: [],
        care: [], details: [], createdAt: new Date().toISOString().slice(0, 10),
      }),
      slug, name, subtitle: form.subtitle.trim(), description: form.description.trim(),
      price: Number(form.price), compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : undefined,
      category: form.category, collection: form.collection.trim() || (form.category === "shoes" ? "everyday-steps" : "signature-scents"),
      images, sizes: form.sizes.split(",").map((size) => size.trim()).filter(Boolean),
      fabric: form.fabric.trim() || undefined, stockQuantity: quantity, inStock: quantity > 0,
    };
    const next = editing ? products.map((product) => product.id === editing.id ? nextProduct : product) : [nextProduct, ...products];
    saveManagedProducts(next);
    setShowForm(false);
    setNotice(editing ? "Product changes saved" : "Product added to catalog");
    window.setTimeout(() => setNotice(""), 2600);
  };
  const removeProduct = (product: Product) => {
    if (!window.confirm(`Delete “${product.name}” from your catalog?`)) return;
    saveManagedProducts(products.filter((item) => item.id !== product.id));
    setNotice("Product deleted"); window.setTimeout(() => setNotice(""), 2600);
  };
  const updateQuantity = (product: Product, quantity: number) => {
    const safeQuantity = Math.max(0, quantity);
    saveManagedProducts(products.map((item) => item.id === product.id ? { ...item, stockQuantity: safeQuantity, inStock: safeQuantity > 0 } : item));
  };
  const handleImageFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    const tooLarge = files.find((file) => file.size > 1_500_000);
    if (tooLarge) { setNotice("Choose images under 1.5 MB each for this browser demo"); window.setTimeout(() => setNotice(""), 3000); return; }
    Promise.all(files.map((file) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = () => reject(reader.error); reader.readAsDataURL(file);
    }))).then((images) => setForm((current) => ({ ...current, images: [...current.images.split("\n").filter(Boolean), ...images].join("\n") })));
    event.target.value = "";
  };

  const Sidebar = <>
    <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
      <Link href="/" className="font-display text-2xl tracking-wide">VELORA<span className="ml-2 text-[9px] font-sans tracking-[0.2em] text-[#d6b475]">ADMIN</span></Link>
      <button className="lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={18} /></button>
    </div>
    <div className="px-4 pt-7"><p className="px-3 text-[10px] uppercase tracking-[0.2em] text-white/45">Workspace</p>
      <nav className="mt-3 space-y-1">{sections.map(({ name, icon: Icon }) => <button key={name} onClick={() => { setSection(name); setMobileNav(false); }} className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${section === name ? "bg-[#d3ad68] text-[#201a12]" : "text-white/70 hover:bg-white/10 hover:text-white"}`}><Icon size={17} />{name}{name === "Inventory" && lowStock.length ? <span className="ml-auto rounded-full bg-[#9f4e35] px-2 py-0.5 text-[10px] text-white">{lowStock.length}</span> : null}</button>)}</nav>
    </div>
    <div className="mt-auto border-t border-white/10 p-5"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-[#d3ad68] text-xs font-semibold text-[#201a12]">A</div><div><p className="text-sm">Store owner</p><p className="text-[11px] text-white/45">Administrator</p></div><Settings2 size={16} className="ml-auto text-white/50" /></div><Link href="/" className="mt-5 flex items-center gap-2 text-xs text-white/60 hover:text-white"><ArrowLeft size={14} /> Back to storefront</Link></div>
  </>;

  return <div className="admin-shell min-h-screen bg-[#f4f2ed] text-[#211f1b]">
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[250px] flex-col bg-[#211f1b] text-white lg:flex">{Sidebar}</aside>
    {mobileNav ? <div className="fixed inset-0 z-50 lg:hidden"><button aria-label="Close menu" onClick={() => setMobileNav(false)} className="absolute inset-0 bg-black/40" /><aside className="absolute inset-y-0 left-0 flex w-[280px] flex-col bg-[#211f1b] text-white">{Sidebar}</aside></div> : null}
    <div className="min-h-screen lg:pl-[250px]">
      <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#e6e1d8] bg-[#f8f7f3]/95 px-5 backdrop-blur md:px-9">
        <div className="flex items-center gap-3"><button onClick={() => setMobileNav(true)} className="lg:hidden" aria-label="Open menu"><Menu size={20} /></button><div><p className="text-[10px] uppercase tracking-[0.18em] text-[#918a7f]">VELORA / {section}</p><h1 className="mt-0.5 font-display text-2xl">{section === "Overview" ? "Store overview" : section}</h1></div></div>
        <div className="flex items-center gap-3"><span className="hidden text-xs text-[#837d73] sm:block">Local demo workspace</span><span className="grid h-9 w-9 place-items-center rounded-full border border-[#e4ded2] bg-white text-xs">A</span></div>
      </header>
      <main className="mx-auto max-w-[1440px] px-5 py-7 md:px-9 md:py-9">
        {notice ? <div className="fixed right-5 top-20 z-[80] flex items-center gap-2 rounded-lg bg-[#26382e] px-4 py-3 text-sm text-white shadow-xl"><Check size={16} />{notice}</div> : null}
        {section === "Overview" ? <>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-[#817a70]">Here’s what’s happening in your store.</p><p className="mt-1 text-xs text-[#a19b91]">Catalog snapshot · saved in this browser</p></div><button onClick={beginCreate} className="flex items-center gap-2 rounded-md bg-[#28251f] px-4 py-2.5 text-xs font-medium text-white hover:bg-[#403a30]"><Plus size={15} /> Add product</button></div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[
            { label: "Catalog products", value: String(products.length), hint: "Perfumes and footwear", Icon: Package },
            { label: "Units in stock", value: String(products.reduce((sum, p) => sum + (p.stockQuantity ?? (p.inStock ? 10 : 0)), 0)), hint: `${lowStock.length} products need attention`, Icon: Boxes },
            { label: "Stock value", value: formatPrice(stockValue), hint: "Based on current price × units", Icon: CircleDollarSign },
            { label: "Low stock", value: String(lowStock.length), hint: "5 units or fewer", Icon: AlertTriangle },
          ].map(({ label, value, hint, Icon }) => <article key={label} className="rounded-xl border border-[#e9e5dc] bg-white p-5"><div className="flex items-center justify-between"><p className="text-xs text-[#847e73]">{label}</p><Icon size={17} className="text-[#a47b3c]" /></div><p className="mt-4 font-display text-3xl">{value}</p><p className="mt-1 text-[11px] text-[#9a948a]">{hint}</p></article>)}</div>
          <div className="mt-7 grid gap-5 xl:grid-cols-[1.5fr_1fr]"><section className="rounded-xl border border-[#e9e5dc] bg-white"><div className="flex items-center justify-between border-b border-[#eeeae3] px-5 py-4"><div><h2 className="font-display text-2xl">Inventory watch</h2><p className="mt-0.5 text-xs text-[#968f85]">Items running low or out of stock</p></div><button onClick={() => setSection("Inventory")} className="text-xs text-[#98703a]">Manage inventory →</button></div>{lowStock.length ? <div className="divide-y divide-[#f0ede7]">{lowStock.slice(0, 5).map((product) => <div key={product.id} className="flex items-center gap-3 px-5 py-3"><div className="grid h-10 w-10 place-items-center rounded bg-[#f1eee8]"><Package size={17} className="text-[#8e887d]" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm">{product.name}</p><p className="text-[11px] text-[#969087]">{product.category === "shoes" ? "Shoes" : "Perfume"}</p></div><span className={`rounded-full px-2.5 py-1 text-[10px] ${product.stockQuantity === 0 ? "bg-[#f8e7e1] text-[#994a31]" : "bg-[#f7f0dc] text-[#84672d]"}`}>{product.stockQuantity ?? (product.inStock ? 10 : 0)} left</span></div>)}</div> : <div className="p-8 text-center text-sm text-[#8d877d]">All products have more than 5 units in stock.</div>}</section>
            <section className="rounded-xl border border-[#e9e5dc] bg-white p-5"><div className="flex items-center gap-2"><TrendingUp size={17} className="text-[#a47b3c]" /><h2 className="font-display text-2xl">Getting started</h2></div><p className="mt-2 text-xs leading-5 text-[#817a70]">Your admin workspace is ready for the product catalog. Add your real products and stock counts to replace the sample items.</p><button onClick={beginCreate} className="mt-5 w-full rounded-md border border-[#ded8cc] px-3 py-2.5 text-left text-xs hover:bg-[#faf8f4]">＋ Add your first real product</button><div className="mt-3 flex items-center gap-2 rounded-md bg-[#f5f2eb] p-3 text-[11px] leading-5 text-[#756f65]"><AlertTriangle size={15} className="shrink-0 text-[#a47b3c]" />Products currently save to this browser only. Connect a database before accepting live orders.</div></section></div>
          <ProductTable products={products.slice(0, 5)} onEdit={beginEdit} onDelete={removeProduct} onViewAll={() => setSection("Products")} />
        </> : null}
        {section === "Products" || section === "Inventory" ? <>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-[#817a70]">{section === "Inventory" ? "Track stock on hand and update quantities." : "Add, edit, and remove products from your catalog."}</p><button onClick={beginCreate} className="flex items-center gap-2 rounded-md bg-[#28251f] px-4 py-2.5 text-xs text-white"><Plus size={15} /> Add product</button></div>
          <div className="mb-4 flex flex-wrap gap-3 rounded-xl border border-[#e9e5dc] bg-white p-3"><label className="flex min-w-[210px] flex-1 items-center gap-2 px-2"><Search size={16} className="text-[#9b948a]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products…" className="w-full bg-transparent py-1 text-sm outline-none" /></label><select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-md border border-[#e8e3d9] bg-white px-3 py-2 text-xs"><option value="all">All categories</option><option value="fragrance">Perfume</option><option value="shoes">Shoes</option></select></div>
          {section === "Inventory" ? <div className="mb-4 flex flex-wrap gap-3">{[
            ["Units on hand", products.reduce((n, p) => n + (p.stockQuantity ?? (p.inStock ? 10 : 0)), 0)], ["Low stock items", lowStock.length], ["Out of stock", products.filter((p) => (p.stockQuantity ?? (p.inStock ? 10 : 0)) === 0).length],
          ].map(([label, value]) => <div key={String(label)} className="rounded-lg border border-[#e9e5dc] bg-white px-4 py-3"><span className="text-[11px] text-[#8b847a]">{String(label)}</span><b className="ml-3 text-sm">{String(value)}</b></div>)}</div> : null}
          <ProductTable products={visibleProducts} onEdit={beginEdit} onDelete={removeProduct} inventory={section === "Inventory"} onQuantity={updateQuantity} />
        </> : null}
        {section === "Orders" ? <div className="grid min-h-[420px] place-items-center rounded-xl border border-dashed border-[#d8d2c8] bg-white p-8 text-center"><div><ShoppingBag size={30} className="mx-auto text-[#9b8b70]" /><h2 className="mt-4 font-display text-3xl">Orders will show up here</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#817a70]">The checkout currently uses demo browser data. Connect the backend and payment or cash-on-delivery flow to manage customer orders here.</p><span className="mt-4 inline-flex rounded-full bg-[#f2eee6] px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-[#7b715f]">Backend connection needed</span></div></div> : null}
        <div className="mt-8 flex items-start gap-2 border-t border-[#e2ddd4] pt-4 text-[11px] leading-5 text-[#969087]"><ArrowDownToLine size={14} className="mt-0.5 shrink-0" />For now, product edits are saved only in this browser’s storage. A database, secure admin login, and image hosting are needed before the dashboard can control your live store across devices.</div>
      </main>
    </div>

    {showForm ? <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#171512]/55 p-3 md:p-8"><section className="max-h-full w-full max-w-3xl overflow-y-auto rounded-xl bg-[#fbfaf7] shadow-2xl"><div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e9e4da] bg-[#fbfaf7] px-5 py-4 md:px-7"><div><p className="text-[10px] uppercase tracking-[0.2em] text-[#958c7e]">Catalog management</p><h2 className="mt-0.5 font-display text-2xl">{editing ? "Edit product" : "Add a product"}</h2></div><button onClick={() => setShowForm(false)} className="rounded-full p-2 hover:bg-[#eeeae2]" aria-label="Close form"><X size={18} /></button></div>
      <form onSubmit={submitProduct} className="space-y-5 p-5 md:p-7"><div className="grid gap-4 sm:grid-cols-2"><Field label="Product name" required><input required value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="e.g. Amber Oud Eau de Parfum" /></Field><Field label="Category"><select value={form.category} onChange={(e) => setField("category", e.target.value)}><option value="fragrance">Perfume</option><option value="shoes">Shoes</option></select></Field><Field label="Short subtitle"><input value={form.subtitle} onChange={(e) => setField("subtitle", e.target.value)} placeholder="A short line shown on the product card" /></Field><Field label="Collection"><input value={form.collection} onChange={(e) => setField("collection", e.target.value)} placeholder="signature-scents / everyday-steps" /></Field><Field label="Price (PKR)" required><input required min="0" type="number" value={form.price} onChange={(e) => setField("price", e.target.value)} placeholder="8500" /></Field><Field label="Original price (optional)"><input min="0" type="number" value={form.compareAtPrice} onChange={(e) => setField("compareAtPrice", e.target.value)} placeholder="9500" /></Field><Field label="Quantity in stock" required><input required min="0" type="number" value={form.quantity} onChange={(e) => setField("quantity", e.target.value)} /></Field><Field label={form.category === "shoes" ? "Sizes (comma separated)" : "Volume / size options"}><input value={form.sizes} onChange={(e) => setField("sizes", e.target.value)} placeholder={form.category === "shoes" ? "7, 8, 9, 10" : "30ml, 50ml, 100ml"} /></Field></div>
        <Field label="Product description"><textarea rows={3} value={form.description} onChange={(e) => setField("description", e.target.value)} placeholder="Describe the product for customers…" /></Field><Field label="Material / fragrance details"><input value={form.fabric} onChange={(e) => setField("fabric", e.target.value)} placeholder="Eau de parfum · 50 ml / Leather upper" /></Field>
        <div><div className="mb-2 flex items-center justify-between"><label className="text-xs font-medium text-[#625c52]">Product images</label><label className="flex cursor-pointer items-center gap-1.5 text-[11px] text-[#8c6735] hover:text-[#5c4322]"><ImagePlus size={14} /> Upload image<input className="sr-only" type="file" accept="image/*" multiple onChange={handleImageFiles} /></label></div><textarea rows={3} value={form.images} onChange={(e) => setField("images", e.target.value)} placeholder="Paste an image URL per line, or upload image files (under 1.5 MB each)" className="w-full rounded-md border border-[#e4dfd6] bg-white px-3 py-2.5 text-xs outline-none focus:border-[#ae8a51]" /><p className="mt-1 text-[10px] text-[#9a9388]">For the live store, use permanent hosted image links. Uploaded files are kept in this browser demo.</p>{form.images.split("\n").filter(Boolean).length ? <div className="mt-2 flex flex-wrap gap-2">{form.images.split("\n").filter(Boolean).map((src, i) => <div key={`${src.slice(0,20)}-${i}`} className="relative h-16 w-16 overflow-hidden rounded border border-[#e4dfd6] bg-white"><Image src={src} alt={`Product preview ${i + 1}`} fill unoptimized sizes="64px" className="object-cover" /><button type="button" onClick={() => setField("images", form.images.split("\n").filter(Boolean).filter((_, index) => index !== i).join("\n"))} className="absolute right-0 top-0 bg-white/90 p-1" aria-label="Remove image"><X size={12} /></button></div>)}</div> : null}</div>
        <div className="flex justify-end gap-2 border-t border-[#e9e4da] pt-4"><button type="button" onClick={() => setShowForm(false)} className="rounded-md border border-[#ded8cd] px-4 py-2.5 text-xs">Cancel</button><button className="flex items-center gap-2 rounded-md bg-[#28251f] px-5 py-2.5 text-xs text-white"><Upload size={14} />{editing ? "Save changes" : "Add product"}</button></div>
      </form></section></div> : null}
  </div>;
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <label className="block text-xs font-medium text-[#625c52]">{label}{required ? <span className="ml-1 text-[#ad593f]">*</span> : null}<span className="mt-1.5 block [&>input]:h-10 [&>input]:w-full [&>input]:rounded-md [&>input]:border [&>input]:border-[#e4dfd6] [&>input]:bg-white [&>input]:px-3 [&>input]:text-sm [&>input]:font-normal [&>input]:outline-none [&>input]:focus:border-[#ae8a51] [&>select]:h-10 [&>select]:w-full [&>select]:rounded-md [&>select]:border [&>select]:border-[#e4dfd6] [&>select]:bg-white [&>select]:px-3 [&>select]:text-sm [&>textarea]:w-full [&>textarea]:rounded-md [&>textarea]:border [&>textarea]:border-[#e4dfd6] [&>textarea]:bg-white [&>textarea]:px-3 [&>textarea]:py-2.5 [&>textarea]:text-sm [&>textarea]:font-normal [&>textarea]:outline-none">{children}</span></label>;
}

function ProductTable({ products, onEdit, onDelete, inventory = false, onQuantity, onViewAll }: { products: Product[]; onEdit: (product: Product) => void; onDelete: (product: Product) => void; inventory?: boolean; onQuantity?: (product: Product, quantity: number) => void; onViewAll?: () => void }) {
  return <section className="mt-7 overflow-hidden rounded-xl border border-[#e9e5dc] bg-white"><div className="flex items-center justify-between border-b border-[#eeeae3] px-5 py-4"><div><h2 className="font-display text-2xl">{inventory ? "Stock levels" : "Products"}</h2><p className="mt-0.5 text-xs text-[#968f85]">{products.length} {products.length === 1 ? "item" : "items"}</p></div>{onViewAll ? <button onClick={onViewAll} className="text-xs text-[#98703a]">View all →</button> : null}</div>
    {!products.length ? <div className="p-12 text-center text-sm text-[#8d877d]">No matching products. Add a product to get started.</div> : <div className="overflow-x-auto"><table className="w-full min-w-[720px] border-collapse text-left"><thead className="bg-[#faf9f6] text-[10px] uppercase tracking-[0.12em] text-[#928b80]"><tr><th className="px-5 py-3 font-medium">Product</th><th className="px-4 py-3 font-medium">Category</th><th className="px-4 py-3 font-medium">Price</th><th className="px-4 py-3 font-medium">Stock</th><th className="px-4 py-3 font-medium">Status</th><th className="px-5 py-3 text-right font-medium">Actions</th></tr></thead><tbody className="divide-y divide-[#f0ede7]">{products.map((product) => { const quantity = product.stockQuantity ?? (product.inStock ? 10 : 0); return <tr key={product.id} className="hover:bg-[#fdfcf9]"><td className="px-5 py-3"><div className="flex items-center gap-3"><div className="relative h-11 w-11 shrink-0 overflow-hidden rounded bg-[#f2f0eb]">{product.images[0] ? <Image src={product.images[0]} alt="" fill unoptimized sizes="44px" className="object-cover" /> : <div className="grid h-full place-items-center"><Package size={15} className="text-[#aaa398]" /></div>}</div><div className="min-w-0"><p className="max-w-[230px] truncate text-xs font-medium">{product.name}</p><p className="mt-1 max-w-[230px] truncate text-[10px] text-[#9a948a]">{product.slug}</p></div></div></td><td className="px-4 py-3 text-xs text-[#716b61]">{product.category === "shoes" ? "Shoes" : "Perfume"}</td><td className="px-4 py-3 text-xs">{formatPrice(product.price)}</td><td className="px-4 py-3">{inventory ? <div className="flex items-center gap-1"><button onClick={() => onQuantity?.(product, quantity - 1)} className="grid h-7 w-7 place-items-center rounded border border-[#e7e1d7] text-sm">−</button><span className="w-8 text-center text-xs">{quantity}</span><button onClick={() => onQuantity?.(product, quantity + 1)} className="grid h-7 w-7 place-items-center rounded border border-[#e7e1d7] text-sm">+</button></div> : <span className="text-xs">{quantity} units</span>}</td><td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-[10px] ${quantity === 0 ? "bg-[#f8e7e1] text-[#994a31]" : quantity <= 5 ? "bg-[#f7f0dc] text-[#84672d]" : "bg-[#e9f1eb] text-[#48684f]"}`}>{quantity === 0 ? "Out of stock" : quantity <= 5 ? "Low stock" : "In stock"}</span></td><td className="px-5 py-3"><div className="flex justify-end gap-2"><button onClick={() => onEdit(product)} className="rounded border border-[#e7e1d7] px-3 py-1.5 text-[10px] hover:bg-[#f6f3ed]">Edit</button><button onClick={() => onDelete(product)} title="Delete product" className="grid h-7 w-7 place-items-center rounded border border-[#e7e1d7] text-[#9b6657] hover:bg-[#f8e7e1]"><Trash2 size={13} /></button></div></td></tr>; })}</tbody></table></div>}
  </section>;
}
