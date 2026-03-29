// Centralized homepage card grid data
// Each row is an array of card objects, making it easy to add/remove/reorder cards

export const cardGridRows = [
  // ROW 1
  [
    {
      title: "Continue shopping deals",
      footer: { text: "See more deals", href: "#" },
      items: [
        { label: "Keyboard accessories", href: "/product/keyboard-acc-1", image: "/image/81cnrbuek7l._ac_sy200_.jpg" },
        { label: "Mouse pads", href: "/product/mouse-pad-1", image: "/image/511nzqxi0sl._ac_sy200_.jpg" },
        { label: "Mechanical keyboards", href: "/product/mech-kb-1", image: "/image/71ewwwqoiql._ac_sy200_.jpg" },
        { label: "Wrist rest sets", href: "/product/wrist-rest-1", image: "/image/41yffsrplzl._ac_sy200_.jpg" },
      ],
    },
    {
      title: "Deals related to items you've saved",
      footer: { text: "See more deals", href: "#" },
      items: [
        { label: "Men's T-Shirts", href: "/product/tshirt-1", image: "/image/61dpajs_afl._ac_sy200_.jpg" },
        { label: "Full sleeve tees", href: "/product/tees-1", image: "/image/61edij1btcl._ac_sy200_.jpg" },
        { label: "Waffle T-Shirts", href: "/product/waffle-1", image: "/image/61eksarcwml._ac_sy200_.jpg" },
        { label: "Zip neck tees", href: "/product/zip-tee-1", image: "/image/61pt8xmtiol._ac_sy200_.jpg" },
      ],
    },
    {
      title: "Appliances for your home | Up to 55% off",
      footer: { text: "See more", href: "#" },
      items: [
        { label: "Air conditioners", href: "/product/ac-1", image: "/image/appliances_qc_pc_186x116__b07g5j5fyp._sy116_cb667322346_.jpg" },
        { label: "Refrigerators", href: "/product/fridge-1", image: "/image/appliances_qc_pc_186x116__b08345r1zw._sy116_cb667322346_.jpg" },
        { label: "Microwaves", href: "/product/micro-1", image: "/image/appliances_qc_pc_186x116__b08rdl6h79._sy116_cb667322346_.jpg" },
        { label: "Washing machines", href: "/product/wm-1", image: "/image/186x116___wm._sy116_cb667322346_.jpg" },
      ],
    },
    { type: "signin" },
  ],
  // ROW 2
  [
    {
      title: "Revamp your home in style",
      footer: { text: "Explore all", href: "#" },
      items: [
        { label: "Home storage & Racks", href: "/product/shoe-rack-1", image: "/image/186x116_home_storage_1._sy116_cb555624324_.jpg" },
        { label: "Cushion covers & more", href: "/product/cushion-1", image: "/image/186x116_home_decor_1._sy116_cb555624324_.jpg" },
        { label: "Figurines, vases & more", href: "/product/vases-1", image: "/image/186x116_home_furnishings_2._sy116_cb555624324_.jpg" },
        { label: "Lighting solutions", href: "/product/lighting-1", image: "/image/186x116_home_lighting_2._sy116_cb555624324_.jpg" },
      ],
    },
    {
      title: "Starting ₹49 | Deals on home essentials",
      footer: { text: "Explore all", href: "#" },
      items: [
        { label: "Cleaning supplies", href: "/product/cleaning-1", image: "/image/shower_heads_low_res_v1._sy116_cb549138744_.jpg" },
        { label: "Bathroom accessories", href: "/product/bath-1", image: "/image/wipes_low_res_v1._sy116_cb549138744_.jpg" },
        { label: "Home tools", href: "/product/tools-1", image: "/image/tools_low_res_v1._sy116_cb549138744_.jpg" },
        { label: "Wallpapers", href: "/product/wallpapers-1", image: "/image/wallpapers_low_res_v1._sy116_cb549138744_.jpg" },
      ],
    },
    {
      title: "Automotive essentials | Up to 60% off",
      footer: { text: "See more", href: "#" },
      items: [
        { label: "Cleaning accessories", href: "/product/automotive-cleaning-1", image: "/image/glasscare1x._sy116_cb410830553_.jpg" },
        { label: "Tyre & rim care", href: "/product/tire-care-1", image: "/image/rim_tyrecare1x._sy116_cb410830552_.jpg" },
        { label: "Helmets", href: "/product/helmet-1", image: "/image/vega_helmet_186x116._sy116_cb405090404_.jpg" },
        { label: "Vacuum cleaner", href: "/product/vacuum-1", image: "/image/vaccum1x._sy116_cb410830552_.jpg" },
      ],
    },
    {
      title: "Starting ₹199 | Amazon Brands & more",
      footer: { text: "See more", href: "#" },
      items: [
        { label: "Starting ₹199 | Bedsheets", href: "/product/bedsheet-1", image: "/image/pc_qc_home_size_186_1._sy116_cb567468236_.jpg" },
        { label: "Starting ₹199 | Curtains", href: "/product/curtain-1", image: "/image/pc_qc_home_size_186_2._sy116_cb567468236_.jpg" },
        { label: "Min 40% off | Ironing & more", href: "/product/ironing-1", image: "/image/pc_qc_home_size_186_3._sy116_cb567468236_.jpg" },
        { label: "Up to 60% off | Home decor", href: "/product/decor-1", image: "/image/pc_qc_home_size_186_4._sy116_cb567468236_.jpg" },
      ],
    },
  ],
];

export const heroSlides = [
  { src: "/image/makeup_pc._cb796616147_.png", alt: "Beauty & Grooming" },
  { src: "/image/mega_home_sale_bau_pc___drying_racks._cb777818991_.jpg", alt: "Home Sale" },
  { src: "/image/3._cb785734045_.jpg", alt: "Electronics" },
  { src: "/image/74._cb783716748_.jpg", alt: "Fashion Deals" },
  { src: "/image/shampoos__conditioners_pc._cb796616147_.png", alt: "Shampoos & Conditioners" },
  { src: "/image/3000x1200_5._cb784815551_.jpg", alt: "Deals" },
];

export const carouselProducts = [
  { id: "harley-1", image: "/image/619zwdlnnbl._ac_sy200_.jpg", title: "HARLEY-DAVIDSON X440 S Matte Black", price: "₹2,29,500" },
  { id: "harley-2", image: "/image/71v61d8jm9l._ac_sy200_.jpg", title: "HARLEY-DAVIDSON X440 Vivid Metallic Thick Red", price: "₹2,39,500" },
  { id: "harley-3", image: "/image/71vwd_zpefl._ac_sy200_.jpg", title: "HARLEY-DAVIDSON X440 S Baja Orange", price: "₹2,29,500" },
  { id: "ktm-1", image: "/image/61163l3zeyl._ac_sy200_.jpg", title: "KTM RC 200 Bike Black", price: "₹2,17,272" },
  { id: "ktm-2", image: "/image/61zcrvey5al._ac_sy200_.jpg", title: "KTM Duke 200 Dark Galvano", price: "₹2,01,546" },
  { id: "hero-1", image: "/image/71rcj8dgb_l._ac_sy200_.jpg", title: "Hero MotoCorp XTREME 125R", price: "₹95,000" },
  { id: "bajaj-1", image: "/image/51uaspahpfl._ac_sy200_.jpg", title: "Bajaj Avenger 220 Cruise Moon White", price: "₹1,42,797" },
  { id: "pulsar-1", image: "/image/512jq_6xadl._ac_sy200_.jpg", title: "Bajaj Pulsar RS 200 White", price: "₹1,72,644" },
];

export const footerColumns = [
  {
    title: "Get to Know Us",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press Releases", href: "#" },
      { label: "Amazon Science", href: "#" },
    ],
  },
  {
    title: "Connect with Us",
    links: [
      { label: "Facebook", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
  {
    title: "Make Money with Us",
    links: [
      { label: "Sell on Amazon", href: "#" },
      { label: "Become an Affiliate", href: "#" },
      { label: "Fulfilment by Amazon", href: "#" },
      { label: "Advertise Your Products", href: "#" },
    ],
  },
  {
    title: "Let Us Help You",
    links: [
      { label: "Your Account", href: "#" },
      { label: "Returns Centre", href: "#" },
      { label: "100% Purchase Protection", href: "#" },
      { label: "Help", href: "#" },
    ],
  },
];
