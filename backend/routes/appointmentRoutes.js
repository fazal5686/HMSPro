// ============================================================
// File: routes/appointmentRoutes.js
// Purpose: Appointment API routes for HMSPro.
// ============================================================

import express from "express";

import {
    createAppointmentValidator,
    updateAppointmentValidator,
    appointmentIdValidator,
    patientIdValidator,
    doctorIdValidator,
} from "../validators/appointmentValidator.js";

import validateRequest from "../middleware/validateRequest.js";

import protect from "../middleware/protect.js";

import authorize from "../middleware/authorize.js";

import { ROLES } from "../constants/roles.js";

import {
    createAppointment,
    getAppointmentById,
    getAllAppointments,
    getPatientAppointments,
    getDoctorAppointments,
    updateAppointment,
    deleteAppointment,
} from "../controllers/appointmentController.js";

// ============================================================
// Create Router
// ============================================================

const router = express.Router();

// ============================================================
// Create Appointment
// POST /api/appointments
//
// Allowed:
// Admin
// Receptionist
// Patient
//
// Patient can book an appointment.
// Admin and Receptionist can create appointments on behalf
// of patients.
// ============================================================

router.post(
    "/",

    protect,

    authorize(
        ROLES.ADMIN,
        ROLES.RECEPTIONIST,
        ROLES.PATIENT
    ),

    createAppointmentValidator,

    validateRequest,

    createAppointment
);

// ============================================================
// Get All Appointments
// GET /api/appointments
//
// Allowed:
// Admin
// Receptionist
//
// Doctors and Patients cannot access all appointments.
// They must use their own restricted endpoints.
// ============================================================

router.get(
    "/",

    protect,

    authorize(
        ROLES.ADMIN,
        ROLES.RECEPTIONIST
    ),

    getAllAppointments
);

// ============================================================
// Get Patient Appointments
// GET /api/appointments/patient/:patientId
//
// Allowed:
// Admin
// Receptionist
// Patient
//
// Security:
// Patient ownership is checked inside the service layer.
// A Patient can only access appointments belonging to
// their own patient profile.
// ============================================================

router.get(
    "/patient/:patientId",

    protect,

    authorize(
        ROLES.ADMIN,
        ROLES.RECEPTIONIST,
        ROLES.PATIENT
    ),

    patientIdValidator,

    validateRequest,

    getPatientAppointments
);

// ============================================================
// Get Doctor Appointments
// GET /api/appointments/doctor/:doctorId
//
// Allowed:
// Admin
// Receptionist
// Doctor
//
// Security:
// Doctor ownership checking can be enforced in the
// service layer.
// ============================================================

router.get(
    "/doctor/:doctorId",

    protect,

    authorize(
        ROLES.ADMIN,
        ROLES.RECEPTIONIST,
        ROLES.DOCTOR
    ),

    doctorIdValidator,

    validateRequest,

    getDoctorAppointments
);

// ============================================================
// Get Appointment By ID
// GET /api/appointments/:id
//
// Allowed:
// Admin
// Receptionist
// Doctor
// Patient
//
// Security:
// Authentication and role authorization are handled here.
// Ownership checking is handled inside the service layer.
//
// Patient:
// Can access only their own appointment.
//
// Doctor:
// Can access only appointments belonging to them.
//
// Admin / Receptionist:
// Can access appointments according to their role.
// ============================================================

router.get(
    "/:id",

    protect,

    authorize(
        ROLES.ADMIN,
        ROLES.RECEPTIONIST,
        ROLES.DOCTOR,
        ROLES.PATIENT
    ),

    appointmentIdValidator,

    validateRequest,

    getAppointmentById
);

// ============================================================
// Update Appointment
// PUT /api/appointments/:id
//
// Allowed:
// Admin
// Receptionist
// Doctor
//
// Patients are not allowed to directly modify appointment
// records through this endpoint.
// ============================================================

router.put(
    "/:id",

    protect,

    authorize(
        ROLES.ADMIN,
        ROLES.RECEPTIONIST,
        ROLES.DOCTOR
    ),

    updateAppointmentValidator,

    validateRequest,

    updateAppointment
);

// ============================================================
// Delete Appointment
// DELETE /api/appointments/:id
//
// Allowed:
// Admin only
// ============================================================

router.delete(
    "/:id",

    protect,

    authorize(
        ROLES.ADMIN
    ),

    appointmentIdValidator,

    validateRequest,

    deleteAppointment
);

// ============================================================
// Export Router
// ============================================================

export default router;