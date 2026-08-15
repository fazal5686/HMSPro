// ============================================================
// File: routes/userRoutes.js
// Purpose: Administrative User Management API routes.
// ============================================================
//
// Access:
//     SuperAdmin
//     Admin
//
// Responsibilities:
//     1. Create users
//     2. List/search users
//     3. Filter users by role
//     4. Get user by ID
//     5. Update user
//     6. Activate/deactivate user
//     7. Change user password
//     8. Delete user
//
// Security:
//     All routes require JWT authentication.
//     Only SuperAdmin and Admin can access these routes.
// ============================================================

import express from "express";


// ============================================================
// Controllers
// ============================================================

import {
    createUser,
    getAllUsers,
    getUsers,
    getUsersByRole,
    getUserById,
    updateUser,
    updateUserStatus,
    updateUserPassword,
    deleteUser,
} from "../controllers/userController.js";


// ============================================================
// Middleware
// ============================================================

import protect from "../middleware/protect.js";

import authorize from "../middleware/authorize.js";


// ============================================================
// Roles
// ============================================================

import { ROLES } from "../constants/roles.js";


// ============================================================
// Router
// ============================================================

const router = express.Router();


// ============================================================
// User Management Authorization
//
// Only administrators are allowed to manage users.
//
// SuperAdmin:
//     Full administrative access.
//
// Admin:
//     User management access.
//
// Other roles:
//     Access denied.
// ============================================================

const userManagementAuthorization = authorize(
    ROLES.SUPER_ADMIN,
    ROLES.ADMIN
);


// ============================================================
// CREATE USER
// POST /api/users
// ============================================================

router.post(
    "/",
    protect,
    userManagementAuthorization,
    createUser
);


// ============================================================
// GET ALL USERS
// GET /api/users/all
//
// Example:
//     GET /api/users/all
// ============================================================

router.get(
    "/all",
    protect,
    userManagementAuthorization,
    getAllUsers
);


// ============================================================
// SEARCH / FILTER USERS
// GET /api/users
//
// Examples:
//
// /api/users
// /api/users?search=Ahmad
// /api/users?role=Doctor
// /api/users?isActive=true
// /api/users?search=Ahmad&role=Doctor
// ============================================================

router.get(
    "/",
    protect,
    userManagementAuthorization,
    getUsers
);


// ============================================================
// GET USERS BY ROLE
// GET /api/users/role/:role
//
// Examples:
//
// /api/users/role/Doctor
// /api/users/role/Patient
// /api/users/role/Nurse
// ============================================================

router.get(
    "/role/:role",
    protect,
    userManagementAuthorization,
    getUsersByRole
);


// ============================================================
// GET USER BY ID
// GET /api/users/:id
// ============================================================

router.get(
    "/:id",
    protect,
    userManagementAuthorization,
    getUserById
);


// ============================================================
// UPDATE USER
// PUT /api/users/:id
// ============================================================

router.put(
    "/:id",
    protect,
    userManagementAuthorization,
    updateUser
);


// ============================================================
// UPDATE USER STATUS
// PATCH /api/users/:id/status
//
// Body:
//
// {
//     "isActive": false
// }
// ============================================================

router.patch(
    "/:id/status",
    protect,
    userManagementAuthorization,
    updateUserStatus
);


// ============================================================
// UPDATE USER PASSWORD
// PATCH /api/users/:id/password
//
// Body:
//
// {
//     "newPassword": "NewPassword123"
// }
// ============================================================

router.patch(
    "/:id/password",
    protect,
    userManagementAuthorization,
    updateUserPassword
);


// ============================================================
// DELETE USER
// DELETE /api/users/:id
// ============================================================

router.delete(
    "/:id",
    protect,
    userManagementAuthorization,
    deleteUser
);


// ============================================================
// Export Router
// ============================================================

export default router;