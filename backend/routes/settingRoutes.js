
// ============================================================
// File: routes/settingRoutes.js
// Purpose: Routes for HMSPro Settings module.
// Handles hospital settings creation, retrieval, and updates.
// ============================================================


import express from "express";


// ============================================================
// Controller Imports
// ============================================================

import {
    getSettings,
    createSettings,
    updateSettings,
} from "../controllers/settingController.js";


// ============================================================
// Authentication Middleware
// ============================================================

import protect from "../middleware/protect.js";


// ============================================================
// Authorization Middleware
// ============================================================

import authorize from "../middleware/authorize.js";


// ============================================================
// Validation Rules
// ============================================================

import {
    createSettingsValidator,
    updateSettingsValidator,
} from "../validators/settingValidator.js";


// ============================================================
// Validation Error Middleware
// ============================================================

import validateRequest from "../middleware/validateRequest.js";


// ============================================================
// Router
// ============================================================

const router = express.Router();


// ============================================================
// Create Hospital Settings
// POST /api/settings
// ============================================================

router.post(
    "/",
    protect,
    authorize("Admin", "SuperAdmin"),
    createSettingsValidator,
    validateRequest,
    createSettings
);


// ============================================================
// Get Hospital Settings
// GET /api/settings
// ============================================================

router.get(
    "/",
    protect,
    authorize("Admin", "SuperAdmin"),
    getSettings
);


// ============================================================
// Update Hospital Settings
// PUT /api/settings
// ============================================================

router.put(
    "/",
    protect,
    authorize("Admin", "SuperAdmin"),
    updateSettingsValidator,
    validateRequest,
    updateSettings
);


// ============================================================
// Export Router
// ============================================================

export default router;
