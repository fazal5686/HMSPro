
// ============================================================
// File: app.js
// Purpose: Express application configuration for HMSPro.
// Handles middleware, static files, API routes, 404 handling,
// and global error handling.
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
// API ROUTES
// ============================================================

// ------------------------------------------------------------
// Authentication
// /api/auth
// ------------------------------------------------------------

app.use(
    "/api/auth",
    authRoutes
);

// ------------------------------------------------------------
// Patients
// /api/patients
// ------------------------------------------------------------

app.use(
    "/api/patients",
    patientRoutes
);

// ------------------------------------------------------------
// Doctors
// /api/doctors
// ------------------------------------------------------------

app.use(
    "/api/doctors",
    doctorRoutes
);

// ------------------------------------------------------------
// Appointments
// /api/appointments
// ------------------------------------------------------------

app.use(
    "/api/appointments",
    appointmentRoutes
);

// ------------------------------------------------------------
// Departments
// /api/departments
// ------------------------------------------------------------

app.use(
    "/api/departments",
    departmentRoutes
);

// ------------------------------------------------------------
// Rooms
// /api/rooms
// ------------------------------------------------------------

app.use(
    "/api/rooms",
    roomRoutes
);

// ------------------------------------------------------------
// Admissions
// /api/admissions
// ------------------------------------------------------------

app.use(
    "/api/admissions",
    admissionRoutes
);

// ------------------------------------------------------------
// Medicines
// /api/medicines
// ------------------------------------------------------------

app.use(
    "/api/medicines",
    medicineRoutes
);

// ------------------------------------------------------------
// Billings
// /api/billings
// ------------------------------------------------------------

app.use(
    "/api/billings",
    billingRoutes
);

// ------------------------------------------------------------
// Reports
// /api/reports
// ------------------------------------------------------------

app.use(
    "/api/reports",
    reportRoutes
);

// ------------------------------------------------------------
// Settings
// /api/settings
// ------------------------------------------------------------

app.use(
    "/api/settings",
    settingRoutes
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

            message:
                "HMSPro Backend Running",

        });

    }
);

// ============================================================
// 404 ROUTE HANDLER
// Must remain AFTER all API routes.
// ============================================================

app.use(
    (req, res) => {

        return res.status(404).json({

            success: false,

            message:
                "Route not found",

        });

    }
);

// ============================================================
// GLOBAL ERROR HANDLER
// Must remain AFTER all routes and 404 handler.
// ============================================================

app.use(
    (error, req, res, next) => {

        console.error(
            "Global Error:",
            error
        );

        // ----------------------------------------------------
        // Use statusCode supplied by service
        // ----------------------------------------------------

        let statusCode =
            error.statusCode || 500;

        // ----------------------------------------------------
        // Known application errors
        // ----------------------------------------------------

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

        // ----------------------------------------------------
        // Send Error Response
        // ----------------------------------------------------

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
