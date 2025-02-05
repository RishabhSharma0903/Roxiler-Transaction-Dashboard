const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
const Transaction = require("./Models/Transaction.js");

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true,
     useUnifiedTopology: true }
    )
    .then(() => {
        console.log("Successfully connected to the database");
        console.log(process.env.MONGO_URI)
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.log("Error connecting to the database", err);
    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/initialize-database", async (req, res) => {
    try {
      const response = await axios.get(
        "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
      );
      await Transaction.deleteMany({}); // Clear existing data
      await Transaction.insertMany(response.data); // Insert new data
      res.status(200).send("Database initialized with seed data");
    } catch (error) {
      res.status(500).send("Error initializing database");
    }
  });

  app.get("/transactions", async (req, res) => {
    const { month, search, page = 1, perPage = 5 } = req.query;
    const monthNumber = new Date(`2023-${month}-01`).getMonth() + 1;
  
    let query = {
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
    };
  
    if (search) {
      const searchConditions = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
  
      if (!isNaN(search)) {
        searchConditions.push({ price: { $eq: parseFloat(search) } });
      }
  
      query.$or = searchConditions;
    }
  
    try {
      const totalCount = await Transaction.countDocuments(query);
      const totalPages = Math.ceil(totalCount / perPage);
  
      const transactions = await Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(perPage);
  
      res.status(200).json({ transactions, totalPages });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });
  
  app.get("/statistics", async (req, res) => {
    const { month } = req.query;
    const monthNumber = new Date(`2023-${month}-01`).getMonth() + 1;
  
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
          sold: true,
        },
      },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);
  
    const totalSoldItems = await Transaction.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
      sold: true,
    });
  
    const totalNotSoldItems = await Transaction.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
      sold: false,
    });
  
    res.status(200).json({
      totalSaleAmount: totalSaleAmount[0]?.total || 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  });

  app.get("/bar-chart", async (req, res) => {
    const { month } = req.query;
    const monthNumber = new Date(`2023-${month}-01`).getMonth() + 1;
  
    const ranges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];
  
    const result = await Promise.all(
      ranges.map(async (range) => {
        const count = await Transaction.countDocuments({
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
          price: { $gte: range.min, $lte: range.max },
        });
        return { range: `${range.min}-${range.max}`, count };
      })
    );
  
    res.status(200).json(result);
  });

  app.get("/pie-chart", async (req, res) => {
    const { month } = req.query;
    const monthNumber = new Date(`2023-${month}-01`).getMonth() + 1;
  
    const result = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
        },
      },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
  
    res.status(200).json(result);
  });

  app.get("/combined-data", async (req, res) => {
    const { month } = req.query;
  
    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      axios.get(`http://localhost:5000/transactions?month=${month}`),
      axios.get(`http://localhost:5000/statistics?month=${month}`),
      axios.get(`http://localhost:5000/bar-chart?month=${month}`),
      axios.get(`http://localhost:5000/pie-chart?month=${month}`),
    ]);
  
    res.status(200).json({
      transactions: transactions.data,
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data,
    });
  });