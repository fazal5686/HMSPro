
// ============================================================
// File: repositories/roomRepository.js
// Purpose: Database operations for Room module.
// ============================================================

import Room from "../models/Room.js";

// ============================================================
// Create Room
// ============================================================

export const createRoom = async (roomData) => {

    return await Room.create(
        roomData
    );

};

// ============================================================
// Find Room By ID
// ============================================================

export const findRoomById = async (id) => {

    return await Room.findById(id)
        .populate(
            "department",
            "name description location phone isActive"
        );

};

// ============================================================
// Find Room By Number
// ============================================================

export const findRoomByNumber = async (
    roomNumber
) => {

    return await Room.findOne({
        roomNumber: {
            $regex: `^${roomNumber}$`,
            $options: "i",
        },
    });

};

// ============================================================
// Get All Rooms
// ============================================================

export const findAllRooms = async () => {

    return await Room.find()
        .populate(
            "department",
            "name description location phone isActive"
        )
        .sort({
            roomNumber: 1,
        });

};

// ============================================================
// Get Rooms By Department
// ============================================================

export const findRoomsByDepartment = async (
    departmentId
) => {

    return await Room.find({
        department: departmentId,
    })
        .populate(
            "department",
            "name description location phone isActive"
        )
        .sort({
            roomNumber: 1,
        });

};

// ============================================================
// Update Room
// ============================================================

export const updateRoom = async (
    id,
    roomData
) => {

    return await Room.findByIdAndUpdate(

        id,

        roomData,

        {
            new: true,
            runValidators: true,
        }

    ).populate(
        "department",
        "name description location phone isActive"
    );

};

// ============================================================
// Delete Room
// ============================================================

export const deleteRoom = async (id) => {

    return await Room.findByIdAndDelete(
        id
    );

};
