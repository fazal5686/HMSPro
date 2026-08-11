
// ============================================================
// File: validators/appointmentValidator.js
// Purpose: Validation rules for Appointment module.
// Handles Create and Update Appointment validation separately.
// ============================================================

import { body, param } from "express-validator";


// ============================================================
// Create Appointment Validation Rules
// Used for:
// POST /api/appointments
// ============================================================

export const createAppointmentValidator = [

    // --------------------------------------------------------
    // Patient ID
    // --------------------------------------------------------

    body("patientId")

        .trim()

        .notEmpty()

        .withMessage(
            "Patient ID is required."
        )

        .isMongoId()

        .withMessage(
            "Patient ID must be a valid MongoDB ID."
        ),


    // --------------------------------------------------------
    // Doctor ID
    // --------------------------------------------------------

    body("doctorId")

        .trim()

        .notEmpty()

        .withMessage(
            "Doctor ID is required."
        )

        .isMongoId()

        .withMessage(
            "Doctor ID must be a valid MongoDB ID."
        ),


    // --------------------------------------------------------
    // Appointment Date
    // --------------------------------------------------------

    body("appointmentDate")

        .notEmpty()

        .withMessage(
            "Appointment date is required."
        )

        .isISO8601()

        .withMessage(
            "Appointment date must be a valid date and time."
        ),


    // --------------------------------------------------------
    // Appointment Reason
    // --------------------------------------------------------

    body("reason")

        .trim()

        .notEmpty()

        .withMessage(
            "Appointment reason is required."
        )

        .isLength({

            min: 2,

            max: 500,

        })

        .withMessage(
            "Appointment reason must be between 2 and 500 characters."
        ),


    // --------------------------------------------------------
    // Appointment Notes
    // --------------------------------------------------------

    body("notes")

        .optional()

        .trim()

        .isLength({

            max: 1000,

        })

        .withMessage(
            "Appointment notes cannot exceed 1000 characters."
        ),

];


// ============================================================
// Update Appointment Validation Rules
// Used for:
// PUT /api/appointments/:id
// ============================================================

export const updateAppointmentValidator = [

    // --------------------------------------------------------
    // Appointment ID
    // --------------------------------------------------------

    param("id")

        .isMongoId()

        .withMessage(
            "Appointment ID must be a valid MongoDB ID."
        ),


    // --------------------------------------------------------
    // Patient ID
    // --------------------------------------------------------

    body("patientId")

        .optional()

        .trim()

        .isMongoId()

        .withMessage(
            "Patient ID must be a valid MongoDB ID."
        ),


    // --------------------------------------------------------
    // Doctor ID
    // --------------------------------------------------------

    body("doctorId")

        .optional()

        .trim()

        .isMongoId()

        .withMessage(
            "Doctor ID must be a valid MongoDB ID."
        ),


    // --------------------------------------------------------
    // Appointment Date
    // --------------------------------------------------------

    body("appointmentDate")

        .optional()

        .isISO8601()

        .withMessage(
            "Appointment date must be a valid date and time."
        ),


    // --------------------------------------------------------
    // Appointment Reason
    // --------------------------------------------------------

    body("reason")

        .optional()

        .trim()

        .isLength({

            min: 2,

            max: 500,

        })

        .withMessage(
            "Appointment reason must be between 2 and 500 characters."
        ),


    // --------------------------------------------------------
    // Appointment Status
    // --------------------------------------------------------

    body("status")

        .optional()

        .isIn([

            "Pending",

            "Confirmed",

            "Completed",

            "Cancelled",

            "No Show",

        ])

        .withMessage(
            "Invalid appointment status."
        ),


    // --------------------------------------------------------
    // Appointment Notes
    // --------------------------------------------------------

    body("notes")

        .optional()

        .trim()

        .isLength({

            max: 1000,

        })

        .withMessage(
            "Appointment notes cannot exceed 1000 characters."
        ),

];


// ============================================================
// Appointment ID Validation
// Used for:
// GET /api/appointments/:id
// DELETE /api/appointments/:id
// ============================================================

export const appointmentIdValidator = [

    param("id")

        .isMongoId()

        .withMessage(
            "Appointment ID must be a valid MongoDB ID."
        ),

];


// ============================================================
// Patient ID Validation
// Used for:
// GET /api/appointments/patient/:patientId
// ============================================================

export const patientIdValidator = [

    param("patientId")

        .isMongoId()

        .withMessage(
            "Patient ID must be a valid MongoDB ID."
        ),

];


// ============================================================
// Doctor ID Validation
// Used for:
// GET /api/appointments/doctor/:doctorId
// ============================================================

export const doctorIdValidator = [

    param("doctorId")

        .isMongoId()

        .withMessage(
            "Doctor ID must be a valid MongoDB ID."
        ),

];


// ============================================================
// Backward Compatibility
// ============================================================

export const appointmentValidationRules =
    createAppointmentValidator;
