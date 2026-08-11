
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
// Doctors and Patients should use their own appointment
// endpoints instead of accessing every appointment.
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
// NOTE:
// The controller currently accepts patientId from the URL.
// Later we will add ownership checking so a Patient can only
// access their own appointments.
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
// Ownership checking will be strengthened in the service
// layer as the Appointment module develops.
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
