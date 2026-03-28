# Database Setup Walkthrough

I have implemented a PostgreSQL database system for your Amazon Clone. Follow these steps to get everything connected and running.

## 1. Create the Database in pgAdmin
1. Open **pgAdmin 4**.
2. Right-click on **Databases** > **Create** > **Database...**.
3. Name it `amazon_clone` (or any name you prefer) and click **Save**.

## 2. Initialize the Schema
1. Right-click on your new `amazon_clone` database and select **Query Tool**.
2. Open the file [schema.sql](file:///c:/Users/goely/OneDrive/Desktop/amazon/backend/schema.sql) and copy its entire content.
3. Paste the content into the Query Tool in pgAdmin.
4. Click the **Execute** (Play) button. This will create all the tables (`users`, `products`, `categories`, `orders`, etc.) and insert the initial categories.

## 3. Configure Connection
Update your [.env](file:///c:/Users/goely/OneDrive/Desktop/amazon/backend/.env) file in the `backend` folder with your database credentials:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/amazon_clone
```
*Replace `YOUR_PASSWORD` with your actual PostgreSQL password.*
// admin ->  Password
## 4. Run the Seed Script
To push initial data to the database, run:
```bash
cd backend
node seed.js
```

## 5. Start the Server
Start your backend server:
```bash
npm start
```

---

### What's New?
- **Persistent Data**: No more losing products or users when you restart the server.
- **Multiple Images**: Products now support multiple images via the `product_images` table.
- **Advanced Relationships**: Proper relationships between Users, Carts, Orders, and Products.
- **Search & Filter**: The API now uses SQL `LIKE` and `JOIN` for efficient searching and filtering.

> [!TIP]
> If you make changes to the schema later, you can modify `schema.sql` and run it again (Note: `DROP TABLE` will delete existing data).
