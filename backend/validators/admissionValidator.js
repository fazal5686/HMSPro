// ============================================================
// File: validators/admissionValidator.js
// Purpose: Validate Admission API request data.
// ============================================================

import { body, param } from "express-validator";

// ============================================================
// MongoDB ObjectId Validation
// ============================================================

const mongoIdRegex =
    /^[0-9a-fA-F]{24}$/;

// ============================================================
// Create Admission Validator
// ============================================================

export const createAdmissionValidator = [

    body("patientId")

        .trim()

        .notEmpty()
        .withMessage(
            "Patient ID is required."
        )

        .matches(mongoIdRegex)
        .withMessage(
            "Patient ID must be a valid MongoDB ID."
        ),

    body("doctorId")

        .trim()

        .notEmpty()
        .withMessage(
            "Doctor ID is required."
        )

        .matches(mongoIdRegex)
        .withMessage(
            "Doctor ID must be a valid MongoDB ID."
        ),

    body("roomId")

        .trim()

        .notEmpty()
        .withMessage(
            "Room ID is required."
        )

        .matches(mongoIdRegex)
        .withMessage(
            "Room ID must be a valid MongoDB ID."
        ),

    body("admissionDate")

        .optional()

        .isISO8601()
        .withMessage(
            "Admission date must be a valid date."
        ),

    body("expectedDischargeDate")

        .optional()

        .isISO8601()
        .withMessage(
            "Expected discharge date must be a valid date."
        ),

    body("reason")

        .trim()

        .notEmpty()
        .withMessage(
            "Admission reason is required."
        )

        .isLength({
            max: 500,
        })
        .withMessage(
            "Admission reason cannot exceed 500 characters."
        ),

    // --------------------------------------------------------
    // Diagnosis
    // --------------------------------------------------------

    body("diagnosis")

        .optional()

        .trim()

        .isLength({
            max: 1000,
        })
        .withMessage(
            "Diagnosis cannot exceed 1000 characters."
        ),

    body("status")

        .optional()

        .isIn([
            "Admitted",
            "Discharged",
            "Cancelled",
        ])
        .withMessage(
            "Invalid admission status."
        ),

    body("notes")

        .optional()

        .isLength({
            max: 1000,
        })
        .withMessage(
            "Notes cannot exceed 1000 characters."
        ),

    body("isActive")

        .optional()

        .isBoolean()
        .withMessage(
            "isActive must be a boolean."
        ),

];

// ============================================================
// Update Admission Validator
// ============================================================

export const updateAdmissionValidator = [

    param("id")

        .matches(mongoIdRegex)
        .withMessage(
            "Admission ID must be a valid MongoDB ID."
        ),

    body("patientId")

        .optional()

        .trim()

        .matches(mongoIdRegex)
        .withMessage(
            "Patient ID must be a valid MongoDB ID."
        ),

    body("doctorId")

        .optional()

        .trim()

        .matches(mongoIdRegex)
        .withMessage(
            "Doctor ID must be a valid MongoDB ID."
        ),

    body("roomId")

        .optional()

        .trim()

        .matches(mongoIdRegex)
        .withMessage(
            "Room ID must be a valid MongoDB ID."
        ),

    body("admissionDate")

        .optional()

        .isISO8601()
        .withMessage(
            "Admission date must be a valid date."
        ),

    body("expectedDischargeDate")

        .optional()

        .isISO8601()
        .withMessage(
            "Expected discharge date must be a valid date."
        ),

    body("dischargeDate")

        .optional()

        .isISO8601()
        .withMessage(
            "Discharge date must be a valid date."
        ),

    body("reason")

        .optional()

        .trim()

        .isLength({
            max: 500,
        })
        .withMessage(
            "Admission reason cannot exceed 500 characters."
        ),

    // --------------------------------------------------------
    // Diagnosis
    // --------------------------------------------------------

    body("diagnosis")

        .optional()

        .trim()

        .isLength({
            max: 1000,
        })
        .withMessage(
            "Diagnosis cannot exceed 1000 characters."
        ),

    body("status")

        .optional()

        .isIn([
            "Admitted",
            "Discharged",
            "Cancelled",
        ])
        .withMessage(
            "Invalid admission status."
        ),

    body("notes")

        .optional()

        .isLength({
            max: 1000,
        })
        .withMessage(
            "Notes cannot exceed 1000 characters."
        ),

    body("isActive")

        .optional()

        .isBoolean()
        .withMessage(
            "isActive must be a boolean."
        ),

];

// ============================================================
// Admission ID Validator
// ============================================================

export const admissionIdValidator = [

    param("id")

        .matches(mongoIdRegex)
        .withMessage(
            "Admission ID must be a valid MongoDB ID."
        ),

];

// ============================================================
// Patient ID Validator
// ============================================================

export const admissionPatientIdValidator = [

    param("patientId")

        .matches(mongoIdRegex)
        .withMessage(
            "Patient ID must be a valid MongoDB ID."
        ),

];

// ============================================================
// Doctor ID Validator
// ============================================================

export const admissionDoctorIdValidator = [

    param("doctorId")

        .matches(mongoIdRegex)
        .withMessage(
            "Doctor ID must be a valid MongoDB ID."
        ),

];

// ============================================================
// Room ID Validator
// ============================================================

export const admissionRoomIdValidator = [

    param("roomId")

        .matches(mongoIdRegex)
        .withMessage(
            "Room ID must be a valid MongoDB ID."
        ),

];