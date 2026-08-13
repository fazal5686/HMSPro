// ============================================================
// File: validators/billingValidator.js
// Purpose: Validation rules for Billing module.
// Handles Create, Update, and ID validation separately.
// ============================================================

import { body, param } from "express-validator";

// ============================================================
// Create Billing Validation
// POST /api/billings
// ============================================================

export const createBillingValidator = [

    // --------------------------------------------------------
    // Patient ID
    // --------------------------------------------------------

    body("patientId")

        .notEmpty()

        .withMessage(
            "Patient ID is required."
        )

        .isMongoId()

        .withMessage(
            "Patient ID must be a valid MongoDB ID."
        ),


    // --------------------------------------------------------
    // Admission ID
    // --------------------------------------------------------

    body("admissionId")

        .optional({
            nullable: true,
        })

        .isMongoId()

        .withMessage(
            "Admission ID must be a valid MongoDB ID."
        ),


    // --------------------------------------------------------
    // Invoice Number
    // --------------------------------------------------------

    body("invoiceNumber")

        .notEmpty()

        .withMessage(
            "Invoice number is required."
        )

        .trim()

        .isLength({
            max: 50,
        })

        .withMessage(
            "Invoice number cannot exceed 50 characters."
        ),


    // --------------------------------------------------------
    // Consultation Charges
    // --------------------------------------------------------

    body("consultationCharges")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Consultation charges must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Room Charges
    // --------------------------------------------------------

    body("roomCharges")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Room charges must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Medicine Charges
    // --------------------------------------------------------

    body("medicineCharges")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Medicine charges must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Lab Charges
    // --------------------------------------------------------

    body("labCharges")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Lab charges must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Other Charges
    // --------------------------------------------------------

    body("otherCharges")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Other charges must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Discount
    // --------------------------------------------------------

    body("discount")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Discount must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Tax
    // --------------------------------------------------------

    body("tax")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Tax must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
// Total Amount
// --------------------------------------------------------
// Calculated automatically by billingService.js.
// Client does NOT need to provide totalAmount.
// --------------------------------------------------------

body("totalAmount")

.optional()

.isFloat({
    min: 0,
})

.withMessage(
    "Total amount must be greater than or equal to 0."
),


    // --------------------------------------------------------
    // Amount Paid
    // --------------------------------------------------------

    body("amountPaid")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Amount paid must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Balance
    // --------------------------------------------------------

    body("balance")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Balance must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Payment Status
    // --------------------------------------------------------

    body("paymentStatus")

        .optional()

        .isIn([
            "Pending",
            "Partial",
            "Paid",
        ])

        .withMessage(
            "Payment status must be Pending, Partial, or Paid."
        ),


    // --------------------------------------------------------
    // Payment Method
    // --------------------------------------------------------

    body("paymentMethod")

        .optional()

        .isIn([
            "Cash",
            "Card",
            "Bank Transfer",
            "Online",
            "Other",
        ])

        .withMessage(
            "Payment method must be Cash, Card, Bank Transfer, Online, or Other."
        ),


    // --------------------------------------------------------
    // Billing Date
    // --------------------------------------------------------

    body("billingDate")

        .optional()

        .isISO8601()

        .withMessage(
            "Billing date must be a valid date."
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
// Update Billing Validation
// PUT /api/billings/:id
// ============================================================

export const updateBillingValidator = [

    // --------------------------------------------------------
    // Billing ID
    // --------------------------------------------------------

    param("id")

        .isMongoId()

        .withMessage(
            "Billing ID must be a valid MongoDB ID."
        ),


    // --------------------------------------------------------
    // Patient ID
    // --------------------------------------------------------

    body("patientId")

        .optional()

        .isMongoId()

        .withMessage(
            "Patient ID must be a valid MongoDB ID."
        ),


    // --------------------------------------------------------
    // Admission ID
    // --------------------------------------------------------

    body("admissionId")

        .optional({
            nullable: true,
        })

        .isMongoId()

        .withMessage(
            "Admission ID must be a valid MongoDB ID."
        ),


    // --------------------------------------------------------
    // Invoice Number
    // --------------------------------------------------------

    body("invoiceNumber")

        .optional()

        .trim()

        .isLength({
            max: 50,
        })

        .withMessage(
            "Invoice number cannot exceed 50 characters."
        ),


    // --------------------------------------------------------
    // Consultation Charges
    // --------------------------------------------------------

    body("consultationCharges")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Consultation charges must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Room Charges
    // --------------------------------------------------------

    body("roomCharges")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Room charges must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Medicine Charges
    // --------------------------------------------------------

    body("medicineCharges")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Medicine charges must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Lab Charges
    // --------------------------------------------------------

    body("labCharges")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Lab charges must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Other Charges
    // --------------------------------------------------------

    body("otherCharges")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Other charges must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Discount
    // --------------------------------------------------------

    body("discount")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Discount must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Tax
    // --------------------------------------------------------

    body("tax")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Tax must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Total Amount
    // --------------------------------------------------------

    body("totalAmount")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Total amount must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Amount Paid
    // --------------------------------------------------------

    body("amountPaid")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Amount paid must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Balance
    // --------------------------------------------------------

    body("balance")

        .optional()

        .isFloat({
            min: 0,
        })

        .withMessage(
            "Balance must be greater than or equal to 0."
        ),


    // --------------------------------------------------------
    // Payment Status
    // --------------------------------------------------------

    body("paymentStatus")

        .optional()

        .isIn([
            "Pending",
            "Partial",
            "Paid",
        ])

        .withMessage(
            "Payment status must be Pending, Partial, or Paid."
        ),


    // --------------------------------------------------------
    // Payment Method
    // --------------------------------------------------------

    body("paymentMethod")

        .optional()

        .isIn([
            "Cash",
            "Card",
            "Bank Transfer",
            "Online",
            "Other",
        ])

        .withMessage(
            "Payment method must be Cash, Card, Bank Transfer, Online, or Other."
        ),


    // --------------------------------------------------------
    // Billing Date
    // --------------------------------------------------------

    body("billingDate")

        .optional()

        .isISO8601()

        .withMessage(
            "Billing date must be a valid date."
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
// Billing ID Validation
// GET /api/billings/:id
// DELETE /api/billings/:id
// ============================================================

export const billingIdValidator = [

    param("id")

        .isMongoId()

        .withMessage(
            "Billing ID must be a valid MongoDB ID."
        ),

];


// ============================================================
// Backward Compatibility
// ============================================================

export const billingValidationRules =
    createBillingValidator;