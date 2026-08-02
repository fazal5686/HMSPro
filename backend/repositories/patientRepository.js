// ============================================================
// File: repositories/patientRepository.js
// Purpose: Database operations for Patient collection.
// ============================================================

import Patient from "../models/Patient.js";



// Create patient profile

export const createPatient = async (patientData) => {

    return await Patient.create(patientData);

};



// Find patient by user ID

export const findPatientByUserId = async (userId) => {

    return await Patient.findOne({
        userId
    }).populate(
        "userId",
        "-password"
    );

};



// Update patient profile

export const updatePatient = async (
    userId,
    patientData
) => {

    return await Patient.findOneAndUpdate(

        {
            userId
        },

        patientData,

        {
            new: true
        }

    ).populate(
        "userId",
        "-password"
    );

};