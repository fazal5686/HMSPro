// ============================================================
// File: routes/departmentRoutes.js
// Purpose: Department API routes for HMSPro.
// ============================================================

import express from "express";

import {
    createDepartmentValidator,
    updateDepartmentValidator,
    departmentIdValidator,
} from "../validators/departmentValidator.js";

import validateRequest from "../middleware/validateRequest.js";

import protect from "../middleware/protect.js";

import authorize from "../middleware/authorize.js";

import { ROLES } from "../constants/roles.js";

import {
    createDepartment,
    getDepartmentById,
    getAllDepartments,
    updateDepartment,
    deleteDepartment,
} from "../controllers/departmentController.js";

// ============================================================
// Create Router
// ============================================================

const router = express.Router();

// ============================================================
// Create Department
// POST /api/departments
//
// Allowed:
// Admin
// ============================================================

router.post(
    "/",
    protect,
    authorize(
        ROLES.ADMIN
    ),
    createDepartmentValidator,
    validateRequest,
    createDepartment
);

// ============================================================
// Get All Departments
// GET /api/departments
//
// Allowed:
// Admin
// Receptionist
// Doctor
// ============================================================

router.get(
    "/",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.RECEPTIONIST,
        ROLES.DOCTOR
    ),
    getAllDepartments
);

// ============================================================
// Get Department By ID
// GET /api/departments/:id
//
// Allowed:
// Admin
// Receptionist
// Doctor
// ============================================================

router.get(
    "/:id",
    protect,
    authorize(
        ROLES.ADMIN,
        ROLES.RECEPTIONIST,
        ROLES.DOCTOR
    ),
    departmentIdValidator,
    validateRequest,
    getDepartmentById
);

// ============================================================
// Update Department
// PUT /api/departments/:id
//
// Allowed:
// Admin
// ============================================================

router.put(
    "/:id",
    protect,
    authorize(
        ROLES.ADMIN
    ),
    updateDepartmentValidator,
    validateRequest,
    updateDepartment
);

// ============================================================
// Delete Department
// DELETE /api/departments/:id
//
// Allowed:
// Admin
// ============================================================

router.delete(
    "/:id",
    protect,
    authorize(
        ROLES.ADMIN
    ),
    departmentIdValidator,
    validateRequest,
    deleteDepartment
);

// ============================================================
// Export Router
// ============================================================

export default router;