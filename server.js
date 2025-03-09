require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); // Ensure this file exists

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes"); // ✅ Ensure this path is correct

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes); // ✅ Correctly use the expense routes

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
