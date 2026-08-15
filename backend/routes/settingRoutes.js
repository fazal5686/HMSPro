// ============================================================
// File: routes/settingRoutes.js
// Purpose: Routes for HMSPro Settings module.
// Handles hospital settings creation, retrieval, updates,
// and deletion.
// ============================================================

import express from "express";

// ============================================================
// Controller Imports
// ============================================================

import {
    getSettings,
    createSettings,
    updateSettings,
    deleteSettings,
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
// Roles
// ============================================================

import { ROLES } from "../constants/roles.js";

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
//
// Allowed:
// Admin
// SuperAdmin
// ============================================================

router.post(
    "/",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ),
    createSettingsValidator,
    validateRequest,
    createSettings
);

// ============================================================
// Get Hospital Settings
// GET /api/settings
//
// Allowed:
// Admin
// SuperAdmin
// ============================================================

router.get(
    "/",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ),
    getSettings
);

// ============================================================
// Update Hospital Settings
// PUT /api/settings
//
// Allowed:
// Admin
// SuperAdmin
// ============================================================

router.put(
    "/",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ),
    updateSettingsValidator,
    validateRequest,
    updateSettings
);

// ============================================================
// Delete Hospital Settings
// DELETE /api/settings
//
// Allowed:
// Admin
// SuperAdmin
// ============================================================

router.delete(
    "/",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ),
    deleteSettings
);

// ============================================================
// Export Router
// ============================================================

export default router;