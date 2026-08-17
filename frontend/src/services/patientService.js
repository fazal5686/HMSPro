// ============================================================
// File:
// D:\HMSPro\frontend\src\services\patientService.js
//
// Purpose:
// Handles all patient API communication.
// ============================================================


import API from "../api/axios.js";

import API_ROUTES from "../api/apiRoutes.js";




// ============================================================
// Create Patient Profile
// Patient self-service
// ============================================================

export const createPatientProfile = async (

    patientData

) => {

    const response =
        await API.post(

            API_ROUTES.PATIENTS.PROFILE,

            patientData

        );


    return response.data.data;

};




// ============================================================
// Get Current Patient Profile
// Patient self-service
// ============================================================

export const getPatientProfile = async () => {

    const response =
        await API.get(

            API_ROUTES.PATIENTS.PROFILE

        );


    return response.data.data;

};




// ============================================================
// Update Current Patient Profile
// Patient self-service
// ============================================================

export const updatePatientProfile = async (

    patientData

) => {

    const response =
        await API.put(

            API_ROUTES.PATIENTS.PROFILE,

            patientData

        );


    return response.data.data;

};




// ============================================================
// Get All Patients
// Administrative Patient Directory
// ============================================================

export const getAllPatients = async () => {

    const response =
        await API.get(

            API_ROUTES.PATIENTS.LIST

        );


    return response.data.data;

};




// ============================================================
// Get Patient By ID
// Administrative Patient Directory
// ============================================================

export const getPatientById = async (

    patientId

) => {

    const response =
        await API.get(

            `${API_ROUTES.PATIENTS.LIST}/${patientId}`

        );


    return response.data.data;

};




// ============================================================
// Update Patient By ID
// Administrative Patient Directory
// ============================================================

export const updatePatientById = async (

    patientId,

    patientData

) => {

    const response =
        await API.put(

            `${API_ROUTES.PATIENTS.LIST}/${patientId}`,

            patientData

        );


    return response.data.data;

};