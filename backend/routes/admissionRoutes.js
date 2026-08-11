
// ============================================================
// File: routes/admissionRoutes.js
// Purpose: API routes for Admission module.
// ============================================================

import express from "express";

// ============================================================
// Validators
// ============================================================

import {
    createAdmissionValidator,
    updateAdmissionValidator,
    admissionIdValidator,
    admissionPatientIdValidator,
    admissionDoctorIdValidator,
    admissionRoomIdValidator,
} from "../validators/admissionValidator.js";

// ============================================================
// Middleware
// ============================================================

import protect from "../middleware/protect.js";
import authorize from "../middleware/authorize.js";
import validateRequest from "../middleware/validateRequest.js";

// ============================================================
// Roles
// ============================================================

import { ROLES } from "../constants/roles.js";

// ============================================================
// Controllers
// ============================================================

import {
    createAdmission,
    getAdmissionById,
    getAllAdmissions,
    getAdmissionsByPatient,
    getAdmissionsByDoctor,
    getAdmissionsByRoom,
    updateAdmission,
    deleteAdmission,
} from "../controllers/admissionController.js";

// ============================================================
// Router
// ============================================================

const router = express.Router();

// ============================================================
// Create Admission
// POST /api/admissions
//
// Admin, Doctor and Receptionist can create admissions.
// ============================================================

router.post(
    "/",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.DOCTOR,
        ROLES.RECEPTIONIST
    ),
    createAdmissionValidator,
    validateRequest,
    createAdmission
);

// ============================================================
// Get All Admissions
// GET /api/admissions
//
// Admin, Doctor, Receptionist and Nurse can view admissions.
// ============================================================

router.get(
    "/",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.DOCTOR,
        ROLES.RECEPTIONIST,
        ROLES.NURSE
    ),
    getAllAdmissions
);

// ============================================================
// Get Admissions By Patient
// GET /api/admissions/patient/:patientId
// ============================================================

router.get(
    "/patient/:patientId",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.DOCTOR,
        ROLES.RECEPTIONIST,
        ROLES.NURSE
    ),
    admissionPatientIdValidator,
    validateRequest,
    getAdmissionsByPatient
);

// ============================================================
// Get Admissions By Doctor
// GET /api/admissions/doctor/:doctorId
// ============================================================

router.get(
    "/doctor/:doctorId",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.DOCTOR,
        ROLES.RECEPTIONIST,
        ROLES.NURSE
    ),
    admissionDoctorIdValidator,
    validateRequest,
    getAdmissionsByDoctor
);

// ============================================================
// Get Admissions By Room
// GET /api/admissions/room/:roomId
// ============================================================

router.get(
    "/room/:roomId",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.DOCTOR,
        ROLES.RECEPTIONIST,
        ROLES.NURSE
    ),
    admissionRoomIdValidator,
    validateRequest,
    getAdmissionsByRoom
);

// ============================================================
// Get Admission By ID
// GET /api/admissions/:id
// ============================================================

router.get(
    "/:id",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.DOCTOR,
        ROLES.RECEPTIONIST,
        ROLES.NURSE
    ),
    admissionIdValidator,
    validateRequest,
    getAdmissionById
);

// ============================================================
// Update Admission
// PUT /api/admissions/:id
//
// Admin, Doctor and Nurse can update admissions.
// ============================================================

router.put(
    "/:id",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.DOCTOR,
        ROLES.NURSE
    ),
    updateAdmissionValidator,
    validateRequest,
    updateAdmission
);

// ============================================================
// Delete Admission
// DELETE /api/admissions/:id
//
// Only Admin can delete an admission.
// ============================================================

router.delete(
    "/:id",
    protect,
    authorize(
        ROLES.ADMIN
    ),
    admissionIdValidator,
    validateRequest,
    deleteAdmission
);

// ============================================================
// Export Router
// ============================================================

export default router;
