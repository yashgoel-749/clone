# Amazon Clone 🛒

A full-stack e-commerce web application that closely replicates Amazon's design and user experience. Built as a Single Page Application (SPA) with a modern tech stack, focusing on performance, modularity, and pixel-perfect UI replication.

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js (v16.2.1) & React (v19)
- **Styling:** Vanilla CSS (for maximum flexibility and pixel-perfect design matching)
- **State Management:** React Context API (`CartContext`, `AuthContext`)
- **Authentication:** Google OAuth (`@react-oauth/google`)
- **Architecture:** Highly modular, reusable components (`QuadCard`, `Footer`, `Header`) driven by centralized data configuration (`navigationData.js`, `homePageData.js`).

### Backend
- **Environment:** Node.js
- **Framework:** Express.js (v5)
- **Database:** PostgreSQL (using `pg` driver)
- **Authentication:** JWT (`jsonwebtoken`) and bcrypt (`bcryptjs`)
- **Email Services:** Nodemailer (for order confirmations and notifications)
- **Other utilities:** cors, body-parser, dotenv

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL database running locally or remotely

### 1. Database Setup
1. Create a PostgreSQL database (e.g., `amazon_clone`).
2. Run the schema file located at `backend/schema.sql` to create the necessary tables.
3. (Optional) Run `node backend/seed.js` or `node backend/seed_all_36_products.js` to populate the database with dummy product data.

### 2. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   PGUSER=your_postgres_user
   PGHOST=localhost
   PGPASSWORD=your_postgres_password
   PGDATABASE=your_database_name
   PGPORT=5432
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   ```
4. Start the backend server:
   ```bash
   npm start
   # or node index.js
   ```
   The backend will run on `http://localhost:5000`.

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the `frontend` directory with the following variable:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`.

---

## 🧩 Architecture & Assumptions Made

1. **Component Modularity:** 
   - The frontend is designed with reusability in mind. Repeated UI sections (like the 2x2 product grids on the homepage) are abstracted into flexible components (`QuadCard`) that consume centralized data from `src/data/`.
2. **Data-Driven Navigation:** 
   - The header's sub-navigation, categories, and the sidebar sections are fully data-driven. Adding new categories does not require modifying JSX structure, only the `navigationData.js` file.
3. **Product Catalog Simulation:** 
   - For rapid frontend prototyping and fallback handling, a comprehensive catalog is also available locally in `src/data/productData.js`, containing ~25 detailed product objects with images, specs, and offers to structure the Product Detail Pages (PDP).
4. **Authentication Flow:** 
   - We assume a standard session-based flow using JWTs. The backend issues a token upon successful login/registration, which the frontend stores and attaches to subsequent requests (like placing an order or managing the wishlist).
5. **Image Assets:** 
   - Image paths are stored as strings pointing to the `/public/image` directory in Next.js. We assume these assets exist locally, though in a production environment, an S3 bucket or equivalent CDN would be used.
