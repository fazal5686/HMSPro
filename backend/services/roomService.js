
// ============================================================
// File: services/roomService.js
// Purpose: Business logic for Room module.
// ============================================================

import {
    createRoom,
    findRoomById,
    findRoomByNumber,
    findAllRooms,
    findRoomsByDepartment,
    updateRoom,
    deleteRoom,
} from "../repositories/roomRepository.js";

// ============================================================
// Create Room
// ============================================================

export const createRoomService = async (
    roomData
) => {

    // --------------------------------------------------------
    // Check if room number already exists
    // --------------------------------------------------------

    const existingRoom =
        await findRoomByNumber(
            roomData.roomNumber
        );

    if (existingRoom) {

        const error = new Error(
            "Room number already exists."
        );

        error.statusCode = 400;

        throw error;
    }

    // --------------------------------------------------------
    // Create Room
    // --------------------------------------------------------

    return await createRoom(
        roomData
    );

};

// ============================================================
// Get Room By ID
// ============================================================

export const getRoomByIdService = async (
    id
) => {

    const room =
        await findRoomById(id);

    if (!room) {

        const error = new Error(
            "Room not found."
        );

        error.statusCode = 404;

        throw error;
    }

    return room;

};

// ============================================================
// Get All Rooms
// ============================================================

export const getAllRoomsService = async () => {

    return await findAllRooms();

};

// ============================================================
// Get Rooms By Department
// ============================================================

export const getRoomsByDepartmentService =
    async (departmentId) => {

        return await findRoomsByDepartment(
            departmentId
        );

    };

// ============================================================
// Update Room
// ============================================================

export const updateRoomService = async (
    id,
    roomData
) => {

    // --------------------------------------------------------
    // Make sure room exists
    // --------------------------------------------------------

    const existingRoom =
        await findRoomById(id);

    if (!existingRoom) {

        const error = new Error(
            "Room not found."
        );

        error.statusCode = 404;

        throw error;
    }

    // --------------------------------------------------------
    // Check duplicate room number
    // --------------------------------------------------------

    if (roomData.roomNumber) {

        const roomWithSameNumber =
            await findRoomByNumber(
                roomData.roomNumber
            );

        if (
            roomWithSameNumber &&
            roomWithSameNumber._id.toString() !==
                id.toString()
        ) {

            const error = new Error(
                "Room number already exists."
            );

            error.statusCode = 400;

            throw error;
        }
    }

    // --------------------------------------------------------
    // Update Room
    // --------------------------------------------------------

    const updatedRoom =
        await updateRoom(
            id,
            roomData
        );

    if (!updatedRoom) {

        const error = new Error(
            "Room not found."
        );

        error.statusCode = 404;

        throw error;
    }

    return updatedRoom;

};

// ============================================================
// Delete Room
// ============================================================

export const deleteRoomService = async (
    id
) => {

    // --------------------------------------------------------
    // Make sure room exists
    // --------------------------------------------------------

    const existingRoom =
        await findRoomById(id);

    if (!existingRoom) {

        const error = new Error(
            "Room not found."
        );

        error.statusCode = 404;

        throw error;
    }

    // --------------------------------------------------------
    // Delete Room
    // --------------------------------------------------------

    await deleteRoom(id);

};
