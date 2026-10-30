import type { Campaign, Category, CategoryKey, Coupon, DeliveryZone, Product } from './types';

const OS = 'One size';
export const SIZE_SETS = ['Adult M · Kids 4–5Y', 'Adult L · Kids 6–7Y', 'Adult XL · Kids 8–9Y'];

/** Temporary Unsplash stock imagery, mapped per product (replace with owned photography). */
const KW: Record<string, string> = {
  m1: '1586790170083-2f9ceadc732d', m2: '1602810318383-e386cc2a3ccf', m3: '1556821840-3a63f95609a7',
  m4: '1473966968600-fa801b869a1a', m5: '1591047139829-d91aecb6caea', m6: '1586350977771-b3b0abd50c82',
  w1: '1583391733956-3750e0ff4e8b', w2: '1610030469983-98e550d6193c', w3: '1434389677669-e08b4cac3105',
  w4: '1617627143750-d86bc21e42bb', w5: '1558769132-cb1aea458c5e',
  k1: '1519238263530-99bdd11df2ea', k2: '1518831959646-742c3a14ebf7', k3: '1522771930-78848d9293e8',
  k4: '1503944583220-79d8926ad5e2',
  t1: '1596461404969-9ae70f2830c1', t2: '1587654780291-39c9404d746b', t3: '1606503153255-59d8b8b82176',
  t4: '1515488042361-ee00e0ddd4e4', t5: '1558060370-d644479cb6f7',
  g1: '1549465220-1a8b9238cd48', g2: '1627123424574-724758594e93', g3: '1512909006721-3d6018887383',
  g4: '1513885535751-8b9238bd345a',
  b1: '1530325553241-4f6e7690cf36', b2: '1594938298603-c8148c4dae35', b3: '1483985988355-763728e1935b',
};

export const IMG = (id: string, w = 600, h = 750, crop = 'entropy'): string =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=${crop}&auto=format&q=70`;

export const productImg = (productId: string, w = 600, h = 750): string => IMG(KW[productId], w, h);

type SeedProduct = Omit<Product, 'img' | 'order' | 'colors' | 'season'> &
  Partial<Pick<Product, 'colors' | 'season'>>;

const RAW: SeedProduct[] = [
  { id: 'm1', cat: 'men', sub: 'T-shirts & polos', name: 'Classic Piqué Polo', price: 890, was: 1190, colors: ['navy', 'white', 'green'], stock: { S: 6, M: 12, L: 4, XL: 0 }, tone: 'sky', isNew: true, shot: 'polo · flat lay', desc: 'A breathable cotton piqué polo with a two-button placket. Smart enough for work, easy enough for weekends.', details: ['100% cotton piqué', 'Regular fit', 'Machine wash cold'] },
  { id: 'm2', cat: 'men', sub: 'Shirts & trousers', name: 'Oxford Casual Shirt', price: 1450, colors: ['white', 'sky'], stock: { S: 3, M: 8, L: 7, XL: 2 }, tone: 'mist', season: ['wedding'], shot: 'shirt · folded', desc: 'A soft Oxford weave shirt with a button-down collar that works tucked or untucked.', details: ['Cotton Oxford weave', 'Button-down collar', 'Regular fit'] },
  { id: 'm3', cat: 'men', sub: 'Hoodies & sweatshirts', name: 'Fleece Pullover Hoodie', price: 1650, was: 1950, colors: ['grey', 'black', 'olive'], stock: { M: 5, L: 9, XL: 3 }, tone: 'sand', isNew: true, season: ['winter'], shot: 'hoodie · front', desc: 'Brushed fleece lining, a roomy kangaroo pocket and ribbed cuffs for cooler evenings.', details: ['Cotton-poly fleece', 'Relaxed fit', 'Lined hood'] },
  { id: 'm4', cat: 'men', sub: 'Shirts & trousers', name: 'Stretch Chino Trousers', price: 1350, colors: ['beige', 'navy', 'black'], stock: { '30': 4, '32': 6, '34': 5, '36': 0 }, tone: 'sand', shot: 'chinos · flat lay', desc: 'Everyday chinos with a touch of stretch and a tapered leg.', details: ['98% cotton, 2% elastane', 'Slim tapered fit', 'Waist sizes in inches'] },
  { id: 'm5', cat: 'men', sub: 'Jackets & seasonal', name: 'Quilted Winter Jacket', price: 3200, colors: ['black', 'olive'], stock: { M: 2, L: 4, XL: 1 }, tone: 'sage', isNew: true, season: ['winter'], shot: 'jacket · hanging', desc: 'A lightweight quilted jacket that adds warmth without bulk, with a water-resistant shell.', details: ['Polyester shell and fill', 'Two zip pockets', 'Regular fit'] },
  { id: 'm6', cat: 'men', sub: 'Socks & accessories', name: 'Cotton Ankle Socks, 3 Pairs', price: 350, colors: ['black', 'grey', 'white'], stock: { [OS]: 40 }, tone: 'mist', shot: 'socks · trio', desc: 'Soft cushioned ankle socks in a pack of three.', details: ['Combed cotton blend', 'Fits UK 7–10'] },
  { id: 'w1', cat: 'women', sub: 'Three-piece & salwar kameez', name: 'Cotton Three-Piece', price: 2450, was: 2950, colors: ['teal', 'maroon'], stock: { S: 4, M: 6, L: 5, XL: 2 }, tone: 'sage', isNew: true, shot: 'three-piece · on model', desc: 'Kameez, salwar and dupatta in breathable cotton with a printed border.', details: ['Cotton kameez and salwar', 'Chiffon dupatta', 'Ready to wear'] },
  { id: 'w2', cat: 'women', sub: 'Three-piece & salwar kameez', name: 'Printed Lawn Salwar Kameez', price: 1890, colors: ['pink', 'sky'], stock: { S: 3, M: 0, L: 6, XL: 4 }, tone: 'blush', shot: 'lawn set · on model', desc: 'Light lawn cotton with an all-over floral print, made for warm days.', details: ['Lawn cotton', 'Straight-cut kameez', 'Ready to wear'] },
  { id: 'w3', cat: 'women', sub: 'Casual & everyday', name: 'Everyday Cotton Kurti', price: 990, colors: ['mustard', 'green', 'white'], stock: { S: 8, M: 10, L: 7, XL: 5 }, tone: 'butter', isNew: true, shot: 'kurti · front', desc: 'A simple A-line kurti that pairs with jeans or palazzos.', details: ['100% cotton', 'A-line cut', 'Three-quarter sleeves'] },
  { id: 'w4', cat: 'women', sub: 'Occasion collections', name: 'Embroidered Occasion Three-Piece', price: 3650, colors: ['maroon', 'green'], stock: { S: 2, M: 3, L: 3, XL: 1 }, tone: 'clay', season: ['wedding'], shot: 'embroidered set · detail', desc: 'Thread embroidery on a soft georgette kameez, with a matching dupatta for weddings and Eid.', details: ['Georgette kameez', 'Embroidered neckline', 'Lined kameez'] },
  { id: 'w5', cat: 'women', sub: 'Fashion accessories', name: 'Soft Woollen Shawl', price: 1250, was: 1450, colors: ['beige', 'maroon', 'grey'], stock: { [OS]: 14 }, tone: 'sand', season: ['winter'], shot: 'shawl · draped', desc: 'A warm, light shawl with fringed edges. Wraps easily over a kameez or coat.', details: ['Wool blend', '200 × 70 cm', 'Dry clean recommended'] },
  { id: 'k1', cat: 'kids', sub: 'Boys', name: "Boys' Graphic Tee", price: 450, colors: ['navy', 'grey'], stock: { '2–3Y': 5, '4–5Y': 8, '6–7Y': 6, '8–9Y': 0 }, tone: 'sky', isNew: true, shot: 'tee · flat lay', desc: 'A soft cotton tee with a playful chest print that holds up to the wash.', details: ['100% cotton jersey', 'Regular fit', 'Machine wash cold'] },
  { id: 'k2', cat: 'kids', sub: 'Girls', name: "Girls' Tiered Frock", price: 850, colors: ['pink', 'mustard'], stock: { '2–3Y': 4, '4–5Y': 6, '6–7Y': 3, '8–9Y': 2 }, tone: 'blush', isNew: true, season: ['wedding'], shot: 'frock · hanging', desc: 'A twirly tiered frock with a soft cotton lining, for parties and family visits.', details: ['Cotton voile, lined', 'Back button fastening', 'Machine wash gentle'] },
  { id: 'k3', cat: 'kids', sub: 'Baby essentials', name: 'Baby Cotton Romper Set', price: 690, colors: ['white', 'sky', 'pink'], stock: { '0–6M': 6, '6–12M': 9, '12–18M': 4 }, tone: 'mist', shot: 'romper · flat lay', desc: 'Two snap-front rompers in soft, breathable cotton for everyday wear.', details: ['Pack of 2', '100% cotton', 'Snap fastenings'] },
  { id: 'k4', cat: 'kids', sub: 'Hoodies & trousers', name: "Kids' Zip Hoodie", price: 950, was: 1150, colors: ['olive', 'navy'], stock: { '4–5Y': 5, '6–7Y': 7, '8–9Y': 4, '10–11Y': 3 }, tone: 'sage', season: ['winter'], shot: 'hoodie · front', desc: 'A full-zip fleece hoodie that layers easily for school mornings.', details: ['Cotton-poly fleece', 'Full zip', 'Two pockets'] },
  { id: 't1', cat: 'toys', sub: 'Educational toys', name: 'Wooden Shape Sorter', price: 750, stock: { [OS]: 12 }, age: '1–3 yrs', tone: 'butter', shot: 'toy · top view', desc: 'Chunky wooden shapes and a sorter box for early shape and colour recognition.', details: ['Solid wood, non-toxic paint', '12 shapes'] },
  { id: 't2', cat: 'toys', sub: 'Building blocks & puzzles', name: 'Building Blocks, 500 Pieces', price: 1490, was: 1690, stock: { [OS]: 7 }, age: '5+ yrs', tone: 'sky', isNew: true, shot: 'blocks · scattered', desc: 'A big tub of compatible building bricks for open-ended building.', details: ['500 pieces', 'Storage tub included', 'Contains small parts'] },
  { id: 't3', cat: 'toys', sub: 'Building blocks & puzzles', name: 'Bangladesh Map Jigsaw, 100 Pieces', price: 550, stock: { [OS]: 15 }, age: '6+ yrs', tone: 'sage', shot: 'puzzle · boxed', desc: 'Piece together the divisions and districts of Bangladesh.', details: ['100 pieces', 'Finished size 40 × 30 cm'] },
  { id: 't4', cat: 'toys', sub: 'Creative & activity', name: 'Modelling Dough Activity Set', price: 890, stock: { [OS]: 0 }, age: '3+ yrs', tone: 'blush', shot: 'dough set · open', desc: 'Eight colours of soft dough with shape cutters and rollers.', details: ['8 tubs of dough', '10 tools', 'Non-toxic'] },
  { id: 't5', cat: 'toys', sub: 'Outdoor play', name: 'Foldable Kick Scooter', price: 2850, colors: ['green', 'sky'], stock: { [OS]: 3 }, age: '5–10 yrs', tone: 'mist', isNew: true, shot: 'scooter · side', desc: 'A three-height adjustable scooter with light-up wheels that folds for carrying.', details: ['Max load 50 kg', 'Adjustable handlebar', 'Rear foot brake'] },
  { id: 'g1', cat: 'gifts', sub: 'Birthday gifts', name: 'Birthday Gift Box', price: 1800, stock: { [OS]: 6 }, tone: 'clay', isNew: true, shot: 'gift box · open', desc: 'A ready-to-give box with a scented candle, a mug and chocolates, finished with a ribbon.', details: ['Ready to gift', 'Card included'] },
  { id: 'g2', cat: 'gifts', sub: 'Personal accessories', name: 'Leather Bifold Wallet', price: 1100, colors: ['tan', 'black'], stock: { [OS]: 9 }, tone: 'sand', shot: 'wallet · open', desc: 'A slim bifold wallet in genuine leather with six card slots.', details: ['Genuine leather', '6 card slots', 'Gift boxed'] },
  { id: 'g3', cat: 'gifts', sub: 'Gift wrapping & cards', name: 'Gift Wrap & Greeting Card', price: 150, stock: { [OS]: 60 }, tone: 'butter', shot: 'wrap · ribbon', desc: 'Have any item gift-wrapped with a handwritten greeting card.', details: ['Add your message in delivery instructions'] },
  { id: 'g4', cat: 'gifts', sub: 'Anniversary & occasions', name: 'Anniversary Keepsake Box', price: 2200, stock: { [OS]: 4 }, tone: 'clay', season: ['wedding'], shot: 'keepsake box · closed', desc: 'A wooden keepsake box with a photo frame and two engraved key rings.', details: ['Wooden box', 'Engraving on request'] },
  { id: 'b1', cat: 'bundles', sub: 'Family bundles', name: "Kids' Toy Gift Bundle", price: 1890, includes: ['t2', 't3', 'g3'], stock: { [OS]: 5 }, tone: 'sky', shot: 'bundle · arranged', desc: 'Building blocks and a map jigsaw, gift-wrapped with a greeting card.', details: ['3 items', 'Gift-wrapped'] },
  { id: 'b2', cat: 'bundles', sub: 'Family bundles', name: 'Wedding Season Family Set', price: 5290, includes: ['w4', 'm2', 'k2'], stock: { [SIZE_SETS[0]]: 2, [SIZE_SETS[1]]: 1, [SIZE_SETS[2]]: 0 }, tone: 'clay', season: ['wedding'], shot: 'bundle · arranged', desc: 'Coordinated occasion outfits for a family of three.', details: ['3 items', 'Choose a size set'] },
  { id: 'b3', cat: 'bundles', sub: 'Family bundles', name: 'Winter Clothing Bundle', price: 3390, includes: ['m3', 'k4', 'w5'], stock: { [SIZE_SETS[0]]: 2, [SIZE_SETS[1]]: 2, [SIZE_SETS[2]]: 1 }, tone: 'sage', season: ['winter'], shot: 'bundle · arranged', desc: 'A hoodie for him, a zip hoodie for the kids and a woollen shawl.', details: ['3 items', 'Choose a size set'] },
];

export const PRODUCTS: Product[] = RAW.map((p, i) => ({
  ...p,
  colors: p.colors ?? [],
  season: p.season ?? [],
  img: IMG(KW[p.id], 600, 750),
  order: i,
}));

// Bundle "was" = sum of included items, per the business rules
for (const p of PRODUCTS) {
  if (p.includes) {
    p.was = p.includes.reduce((a, id) => a + (PRODUCTS.find((x) => x.id === id)?.price ?? 0), 0);
  }
}

const CAT_KW: Record<string, string> = {
  men: '1594938298603-c8148c4dae35',
  women: '1610030469983-98e550d6193c',
  kids: '1518831959646-742c3a14ebf7',
  toys: '1587654780291-39c9404d746b',
  gifts: '1549465220-1a8b9238cd48',
  seasonal: '1601924994987-69e26d50dc26',
};

export const CATEGORIES: Category[] = [
  { key: 'men', title: "Men's Clothing", crumb: 'Men', blurb: 'Polos, shirts, hoodies and jackets for every day.', tone: 'sky' },
  { key: 'women', title: "Women's Clothing", crumb: 'Women', blurb: 'Three-piece sets, kurtis and accessories for everyday and occasions.', tone: 'blush' },
  { key: 'kids', title: "Kids' Clothing", crumb: 'Kids', blurb: 'Comfortable clothing for babies, boys and girls, sized by age.', tone: 'butter' },
  { key: 'toys', title: 'Toys & Play', crumb: 'Toys', blurb: 'Educational, creative and outdoor toys, labelled by age.', tone: 'sage' },
  { key: 'gifts', title: 'Gifts & Accessories', crumb: 'Gifts', blurb: 'Gift boxes, accessories and wrapping for birthdays and special days.', tone: 'clay' },
  { key: 'seasonal', title: 'Seasonal Collections', crumb: 'Seasonal', blurb: 'Collections for the season and the celebrations ahead.', tone: 'sand' },
  { key: 'bundles', title: 'Family Bundles', crumb: 'Bundles', blurb: 'Curated sets priced below buying each item separately.', tone: 'mist' },
].map((c) => ({
  ...(c as Category),
  img: CAT_KW[c.key] ? IMG(CAT_KW[c.key], 500, 500) : undefined,
  count: PRODUCTS.filter((p) =>
    c.key === 'seasonal' ? (p.season ?? []).length > 0 : p.cat === c.key,
  ).length,
}));

export const SUBCATEGORIES: Record<string, string[]> = {
  men: ['T-shirts & polos', 'Shirts & trousers', 'Hoodies & sweatshirts', 'Jackets & seasonal', 'Socks & accessories'],
  women: ['Three-piece & salwar kameez', 'Casual & everyday', 'Fashion accessories', 'Occasion collections'],
  kids: ['Boys', 'Girls', 'Baby essentials', 'Hoodies & trousers'],
  toys: ['Educational toys', 'Creative & activity', 'Building blocks & puzzles', 'Outdoor play'],
  gifts: ['Birthday gifts', 'Anniversary & occasions', 'Personal accessories', 'Gift wrapping & cards'],
  seasonal: ['winter', 'wedding'],
};

export const CAMPAIGNS: Campaign[] = [
  { key: 'winter', title: 'Winter 2026', when: 'November – February', line: 'Hoodies, jackets and shawls for cooler evenings.', tone: 'sage', img: IMG('1558769132-cb1aea458c5e', 700, 700), active: true },
  { key: 'wedding', title: 'Wedding season', when: 'Now on', line: 'Occasion wear, family sets and keepsake gifts for the celebrations ahead.', tone: 'clay', img: IMG('1617627143750-d86bc21e42bb', 700, 700), active: true },
];

export const ZONES: DeliveryZone[] = [
  { key: 'dhaka', label: 'Dhaka City', hint: 'All city corporation areas', fee: 60, eta: '1–2 days' },
  { key: 'sub', label: 'Dhaka suburbs', hint: 'Savar, Gazipur, Narayanganj, Keraniganj', fee: 100, eta: '2–3 days' },
  { key: 'out', label: 'Other districts', hint: 'Nationwide delivery coming soon', disabled: true },
];

export const COUPONS: Coupon[] = [
  { code: 'WINTER10', type: 'pct', value: 10, min: 2000, max: 500, label: '10% off orders over ৳2,000, up to ৳500', until: '31 Jan 2027', active: true },
  { code: 'FAMILY200', type: 'fixed', value: 200, min: 3000, label: '৳200 off orders over ৳3,000', until: '31 Dec 2026', active: true },
];

/** Curated staff picks (switch to real bestsellers once sales history exists — never fake rankings). */
export const CURATED: string[] = ['w1', 'm3', 'k2', 't2'];

export const catKeyOf = (key: string): CategoryKey | undefined =>
  (['men', 'women', 'kids', 'toys', 'gifts', 'seasonal', 'bundles'] as CategoryKey[]).find((k) => k === key);

export const totalStock = (p: Product): number =>
  Object.values(p.stock).reduce((a, n) => a + n, 0);

export const skuOf = (p: Product, color: string | undefined, size: string): string =>
  `AZM-${p.id.toUpperCase()}-${(color ?? 'STD').slice(0, 3).toUpperCase()}-${size.replace(/[^A-Za-z0-9]+/g, '').toUpperCase() || 'OS'}`;
