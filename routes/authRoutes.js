// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const db = require("../db");

// const router = express.Router();

// // Signup Route
// router.post("/signup", async (req, res) => {
//     const { name, mobile, password } = req.body;

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user into database
//     const query = "INSERT INTO users (name, mobile, password) VALUES (?, ?, ?)";
//     db.query(query, [name, mobile, hashedPassword], (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: "Error registering user", error: err });
//         }
//         res.status(201).json({ message: "User registered successfully" });
//     });
// });

// // Login Route
// router.post("/login", (req, res) => {
//     const { mobile, password } = req.body;

//     // Find user by mobile number
//     const query = "SELECT * FROM users WHERE mobile = ?";
//     db.query(query, [mobile], async (err, results) => {
//         if (err) return res.status(500).json({ message: "Database error" });

//         if (results.length === 0) {
//             return res.status(401).json({ message: "User not found. Please sign up." });
//         }

//         const user = results[0];

//         // Compare password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         // Generate JWT Token
//         const token = jwt.sign({ id: user.id, name: user.name }, "secret_key", { expiresIn: "1h" });

//         res.json({ message: "Login successful", token, user: { id: user.id, name: user.name } });
//     });





const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
require("dotenv").config();

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
    const { name, mobile, password } = req.body;

    if (!name || !mobile || !password) {
        return res.status(400).json({ message: "All fields (name, mobile, password) are required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const query = "INSERT INTO users (name, mobile, password) VALUES (?, ?, ?)";
    db.query(query, [name, mobile, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error registering user", error: err });
        }
        res.status(201).json({ message: "User registered successfully" });
    });
});

// Login Route
router.post("/login", (req, res) => {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
        return res.status(400).json({ message: "Mobile number and password are required" });
    }

    // Find user by mobile number
    const query = "SELECT * FROM users WHERE mobile = ?";
    db.query(query, [mobile], async (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (results.length === 0) {
            return res.status(401).json({ message: "User not found. Please sign up." });
        }

        const user = results[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user.id, name: user.name },
            process.env.JWT_SECRET || "secret_key", // Use the secret from .env file
            { expiresIn: process.env.JWT_EXPIRATION || "1h" } // Use expiration from .env file
        );

        res.json({
            message: "Login successful",
            token,
            user: { id: user.id, name: user.name }
        });
    });
});

module.exports = router;

// });

// module.exports = router;
