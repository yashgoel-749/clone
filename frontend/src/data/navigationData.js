// Centralized navigation data for the Amazon Clone
// Used by Header.js, Sidebar.js, and any other nav-related components

// ===== SEARCH CATEGORIES =====
export const searchCategories = [
  "All",
  "Clothing & Accessories",
  "Electronics",
  "Mobiles",
  "Computers",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Books",
  "Appliances",
  "Toys & Games",
  "Sports & Fitness",
  "Grocery",
  "Health & Personal Care",
  "Car & Motorbike",
];

// ===== SUB-NAV ITEMS =====
export const subNavItems = [
  { label: "Fresh", href: "/?category=grocery" },
  { label: "MX Player", href: "#" },
  { label: "Sell", href: "#" },
  { label: "Bestsellers", href: "#" },
  { label: "Mobiles", href: "/?category=mobiles" },
  { label: "Today's Deals", href: "#" },
  { label: "Customer Service", href: "#" },
  { label: "New Releases", href: "#" },
  { label: "Prime", href: "#" },
  { label: "Fashion", href: "/?category=fashion" },
  { label: "Electronics", href: "/?category=electronics" },
  { label: "Amazon Pay", href: "#" },
  { label: "Home & Kitchen", href: "/?category=home+%26+kitchen" },
  { label: "Computers", href: "/?category=computers" },
  { label: "Toys & Games", href: "/?category=toys+%26+games" },
  { label: "Books", href: "/?category=books" },
  { label: "Gift Cards", href: "#" },
  { label: "Beauty & Personal Care", href: "/?category=beauty" },
  { label: "Car & Motorbike", href: "/?category=car+%26+motorbike" },
];

// ===== SIDEBAR SECTIONS =====
export const sidebarSections = [
  {
    title: "Trending",
    items: [
      { label: "Bestsellers", href: "/" },
      { label: "New Releases", href: "/" },
      { label: "Movers and Shakers", href: "/" },
    ],
  },
  {
    title: "Digital Content and Devices",
    items: [
      { label: "Echo & Alexa", href: "#", arrow: true },
      { label: "Fire TV", href: "#", arrow: true },
      { label: "Kindle E-Readers & eBooks", href: "#", arrow: true },
      { label: "Audible Audiobooks", href: "#", arrow: true },
      { label: "Amazon Prime Video", href: "#", arrow: true },
      { label: "Amazon Prime Music", href: "#", arrow: true },
    ],
  },
  {
    title: "Shop by Category",
    items: [
      { label: "Mobiles, Computers", href: "/?category=mobiles", arrow: true },
      { label: "TV, Appliances, Electronics", href: "/?category=electronics", arrow: true },
      { label: "Men's Fashion", href: "/?category=fashion", arrow: true },
      { label: "Women's Fashion", href: "/?category=fashion", arrow: true },
      { label: "Home, Kitchen, Pets", href: "/?category=home+%26+kitchen", arrow: true },
      { label: "Beauty, Health, Grocery", href: "/?category=beauty", arrow: true },
      { label: "Sports, Fitness, Bags", href: "/?category=sports+%26+fitness", arrow: true },
      { label: "Baby, Toys & Kids", href: "/?category=toys+%26+games", arrow: true },
      { label: "Car, Motorbike, Industrial", href: "/?category=car+%26+motorbike", arrow: true },
      { label: "Books", href: "/?category=books", arrow: true },
    ],
  },
  {
    title: "Programs & Features",
    items: [
      { label: "Gift Cards & Mobile Recharges", href: "#", arrow: true },
      { label: "Amazon Launchpad", href: "#", arrow: true },
      { label: "Amazon Business", href: "#", arrow: true },
      { label: "Flight Tickets", href: "#", arrow: true },
    ],
  },
  {
    title: "Help & Settings",
    items: [
      { label: "Your Account", href: "/account" },
      { label: "Customer Service", href: "#" },
    ],
  },
];
