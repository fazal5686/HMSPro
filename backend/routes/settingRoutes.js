import express from "express";

import {
    getSettings,
    createSettings,
    updateSettings,
} from "../controllers/settingController.js";

import protect from "../middleware/protect.js";
import authorize from "../middleware/authorize.js";

import {
    createSettingsValidator,
    updateSettingsValidator,
} from "../validators/settingValidator.js";

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
    updateSettings
);

// ============================================================
// Export Router
// ============================================================

export default router;