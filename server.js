// require("dotenv").config(); // Load environment variables from .env file
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const db = require("./db"); // This is where you require the updated db.js for PostgreSQL

// const app = express();

// // Middleware
// app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
// app.use(bodyParser.json()); // Parse incoming JSON requests

// // Import Routes
// const authRoutes = require("./routes/authRoutes");
// const expenseRoutes = require("./routes/expenseRoutes");

// // Use the imported routes for specific URL paths
// app.use("/api/auth", authRoutes);
// app.use("/api/expenses", expenseRoutes);

// // Set the port, default to 5000 if not specified in the environment
// const PORT = process.env.PORT || 5000;

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

// CORS Configuration: Allow your frontend URL for CORS requests
app.use(cors({
    origin: "https://shivam07cyberx.github.io", // Set allowed origin to the frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow methods that you'll use
    allowedHeaders: "Content-Type, Authorization", // Allow headers for JSON and Auth
    credentials: true // Allow cookies (if needed)
}));

// Middleware
app.use(express.json());  // Use built-in middleware to handle JSON requests

// Routes
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

