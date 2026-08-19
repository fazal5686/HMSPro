// ============================================================
// File: validators/nurseValidator.js
// Purpose: Validation rules for Nurse module.
// ============================================================

import { body } from "express-validator";


// ============================================================
// Create Nurse Validation
// ============================================================

export const createNurseValidator = [

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

    body("shift")
        .optional()
        .isIn([
            "Morning",
            "Evening",
            "Night",
            "Rotating",
        ])
        .withMessage(
            "Invalid nurse shift."
        ),

];


// ============================================================
// Update Nurse Validation
// ============================================================

export const updateNurseValidator = [

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

    body("experience")
        .optional()
        .isInt({
            min: 0,
        })
        .withMessage(
            "Experience must be zero or greater."
        ),

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

    body("shift")
        .optional()
        .isIn([
            "Morning",
            "Evening",
            "Night",
            "Rotating",
        ])
        .withMessage(
            "Invalid nurse shift."
        ),

    body("availability")
        .optional()
        .isBoolean()
        .withMessage(
            "Availability must be true or false."
        ),

    body("isActive")
        .optional()
        .isBoolean()
        .withMessage(
            "Active status must be true or false."
        ),

];


// ============================================================
// Backward Compatibility
// ============================================================

export const nurseValidationRules =
    createNurseValidator;
