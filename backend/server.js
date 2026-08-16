// ============================================================
// File: server.js
// Purpose: HMSPro Backend Entry Point
// ============================================================

import "dotenv/config";

import app from "./app.js";

import connectDB from "./config/db.js";

import { startCronJobs } from "./cron/index.js";


// ============================================================
// Server Port
// ============================================================

const PORT =
    process.env.PORT || 5000;


// ============================================================
// Start HMSPro
// ============================================================

const startServer = async () => {

    try {

        // ----------------------------------------------------
        // Connect MongoDB first
        // ----------------------------------------------------

        await connectDB();


        // ----------------------------------------------------
        // Start cron jobs
        // ----------------------------------------------------

        startCronJobs();


        // ----------------------------------------------------
        // Global Error Handler
        // Must remain after routes/404 handling
        // ----------------------------------------------------

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


        // ----------------------------------------------------
        // Start HTTP server
        // ----------------------------------------------------

        app.listen(
            PORT,
            () => {

                console.log(
                    `HMSPro Server running on port ${PORT}`
                );

            }
        );

    } catch (error) {

        console.error(
            "HMSPro startup failed:",
            error.message
        );

        process.exit(1);

    }

};


startServer();