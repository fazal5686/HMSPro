// ============================================================
// File: repositories/nurseRepository.js
// Purpose: Database operations for Nurse collection.
// ============================================================

import Nurse from "../models/Nurse.js";


// ============================================================
// Create Nurse
// ============================================================

export const createNurse = async (nurseData) => {

    return await Nurse.create(
        nurseData
    );

};


// ============================================================
// Find Nurse By User ID
// ============================================================

export const findNurseByUserId = async (userId) => {

    return await Nurse.findOne({
        userId,
    })
        .populate({
            path: "userId",
            select: "fullName email phone role isActive",
        });

};


// ============================================================
// Find Nurse By Nurse ID
// ============================================================

export const findNurseById = async (nurseId) => {

    return await Nurse.findById(
        nurseId
    )
        .populate({
            path: "userId",
            select: "fullName email phone role isActive",
        });

};


// ============================================================
// Get All Nurses
// ============================================================

export const findAllNurses = async () => {

    return await Nurse.find()
        .populate({
            path: "userId",
            select: "fullName email phone role isActive",
        })
        .sort({
            createdAt: -1,
        });

};


// ============================================================
// Update Nurse
// ============================================================

export const updateNurse = async (
    nurseId,
    nurseData
) => {

    return await Nurse.findByIdAndUpdate(
        nurseId,
        nurseData,
        {
            new: true,
            runValidators: true,
        }
    )
        .populate({
            path: "userId",
            select: "fullName email phone role isActive",
        });

};


// ============================================================
// Delete Nurse
// ============================================================

export const deleteNurse = async (nurseId) => {

    return await Nurse.findByIdAndDelete(
        nurseId
    );

};
