
// ============================================================
// File: app.js
// Purpose: Express application configuration for HMSPro.
// Handles middleware, static files, API routes, and 404 handling.
// ============================================================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

// ============================================================
// Route Imports
// ============================================================

import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";
// ============================================================
// Load Environment Variables
// ============================================================

dotenv.config();

// ============================================================
// Create Express Application
// ============================================================

const app = express();

// ============================================================
// Global Middleware
// ============================================================

// ------------------------------------------------------------
// Enable CORS
// ------------------------------------------------------------

app.use(
    cors()
);

// ------------------------------------------------------------
// Request Logger
// ------------------------------------------------------------

app.use(
    morgan("dev")
);

// ------------------------------------------------------------
// Parse JSON Requests
// ------------------------------------------------------------

app.use(
    express.json()
);

// ------------------------------------------------------------
// Parse URL-encoded Form Data
// ------------------------------------------------------------

app.use(
    express.urlencoded({
        extended: true,
    })
);

// ============================================================
// Static Files
// ============================================================

// Serve uploaded files
// Example:
// http://localhost:5000/uploads/filename.jpg

app.use(
    "/uploads",
    express.static("uploads")
);

// ============================================================
// API Routes
// ============================================================

// ------------------------------------------------------------
// Authentication Routes
// Base URL:
// /api/auth
// ------------------------------------------------------------

app.use(
    "/api/auth",
    authRoutes
);

// ------------------------------------------------------------
// Patient Routes
// Base URL:
// /api/patients
// ------------------------------------------------------------

app.use(
    "/api/patients",
    patientRoutes
);

// ------------------------------------------------------------
// Doctor Routes
// Base URL:
// /api/doctors
// ------------------------------------------------------------

app.use(
    "/api/doctors",
    doctorRoutes
);

// ------------------------------------------------------------
// Appointment Routes
// Base URL:
// /api/appointments
// ------------------------------------------------------------

app.use(
    "/api/appointments",
    appointmentRoutes
);

// ------------------------------------------------------------
// Department Routes
// Base URL:
// /api/departments
// ------------------------------------------------------------

app.use(
    "/api/departments",
    departmentRoutes
);

// ------------------------------------------------------------
// Room Routes
// Base URL:
// /api/rooms
// ------------------------------------------------------------

app.use(
    "/api/rooms",
    roomRoutes
);
app.use(
    "/api/admissions",
    admissionRoutes
);
app.use(
    "/api/medicines",
    medicineRoutes
);
app.use(
    "/api/reports",
     reportRoutes
    );
    app.use(
        "/api/settings", 
        settingRoutes
    );
// ------------------------------------------------------------
// Billing Routes
// Base URL:
// /api/billings
// ------------------------------------------------------------

app.use(
    "/api/billings",
    billingRoutes
);
// ============================================================
// Default / Health Check Route
// GET /
// ============================================================

app.get(
    "/",
    (req, res) => {

        return res.status(200).json({

            success: true,

            message: "HMSPro Backend Running",

        });

    }
);

// ============================================================
// 404 Route Handler
// Must remain AFTER all API routes.
// ============================================================

app.use(
    (req, res) => {

        return res.status(404).json({

            success: false,

            message: "Route not found",

        });

    }
);
// ============================================================
// Global Error Handler
// Must remain AFTER all routes and 404 handler.
// ============================================================

// ============================================================
// Global Error Handler
// Must remain AFTER all routes and 404 handler.
// ============================================================

app.use(
    (error, req, res, next) => {

        console.error(
            "Global Error:",
            error
        );

        // --------------------------------------------------------
        // Default status code
        // --------------------------------------------------------

        let statusCode = 500;

        // --------------------------------------------------------
        // Known business errors
        // --------------------------------------------------------

        if (
            error.message ===
            "Email already exists."
        ) {

            statusCode = 409;

        }

        else if (
            error.message ===
            "Invalid email or password."
        ) {

            statusCode = 401;

        }

        else if (
            error.message ===
            "Your account has been deactivated."
        ) {

            statusCode = 401;

        }

        else if (
            error.message ===
            "Patient profile already exists."
        ) {

            statusCode = 409;

        }

        else if (
            error.message ===
            "Billing record not found."
        ) {

            statusCode = 404;

        }

        else if (
            error.message ===
            "Invoice number already exists."
        ) {

            statusCode = 409;

        }

        else if (
            error.message ===
            "Amount paid cannot exceed total amount."
        ) {

            statusCode = 400;

        }

        else if (
            error.message ===
            "Patient profile not found."
        ) {

            statusCode = 404;

        }

        // --------------------------------------------------------
        // Send Error Response
        // --------------------------------------------------------

        return res.status(statusCode).json({

            success: false,

            message:
                error.message ||
                "Internal server error.",

        });

    }
);
// ============================================================
// Export Application
// ============================================================

export default app;
