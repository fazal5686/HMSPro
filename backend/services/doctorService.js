// ============================================================
// File: services/doctorService.js
// Purpose: Business logic for Doctor module.
// ============================================================

import {
    createDoctor,
    findDoctorByUserId,
    findDoctorById,
    findAllDoctors,
    updateDoctor,
    deleteDoctor,
} from "../repositories/doctorRepository.js";

import {
    findUserById,
} from "../repositories/authRepository.js";


// ============================================================
// Create Doctor Profile
// ============================================================

export const createDoctorService = async (doctorData) => {

    // --------------------------------------------------------
    // Check whether User exists
    // --------------------------------------------------------

    const user = await findUserById(
        doctorData.userId
    );


    if (!user) {

        throw new Error(
            "User not found."
        );

    }


    // --------------------------------------------------------
    // Verify User Role
    // --------------------------------------------------------

    if (user.role !== "Doctor") {

        throw new Error(
            "User must have Doctor role."
        );

    }


    // --------------------------------------------------------
    // Check Existing Doctor Profile
    // --------------------------------------------------------

    const existingDoctor = await findDoctorByUserId(
        doctorData.userId
    );


    if (existingDoctor) {

        throw new Error(
            "Doctor profile already exists."
        );

    }


    // --------------------------------------------------------
    // Create Doctor Profile
    // --------------------------------------------------------

    return await createDoctor(
        doctorData
    );

};


// ============================================================
// Get Doctor By User ID
// ============================================================

export const getDoctorByUserIdService = async (userId) => {

    return await findDoctorByUserId(
        userId
    );

};


// ============================================================
// Get Doctor By Doctor ID
// ============================================================

export const getDoctorByIdService = async (doctorId) => {

    const doctor = await findDoctorById(
        doctorId
    );


    if (!doctor) {

        throw new Error(
            "Doctor not found."
        );

    }


    return doctor;

};


// ============================================================
// Get All Doctors
// ============================================================

export const getAllDoctorsService = async () => {

    return await findAllDoctors();

};


// ============================================================
// Update Doctor Profile
// ============================================================

export const updateDoctorService = async (
    doctorId,
    doctorData
) => {

    const existingDoctor = await findDoctorById(
        doctorId
    );


    if (!existingDoctor) {

        throw new Error(
            "Doctor not found."
        );

    }


    return await updateDoctor(
        doctorId,
        doctorData
    );

};


// ============================================================
// Delete Doctor Profile
// ============================================================

export const deleteDoctorService = async (doctorId) => {

    const existingDoctor = await findDoctorById(
        doctorId
    );


    if (!existingDoctor) {

        throw new Error(
            "Doctor not found."
        );

    }


    return await deleteDoctor(
        doctorId
    );

};