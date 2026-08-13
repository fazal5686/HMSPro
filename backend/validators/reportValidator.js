// ============================================================
// File: validators/reportValidator.js
// Purpose: Validation rules for Report module.
// ============================================================

import { body, param, query } from "express-validator";

// ============================================================
// Common MongoDB ObjectId Validation
// ============================================================

const mongoIdRegex = /^[0-9a-fA-F]{24}$/;

// ============================================================
// Create Report Validator
// POST /api/reports
// ============================================================

export const createReportValidator = [
  body("reportType")
    .trim()
    .notEmpty()
    .withMessage("Report type is required.")
    .isLength({ max: 100 })
    .withMessage("Report type cannot exceed 100 characters."),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Report title is required.")
    .isLength({ max: 200 })
    .withMessage("Report title cannot exceed 200 characters."),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters."),

  body("patientId")
    .optional()
    .trim()
    .matches(mongoIdRegex)
    .withMessage("Invalid patient ID."),

  body("doctorId")
    .optional()
    .trim()
    .matches(mongoIdRegex)
    .withMessage("Invalid doctor ID."),

  body("admissionId")
    .optional()
    .trim()
    .matches(mongoIdRegex)
    .withMessage("Invalid admission ID."),

  body("appointmentId")
    .optional()
    .trim()
    .matches(mongoIdRegex)
    .withMessage("Invalid appointment ID."),

  body("reportDate")
    .optional()
    .isISO8601()
    .withMessage("Report date must be a valid date."),

  body("status")
    .optional()
    .trim()
    .isIn(["Draft", "Pending", "Completed", "Cancelled"])
    .withMessage(
      "Status must be Draft, Pending, Completed, or Cancelled."
    ),
];

// ============================================================
// Update Report Validator
// PUT /api/reports/:id
// ============================================================

export const updateReportValidator = [
  param("id")
    .matches(mongoIdRegex)
    .withMessage("Invalid report ID."),

  body("reportType")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Report type cannot be empty.")
    .isLength({ max: 100 })
    .withMessage("Report type cannot exceed 100 characters."),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Report title cannot be empty.")
    .isLength({ max: 200 })
    .withMessage("Report title cannot exceed 200 characters."),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters."),

  body("patientId")
    .optional()
    .trim()
    .matches(mongoIdRegex)
    .withMessage("Invalid patient ID."),

  body("doctorId")
    .optional()
    .trim()
    .matches(mongoIdRegex)
    .withMessage("Invalid doctor ID."),

  body("admissionId")
    .optional()
    .trim()
    .matches(mongoIdRegex)
    .withMessage("Invalid admission ID."),

  body("appointmentId")
    .optional()
    .trim()
    .matches(mongoIdRegex)
    .withMessage("Invalid appointment ID."),

  body("reportDate")
    .optional()
    .isISO8601()
    .withMessage("Report date must be a valid date."),

  body("status")
    .optional()
    .trim()
    .isIn(["Draft", "Pending", "Completed", "Cancelled"])
    .withMessage(
      "Status must be Draft, Pending, Completed, or Cancelled."
    ),
];

// ============================================================
// Report ID Validator
// GET /api/reports/:id
// DELETE /api/reports/:id
// ============================================================

export const reportIdValidator = [
  param("id")
    .matches(mongoIdRegex)
    .withMessage("Invalid report ID."),
];

// ============================================================
// Patient ID Validator
// GET /api/reports/patient/:patientId
// ============================================================

export const patientReportValidator = [
  param("patientId")
    .matches(mongoIdRegex)
    .withMessage("Invalid patient ID."),
];

// ============================================================
// Doctor ID Validator
// GET /api/reports/doctor/:doctorId
// ============================================================

export const doctorReportValidator = [
  param("doctorId")
    .matches(mongoIdRegex)
    .withMessage("Invalid doctor ID."),
];

// ============================================================
// Report Query Validator
// GET /api/reports
// ============================================================

export const reportQueryValidator = [
  query("status")
    .optional()
    .trim()
    .isIn(["Draft", "Pending", "Completed", "Cancelled"])
    .withMessage(
      "Status must be Draft, Pending, Completed, or Cancelled."
    ),

  query("reportType")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Report type cannot exceed 100 characters."),

  query("patientId")
    .optional()
    .trim()
    .matches(mongoIdRegex)
    .withMessage("Invalid patient ID."),

  query("doctorId")
    .optional()
    .trim()
    .matches(mongoIdRegex)
    .withMessage("Invalid doctor ID."),

  query("admissionId")
    .optional()
    .trim()
    .matches(mongoIdRegex)
    .withMessage("Invalid admission ID."),

  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date."),

  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date."),
];