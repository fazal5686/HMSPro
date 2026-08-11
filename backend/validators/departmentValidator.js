// ============================================================
// File: validators/departmentValidator.js
// Purpose: Validation rules for Department module.
// Handles Create, Update, and ID validation separately.
// ============================================================

import { body, param } from "express-validator";

// ============================================================
// Create Department Validation
// Used for:
// POST /api/departments
// ============================================================

export const createDepartmentValidator = [

    // --------------------------------------------------------
    // Department Name
    // --------------------------------------------------------

    body("name")

        .trim()

        .notEmpty()

        .withMessage(
            "Department name is required."
        )

        .isLength({
            min: 2,
            max: 100,
        })

        .withMessage(
            "Department name must be between 2 and 100 characters."
        ),


    // --------------------------------------------------------
    // Department Description
    // --------------------------------------------------------

    body("description")

        .optional()

        .trim()

        .isLength({
            max: 500,
        })

        .withMessage(
            "Department description cannot exceed 500 characters."
        ),


    // --------------------------------------------------------
    // Head Doctor
    // --------------------------------------------------------

    body("headDoctor")

        .optional({
            nullable: true,
        })

        .trim()

        .isMongoId()

        .withMessage(
            "Head Doctor must be a valid MongoDB ID."
        ),


    // --------------------------------------------------------
    // Department Location
    // --------------------------------------------------------

    body("location")

        .optional()

        .trim()

        .isLength({
            max: 200,
        })

        .withMessage(
            "Department location cannot exceed 200 characters."
        ),


    // --------------------------------------------------------
    // Department Phone
    // --------------------------------------------------------

    body("phone")

        .optional()

        .trim()

        .isLength({
            max: 20,
        })

        .withMessage(
            "Department phone cannot exceed 20 characters."
        ),

];


// ============================================================
// Update Department Validation
// Used for:
// PUT /api/departments/:id
// ============================================================

export const updateDepartmentValidator = [

    // --------------------------------------------------------
    // Department ID
    // --------------------------------------------------------

    param("id")

        .isMongoId()

        .withMessage(
            "Department ID must be a valid MongoDB ID."
        ),


    // --------------------------------------------------------
    // Department Name
    // --------------------------------------------------------

    body("name")

        .optional()

        .trim()

        .isLength({
            min: 2,
            max: 100,
        })

        .withMessage(
            "Department name must be between 2 and 100 characters."
        ),


    // --------------------------------------------------------
    // Department Description
    // --------------------------------------------------------

    body("description")

        .optional()

        .trim()

        .isLength({
            max: 500,
        })

        .withMessage(
            "Department description cannot exceed 500 characters."
        ),


    // --------------------------------------------------------
    // Head Doctor
    // --------------------------------------------------------

    body("headDoctor")

        .optional({
            nullable: true,
        })

        .trim()

        .isMongoId()

        .withMessage(
            "Head Doctor must be a valid MongoDB ID."
        ),


    // --------------------------------------------------------
    // Department Location
    // --------------------------------------------------------

    body("location")

        .optional()

        .trim()

        .isLength({
            max: 200,
        })

        .withMessage(
            "Department location cannot exceed 200 characters."
        ),


    // --------------------------------------------------------
    // Department Phone
    // --------------------------------------------------------

    body("phone")

        .optional()

        .trim()

        .isLength({
            max: 20,
        })

        .withMessage(
            "Department phone cannot exceed 20 characters."
        ),


    // --------------------------------------------------------
    // Active Status
    // --------------------------------------------------------

    body("isActive")

        .optional()

        .isBoolean()

        .withMessage(
            "Active status must be true or false."
        ),

];


// ============================================================
// Department ID Validation
// Used for:
// GET /api/departments/:id
// DELETE /api/departments/:id
// ============================================================

export const departmentIdValidator = [

    param("id")

        .isMongoId()

        .withMessage(
            "Department ID must be a valid MongoDB ID."
        ),

];


// ============================================================
// Backward Compatibility
// ============================================================

export const departmentValidationRules =
    createDepartmentValidator;