// ============================================================
// File: services/nurseService.js
// Purpose: Business logic for Nurse module.
// ============================================================

import {
    createNurse,
    findNurseByUserId,
    findNurseById,
    findAllNurses,
    updateNurse,
    deleteNurse,
} from "../repositories/nurseRepository.js";

import {
    findUserById,
} from "../repositories/authRepository.js";

import {
    ROLES,
} from "../constants/roles.js";


// ============================================================
// Create Nurse Profile
// ============================================================

export const createNurseService = async (nurseData) => {

    // --------------------------------------------------------
    // Check whether User exists
    // --------------------------------------------------------

    const user = await findUserById(
        nurseData.userId
    );


    if (!user) {

        throw new Error(
            "User not found."
        );

    }


    // --------------------------------------------------------
    // Verify User Role
    // --------------------------------------------------------

    if (user.role !== ROLES.NURSE) {

        throw new Error(
            "User must have Nurse role."
        );

    }


    // --------------------------------------------------------
    // Check Existing Nurse Profile
    // --------------------------------------------------------

    const existingNurse =
        await findNurseByUserId(
            nurseData.userId
        );


    if (existingNurse) {

        throw new Error(
            "Nurse profile already exists."
        );

    }


    // --------------------------------------------------------
    // Create Nurse Profile
    // --------------------------------------------------------

    return await createNurse(
        nurseData
    );

};


// ============================================================
// Get Nurse By User ID
// ============================================================

export const getNurseByUserIdService = async (
    userId
) => {

    return await findNurseByUserId(
        userId
    );

};


// ============================================================
// Get Nurse By Nurse ID
// ============================================================

export const getNurseByIdService = async (
    nurseId
) => {

    const nurse =
        await findNurseById(
            nurseId
        );


    if (!nurse) {

        throw new Error(
            "Nurse not found."
        );

    }


    return nurse;

};


// ============================================================
// Get All Nurses
// ============================================================

export const getAllNursesService = async () => {

    return await findAllNurses();

};


// ============================================================
// Update Nurse Profile
// ============================================================

export const updateNurseService = async (
    nurseId,
    nurseData
) => {

    const existingNurse =
        await findNurseById(
            nurseId
        );


    if (!existingNurse) {

        throw new Error(
            "Nurse not found."
        );

    }


    return await updateNurse(
        nurseId,
        nurseData
    );

};


// ============================================================
// Delete Nurse Profile
// ============================================================

export const deleteNurseService = async (
    nurseId
) => {

    const existingNurse =
        await findNurseById(
            nurseId
        );


    if (!existingNurse) {

        throw new Error(
            "Nurse not found."
        );

    }


    return await deleteNurse(
        nurseId
    );

};
