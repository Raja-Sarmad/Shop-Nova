import type { Collection, JournalPost, Product, Review } from "@/lib/types";

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const collections: Collection[] = [
  {
    slug: "signature-scents",
    title: "Signature scents",
    eyebrow: "Find your note",
    description: "Memorable fragrances for the rituals and rooms that make a day yours.",
    image: u("photo-1594035910387-fea47794261f"),
    featured: true,
  },
  {
    slug: "everyday-steps",
    title: "Everyday steps",
    eyebrow: "Made to move",
    description: "Considered shoes with easy comfort and a little bit of presence.",
    image: u("photo-1543163521-1bf539c55dd2"),
    featured: true,
  },
  {
    slug: "after-hours",
    title: "After hours",
    eyebrow: "A little more evening",
    description: "Rich notes and refined silhouettes for plans worth dressing up for.",
    image: u("photo-1614252235816-8c852fd85888"),
    featured: true,
  },
];

export const products: Product[] = [
  {
    id: "p01", slug: "dior-sauvage-eau-de-parfum", name: "Dior Sauvage Eau de Parfum", subtitle: "Bold, fresh & long-lasting",
    description: "A bold, fresh fragrance with a long-lasting trail. A confident everyday signature with a smooth, warm finish.",
    price: 28500, compareAtPrice: 32000, category: "fragrance", collection: "signature-scents", images: [u("photo-1594035910387-fea47794261f"), u("photo-1615634260167-c8cdede054de")],
    colors: [{ name: "Noir", hex: "#161412" }], sizes: ["30ml", "50ml", "100ml"], tags: ["sauvage", "fresh", "woody", "dior"], rating: 4.8, reviewCount: 256, inStock: true, isNew: true,
    fabric: "Eau de parfum", care: ["Store away from direct sunlight", "Apply to pulse points"], details: ["Fresh, woody profile", "Long-lasting fragrance", "Gift-ready box"], createdAt: "2026-10-18",
  },
  {
    id: "p02", slug: "rose-musk-eau-de-parfum", name: "Rose Musk Eau de Parfum", subtitle: "Damask rose · soft musk · 50 ml",
    description: "Fresh petals settle into clean, skin-close musk. A modern rose that feels effortless in the morning and quietly beautiful all day.",
    price: 7600, compareAtPrice: 8900, category: "fragrance", collection: "signature-scents", images: [u("photo-1615634260167-c8cdede054de"), u("photo-1592945403244-b3fbafd7f539")],
    colors: [{ name: "Blush", hex: "#C98C83" }], sizes: ["50 ml"], tags: ["rose", "floral", "musk"], rating: 4.8, reviewCount: 47, inStock: true, isBestseller: true,
    fabric: "Eau de parfum · 16% fragrance concentration", care: ["Store away from direct sunlight", "Apply to pulse points"], details: ["Soft floral dry-down", "Made for everyday wear", "Gift-ready box"], createdAt: "2026-07-20",
  },
  {
    id: "p03", slug: "tom-ford-oud-wood", name: "Tom Ford Oud Wood", subtitle: "Rich oud with a modern touch",
    description: "Rare oud, warm woods and refined spice come together in an elegant, modern fragrance with a memorable finish.",
    price: 76999, compareAtPrice: 84999, category: "fragrance", collection: "signature-scents", images: [u("photo-1615634260167-c8cdede054de"), u("photo-1592945403244-b3fbafd7f539")],
    colors: [{ name: "Noir", hex: "#161412" }], sizes: ["30ml", "50ml", "100ml"], tags: ["oud", "woody", "tom ford"], rating: 4.9, reviewCount: 328, inStock: true, isBestseller: true,
    fabric: "Eau de parfum", care: ["Store away from direct sunlight", "Apply to pulse points"], details: ["Rich oud and woods", "Smooth lasting dry-down", "Gift-ready box"], createdAt: "2026-09-26",
  },
  {
    id: "p04", slug: "velvet-vanilla-eau-de-parfum", name: "Velvet Vanilla Eau de Parfum", subtitle: "Vanilla bean · tonka · 50 ml",
    description: "Creamy vanilla bean meets toasted tonka and a whisper of spice. Comforting, polished and never too sweet.",
    price: 7900, category: "fragrance", collection: "after-hours", images: [u("photo-1608571423902-eed4a5ad8108"), u("photo-1595425970377-c9703cf48b6d")],
    colors: [{ name: "Vanilla", hex: "#C9A77B" }], sizes: ["50 ml"], tags: ["vanilla", "sweet", "warm"], rating: 4.8, reviewCount: 39, inStock: true,
    fabric: "Eau de parfum · 17% fragrance concentration", care: ["Store away from direct sunlight", "Apply to pulse points"], details: ["Warm gourmand profile", "Smooth, lasting dry-down", "Gift-ready box"], createdAt: "2026-06-14",
  },
  {
    id: "p05", slug: "nike-air-force-1-07", name: "Nike Air Force 1 '07", subtitle: "Iconic style, everyday comfort",
    description: "A timeless low-top sneaker with a clean profile, cushioned feel and versatile finish for everyday wear.",
    price: 31999, compareAtPrice: 37200, category: "shoes", collection: "everyday-steps", images: [u("photo-1549298916-b41d501d3772"), u("photo-1460353581641-37baddab0fa2")],
    colors: [{ name: "White", hex: "#F4F1EA" }, { name: "Black", hex: "#211D1A" }], sizes: ["7", "8", "9", "10", "11"], tags: ["sneakers", "nike", "everyday"], rating: 4.7, reviewCount: 189, inStock: true, isNew: true,
    fabric: "Leather upper · rubber sole", care: ["Wipe clean with a soft cloth"], details: ["Classic low-top design", "Padded collar", "Cushioned sole"], createdAt: "2026-10-12",
  },
  {
    id: "p06", slug: "clarks-classic-leather-loafer", name: "Clarks Classic Leather Loafer", subtitle: "Classic, refined, everyday comfort",
    description: "A polished leather loafer with a timeless profile and cushioned comfort, made for workdays and evenings alike.",
    price: 21599, compareAtPrice: 26999, category: "shoes", collection: "everyday-steps", images: [u("photo-1614252235816-8c852fd85888"), u("photo-1533867617858-e7b97e060509")],
    colors: [{ name: "Black", hex: "#211D1A" }, { name: "Brown", hex: "#70503A" }], sizes: ["7", "8", "9", "10", "11"], tags: ["loafers", "clarks", "leather"], rating: 4.8, reviewCount: 421, inStock: true,
    fabric: "Leather upper · cushioned lining", care: ["Wipe clean with a soft cloth", "Condition seasonally"], details: ["Classic leather finish", "Cushioned footbed", "Flexible sole"], createdAt: "2026-09-20",
  },
  {
    id: "p07", slug: "suede-ankle-boot", name: "Suede Ankle Boot", subtitle: "Soft calf suede · stacked heel",
    description: "A pull-on ankle boot with a softly almond toe and a comfortable stacked heel. Supple suede gives it an easy, lived-in feel from day one.",
    price: 19900, compareAtPrice: 22900, category: "shoes", collection: "after-hours", images: [u("photo-1543163521-1bf539c55dd2"), u("photo-1608256246200-53e635b5b65f")],
    colors: [{ name: "Taupe", hex: "#8B7764" }, { name: "Noir", hex: "#1A1614" }], sizes: ["36", "37", "38", "39", "40", "41"], tags: ["boots", "suede"], rating: 4.8, reviewCount: 31, inStock: true, isNew: true,
    fabric: "Calf suede", care: ["Brush with a suede brush", "Use a suede protectant"], details: ["Leather lining", "5 cm heel", "Elastic side gore"], createdAt: "2026-08-15",
  },
  {
    id: "p08", slug: "leather-strap-sandal", name: "Leather Strap Sandal", subtitle: "Soft leather · padded footbed",
    description: "A minimal two-strap sandal with a supportive footbed and an adjustable buckle. Built for long, warm days on your feet.",
    price: 13900, compareAtPrice: 15900, category: "shoes", collection: "everyday-steps", images: [u("photo-1562273138-f46be4ebdf33"), u("photo-1560343090-f0409e92791a")],
    colors: [{ name: "Tan", hex: "#A8774E" }, { name: "Black", hex: "#211D1A" }], sizes: ["36", "37", "38", "39", "40", "41"], tags: ["sandals", "leather"], rating: 4.6, reviewCount: 25, inStock: true, isNew: true,
    fabric: "Full-grain leather upper", care: ["Wipe clean", "Keep away from prolonged moisture"], details: ["Adjustable buckle", "Padded footbed", "Flexible sole"], createdAt: "2026-09-07",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "p01",
    author: "Ayesha K.",
    rating: 5,
    title: "My new evening scent",
    body: "The amber and oud settle beautifully and last through dinner. The bottle looks lovely on my dresser too.",
    date: "2026-08-28",
  },
  {
    id: "r2",
    productId: "p01",
    author: "Sara M.",
    rating: 5,
    title: "A gorgeous everyday fragrance",
    body: "Warm without being heavy, and I still catch a soft trace of it hours later. I will be ordering another.",
    date: "2026-09-04",
  },
  {
    id: "r3",
    productId: "p02",
    author: "Hina R.",
    rating: 5,
    title: "Soft and so easy to wear",
    body: "A beautiful rose scent that feels fresh at first and settles into a lovely soft musk. Already a favourite.",
    date: "2026-09-01",
  },
  {
    id: "r4",
    productId: "p04",
    author: "Omar F.",
    rating: 5,
    title: "Comfortable from the first wear",
    body: "The fit feels secure and the sole is soft underfoot. I walked around all afternoon without wanting to change shoes.",
    date: "2026-07-12",
  },
  {
    id: "r5",
    productId: "p11",
    author: "Maham S.",
    rating: 5,
    title: "These go with everything",
    body: "The profile is simple, they feel great on, and the espresso leather is even nicer in person.",
    date: "2026-08-16",
  },
  {
    id: "r6",
    productId: "p13",
    author: "Zara L.",
    rating: 4,
    title: "My favourite warm weather pair",
    body: "The footbed is comfortable and the straps feel soft. Easy to dress up or wear every day.",
    date: "2026-06-03",
  },
];

export const journalPosts: JournalPost[] = [
  {
    slug: "how-to-make-a-scent-last",
    title: "A softer way to make your scent last",
    excerpt: "A few simple rituals for getting more from your favourite fragrance.",
    image: u("photo-1592945403244-b3fbafd7f539"),
    date: "2026-08-18",
    readTime: "4 min",
    body: [
      "Start with clean, moisturised skin. Fragrance settles more evenly when your skin is hydrated, and applying it after a shower can help the notes stay close for longer.",
      "Try a light touch on pulse points such as the wrists and neck. Give the fragrance a moment to settle, and avoid rubbing your wrists together so the opening notes can unfold as intended.",
      "Keep your bottle away from heat and direct sunlight. A cool, dry shelf helps preserve the character of the scent between wears.",
    ],
  },
  {
    slug: "evening-in-the-old-city",
    title: "Getting dressed for a Lahore evening",
    excerpt: "A familiar fragrance, a comfortable pair, and plans that can take their time.",
    image: u("photo-1543163521-1bf539c55dd2"),
    date: "2026-07-29",
    readTime: "5 min",
    body: [
      "Some evenings are best kept simple. Start with shoes you can walk in and add a fragrance that feels like you, whether that is bright citrus or something warm and woody.",
      "The right pair can take you from an early dinner to one more stop without thinking about your feet. Look for a secure fit, a comfortable sole and materials that soften with wear.",
      "Choose the scent for your mood, not the occasion. Your favourite is the one you want to wear again tomorrow.",
    ],
  },
  {
    slug: "notes-to-find-your-fragrance",
    title: "Find the fragrance notes you love",
    excerpt: "A simple guide to fresh, floral and warm scent families.",
    image: u("photo-1594035910387-fea47794261f"),
    date: "2026-06-12",
    readTime: "3 min",
    body: [
      "Fresh fragrances often open with citrus, green or airy notes. They feel bright and easy, which makes them a lovely place to start if you prefer a lighter scent.",
      "Floral notes can feel soft and familiar, while woods, amber and musk tend to bring a warmer finish. Many fragrances move through more than one family as they settle on the skin.",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "Amazing fragrance collection! Authentic products, premium packaging, and fast delivery.",
    author: "Ali Raza",
    role: "Verified customer, Lahore",
  },
  {
    quote:
      "The shoes are super comfortable and the quality is outstanding. Highly recommended!",
    author: "Sara Khan",
    role: "Verified customer, Karachi",
  },
  {
    quote:
      "Great shopping experience! Original perfumes, good prices, and excellent customer support.",
    author: "Usman Siddiqui",
    role: "Verified customer, Islamabad",
  },
];

export const faqs = [
  {
    q: "How long does delivery take?",
    a: "Lahore, Karachi, and Islamabad: 2–4 working days. Other cities in Pakistan: 4–7 working days. We ship from our Lahore atelier.",
  },
  {
    q: "What is your return policy?",
    a: "Unworn items with tags can be returned within 14 days. Sale pieces and jewellery with broken seals are final. We arrange pickup in major cities.",
  },
  {
    q: "Do you ship internationally?",
    a: "Not yet. International shipping is planned with the next backend release. Join the newsletter and we will write when it opens.",
  },
  {
    q: "How should I care for my perfume?",
    a: "Keep your bottle in a cool, dry place away from direct sunlight and heat. Apply to pulse points and avoid rubbing the fragrance into your skin.",
  },
  {
    q: "How do I care for my shoes?",
    a: "Care depends on the material. Wipe leather clean and condition it occasionally, brush suede gently, and spot clean canvas. Each product page includes specific care notes.",
  },
  {
    q: "Can I reserve a size?",
    a: "Not while we are on mock inventory. When the live stock API is connected, waitlists will sit on each sold-out size.",
  },
];

export const lookbookImages = [
  u("photo-1594035910387-fea47794261f"),
  u("photo-1543163521-1bf539c55dd2"),
  u("photo-1615634260167-c8cdede054de"),
  u("photo-1614252235816-8c852fd85888"),
  u("photo-1592945403244-b3fbafd7f539"),
  u("photo-1549298916-b41d501d3772"),
  u("photo-1608571423902-eed4a5ad8108"),
  u("photo-1562273138-f46be4ebdf33"),
];
