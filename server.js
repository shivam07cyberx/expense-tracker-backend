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
const db = require("./db"); // This is where you require the updated db.js

const app = express();

// Allow frontend domain for CORS
app.use(cors({
    origin: "https://shivam07cyberx.github.io", // Allow your frontend domain
    methods: "GET, POST",                      // Allow GET and POST methods
    allowedHeaders: "Content-Type",            // Allow Content-Type header
    credentials: true                          // Allow credentials like cookies/tokens
}));

// Middleware
app.use(bodyParser.json());

// Import Routes
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// Catching OPTIONS preflight requests
app.options('*', cors()); // This is important to allow preflight requests for all routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

