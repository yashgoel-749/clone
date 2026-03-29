const { query } = require('./db');

const products = [
    // Continue shopping deals (Category: Accessories/Electronics)
    { id: 'keyboard-acc-1', title: 'Keyboard accessories', price: 499, category_id: 3, main_image: '/image/81cnrbuek7l._ac_sy200_.jpg' },
    { id: 'mouse-pad-1', title: 'Mouse pads', price: 299, category_id: 3, main_image: '/image/511nzqxi0sl._ac_sy200_.jpg' },
    { id: 'mech-kb-1', title: 'Mechanical keyboards', price: 2499, category_id: 1, main_image: '/image/71ewwwqoiql._ac_sy200_.jpg' },
    { id: 'wrist-rest-1', title: 'Wrist rest sets', price: 399, category_id: 3, main_image: '/image/41yffsrplzl._ac_sy200_.jpg' },

    // Deals related to items you've saved (Category: Fashion)
    { id: 'tshirt-1', title: "Men's T-Shirts", price: 599, category_id: 10, main_image: '/image/61dpajs_afl._ac_sy200_.jpg' },
    { id: 'tees-1', title: 'Full sleeve tees', price: 799, category_id: 10, main_image: '/image/61edij1btcl._ac_sy200_.jpg' },
    { id: 'waffle-1', title: 'Waffle T-Shirts', price: 899, category_id: 10, main_image: '/image/61eksarcwml._ac_sy200_.jpg' },
    { id: 'zip-tee-1', title: 'Zip neck tees', price: 999, category_id: 10, main_image: '/image/61pt8xmtiol._ac_sy200_.jpg' },

    // Appliances (Category: Home & Kitchen)
    { id: 'ac-1', title: 'Air conditioners', price: 35000, category_id: 5, main_image: '/image/appliances_qc_pc_186x116__b07g5j5fyp._sy116_cb667322346_.jpg' },
    { id: 'fridge-1', title: 'Refrigerators', price: 25000, category_id: 5, main_image: '/image/appliances_qc_pc_186x116__b08345r1zw._sy116_cb667322346_.jpg' },
    { id: 'micro-1', title: 'Microwaves', price: 8000, category_id: 5, main_image: '/image/appliances_qc_pc_186x116__b08rdl6h79._sy116_cb667322346_.jpg' },
    { id: 'wm-1', title: 'Washing machines', price: 15000, category_id: 5, main_image: '/image/186x116___wm._sy116_cb667322346_.jpg' },

    // Revamp your home (Category: Home & Kitchen)
    { id: 'shoe-rack-1', title: 'Home storage & Racks', price: 1299, category_id: 5, main_image: '/image/186x116_home_storage_1._sy116_cb555624324_.jpg' },
    { id: 'cushion-1', title: 'Cushion covers & more', price: 499, category_id: 5, main_image: '/image/186x116_home_decor_1._sy116_cb555624324_.jpg' },
    { id: 'vases-1', title: 'Figurines, vases & more', price: 899, category_id: 5, main_image: '/image/186x116_home_furnishings_2._sy116_cb555624324_.jpg' },
    { id: 'lighting-1', title: 'Lighting solutions', price: 1599, category_id: 5, main_image: '/image/186x116_home_lighting_2._sy116_cb555624324_.jpg' },

    // Engineered for the road (Category: Gadgets / Custom)
    { id: 'harley-1', title: 'HARLEY-DAVIDSON X440 S Matte Black', price: 229500, category_id: 2, main_image: '/image/619zwdlnnbl._ac_sy200_.jpg' },
    { id: 'harley-2', title: 'HARLEY-DAVIDSON X440 Vivid Metallic Thick Red', price: 239500, category_id: 2, main_image: '/image/71v61d8jm9l._ac_sy200_.jpg' },
    { id: 'harley-3', title: 'HARLEY-DAVIDSON X440 S Baja Orange', price: 229500, category_id: 2, main_image: '/image/71vwd_zpefl._ac_sy200_.jpg' },
    { id: 'ktm-1', title: 'KTM RC 200 Bike Black', price: 217272, category_id: 2, main_image: '/image/61163l3zeyl._ac_sy200_.jpg' }
];

async function seed() {
    try {
        console.log("Starting product seeding...");
        // 1. Re-initialize schema to ensure VARCHAR IDs
        const fs = require('fs');
        const schema = fs.readFileSync('./schema.sql', 'utf8');
        await query(schema);
        console.log("Schema re-initialized.");

        // 2. Insert products
        for (const p of products) {
            await query(
                'INSERT INTO products (id, title, price, category_id, main_image, rating) VALUES ($1, $2, $3, $4, $5, $6)',
                [p.id, p.title, p.price, p.category_id, p.main_image, 4.5]
            );
        }
        console.log("SUCCESS: All frontend products seeded into Neon DB.");
        process.exit(0);
    } catch (err) {
        console.error("SEEDING FAILED:", err);
        process.exit(1);
    }
}

seed();
