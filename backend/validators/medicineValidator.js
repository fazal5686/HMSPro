// ============================================================
// File: validators/medicineValidator.js
// Purpose: Validation rules for Medicine module.
// Handles Create, Update, and ID validation separately.
// ============================================================

import { body, param } from "express-validator";

// ============================================================
// Create Medicine Validation
// Used for:
// POST /api/medicines
// ============================================================

export const createMedicineValidator = [

    // --------------------------------------------------------
    // Medicine Name
    // --------------------------------------------------------

    body("name")

        .trim()

        .notEmpty()

        .withMessage(
            "Medicine name is required."
        )

        .isLength({
            min: 2,
            max: 150,
        })

        .withMessage(
            "Medicine name must be between 2 and 150 characters."
        ),


    // --------------------------------------------------------
    // Generic Name
    // --------------------------------------------------------

    body("genericName")

        .optional()

        .trim()

        .isLength({
            max: 150,
        })

        .withMessage(
            "Generic name cannot exceed 150 characters."
        ),


    // --------------------------------------------------------
    // Category
    // --------------------------------------------------------

    body("category")

        .optional()

        .trim()

        .isLength({
            max: 100,
        })

        .withMessage(
            "Medicine category cannot exceed 100 characters."
        ),


    // --------------------------------------------------------
    // Manufacturer
    // --------------------------------------------------------

    body("manufacturer")

        .optional()

        .trim()

        .isLength({
            max: 150,
        })

        .withMessage(
            "Manufacturer cannot exceed 150 characters."
        ),


    // --------------------------------------------------------
    // Strength
    // --------------------------------------------------------

    body("strength")

        .optional()

        .trim()

        .isLength({
            max: 50,
        })

        .withMessage(
            "Medicine strength cannot exceed 50 characters."
        ),


    // --------------------------------------------------------
    // Dosage Form
    // --------------------------------------------------------

    body("dosageForm")

        .optional()

        .trim()

        .isLength({
            max: 50,
        })

        .withMessage(
            "Dosage form cannot exceed 50 characters."
        ),


    // --------------------------------------------------------
    // Unit Price
    // --------------------------------------------------------

    body("unitPrice")

        .notEmpty()

        .withMessage(
            "Unit price is required."
        )

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Unit price must be a number greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Quantity
    // --------------------------------------------------------

    body("quantity")

        .notEmpty()

        .withMessage(
            "Quantity is required."
        )

        .isInt({
            min: 0,
        })

        .withMessage(
            "Quantity must be a whole number greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Reorder Level
    // --------------------------------------------------------

    body("reorderLevel")

        .optional()

        .isInt({
            min: 0,
        })

        .withMessage(
            "Reorder level must be a whole number greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Expiry Date
    // --------------------------------------------------------

    body("expiryDate")

        .optional({
            nullable: true,
        })

        .isISO8601()

        .withMessage(
            "Expiry date must be a valid date."
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
// Update Medicine Validation
// Used for:
// PUT /api/medicines/:id
// ============================================================

export const updateMedicineValidator = [

    // --------------------------------------------------------
    // Medicine ID
    // --------------------------------------------------------

    param("id")

        .isMongoId()

        .withMessage(
            "Medicine ID must be a valid MongoDB ID."
        ),


    // --------------------------------------------------------
    // Medicine Name
    // --------------------------------------------------------

    body("name")

        .optional()

        .trim()

        .isLength({
            min: 2,
            max: 150,
        })

        .withMessage(
            "Medicine name must be between 2 and 150 characters."
        ),


    // --------------------------------------------------------
    // Generic Name
    // --------------------------------------------------------

    body("genericName")

        .optional()

        .trim()

        .isLength({
            max: 150,
        })

        .withMessage(
            "Generic name cannot exceed 150 characters."
        ),


    // --------------------------------------------------------
    // Category
    // --------------------------------------------------------

    body("category")

        .optional()

        .trim()

        .isLength({
            max: 100,
        })

        .withMessage(
            "Medicine category cannot exceed 100 characters."
        ),


    // --------------------------------------------------------
    // Manufacturer
    // --------------------------------------------------------

    body("manufacturer")

        .optional()

        .trim()

        .isLength({
            max: 150,
        })

        .withMessage(
            "Manufacturer cannot exceed 150 characters."
        ),


    // --------------------------------------------------------
    // Strength
    // --------------------------------------------------------

    body("strength")

        .optional()

        .trim()

        .isLength({
            max: 50,
        })

        .withMessage(
            "Medicine strength cannot exceed 50 characters."
        ),


    // --------------------------------------------------------
    // Dosage Form
    // --------------------------------------------------------

    body("dosageForm")

        .optional()

        .trim()

        .isLength({
            max: 50,
        })

        .withMessage(
            "Dosage form cannot exceed 50 characters."
        ),


    // --------------------------------------------------------
    // Unit Price
    // --------------------------------------------------------

    body("unitPrice")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Unit price must be a number greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Quantity
    // --------------------------------------------------------

    body("quantity")

        .optional()

        .isInt({
            min: 0,
        })

        .withMessage(
            "Quantity must be a whole number greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Reorder Level
    // --------------------------------------------------------

    body("reorderLevel")

        .optional()

        .isInt({
            min: 0,
        })

        .withMessage(
            "Reorder level must be a whole number greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Expiry Date
    // --------------------------------------------------------

    body("expiryDate")

        .optional({
            nullable: true,
        })

        .isISO8601()

        .withMessage(
            "Expiry date must be a valid date."
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
// Medicine ID Validation
// Used for:
// GET /api/medicines/:id
// DELETE /api/medicines/:id
// ============================================================

export const medicineIdValidator = [

    param("id")

        .isMongoId()

        .withMessage(
            "Medicine ID must be a valid MongoDB ID."
        ),

];


// ============================================================
// Backward Compatibility
// ============================================================

export const medicineValidationRules =
    createMedicineValidator;