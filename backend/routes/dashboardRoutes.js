
// ============================================================
// File: routes/dashboardRoutes.js
// Purpose: Routes for HMSPro Dashboard statistics.
// ============================================================

import express from "express";

import {
    getDashboardStatistics,
} from "../controllers/dashboardController.js";

import protect from "../middleware/protect.js";


// ============================================================
// Router
// ============================================================

const router = express.Router();


// ============================================================
// Dashboard Statistics
// GET /api/dashboard
// ============================================================

router.get(
    "/",
    protect,
    getDashboardStatistics
);


// ============================================================
// Export
// ============================================================

export default router;
