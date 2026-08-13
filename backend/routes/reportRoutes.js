// ============================================================
// File: routes/reportRoutes.js
// Purpose: Routes for HMSPro Reports module.
// ============================================================

import express from "express";

import {
    getDashboardReport,
    getAppointmentReport,
    getAdmissionReport,
    getBillingReport,
    getMedicineInventoryReport,
} from "../controllers/reportController.js";

import { protect } from "../middleware/authMiddleware.js";

// ============================================================
// Router
// ============================================================

const router = express.Router();

// ============================================================
// Dashboard Report
// GET /api/reports/dashboard
// ============================================================

router.get(
    "/dashboard",
    protect,
    getDashboardReport
);

// ============================================================
// Appointment Report
// GET /api/reports/appointments
// ============================================================

router.get(
    "/appointments",
    protect,
    getAppointmentReport
);

// ============================================================
// Admission Report
// GET /api/reports/admissions
// ============================================================

router.get(
    "/admissions",
    protect,
    getAdmissionReport
);

// ============================================================
// Billing Report
// GET /api/reports/billing
// ============================================================

router.get(
    "/billing",
    protect,
    getBillingReport
);

// ============================================================
// Medicine Inventory Report
// GET /api/reports/medicines
// ============================================================

router.get(
    "/medicines",
    protect,
    getMedicineInventoryReport
);

// ============================================================
// Export Router
// ============================================================

export default router;