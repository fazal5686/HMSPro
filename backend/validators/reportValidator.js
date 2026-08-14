// ============================================================
// File: validators/reportValidator.js
// Purpose: Validation rules for HMSPro Reports module.
//
// IMPORTANT:
// The HMSPro Reports module is a statistics/reporting module.
// It does NOT create, update, or delete Report documents.
//
// Current report endpoints:
//
// GET /api/reports/dashboard
// GET /api/reports/appointments
// GET /api/reports/admissions
// GET /api/reports/billing
// GET /api/reports/medicines
//
// These endpoints currently do not require request body,
// route parameter, or query parameter validation.
// ============================================================

import { query } from "express-validator";

// ============================================================
// Dashboard Report Validator
// GET /api/reports/dashboard
//
// No parameters are currently required.
// ============================================================

export const dashboardReportValidator = [];

// ============================================================
// Appointment Report Validator
// GET /api/reports/appointments
//
// No parameters are currently required.
// ============================================================

export const appointmentReportValidator = [];

// ============================================================
// Admission Report Validator
// GET /api/reports/admissions
//
// No parameters are currently required.
// ============================================================

export const admissionReportValidator = [];

// ============================================================
// Billing Report Validator
// GET /api/reports/billing
//
// No parameters are currently required.
// ============================================================

export const billingReportValidator = [];

// ============================================================
// Medicine Inventory Report Validator
// GET /api/reports/medicines
//
// No parameters are currently required.
// ============================================================

export const medicineInventoryReportValidator = [];

// ============================================================
// Optional Report Date Query Validator
//
// This validator is kept for future reporting features such as:
//
// GET /api/reports/appointments?startDate=2026-08-01
// GET /api/reports/appointments?endDate=2026-08-31
//
// It is NOT required by the current Reports routes.
// ============================================================

export const reportDateQueryValidator = [

    query("startDate")

        .optional()

        .isISO8601()

        .withMessage(
            "Start date must be a valid date."
        ),

    query("endDate")

        .optional()

        .isISO8601()

        .withMessage(
            "End date must be a valid date."
        ),

];

// ============================================================
// General Report Query Validator
//
// Reserved for future report filtering and date-range support.
// Currently not required by the five active report endpoints.
// ============================================================

export const reportQueryValidator = [

    query("startDate")

        .optional()

        .isISO8601()

        .withMessage(
            "Start date must be a valid date."
        ),

    query("endDate")

        .optional()

        .isISO8601()

        .withMessage(
            "End date must be a valid date."
        ),

];

// ============================================================
// Export
// ============================================================
//
// No default export is required.
// ============================================================