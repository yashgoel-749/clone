const { query } = require('./db');

const products = [
    // --- ROW 1: Accessories & Fashion ---
    { id: 'keyboard-acc-1', title: 'Keyboard accessories | Wrist Rest & Keycaps', price: 499, mrp: 999, category_id: 3, brand: 'Amazon Basics', main_image: '/image/81cnrbuek7l._ac_sy200_.jpg', sub_category: 'Keyboards' },
    { id: 'mouse-pad-1', title: 'Ant Esports MP200 Mouse Pad', price: 299, mrp: 699, category_id: 3, brand: 'Ant Esports', main_image: '/image/511nzqxi0sl._ac_sy200_.jpg', sub_category: 'Mouse Pads' },
    { id: 'mech-kb-1', title: 'MageGee Mechanical Gaming Keyboard MK-Box', price: 2499, mrp: 4999, category_id: 1, brand: 'MageGee', main_image: '/image/71ewwwqoiql._ac_sy200_.jpg', sub_category: 'Keyboards' },
    { id: 'wrist-rest-1', title: 'Ergonomic Wrist Rest Support Set', price: 399, mrp: 899, category_id: 3, brand: 'ErgoSoft', main_image: '/image/41yffsrplzl._ac_sy200_.jpg', sub_category: 'Keyboards' },
    
    // Fashion
    { id: 'tshirt-1', title: 'Amazon Brand - Solimo 100% Cotton Oversized T-Shirt', price: 350, mrp: 999, category_id: 10, brand: 'Solimo', main_image: '/image/61dpajs_afl._ac_sy200_.jpg', sub_category: 'Men\'s Fashion' },
    { id: 'tees-1', title: 'U.S. Polo Assn. Men Full Sleeve Regular Fit Tee', price: 799, mrp: 1499, category_id: 10, brand: 'U.S. Polo Assn.', main_image: '/image/61edij1btcl._ac_sy200_.jpg', sub_category: 'Men\'s Fashion' },
    { id: 'waffle-1', title: 'Allen Solly Men Waffle Knit Casual T-Shirt', price: 899, mrp: 1699, category_id: 10, brand: 'Allen Solly', main_image: '/image/61eksarcwml._ac_sy200_.jpg', sub_category: 'Men\'s Fashion' },
    { id: 'zip-tee-1', title: 'Levi’s Men Zip Neck Cotton Tee', price: 999, mrp: 1999, category_id: 10, brand: 'Levi’s', main_image: '/image/61pt8xmtiol._ac_sy200_.jpg', sub_category: 'Men\'s Fashion' },

    // Appliances
    { id: 'ac-1', title: 'LG 1.5 Ton 5 Star AI Dual Inverter Split AC', price: 35000, mrp: 55000, category_id: 5, brand: 'LG', main_image: '/image/appliances_qc_pc_186x116__b07g5j5fyp._sy116_cb667322346_.jpg', sub_category: 'Air Conditioners' },
    { id: 'fridge-1', title: 'Samsung 253L 3 Star Inverter Frost Free Refrigerator', price: 25000, mrp: 35000, category_id: 5, brand: 'Samsung', main_image: '/image/appliances_qc_pc_186x116__b08345r1zw._sy116_cb667322346_.jpg', sub_category: 'Refrigerators' },
    { id: 'micro-1', title: 'Bajaj 20L Grill Microwave Oven', price: 7999, mrp: 10999, category_id: 5, brand: 'Bajaj', main_image: '/image/appliances_qc_pc_186x116__b08rdl6h79._sy116_cb667322346_.jpg', sub_category: 'Microwaves' },
    { id: 'wm-1', title: 'Whirlpool 7.5kg 5 Star Fully Automatic Machine', price: 16999, mrp: 22000, category_id: 5, brand: 'Whirlpool', main_image: '/image/186x116___wm._sy116_cb667322346_.jpg', sub_category: 'Washing Machines' },

    // Motorcycles
    { id: 'harley-1', title: 'HARLEY-DAVIDSON X440 S Matte Black', price: 229500, mrp: 250000, category_id: 11, brand: 'Harley-Davidson', main_image: '/image/619zwdlnnbl._ac_sy200_.jpg', sub_category: 'Motorcycles' },
    { id: 'harley-2', title: 'HARLEY-DAVIDSON X440 Vivid Metallic Thick Red', price: 239500, mrp: 260000, category_id: 11, brand: 'Harley-Davidson', main_image: '/image/71v61d8jm9l._ac_sy200_.jpg', sub_category: 'Motorcycles' },
    { id: 'harley-3', title: 'HARLEY-DAVIDSON X440 S Baja Orange', price: 229500, mrp: 250000, category_id: 11, brand: 'Harley-Davidson', main_image: '/image/71vwd_zpefl._ac_sy200_.jpg', sub_category: 'Motorcycles' },
    { id: 'ktm-1', title: 'KTM RC 200 Bike Black', price: 217272, mrp: 235000, category_id: 11, brand: 'KTM', main_image: '/image/61163l3zeyl._ac_sy200_.jpg', sub_category: 'Motorcycles' },
    { id: 'ktm-2', title: 'KTM Duke 200 Dark Galvano', price: 201546, mrp: 220000, category_id: 11, brand: 'KTM', main_image: '/image/61zcrvey5al._ac_sy200_.jpg', sub_category: 'Motorcycles' },
    { id: 'hero-1', title: 'Hero MotoCorp XTREME 125R', price: 95000, mrp: 110000, category_id: 11, brand: 'Hero', main_image: '/image/71rcj8dgb_l._ac_sy200_.jpg', sub_category: 'Motorcycles' },
    { id: 'bajaj-1', title: 'Bajaj Avenger 220 Cruise Moon White', price: 142797, mrp: 165000, category_id: 11, brand: 'Bajaj', main_image: '/image/51uaspahpfl._ac_sy200_.jpg', sub_category: 'Motorcycles' },
    { id: 'pulsar-1', title: 'Bajaj Pulsar RS 200 White', price: 172644, mrp: 195000, category_id: 11, brand: 'Bajaj', main_image: '/image/512jq_6xadl._ac_sy200_.jpg', sub_category: 'Motorcycles' },
    
    // Revamp Home
    { id: 'shoe-rack-1', title: 'Nilkamal Churchill 2 Door Shoe Cabinet', price: 4490, mrp: 7500, category_id: 5, brand: 'Nilkamal', main_image: '/image/186x116_home_storage_1._sy116_cb555624324_.jpg', sub_category: 'Furniture' },
    { id: 'cushion-1', title: 'Solimo Set of 5 Velvet Cushion Covers', price: 499, mrp: 999, category_id: 5, brand: 'Solimo', main_image: '/image/186x116_home_decor_1._sy116_cb555624324_.jpg', sub_category: 'Decor' },
    { id: 'vases-1', title: 'Geometric Ceramic Flower Vase Set', price: 899, mrp: 1599, category_id: 5, brand: 'ArtDeco', main_image: '/image/186x116_home_furnishings_2._sy116_cb555624324_.jpg', sub_category: 'Decor' },
    { id: 'lighting-1', title: 'Philips Smart Wi-Fi LED Ceiling Light', price: 1899, mrp: 3499, category_id: 5, brand: 'Philips', main_image: '/image/186x116_home_lighting_2._sy116_cb555624324_.jpg', sub_category: 'Lighting' },

    // Cleaning
    { id: 'cleaning-1', title: 'Scotch-Brite Stainless Steel Scrubber', price: 99, mrp: 199, category_id: 5, brand: 'Scotch-Brite', main_image: '/image/shower_heads_low_res_v1._sy116_cb549138744_.jpg', sub_category: 'Cleaning' },
    { id: 'bath-1', title: 'Cello Bathroom Accessories Set', price: 699, mrp: 1299, category_id: 5, brand: 'Cello', main_image: '/image/wipes_low_res_v1._sy116_cb549138744_.jpg', sub_category: 'Home Essentials' },
    { id: 'tools-1', title: 'Stanley 12-in-1 Multi-Tool Kit', price: 1299, mrp: 1999, category_id: 5, brand: 'Stanley', main_image: '/image/tools_low_res_v1._sy116_cb549138744_.jpg', sub_category: 'Tools' },
    { id: 'wallpapers-1', title: '3D Embossed Self Adhesive Wallpapers', price: 450, mrp: 899, category_id: 5, brand: 'Generic', main_image: '/image/wallpapers_low_res_v1._sy116_cb549138744_.jpg', sub_category: 'Decor' },

    // Automotive
    { id: 'automotive-cleaning-1', title: 'WaveX Dashboard & Tyre Polish', price: 499, mrp: 899, category_id: 11, brand: 'WaveX', main_image: '/image/glasscare1x._sy116_cb410830553_.jpg', sub_category: 'Cleaning' },
    { id: 'tire-care-1', title: 'Formula 1 Tire Shine Spray', price: 699, mrp: 1299, category_id: 11, brand: 'Formula 1', main_image: '/image/rim_tyrecare1x._sy116_cb410830552_.jpg', sub_category: 'Maintenance' },
    { id: 'helmet-1', title: 'Vega Edge Full Face Helmet', price: 1549, mrp: 2499, category_id: 11, brand: 'Vega', main_image: '/image/vega_helmet_186x116._sy116_cb405090404_.jpg', sub_category: 'Helmets' },
    { id: 'vacuum-1', title: 'Eureka Forbes Portable Car Vacuum', price: 2999, mrp: 4999, category_id: 11, brand: 'Eureka Forbes', main_image: '/image/vaccum1x._sy116_cb410830552_.jpg', sub_category: 'Cleaning' },

    // Brands
    { id: 'bedsheet-1', title: 'Solimo 144 TC Cotton Double Bedsheet', price: 349, mrp: 899, category_id: 10, brand: 'Amazon Brand - Solimo', main_image: '/image/pc_qc_home_size_186_1._sy116_cb567468236_.jpg', sub_category: 'Home Furnishing' },
    { id: 'curtain-1', title: 'Solimo Eyelet Door Curtain Set', price: 499, mrp: 999, category_id: 10, brand: 'Amazon Brand - Solimo', main_image: '/image/pc_qc_home_size_186_2._sy116_cb567468236_.jpg', sub_category: 'Home Furnishing' },
    { id: 'ironing-1', title: 'Solimo Large Folding Ironing Board', price: 1299, mrp: 2200, category_id: 5, brand: 'Amazon Brand - Solimo', main_image: '/image/pc_qc_home_size_186_3._sy116_cb567468236_.jpg', sub_category: 'Home Essentials' },
    { id: 'decor-1', title: 'Solimo Decorative Wall Clock', price: 599, mrp: 1499, category_id: 5, brand: 'Amazon Brand - Solimo', main_image: '/image/pc_qc_home_size_186_4._sy116_cb567468236_.jpg', sub_category: 'Decor' }
];

async function seed() {
    try {
        console.log("Seeding with Proper Sub-Categories...");
        const fs = require('fs');
        const schema = fs.readFileSync('./schema.sql', 'utf8');
        await query(schema);

        for (const p of products) {
            const desc = `Premium ${p.title} by ${p.brand}. Experience the best in quality and performance.`;
            const specs = { "Brand": p.brand, "Warranty": "1 Year", "Product": p.sub_category };
            
            await query(
                `INSERT INTO products (id, category_id, brand, title, description, price, mrp, rating, rating_count, stock, specs, main_image, sub_category) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
                [p.id, p.category_id, p.brand, p.title, desc, p.price, p.mrp, 4.0 + Math.random(), 100 + Math.floor(Math.random()*2000), 100, JSON.stringify(specs), p.main_image, p.sub_category]
            );
            await query('INSERT INTO product_images (product_id, image_url) VALUES ($1, $2)', [p.id, p.main_image]);
        }

        console.log("SUCCESS: 36 Products Re-seeded with Precise Breadcrumb data.");
        process.exit(0);
    } catch (err) {
        console.error("SEEDING FAILED:", err);
        process.exit(1);
    }
}
seed();
