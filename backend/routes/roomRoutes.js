
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
// Admin only
// ============================================================

router.post(
    "/",
    protect,
    authorize(ROLES.ADMIN),
    createRoomValidator,
    validateRequest,
    createRoom
);

// ============================================================
// Get Rooms By Department
// GET /api/rooms/department/:departmentId
// Admin and authorized hospital staff
// ============================================================

router.get(
    "/department/:departmentId",
    protect,
    authorize(
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
// Admin and authorized hospital staff
// ============================================================

router.get(
    "/",
    protect,
    authorize(
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
// Admin and authorized hospital staff
// ============================================================

router.get(
    "/:id",
    protect,
    authorize(
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
// Admin only
// ============================================================

router.put(
    "/:id",
    protect,
    authorize(ROLES.ADMIN),
    updateRoomValidator,
    validateRequest,
    updateRoom
);

// ============================================================
// Delete Room
// DELETE /api/rooms/:id
// Admin only
// ============================================================

router.delete(
    "/:id",
    protect,
    authorize(ROLES.ADMIN),
    roomIdValidator,
    validateRequest,
    deleteRoom
);

// ============================================================
// Export Router
// ============================================================

export default router;
