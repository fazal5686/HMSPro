// ============================================================
// File: validators/settingValidator.js
// Purpose: Validation rules for HMSPro Settings module.
// ============================================================

import { body } from "express-validator";

// ============================================================
// Create Settings Validator
// POST /api/settings
// ============================================================

export const createSettingsValidator = [

    // --------------------------------------------------------
    // Hospital Name
    // --------------------------------------------------------

    body("hospitalName")
        .trim()
        .notEmpty()
        .withMessage("Hospital name is required.")
        .isLength({ max: 150 })
        .withMessage(
            "Hospital name cannot exceed 150 characters."
        ),

    // --------------------------------------------------------
    // Hospital Address
    // --------------------------------------------------------

    body("hospitalAddress")
        .optional()
        .trim()
        .isLength({ max: 300 })
        .withMessage(
            "Hospital address cannot exceed 300 characters."
        ),

    // --------------------------------------------------------
    // Hospital Phone
    // --------------------------------------------------------

    body("hospitalPhone")
        .optional()
        .trim()
        .isLength({ max: 30 })
        .withMessage(
            "Hospital phone cannot exceed 30 characters."
        ),

    // --------------------------------------------------------
    // Hospital Email
    // --------------------------------------------------------

    body("hospitalEmail")
        .optional()
        .trim()
        .isEmail()
        .withMessage(
            "Hospital email must be a valid email address."
        )
        .isLength({ max: 150 })
        .withMessage(
            "Hospital email cannot exceed 150 characters."
        ),

    // --------------------------------------------------------
    // Hospital Website
    // --------------------------------------------------------

    body("hospitalWebsite")
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage(
            "Hospital website cannot exceed 200 characters."
        ),

    // --------------------------------------------------------
    // Currency
    // --------------------------------------------------------

    body("currency")
        .optional()
        .trim()
        .isLength({ min: 3, max: 10 })
        .withMessage(
            "Currency must be between 3 and 10 characters."
        ),

    // --------------------------------------------------------
    // Timezone
    // --------------------------------------------------------

    body("timezone")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage(
            "Timezone cannot exceed 100 characters."
        ),

    // --------------------------------------------------------
    // Date Format
    // --------------------------------------------------------

    body("dateFormat")
        .optional()
        .trim()
        .isLength({ max: 30 })
        .withMessage(
            "Date format cannot exceed 30 characters."
        ),

    // --------------------------------------------------------
    // Time Format
    // --------------------------------------------------------

    body("timeFormat")
        .optional()
        .isIn(["12-hour", "24-hour"])
        .withMessage(
            "Time format must be 12-hour or 24-hour."
        ),

    // --------------------------------------------------------
    // Email Notifications
    // --------------------------------------------------------

    body("emailNotifications")
        .optional()
        .isBoolean()
        .withMessage(
            "Email notifications must be true or false."
        ),

    // --------------------------------------------------------
    // SMS Notifications
    // --------------------------------------------------------

    body("smsNotifications")
        .optional()
        .isBoolean()
        .withMessage(
            "SMS notifications must be true or false."
        ),

    // --------------------------------------------------------
    // Appointment Reminders
    // --------------------------------------------------------

    body("appointmentReminders")
        .optional()
        .isBoolean()
        .withMessage(
            "Appointment reminders must be true or false."
        ),

    // --------------------------------------------------------
    // Default Appointment Duration
    // --------------------------------------------------------

    body("defaultAppointmentDuration")
        .optional()
        .isInt({ min: 5 })
        .withMessage(
            "Appointment duration must be at least 5 minutes."
        ),

    // --------------------------------------------------------
    // Patient Registration
    // --------------------------------------------------------

    body("allowPatientRegistration")
        .optional()
        .isBoolean()
        .withMessage(
            "Allow patient registration must be true or false."
        ),

    // --------------------------------------------------------
    // Tax Enabled
    // --------------------------------------------------------

    body("taxEnabled")
        .optional()
        .isBoolean()
        .withMessage(
            "Tax enabled must be true or false."
        ),

    // --------------------------------------------------------
    // Tax Percentage
    // --------------------------------------------------------

    body("taxPercentage")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage(
            "Tax percentage must be between 0 and 100."
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
// Update Settings Validator
// PUT /api/settings
// ============================================================

export const updateSettingsValidator = [

    // --------------------------------------------------------
    // Hospital Name
    // --------------------------------------------------------

    body("hospitalName")
        .optional()
        .trim()
        .notEmpty()
        .withMessage(
            "Hospital name cannot be empty."
        )
        .isLength({ max: 150 })
        .withMessage(
            "Hospital name cannot exceed 150 characters."
        ),

    // --------------------------------------------------------
    // Hospital Address
    // --------------------------------------------------------

    body("hospitalAddress")
        .optional()
        .trim()
        .isLength({ max: 300 })
        .withMessage(
            "Hospital address cannot exceed 300 characters."
        ),

    // --------------------------------------------------------
    // Hospital Phone
    // --------------------------------------------------------

    body("hospitalPhone")
        .optional()
        .trim()
        .isLength({ max: 30 })
        .withMessage(
            "Hospital phone cannot exceed 30 characters."
        ),

    // --------------------------------------------------------
    // Hospital Email
    // --------------------------------------------------------

    body("hospitalEmail")
        .optional()
        .trim()
        .isEmail()
        .withMessage(
            "Hospital email must be a valid email address."
        )
        .isLength({ max: 150 })
        .withMessage(
            "Hospital email cannot exceed 150 characters."
        ),

    // --------------------------------------------------------
    // Hospital Website
    // --------------------------------------------------------

    body("hospitalWebsite")
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage(
            "Hospital website cannot exceed 200 characters."
        ),

    // --------------------------------------------------------
    // Currency
    // --------------------------------------------------------

    body("currency")
        .optional()
        .trim()
        .isLength({ min: 3, max: 10 })
        .withMessage(
            "Currency must be between 3 and 10 characters."
        ),

    // --------------------------------------------------------
    // Timezone
    // --------------------------------------------------------

    body("timezone")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage(
            "Timezone cannot exceed 100 characters."
        ),

    // --------------------------------------------------------
    // Date Format
    // --------------------------------------------------------

    body("dateFormat")
        .optional()
        .trim()
        .isLength({ max: 30 })
        .withMessage(
            "Date format cannot exceed 30 characters."
        ),

    // --------------------------------------------------------
    // Time Format
    // --------------------------------------------------------

    body("timeFormat")
        .optional()
        .isIn(["12-hour", "24-hour"])
        .withMessage(
            "Time format must be 12-hour or 24-hour."
        ),

    // --------------------------------------------------------
    // Email Notifications
    // --------------------------------------------------------

    body("emailNotifications")
        .optional()
        .isBoolean()
        .withMessage(
            "Email notifications must be true or false."
        ),

    // --------------------------------------------------------
    // SMS Notifications
    // --------------------------------------------------------

    body("smsNotifications")
        .optional()
        .isBoolean()
        .withMessage(
            "SMS notifications must be true or false."
        ),

    // --------------------------------------------------------
    // Appointment Reminders
    // --------------------------------------------------------

    body("appointmentReminders")
        .optional()
        .isBoolean()
        .withMessage(
            "Appointment reminders must be true or false."
        ),

    // --------------------------------------------------------
    // Default Appointment Duration
    // --------------------------------------------------------

    body("defaultAppointmentDuration")
        .optional()
        .isInt({ min: 5 })
        .withMessage(
            "Appointment duration must be at least 5 minutes."
        ),

    // --------------------------------------------------------
    // Patient Registration
    // --------------------------------------------------------

    body("allowPatientRegistration")
        .optional()
        .isBoolean()
        .withMessage(
            "Allow patient registration must be true or false."
        ),

    // --------------------------------------------------------
    // Tax Enabled
    // --------------------------------------------------------

    body("taxEnabled")
        .optional()
        .isBoolean()
        .withMessage(
            "Tax enabled must be true or false."
        ),

    // --------------------------------------------------------
    // Tax Percentage
    // --------------------------------------------------------

    body("taxPercentage")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage(
            "Tax percentage must be between 0 and 100."
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