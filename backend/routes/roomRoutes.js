
// ============================================================
// File: routes/roomRoutes.js
// Purpose: API routes for Room module.
// ============================================================

import express from "express";

import {
    createRoom,
    getRoomById,
    getAllRooms,
    getRoomsByDepartment,
    updateRoom,
    deleteRoom,
} from "../controllers/roomController.js";

import {
    createRoomValidator,
    updateRoomValidator,
    roomIdValidator,
} from "../validators/roomValidator.js";

import validateRequest from "../middleware/validateRequest.js";
import protect from "../middleware/protect.js";
import authorize from "../middleware/authorize.js";

import { ROLES } from "../constants/roles.js";


const router = express.Router();



// ============================================================
// Create Room
// POST /api/rooms
// SuperAdmin and Admin
// ============================================================

router.post(
    "/",
    protect,
    authorize(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    createRoomValidator,
    validateRequest,
    createRoom
);



// ============================================================
// Get Rooms By Department
// GET /api/rooms/department/:departmentId
// SuperAdmin, Admin and authorized hospital staff
// ============================================================

router.get(
    "/department/:departmentId",
    protect,
    authorize(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.DOCTOR,
        ROLES.RECEPTIONIST,
        ROLES.NURSE
    ),
    getRoomsByDepartment
);



// ============================================================
// Get All Rooms
// GET /api/rooms
// SuperAdmin, Admin and authorized hospital staff
// ============================================================

router.get(
    "/",
    protect,
    authorize(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.DOCTOR,
        ROLES.RECEPTIONIST,
        ROLES.NURSE
    ),
    getAllRooms
);



// ============================================================
// Get Room By ID
// GET /api/rooms/:id
// SuperAdmin, Admin and authorized hospital staff
// ============================================================

router.get(
    "/:id",
    protect,
    authorize(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.DOCTOR,
        ROLES.RECEPTIONIST,
        ROLES.NURSE
    ),
    roomIdValidator,
    validateRequest,
    getRoomById
);



// ============================================================
// Update Room
// PUT /api/rooms/:id
// SuperAdmin and Admin
// ============================================================

router.put(
    "/:id",
    protect,
    authorize(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    updateRoomValidator,
    validateRequest,
    updateRoom
);



// ============================================================
// Delete Room
// DELETE /api/rooms/:id
// SuperAdmin and Admin
// ============================================================

router.delete(
    "/:id",
    protect,
    authorize(
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN
    ),
    roomIdValidator,
    validateRequest,
    deleteRoom
);



// ============================================================
// Export Router
// ============================================================

export default router;

