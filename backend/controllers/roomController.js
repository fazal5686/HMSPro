
// ============================================================
// File: controllers/roomController.js
// Purpose: HTTP controllers for Room module.
// ============================================================

import {
    createRoomService,
    getRoomByIdService,
    getAllRoomsService,
    getRoomsByDepartmentService,
    updateRoomService,
    deleteRoomService,
} from "../services/roomService.js";

// ============================================================
// Create Room
// POST /api/rooms
// ============================================================

export const createRoom = async (
    req,
    res,
    next
) => {

    try {

        const room =
            await createRoomService(
                req.body
            );

        res.status(201).json({

            success: true,

            message:
                "Room created successfully.",

            data: room,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Get Room By ID
// GET /api/rooms/:id
// ============================================================

export const getRoomById = async (
    req,
    res,
    next
) => {

    try {

        const room =
            await getRoomByIdService(
                req.params.id
            );

        res.status(200).json({

            success: true,

            data: room,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Get All Rooms
// GET /api/rooms
// ============================================================

export const getAllRooms = async (
    req,
    res,
    next
) => {

    try {

        const rooms =
            await getAllRoomsService();

        res.status(200).json({

            success: true,

            count: rooms.length,

            data: rooms,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Get Rooms By Department
// GET /api/rooms/department/:departmentId
// ============================================================

export const getRoomsByDepartment = async (
    req,
    res,
    next
) => {

    try {

        const rooms =
            await getRoomsByDepartmentService(
                req.params.departmentId
            );

        res.status(200).json({

            success: true,

            count: rooms.length,

            data: rooms,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Update Room
// PUT /api/rooms/:id
// ============================================================

export const updateRoom = async (
    req,
    res,
    next
) => {

    try {

        const room =
            await updateRoomService(
                req.params.id,
                req.body
            );

        res.status(200).json({

            success: true,

            message:
                "Room updated successfully.",

            data: room,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Delete Room
// DELETE /api/rooms/:id
// ============================================================

export const deleteRoom = async (
    req,
    res,
    next
) => {

    try {

        await deleteRoomService(
            req.params.id
        );

        res.status(200).json({

            success: true,

            message:
                "Room deleted successfully.",

        });

    } catch (error) {

        next(error);

    }

};
