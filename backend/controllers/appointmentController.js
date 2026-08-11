
// ============================================================
// File: controllers/appointmentController.js
// Purpose: Handle HTTP requests for Appointment module.
// ============================================================

import {

    createAppointmentService,

    getAppointmentByIdService,

    getAllAppointmentsService,

    getPatientAppointmentsService,

    getDoctorAppointmentsService,

    updateAppointmentService,

    deleteAppointmentService,

} from "../services/appointmentService.js";


// ============================================================
// Create Appointment
// POST /api/appointments
// ============================================================

export const createAppointment = async (req, res) => {

    try {

        const appointmentData = {

            ...req.body,

        };


        const appointment =
            await createAppointmentService(

                appointmentData

            );


        return res.status(201).json({

            success: true,

            message: "Appointment created successfully.",

            data: appointment,

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};


// ============================================================
// Get Appointment By ID
// GET /api/appointments/:id
// ============================================================

export const getAppointmentById = async (req, res) => {

    try {

        const appointment =
            await getAppointmentByIdService(

                req.params.id

            );


        return res.status(200).json({

            success: true,

            data: appointment,

        });

    }

    catch (error) {

        return res.status(404).json({

            success: false,

            message: error.message,

        });

    }

};


// ============================================================
// Get All Appointments
// GET /api/appointments
// ============================================================

export const getAllAppointments = async (req, res) => {

    try {

        const appointments =
            await getAllAppointmentsService();


        return res.status(200).json({

            success: true,

            count: appointments.length,

            data: appointments,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// ============================================================
// Get Patient Appointments
// GET /api/appointments/patient/:patientId
// ============================================================

export const getPatientAppointments = async (req, res) => {

    try {

        const appointments =
            await getPatientAppointmentsService(

                req.params.patientId

            );


        return res.status(200).json({

            success: true,

            count: appointments.length,

            data: appointments,

        });

    }

    catch (error) {

        return res.status(404).json({

            success: false,

            message: error.message,

        });

    }

};


// ============================================================
// Get Doctor Appointments
// GET /api/appointments/doctor/:doctorId
// ============================================================

export const getDoctorAppointments = async (req, res) => {

    try {

        const appointments =
            await getDoctorAppointmentsService(

                req.params.doctorId

            );


        return res.status(200).json({

            success: true,

            count: appointments.length,

            data: appointments,

        });

    }

    catch (error) {

        return res.status(404).json({

            success: false,

            message: error.message,

        });

    }

};


// ============================================================
// Update Appointment
// PUT /api/appointments/:id
// ============================================================

export const updateAppointment = async (req, res) => {

    try {

        const appointmentData = {

            ...req.body,

        };


        const appointment =
            await updateAppointmentService(

                req.params.id,

                appointmentData

            );


        return res.status(200).json({

            success: true,

            message: "Appointment updated successfully.",

            data: appointment,

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};


// ============================================================
// Delete Appointment
// DELETE /api/appointments/:id
// ============================================================

export const deleteAppointment = async (req, res) => {

    try {

        await deleteAppointmentService(

            req.params.id

        );


        return res.status(200).json({

            success: true,

            message: "Appointment deleted successfully.",

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};
