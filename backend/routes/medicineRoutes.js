// ============================================================
// File: routes/medicineRoutes.js
// Purpose: Medicine API routes for HMSPro.
// ============================================================

import express from "express";

import {
    createMedicineValidator,
    updateMedicineValidator,
    medicineIdValidator,
} from "../validators/medicineValidator.js";

import validateRequest from "../middleware/validateRequest.js";

import protect from "../middleware/protect.js";

import authorize from "../middleware/authorize.js";

import { ROLES } from "../constants/roles.js";

import {
    createMedicine,
    getMedicineById,
    getAllMedicines,
    updateMedicine,
    deleteMedicine,
} from "../controllers/medicineController.js";

// ============================================================
// Create Router
// ============================================================

const router = express.Router();

// ============================================================
// Create Medicine
// POST /api/medicines
//
// Allowed:
// Admin
// ============================================================

router.post(
    "/",
    protect,
    authorize(
        ROLES.ADMIN
    ),
    createMedicineValidator,
    validateRequest,
    createMedicine
);

// ============================================================
// Get All Medicines
// GET /api/medicines
//
// Allowed:
// Admin
// Doctor
// Pharmacist
// ============================================================

router.get(
    "/",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.DOCTOR,
        ROLES.PHARMACIST
    ),
    getAllMedicines
);

// ============================================================
// Get Medicine By ID
// GET /api/medicines/:id
//
// Allowed:
// Admin
// Doctor
// Pharmacist
// ============================================================

router.get(
    "/:id",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.DOCTOR,
        ROLES.PHARMACIST
    ),
    medicineIdValidator,
    validateRequest,
    getMedicineById
);

// ============================================================
// Update Medicine
// PUT /api/medicines/:id
//
// Allowed:
// Admin
// Pharmacist
// ============================================================

router.put(
    "/:id",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.PHARMACIST
    ),
    updateMedicineValidator,
    validateRequest,
    updateMedicine
);

// ============================================================
// Delete Medicine
// DELETE /api/medicines/:id
//
// Allowed:
// Admin
// ============================================================

router.delete(
    "/:id",
    protect,
    authorize(
        ROLES.ADMIN
    ),
    medicineIdValidator,
    validateRequest,
    deleteMedicine
);

// ============================================================
// Export Router
// ============================================================

export default router;