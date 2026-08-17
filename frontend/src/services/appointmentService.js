// ============================================================
// File: services/appointmentService.js
// Purpose: Frontend API service for Appointment module.
// ============================================================

import API from "../api/axios.js";

import API_ROUTES from "../api/apiRoutes.js";


// ============================================================
// Create Appointment
// ============================================================

export const createAppointment = async (
    appointmentData
) => {

    const response =
        await API.post(
            API_ROUTES.APPOINTMENTS.BASE,
            appointmentData
        );

    return response.data?.data;

};


// ============================================================
// Get All Appointments
// ============================================================

export const getAllAppointments = async () => {

    const response =
        await API.get(
            API_ROUTES.APPOINTMENTS.ALL
        );

    return response.data?.data ?? [];

};


// ============================================================
// Get Appointment By ID
// ============================================================

export const getAppointmentById = async (
    appointmentId
) => {

    const response =
        await API.get(
            API_ROUTES.APPOINTMENTS.BY_ID(
                appointmentId
            )
        );

    return response.data?.data;

};


// ============================================================
// Get Patient Appointments
// ============================================================

export const getPatientAppointments = async (
    patientId
) => {

    const response =
        await API.get(
            API_ROUTES.APPOINTMENTS.BY_PATIENT(
                patientId
            )
        );

    return response.data?.data ?? [];

};


// ============================================================
// Get Doctor Appointments
// ============================================================

export const getDoctorAppointments = async (
    doctorId
) => {

    const response =
        await API.get(
            API_ROUTES.APPOINTMENTS.BY_DOCTOR(
                doctorId
            )
        );

    return response.data?.data ?? [];

};


// ============================================================
// Update Appointment
// ============================================================

export const updateAppointment = async (
    appointmentId,
    appointmentData
) => {

    const response =
        await API.put(

            API_ROUTES.APPOINTMENTS.BY_ID(
                appointmentId
            ),

            appointmentData

        );

    return response.data?.data;

};


// ============================================================
// Delete Appointment
// ============================================================

export const deleteAppointment = async (
    appointmentId
) => {

    const response =
        await API.delete(

            API_ROUTES.APPOINTMENTS.BY_ID(
                appointmentId
            )

        );

    return response.data;

};


// ============================================================
// End of Appointment Service
// ============================================================