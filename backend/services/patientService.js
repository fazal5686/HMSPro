// ============================================================
// File: services/patientService.js
// Purpose: Patient business logic.
// ============================================================


import {

    createPatient,

    findPatientByUserId,

    updatePatient

} from "../repositories/patientRepository.js";




// Create patient profile

export const createPatientProfileService = async (
    userId,
    patientData
) => {


    const existingPatient =
        await findPatientByUserId(userId);



    if (existingPatient) {

        throw new Error(
            "Patient profile already exists."
        );

    }


    return await createPatient({

        userId,

        ...patientData

    });

};




// Get patient profile

export const getPatientProfileService = async (
    userId
) => {


    const patient =
        await findPatientByUserId(userId);



    if (!patient) {

        throw new Error(
            "Patient profile not found."
        );

    }


    return patient;

};




// Update patient profile

export const updatePatientProfileService = async (
    userId,
    patientData
) => {


    return await updatePatient(
        userId,
        patientData
    );

};