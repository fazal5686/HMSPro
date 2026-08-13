// ============================================================
// File: repositories/doctorRepository.js
// Purpose: Database operations for Doctor collection.
// ============================================================

import Doctor from "../models/Doctor.js";


// ============================================================
// Create Doctor Profile
// ============================================================

export const createDoctor = async (doctorData) => {

    return await Doctor.create(
        doctorData
    );

};


// ============================================================
// Find Doctor By User ID
// ============================================================

export const findDoctorByUserId = async (userId) => {

    return await Doctor.findOne({
        userId,
    })
        .populate({
            path: "userId",
            select: "fullName email phone role isActive",
        });

};


// ============================================================
// Find Doctor By Doctor ID
// ============================================================

export const findDoctorById = async (doctorId) => {

    return await Doctor.findById(
        doctorId
    )
        .populate({
            path: "userId",
            select: "fullName email phone role isActive",
        });

};


// ============================================================
// Get All Doctors
// ============================================================

export const findAllDoctors = async () => {

    return await Doctor.find()
        .populate({
            path: "userId",
            select: "fullName email phone role isActive",
        })
        .sort({
            createdAt: -1,
        });

};


// ============================================================
// Update Doctor Profile
// ============================================================

export const updateDoctor = async (
    doctorId,
    doctorData
) => {

    return await Doctor.findByIdAndUpdate(
        doctorId,
        doctorData,
        {
            new: true,
            runValidators: true,
        }
    );

};


// ============================================================
// Delete Doctor Profile
// ============================================================

export const deleteDoctor = async (doctorId) => {

    return await Doctor.findByIdAndDelete(
        doctorId
    );

};
