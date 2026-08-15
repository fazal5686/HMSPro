// ============================================================
// File: D:\HMSPro\frontend\src\services\patientService.js
// Purpose: Handles all patient profile API communication.
// ============================================================


import API from "../api/axios.js";

import API_ROUTES from "../api/apiRoutes.js";



// ============================================================
// Create Patient Profile
// ============================================================

export const createPatientProfile = async (patientData) => {

    const response = await API.post(

        API_ROUTES.PATIENTS.PROFILE,

        patientData

    );


    return response.data.data;

};



// ============================================================
// Get Current Patient Profile
// ============================================================

export const getPatientProfile = async () => {

    const response = await API.get(

        API_ROUTES.PATIENTS.PROFILE

    );


    return response.data.data;

};



// ============================================================
// Update Current Patient Profile
// ============================================================

export const updatePatientProfile = async (patientData) => {

    const response = await API.put(

        API_ROUTES.PATIENTS.PROFILE,

        patientData

    );


    return response.data.data;

};