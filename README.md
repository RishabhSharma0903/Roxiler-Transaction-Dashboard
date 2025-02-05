Roxiler Systems - MERN Stack Developer Assignment

This repository contains the **MERN Stack Developer Assignment for Roxiler Systems. The project involves implementing a **backend with Express and MongoDB** and a **frontend using React and Chart.js** to display transaction data with various filtering, statistical, and visualization features.

📌Project Overview:

✅ Backend Tasks
1. Initialize Database 
   - Fetch JSON data from `https://s3.amazonaws.com/roxiler.com/product_transaction.json`.  
   - Store transactions in MongoDB.

2. Create APIs for Transactions
   - List transactions with pagination & search (title, description, price).  
   - Filter by month, ignoring the year.

3. Statistics API  
   - Calculate total sales, sold items, and unsold items for a selected month.

4. Bar Chart API
   - Categorize transactions into price ranges (`0-100`, `101-200`, etc.).  
   - Return the count of items in each range.

5. Pie Chart API
   - Return categories and the number of items per category for a selected month.

6. Combined API
   - Fetch Statistics, Bar Chart, and Pie Chart data in a single API request.

✅Frontend Tasks
1. Transactions Table  
   - Implement a table with pagination & search.  
   - Allow users to select a month from a dropdown.  
   - Clicking on a title or description expands the text.

2. Statistics Box
   - Display total sales, sold items, and unsold items for the selected month.

3. Bar Chart (Price Range Distribution)
   - Use Chart.js to visualize price range categories.

4. Pie Chart (Category-wise Distribution)  
   - Use Chart.js to display category-wise item counts.

🛠️ Tech Stack
Frontend
- React (Vite)  
- Tailwind CSS  
- Axios (API requests)  
- Chart.js (Bar & Pie Charts)  

Backend
- Node.js + Express  
- MongoDB + Mongoose  
- Axios (Fetching data from API)  
- dotenv (Environment variables)  
- cors (Cross-Origin Resource Sharing)  

How to Run the Project
1️⃣ Clone the Repository**
git clone <repository-url>
cd Roxiler_Systems_Assignment

2️⃣ Install Dependencies
Backend
cd backend
npm install

Frontend
cd frontend
npm install


3️⃣ Configure `.env` File
Create a `.env` file in the **backend folder and add the following:
MONGO_URI=your_mongodb_connection_string
PORT=5000


4️⃣ Run the Backend
cd backend
node index.js
The server runs on `http://localhost:5000`.

5️⃣ Run the Frontend
cd frontend
npm run dev
The frontend runs on `http://localhost:5173`.

---
📊API Endpoints
| Method |                             Endpoint                                     |               Description                   |
|--------|--------------------------------------------------------------------------|---------------------------------------------|
| GET    | `/api/initializeDB`                                                      | Fetch & store transactions in MongoDB       |
| GET    | `/api/transactions?month=<month>&search=<text>&page=<num>&perPage=<num>` | Fetch transactions with search & pagination |
| GET    | `/api/statistics?month=<month>`                                          | Get total sales, sold & unsold items        |
| GET    | `/api/barChart?month=<month>`                                            | Get price range distribution                |
| GET    | `/api/pieChart?month=<month>`                                            | Get category-wise distribution              |
| GET    | `/api/combined?month=<month>`                                            | Fetch all statistics, bar & pie chart data  |

📝Assignment Implementation Steps
🔹Backend
1. Set up Express server & MongoDB connection
2. Fetch & store transaction data from API 
3. Create REST APIs for transactions, statistics & charts  
4. Test APIs using Postman  

🔹Frontend
1. Set up React (Vite) & Tailwind CSS
2. Create a table with pagination & search  
3. Integrate API calls for transactions & statistics  
4. Implement bar & pie charts with Chart.js
5. Ensure responsiveness & UI improvements  

🔹Features Implemented
✅ Dynamic transactions table with search & pagination  
✅ Month-based filtering for all data  
✅ Real-time statistics & analytics  
✅ Interactive bar & pie charts  
✅ Full-stack implementation using MERN  

🚀Author: Rishabh Sharma 
📧 Email: risharma0903@gmail.com  
