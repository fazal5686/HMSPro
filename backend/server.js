// ============================================================
// File: server.js
// Purpose: HMSPro Backend Entry Point
// ============================================================

import "dotenv/config";

import app from "./app.js";

import connectDB from "./config/db.js";

// ============================================================
// Connect Database
// ============================================================

connectDB();

// ============================================================
// Server Port
// ============================================================

const PORT = process.env.PORT || 5000;

// ============================================================
// Global Error Handler
// Must remain AFTER all routes and 404 handling.
// ============================================================

app.use(
    (error, req, res, next) => {

        console.error(
            "ERROR:",
            error.message
        );

        const statusCode =
            error.statusCode || 500;

        return res.status(statusCode).json({

            success: false,

            message:
                error.message ||
                "Internal server error.",

        });

    }
);

// ============================================================
// Start Server
// ============================================================

app.listen(PORT, () => {

    console.log(
        `HMSPro Server running on port ${PORT}`
    );

});