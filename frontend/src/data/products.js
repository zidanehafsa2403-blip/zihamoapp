export const COMPANY = {
  name: "ZIHAMO",
  tagline: "Creating Connections Through Custom Merchandise",
  about: "Corporate Merchandise, Gifts, Giveaways & more",
  phone: "+91 97264 71223",
  email: "sales@zihamo.com",
  website: "www.zihamo.com",
  address:
    "Shop 28, Mona Shopping Centre, JP Road, Dadabhai Rd, Near Navrang Cinema, Andheri (West), Mumbai - 400058",
  logo: "/zihamo-logo.png",
};

const skuImage = (note) => {
  const sku = note.split("·").pop().trim();
  return { sku, image: `/products/${sku.toLowerCase()}.jpg` };
};

export const CATEGORIES = [
  { id: "stationery", index: "01", name: "Stationery", tagline: "Diaries & luxury pens", image: "/products/diry-001.jpg" },
  { id: "drinkware", index: "02", name: "Drinkware", tagline: "Mugs, bottles & flasks", image: "/products/tumb173.jpg" },
  { id: "audio", index: "03", name: "Audio", tagline: "Speakers & earwear", image: "/products/bth001.jpg" },
  { id: "tech", index: "04", name: "Tech Accessories", tagline: "Power & charging", image: "/products/tech020.jpg" },
  { id: "desk", index: "05", name: "Desk Accessories", tagline: "Clocks, lamps & holders", image: "/products/lmp-005.jpg" },
  { id: "wellness", index: "06", name: "Wellness & Fitness", tagline: "Recover & move", image: "/products/wef-001.jpg" },
  { id: "bags", index: "07", name: "Bags & Luggage", tagline: "Carry in style", image: "/products/bags017.jpg" },
  { id: "apparel", index: "08", name: "Apparel", tagline: "Branded to wear", image: "/products/app215.jpg" },
  { id: "trophies", index: "09", name: "Trophies & Awards", tagline: "Recognise the best", image: "/products/trop-007.jpg" },
  { id: "hampers", index: "10", name: "Gift Hampers", tagline: "Curated & gourmet", image: "/products/kit-h3.jpg" },
];

const RAW = {
  stationery: [
    ["Premium Notebook — Belt", "PU leather, magnetic belt · DIRY-001"],
    ["Premium Notebook — Fusion", "Hard-bound, ribbon marker · DIRY-003"],
    ["Refillable Travel Journal", "Full-grain leather cover · DIRY-005"],
    ["Handmade Paper Notebook", "Eco cotton pages · DIRY-011"],
    ["Parker Pen", "Iconic roller / ball · PEN105"],
    ["Cross Pen", "Lifetime-warranty metal · PEN106"],
    ["Mont Blanc Pen", "Precision German nib · PEN102"],
    ["Lamy Pen", "Bauhaus design · PEN107"],
    ["Waterman Pen", "French fine writing · PEN103"],
    ["Amazon Pay Gift Card", "In branded holder · GC-02"],
  ],
  drinkware: [
    ["Electric Coffee Mug & Warmer", "350ml · engrave / print · TUMB173"],
    ["Ceramic Mug, Cork Base", "300ml · print · TUMB174"],
    ["Cork Mug", "330ml · print · TUMB175"],
    ["Glass Tumbler with Sleeve", "450ml · print · TUMB176"],
    ["Bamboo Mug", "350ml · print · TUMB161"],
    ["Self-Stirring Mug", "380ml · print · TUMB167"],
    ["Hot & Cold Display Flask", "500ml · engrave / print · BOT101"],
    ["Copper Bottle", "1000ml · engrave / print · BOT106"],
    ["2-in-1 Hot & Cold Flask", "500/300ml · print · BOT117"],
    ["Vacuum Flask, Carry Handle", "500ml · engrave / print · BOT137"],
    ["Tritan Sports Bottle", "945ml · engrave / print · BOT109"],
  ],
  audio: [
    ["BOAT Headphones", "Over-ear · logo print · BTH001"],
    ["Urban Gear Headphones", "Wireless · logo print · BTH002"],
    ["Noise Buds", "TWS earbuds · BTH005"],
    ["Portronics TWS Earbuds", "Studio-tuned · BTH009"],
    ["BOAT TWS Earphones", "Fast pair · BTH011"],
    ["Bluetooth Speaker", "Portable · engrave / print · BTS009"],
    ["JBL Speaker", "Deep bass · BTS012"],
    ["Bose Speaker", "Premium sound · BTS015"],
    ["Marshall Speaker", "Signature style · BTS016"],
    ["Carvaan", "Retro music player · BTS020"],
    ["Sound Bar", "Desk / home · BTS008"],
  ],
  tech: [
    ["Power Bank", "Fast-charge · engrave / print · TECH013"],
    ["Power Bank + Wireless", "Qi charging · TECH015"],
    ["3-in-1 Wireless Charger", "Phone · watch · buds · TECH020"],
    ["Boat Wireless Charger", "15W pad · TECH016"],
    ["Smartwatch", "Fitness & notifications · TECH001"],
    ["USB Hub", "Multi-port · TECH010"],
    ["Mouse Pad with USB Hub", "Desk essential · TECH011"],
    ["2-in-1 Fast Charging Plug", "Dual output · TECH012"],
    ["Multi-Connect USB Cable", "3-in-1 · TECH006"],
    ["Key Finder", "Bluetooth tracker · TECH008"],
  ],
  desk: [
    ["See-through Table Clock", "Print · DA001"],
    ["Flip Display Clock", "Touch light & snooze · DA002"],
    ["Sleek Table Clock", "Minimal · DA005"],
    ["Pen Holder with Calendar", "Desk organiser · DA006"],
    ["Pen Holder with USB Hub", "Charge & store · DA009"],
    ["Wooden Pen & Mobile Holder", "Solid wood · DA023"],
    ["Crystal Lamp", "Ambient glow · LMP-012"],
    ["Metal Desk Lamp", "Adjustable · LMP-005"],
    ["Touch Table Lamp", "Dimmable · LMP-006"],
    ["Cube Calendar + Clock", "Pen holder combo · DA015"],
  ],
  wellness: [
    ["Eye Massager", "Relaxation · logo print · WEF-001"],
    ["Back Massager", "Deep tissue · WEF-002"],
    ["Neck Pillow Massager", "On-the-go · WEF-003"],
    ["Cork Yoga Brick", "Natural cork · WEF-004"],
    ["Yoga Mat", "Non-slip · WEF-005"],
    ["Resistance Band", "Training · WEF-011"],
    ["Protein Shaker", "Leak-proof · WEF-012"],
    ["Smart Fitness Watch", "Heart-rate & steps · WEF-007"],
    ["Premium Neck Pillow", "Memory foam · TRVL-007"],
    ["Neck Pillow + Eye Mask", "Travel set · TRVL-012"],
  ],
  bags: [
    ["Kenneth Cole Laptop Bag", "Premium · logo print · BAGS017"],
    ["Steve Madden Laptop Bag", "Designer · BAGS001"],
    ["Anti-theft Laptop Bag", "Hidden zips · BAGS016"],
    ["Felt Laptop Sleeve", "Slim · BAGS014"],
    ["Cork Laptop Bag", "Eco material · BAGS005"],
    ["Backpack with USB Charger", "Smart travel · BAGS006"],
    ["Cross Backpack", "Everyday carry · BAGS018"],
    ["Duffle Bag", "Weekend · BAGS019"],
    ["Luggage Trolley Bag", "Cabin size · BAGS007"],
    ["Jute Bag", "Sustainable · BAGS010"],
  ],
  apparel: [
    ["Round Neck T-shirt", "Combed cotton · print · APP207"],
    ["Polo T-shirt with Tipping", "Pique knit · APP208"],
    ["Formal Shirt", "Corporate · APP211"],
    ["Hoodie with Zip", "Fleece-lined · APP209"],
    ["Bomber Jacket", "All-season · APP215"],
    ["Puffer Jacket", "Insulated · APP216"],
    ["Dry-fit Jacket", "Moisture-wicking · APP217"],
    ["Cap — 6 Panel", "Structured · APP214"],
    ["Reversible Umbrella", "Compact · APP225"],
    ["Windcheater", "Water-resistant · APP230"],
  ],
  trophies: [
    ["Metal Trophy", "Print / deboss · TROP-001"],
    ["Glass Trophy", "Engrave / print · TROP-004"],
    ["Crystal Skyline Award", "3D etched · TROP-006"],
    ["Design Trophy", "Contemporary · TROP-007"],
    ["Wooden Trophy", "Sustainable · TROP-008"],
    ["Shield Trophy", "Classic · TROP-010"],
    ["Wood & Metal Trophy", "Hybrid finish · TROP-011"],
  ],
  hampers: [
    ["Happy Hamper — Signature", "Curated gourmet basket · KIT-H1"],
    ["Coffee Hamper", "Beans, mug & treats · KIT180"],
    ["Gourmet Gift Box", "Chocolates & snacks · KIT-H2"],
    ["Festive Hamper", "Seasonal selection · KIT-H3"],
    ["Eco-Friendly Gift Set", "Notebook, pen & tumbler · ECO-04"],
    ["Employee Joining Kit", "Onboarding essentials · KIT181"],
    ["Wine Tumbler Bottle Set", "Insulated set · KIT179"],
  ],
};

export const PRODUCTS = Object.entries(RAW).flatMap(([cat, items]) =>
  items.map(([name, note], i) => {
    const { sku, image } = skuImage(note);
    return { id: `${cat}-${i + 1}`, category: cat, name, note, sku, image };
  })
);

export const HERO_IMAGE =
  "https://static.prod-images.emergentagent.com/jobs/0cb79887-5bf6-4c0a-8ac9-9f69f6f27c92/images/104e9089f05c2ad0b1a3fc5ed4fde1d6fc11cb1be5f24aa5c9e50eff3bb6e2b6.jpeg";
