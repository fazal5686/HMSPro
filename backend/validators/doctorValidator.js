// ============================================================
// File: validators/doctorValidator.js
// Purpose: Validation rules for Doctor module.
// Handles Create and Update Doctor validation separately.
// ============================================================

import { body } from "express-validator";


// ============================================================
// Create Doctor Validation Rules
// Used for:
// POST /api/doctors
// ============================================================

export const createDoctorValidator = [

    // --------------------------------------------------------
    // User ID
    // Must belong to an existing User with Doctor role.
    // --------------------------------------------------------

    body("userId")
        .trim()
        .notEmpty()
        .withMessage(
            "User ID is required."
        )
        .isMongoId()
        .withMessage(
            "User ID must be a valid MongoDB ID."
        ),


    // --------------------------------------------------------
    // Specialization
    // --------------------------------------------------------

    body("specialization")
        .trim()
        .notEmpty()
        .withMessage(
            "Specialization is required."
        )
        .isLength({
            min: 2,
            max: 100,
        })
        .withMessage(
            "Specialization must be between 2 and 100 characters."
        ),


    // --------------------------------------------------------
    // Qualification
    // --------------------------------------------------------

    body("qualification")
        .trim()
        .notEmpty()
        .withMessage(
            "Qualification is required."
        )
        .isLength({
            min: 2,
            max: 100,
        })
        .withMessage(
            "Qualification must be between 2 and 100 characters."
        ),


    // --------------------------------------------------------
    // Experience
    // --------------------------------------------------------

    body("experience")
        .notEmpty()
        .withMessage(
            "Experience is required."
        )
        .isInt({
            min: 0,
        })
        .withMessage(
            "Experience must be zero or greater."
        ),


    // --------------------------------------------------------
    // License Number
    // --------------------------------------------------------

    body("licenseNumber")
        .trim()
        .notEmpty()
        .withMessage(
            "License number is required."
        )
        .isLength({
            min: 3,
            max: 50,
        })
        .withMessage(
            "License number must be between 3 and 50 characters."
        ),


    // --------------------------------------------------------
    // Consultation Fee
    // --------------------------------------------------------

    body("consultationFee")
        .optional()
        .isFloat({
            min: 0,
        })
        .withMessage(
            "Consultation fee must be zero or greater."
        ),


    // --------------------------------------------------------
    // Department
    // --------------------------------------------------------

    body("department")
        .optional()
        .trim()
        .notEmpty()
        .withMessage(
            "Department cannot be empty."
        )
        .isLength({
            max: 100,
        })
        .withMessage(
            "Department name cannot exceed 100 characters."
        ),

];


// ============================================================
// Update Doctor Validation Rules
// Used for:
// PUT /api/doctors/:id
// ============================================================

export const updateDoctorValidator = [

    // --------------------------------------------------------
    // Specialization
    // --------------------------------------------------------

    body("specialization")
        .optional()
        .trim()
        .notEmpty()
        .withMessage(
            "Specialization cannot be empty."
        )
        .isLength({
            min: 2,
            max: 100,
        })
        .withMessage(
            "Specialization must be between 2 and 100 characters."
        ),


    // --------------------------------------------------------
    // Qualification
    // --------------------------------------------------------

    body("qualification")
        .optional()
        .trim()
        .notEmpty()
        .withMessage(
            "Qualification cannot be empty."
        )
        .isLength({
            min: 2,
            max: 100,
        })
        .withMessage(
            "Qualification must be between 2 and 100 characters."
        ),


    // --------------------------------------------------------
    // Experience
    // --------------------------------------------------------

    body("experience")
        .optional()
        .isInt({
            min: 0,
        })
        .withMessage(
            "Experience must be zero or greater."
        ),


    // --------------------------------------------------------
    // License Number
    // --------------------------------------------------------

    body("licenseNumber")
        .optional()
        .trim()
        .notEmpty()
        .withMessage(
            "License number cannot be empty."
        )
        .isLength({
            min: 3,
            max: 50,
        })
        .withMessage(
            "License number must be between 3 and 50 characters."
        ),


    // --------------------------------------------------------
    // Consultation Fee
    // --------------------------------------------------------

    body("consultationFee")
        .optional()
        .isFloat({
            min: 0,
        })
        .withMessage(
            "Consultation fee must be zero or greater."
        ),


    // --------------------------------------------------------
    // Department
    // --------------------------------------------------------

    body("department")
        .optional()
        .trim()
        .notEmpty()
        .withMessage(
            "Department cannot be empty."
        )
        .isLength({
            max: 100,
        })
        .withMessage(
            "Department name cannot exceed 100 characters."
        ),


    // --------------------------------------------------------
    // Availability
    // --------------------------------------------------------

    body("availability")
        .optional()
        .isBoolean()
        .withMessage(
            "Availability must be true or false."
        ),

];


// ============================================================
// Backward Compatibility
// Existing imports can continue working.
// ============================================================

export const doctorValidationRules = createDoctorValidator;