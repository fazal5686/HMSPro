// ============================================================
// File: server.js
// Purpose: HMSPro Backend Entry Point
// ============================================================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";


// Load environment variables
dotenv.config();


// Create Express application
const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// Static uploads folder
app.use("/uploads", express.static("uploads"));


// Database connection
connectDB();


// ============================================================
// API Routes
// ============================================================

app.use("/api/auth", authRoutes);

app.use("/api/patients", patientRoutes);


// ============================================================
// Test route
// ============================================================

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "HMSPro Backend Running"
    });

});


// ============================================================
// Server start
// ============================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`HMSPro Server running on port ${PORT}`);

});