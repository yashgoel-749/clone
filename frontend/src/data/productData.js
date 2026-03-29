// Centralized product data catalog
// Every homepage card/link ID maps to a product here.
// The product detail page imports this and renders any product generically.

const PRODUCTS = {
  // ========================
  //  KEYBOARDS & PERIPHERALS
  // ========================
  "keyboard-acc-1": {
    id: "keyboard-acc-1",
    title: "AmazonBasics Ergonomic Keyboard Wrist Rest Pad – Memory Foam, Black",
    brand: "AmazonBasics",
    category: "Computers & Accessories",
    subCategory: "Keyboard Accessories",
    price: 499,
    mrp: 999,
    discount: "50",
    rating: 4.3,
    ratingCount: "2,847",
    images: [
      "/image/81cnrbuek7l._ac_sy200_.jpg",
      "/image/81cnrbuek7l._ac_sy175_.jpg",
      "/image/81cnrbuek7l._ac_sy55_.jpg",
    ],
    description: "Ergonomic wrist rest pad designed to reduce strain during long typing sessions.",
    features: [
      "High-density memory foam conforms to wrists for personalized support",
      "Smooth fabric cover resists wear and is easy to clean",
      "Non-slip rubber base keeps rest pad firmly in place",
      "Works with any standard or compact keyboard",
      "Dimensions: 44.5 x 7.6 x 2.5 cm"
    ],
    specs: {
      "Brand": "AmazonBasics",
      "Material": "Memory Foam",
      "Color": "Black",
      "Dimensions": "44.5 x 7.6 x 2.5 cm",
      "Weight": "180 g",
      "Compatible Devices": "All Keyboards"
    },
    offers: [
      { title: "Bank Offer", text: "10% Instant Discount up to ₹500 on HDFC Bank Credit Card Transactions", link: "5 offers" },
      { title: "No Cost EMI", text: "Avail No Cost EMI on select cards for orders above ₹3000", link: "1 offer" }
    ],
    deliveryDate: "Monday, 31 March",
    seller: "Appario Retail Pvt Ltd",
    warranty: "1 Year Manufacturer Warranty"
  },

  "mouse-pad-1": {
    id: "mouse-pad-1",
    title: "Ant Esports MP290 Gaming Mouse Pad – Large Extended, Stitched Edges, Waterproof – Black",
    brand: "Ant Esports",
    category: "Computers & Accessories",
    subCategory: "Mouse Pads",
    price: 199,
    mrp: 499,
    discount: "60",
    rating: 4.1,
    ratingCount: "14,562",
    images: [
      "/image/511nzqxi0sl._ac_sy200_.jpg",
      "/image/511nzqxi0sl._ac_sy145_.jpg",
      "/image/511nzqxi0sl._ac_sy55_.jpg",
    ],
    description: "Large extended gaming mouse pad with smooth surface and anti-slip rubber base.",
    features: [
      "Ultra-smooth surface optimized for both optical and laser sensors",
      "Stitched edges prevent fraying and ensure long-term durability",
      "Natural rubber non-slip base for secure grip on any desktop surface",
      "Waterproof coating — easy to clean with damp cloth",
      "Size: 700 x 300 x 3 mm — fits keyboard and mouse comfortably"
    ],
    specs: {
      "Brand": "Ant Esports",
      "Material": "Micro-weave Cloth + Natural Rubber",
      "Color": "Black",
      "Dimensions": "700 x 300 x 3 mm",
      "Weight": "350 g",
      "Surface": "Speed & Control"
    },
    offers: [
      { title: "Bank Offer", text: "Flat ₹50 instant discount on first Amazon Pay UPI transaction", link: "1 offer" }
    ],
    deliveryDate: "Sunday, 30 March",
    seller: "ANT E-SPORTS PRIVATE LIMITED",
    warranty: "6 Months Warranty"
  },

  "mech-kb-1": {
    id: "mech-kb-1",
    title: "Ant Esports MK1300 V2 60% Wired Mechanical Gaming Keyboard, 61 Keys, RGB Backlit, Hot-Swappable Red Switches, Detachable USB-C – Black",
    brand: "Ant Esports",
    category: "Computers & Accessories",
    subCategory: "Keyboards",
    price: 2499,
    mrp: 4999,
    discount: "50",
    rating: 4.0,
    ratingCount: "3,241",
    images: [
      "/image/71ewwwqoiql._ac_sy200_.jpg",
      "/image/71ewwwqoiql._ac_sy175_.jpg",
      "/image/71ewwwqoiql._ac_sy55_.jpg",
    ],
    description: "60% compact mechanical gaming keyboard with hot-swappable red switches and RGB backlighting.",
    features: [
      "61-key compact 60% layout — saves desk space while retaining essential keys",
      "Hot-Swappable Red Linear Switches — customize your typing feel without soldering",
      "Per-key RGB backlighting with multiple preset lighting modes and effects",
      "Detachable USB Type-C cable for easy portability",
      "Anti-Ghosting & N-Key Rollover for precise in-game inputs",
      "Durable ABS double-shot keycaps with translucent legends"
    ],
    specs: {
      "Brand": "Ant Esports",
      "Model": "MK1300 V2",
      "Switch Type": "Outemu Red (Linear)",
      "Layout": "60% (61 Keys)",
      "Connectivity": "Wired USB-C",
      "Backlighting": "RGB",
      "Anti-Ghosting": "Yes (N-Key Rollover)",
      "Keycaps": "ABS Double Shot",
      "Cable": "Detachable, Type-C",
      "Dimensions": "29 x 10 x 4 cm",
      "Weight": "550 g"
    },
    offers: [
      { title: "No Cost EMI", text: "Upto ₹209 EMI interest savings on Amazon Pay ICICI card", link: "3 offers" },
      { title: "Cashback", text: "Upto ₹75 cashback as Amazon Pay Balance", link: "1 offer" },
      { title: "Bank Offer", text: "10% Instant Discount up to ₹1,250 on HDFC Bank Credit cards", link: "12 offers" }
    ],
    deliveryDate: "Monday, 31 March",
    seller: "ANT E-SPORTS PRIVATE LIMITED",
    warranty: "1 Year Manufacturer Warranty"
  },

  "wrist-rest-1": {
    id: "wrist-rest-1",
    title: "Kensington ErgoSoft Wrist Rest for Mechanical & Gaming Keyboards – Black",
    brand: "Kensington",
    category: "Computers & Accessories",
    subCategory: "Keyboard Accessories",
    price: 799,
    mrp: 1499,
    discount: "47",
    rating: 4.4,
    ratingCount: "1,103",
    images: [
      "/image/41yffsrplzl._ac_sy200_.jpg",
      "/image/41yffsrplzl._ac_sy55_.jpg",
    ],
    description: "Premium wrist rest designed specifically for mechanical and gaming keyboards.",
    features: [
      "Gel-infused memory foam for ergonomic wrist support",
      "Faux-leather cover — premium look with easy-to-clean surface",
      "Optimized height for mechanical & gaming keyboards",
      "Non-skid rubber base keeps it stable during intense gaming",
      "Compact design fits TKL and 60% keyboards"
    ],
    specs: {
      "Brand": "Kensington",
      "Material": "Gel-infused Memory Foam",
      "Cover": "Faux Leather",
      "Color": "Black",
      "Weight": "220 g"
    },
    offers: [
      { title: "Bank Offer", text: "10% instant discount on SBI credit card", link: "3 offers" }
    ],
    deliveryDate: "Tuesday, 1 April",
    seller: "RetailEZ Pvt Ltd",
    warranty: "1 Year Manufacturer Warranty"
  },

  // ========================
  //  FASHION & CLOTHING
  // ========================
  "tshirt-1": {
    id: "tshirt-1",
    title: "Amazon Brand - Solimo 100% Cotton Oversized T-Shirt Unisex Drop Shoulder Dye Washed Street Look – Black (Pack of 1)",
    brand: "Solimo",
    category: "Men's Fashion",
    subCategory: "T-Shirts",
    price: 349,
    mrp: 999,
    discount: "65",
    rating: 4.2,
    ratingCount: "1,240",
    images: [
      "/image/61dpajs_afl._ac_sy200_.jpg",
    ],
    description: "Premium cotton oversized t-shirt for ultimate comfort and street style.",
    features: [
      "100% premium cotton for breathability and comfort",
      "Oversized relaxed fit with drop shoulder design",
      "Dye-washed finish for unique vintage street style",
      "Ribbed crew neck retains shape after multiple washes",
      "Machine washable – turn inside out for best results"
    ],
    specs: {
      "Brand": "Solimo",
      "Fabric": "100% Cotton",
      "Fit": "Oversized",
      "Style": "Drop Shoulder",
      "Pattern": "Dye Washed",
      "Pack Size": "1",
      "Care Instructions": "Machine Wash Cold"
    },
    offers: [
      { title: "No Cost EMI", text: "Avail No Cost EMI on select cards…", link: "1 offer" },
      { title: "Bank Offer", text: "Flat ₹50 instant discount on…", link: "5 offers" }
    ],
    deliveryDate: "Sunday, 30 March",
    seller: "Appario Retail Pvt Ltd",
    warranty: "No Warranty"
  },

  "tees-1": {
    id: "tees-1",
    title: "Dennis Lingo Men's Solid Cotton Full Sleeve Crew Neck T-Shirt – Olive Green",
    brand: "Dennis Lingo",
    category: "Men's Fashion",
    subCategory: "Full Sleeve T-Shirts",
    price: 449,
    mrp: 1299,
    discount: "65",
    rating: 4.0,
    ratingCount: "8,562",
    images: [
      "/image/61edij1btcl._ac_sy200_.jpg",
    ],
    description: "Comfortable cotton full-sleeve crew neck tee perfect for casual and layered outfits.",
    features: [
      "Pure cotton fabric for all-day breathability",
      "Full sleeves with ribbed cuffs",
      "Classic crew neck design",
      "Solid color — easy to pair with jeans, joggers, or chinos",
      "Pre-shrunk for consistent sizing"
    ],
    specs: { "Brand": "Dennis Lingo", "Fabric": "Cotton", "Sleeve": "Full Sleeve", "Neck": "Crew Neck", "Fit": "Regular", "Color": "Olive Green" },
    offers: [{ title: "Bank Offer", text: "10% off on ICICI Bank credit card", link: "3 offers" }],
    deliveryDate: "Monday, 31 March",
    seller: "Dennis Lingo Official",
    warranty: "No Warranty"
  },

  "waffle-1": {
    id: "waffle-1",
    title: "TRIPR Men's Waffle Knit Polo T-Shirt – Beige, Regular Fit",
    brand: "TRIPR",
    category: "Men's Fashion",
    subCategory: "Polo T-Shirts",
    price: 399,
    mrp: 1199,
    discount: "67",
    rating: 3.9,
    ratingCount: "4,221",
    images: [
      "/image/61eksarcwml._ac_sy200_.jpg",
    ],
    description: "Textured waffle-knit polo for a smart-casual everyday look.",
    features: [
      "Unique waffle-knit texture for a premium tactile feel",
      "Classic polo collar with 3-button placket",
      "Regular fit — true to size with comfortable room",
      "Ribbed sleeve bands and hem",
      "Fabric: Cotton-Polyester blend for shape retention"
    ],
    specs: { "Brand": "TRIPR", "Fabric": "Cotton-Polyester Blend", "Fit": "Regular", "Color": "Beige", "Pattern": "Waffle Knit" },
    offers: [{ title: "Bank Offer", text: "Flat ₹50 off on first UPI transaction on Amazon", link: "1 offer" }],
    deliveryDate: "Monday, 31 March",
    seller: "TRIPR Official",
    warranty: "No Warranty"
  },

  "zip-tee-1": {
    id: "zip-tee-1",
    title: "LEWEL Men's Zip Neck Half Sleeve T-Shirt – Navy Blue",
    brand: "LEWEL",
    category: "Men's Fashion",
    subCategory: "Zip Neck T-Shirts",
    price: 329,
    mrp: 899,
    discount: "63",
    rating: 4.1,
    ratingCount: "6,712",
    images: [
      "/image/61pt8xmtiol._ac_sy200_.jpg",
    ],
    description: "Stylish zip-neck t-shirt with half sleeves — versatile for casual or athleisure wear.",
    features: [
      "Trendy zip-neck closure for adjustable collar style",
      "Half sleeves, regular fit",
      "Soft cotton-blend fabric",
      "Suitable for casual, sports, and daily wear",
      "Machine washable"
    ],
    specs: { "Brand": "LEWEL", "Fabric": "Cotton Blend", "Sleeve": "Half Sleeve", "Neck": "Zip Neck", "Color": "Navy Blue" },
    offers: [{ title: "Bank Offer", text: "5% cashback on Amazon Pay ICICI card", link: "1 offer" }],
    deliveryDate: "Tuesday, 1 April",
    seller: "LEWEL Fashion",
    warranty: "No Warranty"
  },

  // ========================
  //  APPLIANCES
  // ========================
  "ac-1": {
    id: "ac-1",
    title: "Voltas 1.5 Ton 3 Star Split Inverter AC – White (185V ADZq)",
    brand: "Voltas",
    category: "Appliances",
    subCategory: "Air Conditioners",
    price: 34990,
    mrp: 59990,
    discount: "42",
    rating: 4.2,
    ratingCount: "12,541",
    images: [
      "/image/appliances_qc_pc_186x116__b07g5j5fyp._sy116_cb667322346_.jpg",
    ],
    description: "Energy-efficient 1.5 Ton inverter split AC with turbo cooling and copper condenser.",
    features: [
      "1.5 Ton capacity — ideal for rooms up to 180 sq. ft.",
      "3 Star BEE Rating for energy efficiency (2024)",
      "Inverter compressor for variable speed, power saving & silent operation",
      "100% Copper condenser coil for better cooling and durability",
      "Turbo Mode for rapid cooling within minutes",
      "Anti-Dust Filter + PM 2.5 air purification"
    ],
    specs: { "Brand": "Voltas", "Capacity": "1.5 Ton", "Star Rating": "3 Star", "Type": "Split Inverter", "Refrigerant": "R-32", "Condenser": "Copper" },
    offers: [
      { title: "No Cost EMI", text: "No Cost EMI starts at ₹2,916/month", link: "6 offers" },
      { title: "Bank Offer", text: "₹2,000 off with HDFC Bank Credit Card", link: "10 offers" },
      { title: "Exchange Offer", text: "Up to ₹5,000 off on exchange of old AC", link: "1 offer" }
    ],
    deliveryDate: "Wednesday, 2 April",
    seller: "Voltas Limited",
    warranty: "1 Year Comprehensive + 5 Years Compressor Warranty"
  },

  "fridge-1": {
    id: "fridge-1",
    title: "Samsung 253L 3 Star Inverter Frost Free Double Door Refrigerator – Elegant Inox (RT28T3453S8/HL)",
    brand: "Samsung",
    category: "Appliances",
    subCategory: "Refrigerators",
    price: 24990,
    mrp: 38490,
    discount: "35",
    rating: 4.3,
    ratingCount: "18,723",
    images: [
      "/image/appliances_qc_pc_186x116__b08345r1zw._sy116_cb667322346_.jpg",
    ],
    description: "Samsung 253L Frost Free Double Door Refrigerator with Digital Inverter Technology.",
    features: [
      "253L capacity — suitable for 2-3 member families",
      "Digital Inverter Compressor for energy efficiency & silent operation",
      "Frost Free with all-around cooling",
      "Convertible 3-in-1 mode — use freezer as fridge for extra space",
      "Stabilizer-free operation (100V-300V)",
      "Toughened glass shelves"
    ],
    specs: { "Brand": "Samsung", "Capacity": "253 Litres", "Type": "Frost Free Double Door", "Star Rating": "3 Star", "Color": "Elegant Inox", "Compressor": "Digital Inverter" },
    offers: [
      { title: "No Cost EMI", text: "EMI starts at ₹1,166/month", link: "8 offers" },
      { title: "Exchange Offer", text: "Up to ₹8,000 off on exchange", link: "1 offer" }
    ],
    deliveryDate: "Thursday, 3 April",
    seller: "Samsung India Electronics",
    warranty: "1 Year Comprehensive + 20 Years Digital Inverter"
  },

  "micro-1": {
    id: "micro-1",
    title: "LG 28L Convection Microwave Oven – Black (MC2846BV)",
    brand: "LG",
    category: "Appliances",
    subCategory: "Microwaves",
    price: 14490,
    mrp: 21990,
    discount: "34",
    rating: 4.4,
    ratingCount: "9,882",
    images: [
      "/image/appliances_qc_pc_186x116__b08rdl6h79._sy116_cb667322346_.jpg",
    ],
    description: "LG 28L Convection Microwave with 301 Auto Cook menus and stainless steel cavity.",
    features: [
      "28L capacity — suitable for 4-6 member families",
      "Convection — bake, grill, reheat, defrost & cook",
      "301 Auto Cook menus including Indian recipes",
      "Stainless Steel Cavity — anti-bacterial, easy to clean, durable",
      "Diet Fry feature — healthier frying with minimal oil",
      "Child Lock & Multi-stage Cooking"
    ],
    specs: { "Brand": "LG", "Capacity": "28 L", "Type": "Convection", "Control": "Touch Key Pad", "Cavity": "Stainless Steel", "Power": "900 W" },
    offers: [
      { title: "No Cost EMI", text: "EMI starts at ₹1,208/month", link: "5 offers" },
      { title: "Bank Offer", text: "₹1,000 off on ICICI cards", link: "4 offers" }
    ],
    deliveryDate: "Tuesday, 1 April",
    seller: "LG Brand Store",
    warranty: "1 Year Comprehensive + 4 Years Magnetron"
  },

  "wm-1": {
    id: "wm-1",
    title: "IFB 6.5 Kg 5 Star Fully-Automatic Front Loading Washing Machine – Silver (Diva Aqua SXS 6510)",
    brand: "IFB",
    category: "Appliances",
    subCategory: "Washing Machines",
    price: 29990,
    mrp: 40990,
    discount: "27",
    rating: 4.3,
    ratingCount: "7,523",
    images: [
      "/image/186x116___wm._sy116_cb667322346_.jpg",
    ],
    description: "IFB 6.5 Kg Front Load with Aqua Energie device, In-built Heater and 2D Wash System.",
    features: [
      "6.5 Kg capacity — ideal for 3-4 member families",
      "5 Star energy rating for maximum savings",
      "In-built Heater for hot wash cycles",
      "Aqua Energie device softens hard water for superior cleaning",
      "2D Wash System — gentle yet powerful cleaning",
      "Ball Valve Technology — prevents lint build-up"
    ],
    specs: { "Brand": "IFB", "Capacity": "6.5 Kg", "Type": "Front Load Fully Automatic", "Star Rating": "5 Star", "RPM": "1000", "Color": "Silver" },
    offers: [
      { title: "No Cost EMI", text: "EMI starts at ₹1,666/month", link: "6 offers" },
      { title: "Exchange Offer", text: "Up to ₹4,500 off on exchange", link: "1 offer" }
    ],
    deliveryDate: "Thursday, 3 April",
    seller: "IFB Industries",
    warranty: "4 Years Comprehensive Warranty"
  },

  // ========================
  //  HOME DECOR & FURNITURE
  // ========================
  "shoe-rack-1": {
    id: "shoe-rack-1",
    title: "Nilkamal Churchill 2 Door Engineered Wood Shoe Cabinet | 6-Shelf, Upto 12 Pairs (Classic Walnut)",
    brand: "Nilkamal",
    category: "Home & Kitchen",
    subCategory: "Shoe Organization",
    price: 5490,
    mrp: 8500,
    discount: "35",
    rating: 3.7,
    ratingCount: "49",
    images: [
      "/image/186x116_home_storage_1._sy116_cb555624324_.jpg",
    ],
    description: "Engineered wood shoe cabinet with classic walnut finish, 6 shelves for up to 12 pairs.",
    features: [
      "Engineered wood construction with a classic walnut finish",
      "6 shelves — stores up to 12 pairs of shoes neatly",
      "2-door design with elegant handles for a clean look",
      "Compact footprint fits entryways, bedrooms, and hallways",
      "Easy DIY assembly with included hardware and manual",
      "Ventilation holes prevent odor buildup"
    ],
    specs: { "Brand": "Nilkamal", "Material": "Engineered Wood", "Color": "Classic Walnut", "Capacity": "Up to 12 Pairs", "Dimensions": "60 x 30 x 115 cm", "Mounting": "Floor Mount" },
    offers: [
      { title: "No Cost EMI", text: "EMI starts at ₹551/month", link: "3 offers" },
      { title: "Cashback", text: "Upto ₹164 cashback as Amazon Pay Balance", link: "1 offer" },
      { title: "Bank Offer", text: "Up to ₹1,000 discount on select cards", link: "33 offers" }
    ],
    deliveryDate: "Friday, 4 April",
    seller: "Nilkamal Limited",
    warranty: "1 Year Manufacturer Warranty"
  },

  "cushion-1": {
    id: "cushion-1",
    title: "Amazon Brand - Solimo Microfibre Cushion Covers, Set of 5 – 16x16 Inches – Turquoise Pattern",
    brand: "Solimo",
    category: "Home & Kitchen",
    subCategory: "Cushion Covers",
    price: 399,
    mrp: 799,
    discount: "50",
    rating: 4.1,
    ratingCount: "3,562",
    images: [
      "/image/186x116_home_decor_1._sy116_cb555624324_.jpg",
    ],
    description: "Set of 5 microfibre cushion covers in a vibrant turquoise pattern to elevate your living space.",
    features: [
      "Set of 5 cushion covers — value pack for sofa makeover",
      "Soft microfibre fabric with vibrant print",
      "Hidden zip closure for a clean, seamless finish",
      "Size: 16 x 16 inches (40 x 40 cm)",
      "Machine washable — colors stay bright after multiple washes"
    ],
    specs: { "Brand": "Solimo", "Material": "Microfibre", "Pack": "Set of 5", "Size": "16 x 16 inches", "Closure": "Zip", "Care": "Machine Washable" },
    offers: [{ title: "Bank Offer", text: "Flat ₹50 off on Amazon Pay UPI", link: "1 offer" }],
    deliveryDate: "Sunday, 30 March",
    seller: "Appario Retail",
    warranty: "No Warranty"
  },

  "vases-1": {
    id: "vases-1",
    title: "Tied Ribbons Ceramic Flower Vase for Home Décor – Set of 3 (White & Gold)",
    brand: "Tied Ribbons",
    category: "Home & Kitchen",
    subCategory: "Figurines & Vases",
    price: 749,
    mrp: 1499,
    discount: "50",
    rating: 4.0,
    ratingCount: "2,102",
    images: [
      "/image/186x116_home_furnishings_2._sy116_cb555624324_.jpg",
    ],
    description: "Elegant ceramic flower vases — set of 3 — in white with gold accents for modern décor.",
    features: [
      "Set of 3 vases in graduated sizes for attractive display",
      "Premium-quality ceramic with smooth glaze finish",
      "White & gold color scheme suits contemporary interiors",
      "Perfect for artificial or dried flowers",
      "Ideal gift for housewarming, Diwali, or birthdays"
    ],
    specs: { "Brand": "Tied Ribbons", "Material": "Ceramic", "Color": "White & Gold", "Pack": "3 Pieces", "Use": "Indoor Home Décor" },
    offers: [{ title: "Cashback", text: "₹50 cashback on Amazon Pay UPI", link: "1 offer" }],
    deliveryDate: "Monday, 31 March",
    seller: "Tied Ribbons Store",
    warranty: "No Warranty"
  },

  "lighting-1": {
    id: "lighting-1",
    title: "Philips Deco Mini Base B22 0.5-Watt LED Bulb (Pack of 6, Multicolour)",
    brand: "Philips",
    category: "Home & Kitchen",
    subCategory: "Lighting Solutions",
    price: 199,
    mrp: 400,
    discount: "50",
    rating: 4.3,
    ratingCount: "22,714",
    images: [
      "/image/186x116_home_lighting_2._sy116_cb555624324_.jpg",
    ],
    description: "Philips decorative mini LED bulbs — pack of 6 multicolour — for festive and ambient lighting.",
    features: [
      "Pack of 6 LED bulbs in vibrant colors (Red, Blue, Green, Yellow, White, Pink)",
      "Ultra low 0.5W power consumption — saves electricity",
      "B22 pin-type base fits standard Indian holders",
      "25,000-hour long life — no frequent replacements",
      "Shatterproof polycarbonate body"
    ],
    specs: { "Brand": "Philips", "Wattage": "0.5W each", "Base": "B22 (Pin Type)", "Pack": "6 Bulbs", "Colors": "Multicolour", "Life": "25,000 hrs" },
    offers: [{ title: "Bank Offer", text: "10% off on SBI Credit Card", link: "2 offers" }],
    deliveryDate: "Sunday, 30 March",
    seller: "Philips Lighting India",
    warranty: "2 Years Manufacturer Warranty"
  },

  // ========================
  //  BIKES / VEHICLES
  // ========================
  "harley-black": {
    id: "harley-black",
    title: "HARLEY-DAVIDSON X440 S – Matte Black, 440cc, ABS",
    brand: "Harley-Davidson",
    category: "Automotive",
    subCategory: "Motorcycles",
    price: 229500,
    mrp: 239500,
    discount: "4",
    rating: 4.5,
    ratingCount: "892",
    images: ["/image/619zwdlnnbl._ac_sy200_.jpg"],
    description: "The Harley-Davidson X440 S — a new chapter in accessible cruiser motorcycles, built in India.",
    features: [
      "440cc liquid-cooled single-cylinder engine",
      "6-speed gearbox with assist & slipper clutch",
      "Dual-channel ABS for confident braking",
      "LED headlamp, tail lamp and indicators",
      "Upside-down front forks with monoshock rear",
      "Digital instrument cluster"
    ],
    specs: { "Brand": "Harley-Davidson", "Engine": "440cc Single Cylinder", "Power": "27.4 bhp", "Torque": "38 Nm", "Transmission": "6-Speed", "Brakes": "Dual-channel ABS", "Weight": "196 kg" },
    offers: [
      { title: "No Cost EMI", text: "EMI starts at ₹6,500/month", link: "4 offers" }
    ],
    deliveryDate: "Booking – delivery in 4-6 weeks",
    seller: "Hero MotoCorp (HD Partner)",
    warranty: "3 Years / 36,000 km"
  },

  "ktm-rc200": {
    id: "ktm-rc200",
    title: "KTM RC 200 Bike – Black, 199.5cc, ABS",
    brand: "KTM",
    category: "Automotive",
    subCategory: "Motorcycles",
    price: 217272,
    mrp: 217272,
    discount: "0",
    rating: 4.4,
    ratingCount: "1,234",
    images: ["/image/61163l3zeyl._ac_sy200_.jpg"],
    description: "The KTM RC 200 — a lightweight supersport with aggressive styling and thrilling performance.",
    features: [
      "199.5cc single-cylinder liquid-cooled engine with fuel injection",
      "25.8 bhp and 19.5 Nm torque for exhilarating performance",
      "Trellis frame — lightweight and rigid chassis",
      "Full LED headlamp with DRL",
      "Ride-by-Wire throttle",
      "Supermoto ABS for safe braking"
    ],
    specs: { "Brand": "KTM", "Engine": "199.5cc", "Power": "25.8 bhp", "Torque": "19.5 Nm", "Transmission": "6-Speed", "Brakes": "ABS", "Kerb Weight": "154 kg" },
    offers: [],
    deliveryDate: "Booking at nearest KTM showroom",
    seller: "KTM India (Bajaj Auto)",
    warranty: "2 Years / 30,000 km"
  },

  "hero-xtreme": {
    id: "hero-xtreme",
    title: "Hero MotoCorp XTREME 125R – Sports Red, 124.7cc",
    brand: "Hero MotoCorp",
    category: "Automotive",
    subCategory: "Motorcycles",
    price: 95000,
    mrp: 95000,
    discount: "0",
    rating: 4.1,
    ratingCount: "3,102",
    images: ["/image/71rcj8dgb_l._ac_sy200_.jpg"],
    description: "Hero XTREME 125R — sporty, aggressive styling with refined 125cc engine for everyday thrills.",
    features: [
      "124.7cc air-cooled engine with fuel injection",
      "LED headlamp, tail lamp & indicators",
      "Digital instrument cluster",
      "Front disc brake with single-channel ABS",
      "11.5-litre fuel tank"
    ],
    specs: { "Brand": "Hero MotoCorp", "Engine": "124.7cc", "Power": "11.4 bhp", "Torque": "10.5 Nm", "Type": "Air-cooled, FI", "Mileage": "~55 km/l" },
    offers: [],
    deliveryDate: "Available at nearest Hero showroom",
    seller: "Hero MotoCorp Ltd",
    warranty: "5 Years / 70,000 km"
  },
};

// Fallback product for any IDs not in the catalog
const DEFAULT_PRODUCT = {
  id: "default",
  title: "Amazon Essentials – Quality Product at Great Value",
  brand: "Amazon",
  category: "General",
  subCategory: "Essentials",
  price: 499,
  mrp: 999,
  discount: "50",
  rating: 4.0,
  ratingCount: "500",
  images: ["/image/loading_4x_gray._cb485916689_.gif"],
  description: "This product is currently being updated. Please check back soon for full details.",
  features: [
    "High-quality product from a trusted brand",
    "Great value for money",
    "Available with fast delivery"
  ],
  specs: { "Brand": "Amazon", "Availability": "In Stock" },
  offers: [],
  deliveryDate: "Monday, 31 March",
  seller: "Amazon Retail",
  warranty: "Standard Warranty"
};

export function getProduct(id) {
  return PRODUCTS[id] || { ...DEFAULT_PRODUCT, id };
}

export function getAllProducts() {
  return Object.values(PRODUCTS);
}

export function getRelatedProducts(productId, limit = 6) {
  const product = PRODUCTS[productId];
  if (!product) return Object.values(PRODUCTS).slice(0, limit);
  
  const related = Object.values(PRODUCTS).filter(
    (p) => p.id !== productId && p.category === product.category
  );
  
  // If not enough in same category, pad with other products
  if (related.length < limit) {
    const others = Object.values(PRODUCTS).filter(
      (p) => p.id !== productId && p.category !== product.category
    );
    return [...related, ...others].slice(0, limit);
  }
  return related.slice(0, limit);
}

export default PRODUCTS;
