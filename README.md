# Amazon Clone - Full Stack E-Commerce Platform 🛒

[![Live Demo](https://img.shields.io/badge/Live-Demo-orange?style=for-the-badge&logo=vercel)](https://amazonclone-pi.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

A high-fidelity Amazon clone built with a modern, high-performance tech stack. This project focuses on replicating the core e-commerce experience with pixel-perfect UI, seamless authentication, and a robust backend.
   
---

## 🌟 Key Features

- **🔐 Google Authentication:** Secure login/signup flow integrated with Google OAuth for a frictionless user experience.
- **🛍️ Complete Shopping Flow:** Add to Cart, update quantities, remove items, and persistent cart across sessions.
- **💳 Checkout & Orders:** Simulated multi-step checkout with order history tracking.
- **💖 Wishlist:** Save your favorite items for later with a dedicated wishlist system.
- **📱 Responsive Design:** Fully optimized for mobile, tablet, and desktop views with a "pixel-perfect" CSS approach.
- **⚡ Dynamic Product Catalog:** Data-driven category grids, detailed product pages with specifications, and search functionality.
- **📧 Email Notifications:** Automated order confirmations and user notifications via Nodemailer.

---

## 🚀 Tech Stack

### Frontend
- **Framework:** [Next.js v16.2.1](https://nextjs.org/) (React 19)
- **Styling:** Vanilla CSS (for maximum flexibility and precise UI replication)
- **State Management:** React Context API (`CartContext`, `AuthContext`, `WishlistContext`)
- **Authentication:** Google OAuth via `@react-oauth/google`
- **Navigation:** Fully data-driven components powered by centralized configuration files.

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js v5](https://expressjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Authentication:** JWT (JSON Web Tokens) & bcryptjs for password hashing.
- **Communication:** [Nodemailer](https://nodemailer.com/) for email services.
- **Architecture:** RESTful API design with structured controllers and models.

---

## 🏗️ Architecture & Design Philosophy

1. **Modular UI Construction:** Components like `QuadCard`, `Header`, and `Footer` are abstracted to be highly reusable, consuming centralized data for easy maintenance.
2. **Performance First:** Leveraged Next.js App Router for optimized routing and faster initial page loads.
3. **Data-Driven Scalability:** The entire navigation system (header sub-nav, sidebars, categories) is driven by configuration files in `src/data/`, allowing for easy updates without JSX changes.
4. **Relational Data Integrity:** Uses PostgreSQL to handle complex relationships between users, products, orders, and wishlists, ensuring data consistency.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL (running locally or a remote instance)

### 1. Database Setup
1. Create a PostgreSQL database (e.g., `amazon_clone`).
2. Run the schema: `psql -d amazon_clone -f backend/schema.sql` (or use your preferred GUI).
3. (Optional) Seed the data: `node backend/seed_all_36_products.js`.

### 2. Backend Configuration
1. Navigate to `backend/`.
2. Install dependencies: `npm install`.
3. Create a `.env` file:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://user:password@host:port/database_name
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GMAIL_USER=your_gmail@gmail.com
   GMAIL_PASS=your_gmail_app_password
   ```
4. Start the backend server:
   ```bash
   node index.js
   ```
   The backend will run on `http://localhost:5000`.

### 3. Frontend Setup
1. Navigate to `frontend/`.
2. Install dependencies: `npm install`.
3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id
   ```
4. Start dev server: `npm run dev`.

---

## 📂 Project Structure

```text
├── backend/            # Express.js REST API
│   ├── index.js        # Main entry point
│   ├── db.js           # Database connection
│   ├── schema.sql      # Database schema
│   └── seed.js         # Initial data population
└── frontend/           # Next.js Application
    ├── src/
    │   ├── app/        # App Router (pages & components)
    │   ├── context/    # State Management (Cart, Auth, Wishlist)
    │   └── data/       # Centralized UI Configuration
    └── public/         # Static assets & images
```

---

## 🚀 Deployment

- **Frontend:** Deployed on **Vercel** ([amazonclone-pi.vercel.app](https://amazonclone-pi.vercel.app/))
- **Backend:** Recommended platforms: Render, Fly.io, or AWS.

--YASH GOEL--

---

## 📜 License

This project is licensed under the ISC License.
