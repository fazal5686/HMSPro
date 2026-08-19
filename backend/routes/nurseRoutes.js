// ============================================================
// File: routes/nurseRoutes.js
// Purpose: Nurse API routes for HMSPro.
// ============================================================

import express from "express";

import {
    createNurseValidator,
    updateNurseValidator,
} from "../validators/nurseValidator.js";

import validateRequest
    from "../middleware/validateRequest.js";

import protect
    from "../middleware/protect.js";

import authorize
    from "../middleware/authorize.js";

import { ROLES }
    from "../constants/roles.js";

import upload
    from "../middleware/uploadMiddleware.js";

import {
    createNurse,
    getMyNurseProfile,
    getNurseById,
    getAllNurses,
    updateNurse,
    deleteNurse,
} from "../controllers/nurseController.js";


// ============================================================
// Router
// ============================================================

const router = express.Router();


// ============================================================
// Create Nurse
// POST /api/nurses
//
// Access:
//     Admin
//     SuperAdmin
// ============================================================

router.post(
    "/",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ),
    upload.single("profileImage"),
    createNurseValidator,
    validateRequest,
    createNurse
);


// ============================================================
// Get All Nurses
// GET /api/nurses
//
// Access:
//     Authenticated users
// ============================================================

router.get(
    "/",
    protect,
    getAllNurses
);


// ============================================================
// Get Logged-in Nurse Profile
// GET /api/nurses/me
//
// Access:
//     Authenticated users
// ============================================================

router.get(
    "/me",
    protect,
    getMyNurseProfile
);


// ============================================================
// Get Nurse By ID
// GET /api/nurses/:id
//
// Access:
//     Authenticated users
// ============================================================

router.get(
    "/:id",
    protect,
    getNurseById
);


// ============================================================
// Update Nurse
// PUT /api/nurses/:id
//
// Access:
//     Admin
//     SuperAdmin
// ============================================================

router.put(
    "/:id",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ),
    upload.single("profileImage"),
    updateNurseValidator,
    validateRequest,
    updateNurse
);


// ============================================================
// Delete Nurse
// DELETE /api/nurses/:id
//
// Access:
//     Admin
//     SuperAdmin
// ============================================================

router.delete(
    "/:id",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.SUPER_ADMIN
    ),
    deleteNurse
);


// ============================================================
// Export Router
// ============================================================

export default router;