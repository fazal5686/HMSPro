// ============================================================
// File: services/patientService.js
// Purpose: Patient business logic.
// ============================================================


import {

    createPatient,

    findAllPatients,

    findPatientByUserId,

    findPatientById,

    updatePatient,

    updatePatientById

} from "../repositories/patientRepository.js";




// ============================================================
// Create Patient Profile
// Patient self-service
// ============================================================

export const createPatientProfileService = async (

    userId,

    patientData

) => {

    const existingPatient =
        await findPatientByUserId(

            userId

        );


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




// ============================================================
// Get Patient Profile
// Patient self-service
// ============================================================

export const getPatientProfileService = async (

    userId

) => {

    const patient =
        await findPatientByUserId(

            userId

        );


    if (!patient) {

        throw new Error(

            "Patient profile not found."

        );

    }


    return patient;

};




// ============================================================
// Update Patient Profile
// Patient self-service
// ============================================================

export const updatePatientProfileService = async (

    userId,

    patientData

) => {

    const patient =
        await updatePatient(

            userId,

            patientData

        );


    if (!patient) {

        throw new Error(

            "Patient profile not found."

        );

    }


    return patient;

};




// ============================================================
// Get All Patients
// Administrative Patient Directory
// ============================================================

export const getAllPatientsService = async () => {

    return await findAllPatients();

};




// ============================================================
// Get Patient By ID
// Administrative Patient Directory
// ============================================================

export const getPatientByIdService = async (

    patientId

) => {

    const patient =
        await findPatientById(

            patientId

        );


    if (!patient) {

        throw new Error(

            "Patient not found."

        );

    }


    return patient;

};




// ============================================================
// Update Patient By ID
// Administrative Patient Directory
// ============================================================

export const updatePatientByIdService = async (

    patientId,

    patientData

) => {

    const patient =
        await updatePatientById(

            patientId,

            patientData

        );


    if (!patient) {

        throw new Error(

            "Patient not found."

        );

    }


    return patient;

};