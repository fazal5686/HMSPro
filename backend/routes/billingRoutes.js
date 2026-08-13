
// ============================================================
// File: routes/billingRoutes.js
// Purpose: Billing API routes for HMSPro.
// ============================================================

import express from "express";

import {
    createBillingValidator,
    updateBillingValidator,
    billingIdValidator,
} from "../validators/billingValidator.js";

import validateRequest from "../middleware/validateRequest.js";

import protect from "../middleware/protect.js";

import authorize from "../middleware/authorize.js";

import { ROLES } from "../constants/roles.js";

import {
    createBilling,
    getBillingById,
    getAllBillings,
    getBillingsByPatient,
    getBillingsByAdmission,
    updateBilling,
    deleteBilling,
} from "../controllers/billingController.js";

// ============================================================
// Create Router
// ============================================================

const router = express.Router();

// ============================================================
// Create Billing
// POST /api/billings
//
// Allowed:
// Admin
// Accountant
// ============================================================

router.post(
    "/",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.ACCOUNTANT
    ),
    createBillingValidator,
    validateRequest,
    createBilling
);

// ============================================================
// Get All Billings
// GET /api/billings
//
// Allowed:
// Admin
// Accountant
// Receptionist
// ============================================================

router.get(
    "/",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.ACCOUNTANT,
        ROLES.RECEPTIONIST
    ),
    getAllBillings
);

// ============================================================
// Get Billings By Patient
// GET /api/billings/patient/:patientId
//
// Allowed:
// Admin
// Accountant
// Receptionist
// Doctor
// ============================================================

router.get(
    "/patient/:patientId",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.ACCOUNTANT,
        ROLES.RECEPTIONIST,
        ROLES.DOCTOR
    ),
    getBillingsByPatient
);

// ============================================================
// Get Billings By Admission
// GET /api/billings/admission/:admissionId
//
// Allowed:
// Admin
// Accountant
// Receptionist
// Doctor
// ============================================================

router.get(
    "/admission/:admissionId",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.ACCOUNTANT,
        ROLES.RECEPTIONIST,
        ROLES.DOCTOR
    ),
    getBillingsByAdmission
);

// ============================================================
// Get Billing By ID
// GET /api/billings/:id
//
// Allowed:
// Admin
// Accountant
// Receptionist
// Doctor
// ============================================================

router.get(
    "/:id",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.ACCOUNTANT,
        ROLES.RECEPTIONIST,
        ROLES.DOCTOR
    ),
    billingIdValidator,
    validateRequest,
    getBillingById
);

// ============================================================
// Update Billing
// PUT /api/billings/:id
//
// Allowed:
// Admin
// Accountant
// ============================================================

router.put(
    "/:id",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.ACCOUNTANT
    ),
    updateBillingValidator,
    validateRequest,
    updateBilling
);

// ============================================================
// Delete Billing
// DELETE /api/billings/:id
//
// Allowed:
// Admin
// Accountant
// ============================================================

router.delete(
    "/:id",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.ACCOUNTANT
    ),
    billingIdValidator,
    validateRequest,
    deleteBilling
);

// ============================================================
// Export Router
// ============================================================

export default router;
