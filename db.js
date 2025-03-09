// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "System@Hack02",
//     database: "expense_tracker"
// });

// connection.connect((err) => {
//     if (err) {
//         console.error("Database connection failed:", err);
//     } else {
//         console.log("Connected to MySQL database");
//     }
// });

// module.exports = connection;


const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Required for Render PostgreSQL
    }
});

pool.connect()
    .then(() => console.log("✅ Database Connected Successfully!"))
    .catch(err => console.error("❌ Database Connection Failed:", err));

module.exports = pool;
