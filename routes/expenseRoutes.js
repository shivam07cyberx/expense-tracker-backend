const express = require("express");
const db = require("../db"); // Ensure this path is correct
const router = express.Router(); // ✅ This line initializes the router

// Add Expense Route
router.post("/add", (req, res) => {
    const { user_id, type, amount, date_time, transaction_type } = req.body;

    console.log("Received Data:", req.body); // Debugging log

    if (!user_id || !type || !amount || !date_time || !transaction_type) {
        console.log("Validation Failed: Missing fields");
        return res.status(400).json({ message: "All fields are required!" });
    }

    const expenseAmount = parseFloat(amount);
    if (isNaN(expenseAmount) || expenseAmount <= 0) {
        console.log("Validation Failed: Invalid Amount");
        return res.status(400).json({ message: "Invalid amount" });
    }

    const sql = `
        INSERT INTO expenses (user_id, type, amount, date_time, transaction_type) 
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [user_id, type, expenseAmount, date_time, transaction_type], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }
        console.log("Expense Added:", result);
        res.json({ message: "Expense added successfully" });
    });
});

// Fetch Expenses for Logged-in User
router.get("/:user_id", (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const sql = "SELECT * FROM expenses WHERE user_id = ? ORDER BY date_time DESC";
    
    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.json(results);
    });
});

module.exports = router; // ✅ Ensure you export the router
