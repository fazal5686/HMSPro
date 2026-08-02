// ============================================================
// File: app.js
// Purpose: Express application configuration for HMSPro.
// Handles middleware and API routes.
// ============================================================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";


// Load environment variables
dotenv.config();


// Create Express application
const app = express();


// ============================================================
// Global Middleware
// ============================================================


// Enable CORS
app.use(
    cors()
);


// Request logger
app.use(
    morgan("dev")
);


// Parse JSON requests
app.use(
    express.json()
);


// Parse form data
app.use(
    express.urlencoded({
        extended: true
    })
);


// ============================================================
// Static Files
// ============================================================

app.use(
    "/uploads",
    express.static("uploads")
);


// ============================================================
// API Routes
// ============================================================

app.use(
    "/api/auth",
    authRoutes
);


// ============================================================
// Default Route
// ============================================================

app.get(
    "/",
    (req, res) => {

        res.status(200).json({

            success: true,

            message: "HMSPro Backend Running"

        });

    }
);


// ============================================================
// 404 Handler
// ============================================================

app.use(
    (req, res) => {

        res.status(404).json({

            success: false,

            message: "Route not found"

        });

    }
);


// Export app
export default app;