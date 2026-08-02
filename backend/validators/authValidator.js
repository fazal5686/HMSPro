// ============================================================
// File: validators/authValidator.js
// Purpose: Validates authentication related requests.
// Prevents invalid data from reaching controllers/services.
// ============================================================

import { body } from "express-validator";


// ============================================================
// Register User Validation
// ============================================================

export const registerValidator = [

    // Full name validation
    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name is required."),


    // Email validation
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please enter a valid email address."),


    // Password validation
    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters."),


    // Phone validation (optional)
    body("phone")
        .optional()
        .isLength({ min: 11, max: 11 })
        .withMessage("Phone number must contain 11 digits."),

];


// ============================================================
// Login Validation
// ============================================================

export const loginValidator = [

    // Email validation
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please enter a valid email address."),


    // Password validation
    body("password")
        .notEmpty()
        .withMessage("Password is required."),

];