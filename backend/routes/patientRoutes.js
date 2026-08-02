// ============================================================
// File: routes/patientRoutes.js
// Purpose: Patient API routes.
// ============================================================

import express from "express";

import {
    createPatientProfile,
    getPatientProfile,
    updatePatientProfile
} from "../controllers/patientController.js";

import protect from "../middleware/protect.js";

import authorize from "../middleware/authorize.js";


const router = express.Router();



// Create patient profile
router.post(
    "/profile",
    protect,
    authorize("Patient"),
    createPatientProfile
);



// Get patient profile
router.get(
    "/profile",
    protect,
    authorize("Patient"),
    getPatientProfile
);



// Update patient profile
router.put(
    "/profile",
    protect,
    authorize("Patient"),
    updatePatientProfile
);



export default router;