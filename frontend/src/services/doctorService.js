import API from "../api/axios.js";

import API_ROUTES from "../api/apiRoutes.js";


// ============================================================
// Get Logged-in Doctor Profile
// ============================================================

export const getMyDoctorProfile = async () => {

    const response =
        await API.get(
            API_ROUTES.DOCTORS.ME
        );

    return response.data?.data;

};


// ============================================================
// Get All Doctors
// ============================================================

export const getAllDoctors = async () => {

    const response =
        await API.get(
            API_ROUTES.DOCTORS.BASE
        );

    return response.data?.data ?? [];

};


// ============================================================
// Create Doctor Profile
// ============================================================

export const createDoctor = async (
    doctorData
) => {

    const response =
        await API.post(
            API_ROUTES.DOCTORS.BASE,
            doctorData
        );

    return response.data?.data;

};


// ============================================================
// Update Doctor Profile
// ============================================================

export const updateDoctor = async (
    doctorId,
    doctorData
) => {

    const response =
        await API.put(
            API_ROUTES.DOCTORS.BY_ID(
                doctorId
            ),
            doctorData
        );

    return response.data?.data;

};


// ============================================================
// Delete Doctor Profile
// ============================================================

export const deleteDoctor = async (
    doctorId
) => {

    const response =
        await API.delete(
            API_ROUTES.DOCTORS.BY_ID(
                doctorId
            )
        );

    return response.data;

};