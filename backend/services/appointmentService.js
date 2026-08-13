// ============================================================
// File: services/appointmentService.js
// Purpose: Business logic for Appointment module.
// ============================================================

import {
    createAppointment,
    findAppointmentById,
    findAllAppointments,
    findAppointmentsByPatient,
    findAppointmentsByDoctor,
    updateAppointment,
    deleteAppointment,
} from "../repositories/appointmentRepository.js";

import {
    findPatientById,
} from "../repositories/patientRepository.js";

import {
    findDoctorById,
} from "../repositories/doctorRepository.js";


// ============================================================
// Helper: Check Patient Ownership
// ============================================================

const isPatientOwner = (
    user,
    patient
) => {

    if (!user || !patient || !patient.userId) {

        return false;

    }

    return (
        user.role === "Patient" &&
        patient.userId._id.toString() ===
        user._id.toString()
    );

};


// ============================================================
// Helper: Check Doctor Ownership
// ============================================================

const isDoctorOwner = (
    user,
    doctor
) => {

    if (!user || !doctor || !doctor.userId) {

        return false;

    }

    return (
        user.role === "Doctor" &&
        doctor.userId._id.toString() ===
        user._id.toString()
    );

};


// ============================================================
// Create Appointment
// POST /api/appointments
// ============================================================

export const createAppointmentService = async (
    appointmentData,
    user
) => {

    const {
        patientId,
        doctorId,
        appointmentDate,
    } = appointmentData;


    // --------------------------------------------------------
    // Validate Patient
    // --------------------------------------------------------

    const patient =
        await findPatientById(
            patientId
        );


    if (!patient) {

        throw new Error(
            "Patient profile not found."
        );

    }


    // --------------------------------------------------------
    // Check Patient User Account
    // --------------------------------------------------------

    if (
        !patient.userId ||
        patient.userId.isActive !== true
    ) {

        throw new Error(
            "Patient account is inactive."
        );

    }


    // --------------------------------------------------------
    // Patient Can Only Book For Own Profile
    // --------------------------------------------------------

    if (
        user &&
        user.role === "Patient" &&
        !isPatientOwner(user, patient)
    ) {

        throw new Error(
            "Patients can only create appointments for themselves."
        );

    }


    // --------------------------------------------------------
    // Validate Doctor
    // --------------------------------------------------------

    const doctor =
        await findDoctorById(
            doctorId
        );


    if (!doctor) {

        throw new Error(
            "Doctor profile not found."
        );

    }


    // --------------------------------------------------------
    // Check Doctor User Account
    // --------------------------------------------------------

    if (
        !doctor.userId ||
        doctor.userId.isActive !== true
    ) {

        throw new Error(
            "Doctor account is inactive."
        );

    }


    // --------------------------------------------------------
    // Check Doctor Profile Status
    // --------------------------------------------------------

    if (
        doctor.isActive !== true
    ) {

        throw new Error(
            "Doctor profile is inactive."
        );

    }


    // --------------------------------------------------------
    // Check Doctor Availability
    // --------------------------------------------------------

    if (
        doctor.availability !== true
    ) {

        throw new Error(
            "Doctor is currently unavailable."
        );

    }


    // --------------------------------------------------------
    // Validate Appointment Date
    // --------------------------------------------------------

    const appointmentTime =
        new Date(
            appointmentDate
        );


    if (
        Number.isNaN(
            appointmentTime.getTime()
        )
    ) {

        throw new Error(
            "Invalid appointment date."
        );

    }


    // --------------------------------------------------------
    // Appointment Must Be In Future
    // --------------------------------------------------------

    if (
        appointmentTime <= new Date()
    ) {

        throw new Error(
            "Appointment date must be in the future."
        );

    }


    // --------------------------------------------------------
    // Prevent Doctor Double Booking
    // --------------------------------------------------------

    const doctorAppointments =
        await findAppointmentsByDoctor(
            doctorId
        );


    const conflictingAppointment =
        doctorAppointments.find(
            (appointment) => {

                const existingTime =
                    new Date(
                        appointment.appointmentDate
                    );


                const inactiveStatus = [
                    "Cancelled",
                    "No Show",
                ].includes(
                    appointment.status
                );


                return (
                    !inactiveStatus &&
                    existingTime.getTime() ===
                    appointmentTime.getTime()
                );

            }
        );


    if (
        conflictingAppointment
    ) {

        throw new Error(
            "Doctor already has an appointment at this time."
        );

    }


    // --------------------------------------------------------
    // Create Appointment
    // --------------------------------------------------------

    return await createAppointment({

        ...appointmentData,

        appointmentDate:
            appointmentTime,

    });

};


// ============================================================
// Get Appointment By ID
// GET /api/appointments/:id
// ============================================================

export const getAppointmentByIdService = async (
    appointmentId,
    user
) => {

    const appointment =
        await findAppointmentById(
            appointmentId
        );


    if (!appointment) {

        const error =
            new Error(
                "Appointment not found."
            );

        error.statusCode = 404;

        throw error;

    }


    // --------------------------------------------------------
    // Patient Ownership Check
    // --------------------------------------------------------

    if (
        user &&
        user.role === "Patient"
    ) {

        const patient =
            appointment.patientId;


        if (
            !patient ||
            !isPatientOwner(
                user,
                patient
            )
        ) {

            const error =
                new Error(
                    "Access denied. This appointment does not belong to you."
                );

            error.statusCode = 403;

            throw error;

        }

    }


    // --------------------------------------------------------
    // Doctor Ownership Check
    // --------------------------------------------------------

    if (
        user &&
        user.role === "Doctor"
    ) {

        const doctor =
            appointment.doctorId;


        if (
            !doctor ||
            !isDoctorOwner(
                user,
                doctor
            )
        ) {

            const error =
                new Error(
                    "Access denied. This appointment does not belong to you."
                );

            error.statusCode = 403;

            throw error;

        }

    }


    return appointment;

};


// ============================================================
// Get All Appointments
// GET /api/appointments
// ============================================================

export const getAllAppointmentsService =
    async () => {

        return await findAllAppointments();

    };


// ============================================================
// Get Appointments By Patient
// GET /api/appointments/patient/:patientId
// ============================================================

export const getPatientAppointmentsService = async (
    patientId,
    user
) => {

    // --------------------------------------------------------
    // Verify Patient
    // --------------------------------------------------------

    const patient =
        await findPatientById(
            patientId
        );


    if (!patient) {

        const error =
            new Error(
                "Patient profile not found."
            );

        error.statusCode = 404;

        throw error;

    }


    // --------------------------------------------------------
    // Patient Ownership Check
    // --------------------------------------------------------

    if (
        user &&
        user.role === "Patient" &&
        !isPatientOwner(
            user,
            patient
        )
    ) {

        const error =
            new Error(
                "Access denied. You can only view your own appointments."
            );

        error.statusCode = 403;

        throw error;

    }


    // --------------------------------------------------------
    // Get Patient Appointments
    // --------------------------------------------------------

    return await findAppointmentsByPatient(
        patientId
    );

};


// ============================================================
// Get Appointments By Doctor
// GET /api/appointments/doctor/:doctorId
// ============================================================

export const getDoctorAppointmentsService = async (
    doctorId,
    user
) => {

    // --------------------------------------------------------
    // Verify Doctor
    // --------------------------------------------------------

    const doctor =
        await findDoctorById(
            doctorId
        );


    if (!doctor) {

        const error =
            new Error(
                "Doctor profile not found."
            );

        error.statusCode = 404;

        throw error;

    }


    // --------------------------------------------------------
    // Doctor Ownership Check
    // --------------------------------------------------------

    if (
        user &&
        user.role === "Doctor" &&
        !isDoctorOwner(
            user,
            doctor
        )
    ) {

        const error =
            new Error(
                "Access denied. You can only view your own appointments."
            );

        error.statusCode = 403;

        throw error;

    }


    // --------------------------------------------------------
    // Get Doctor Appointments
    // --------------------------------------------------------

    return await findAppointmentsByDoctor(
        doctorId
    );

};


// ============================================================
// Update Appointment
// PUT /api/appointments/:id
// ============================================================

export const updateAppointmentService = async (
    appointmentId,
    appointmentData,
    user
) => {

    // --------------------------------------------------------
    // Find Existing Appointment
    // --------------------------------------------------------

    const existingAppointment =
        await findAppointmentById(
            appointmentId
        );


    if (!existingAppointment) {

        const error =
            new Error(
                "Appointment not found."
            );

        error.statusCode = 404;

        throw error;

    }


    // --------------------------------------------------------
    // Doctor Ownership Check
    // --------------------------------------------------------

    if (
        user &&
        user.role === "Doctor"
    ) {

        const existingDoctor =
            existingAppointment.doctorId;


        if (
            !existingDoctor ||
            !isDoctorOwner(
                user,
                existingDoctor
            )
        ) {

            const error =
                new Error(
                    "Access denied. You can only update your own appointments."
                );

            error.statusCode = 403;

            throw error;

        }

    }


    // --------------------------------------------------------
    // Determine Patient
    // --------------------------------------------------------

    const patientId =
        appointmentData.patientId ||
        existingAppointment.patientId._id;


    const patient =
        await findPatientById(
            patientId
        );


    if (!patient) {

        throw new Error(
            "Patient profile not found."
        );

    }


    // --------------------------------------------------------
    // Check Patient Account
    // --------------------------------------------------------

    if (
        !patient.userId ||
        patient.userId.isActive !== true
    ) {

        throw new Error(
            "Patient account is inactive."
        );

    }


    // --------------------------------------------------------
    // Determine Doctor
    // --------------------------------------------------------

    const doctorId =
        appointmentData.doctorId ||
        existingAppointment.doctorId._id;


    const doctor =
        await findDoctorById(
            doctorId
        );


    if (!doctor) {

        throw new Error(
            "Doctor profile not found."
        );

    }


    // --------------------------------------------------------
    // Doctor Ownership Check For Changed Doctor
    // --------------------------------------------------------

    if (
        user &&
        user.role === "Doctor" &&
        !isDoctorOwner(
            user,
            doctor
        )
    ) {

        const error =
            new Error(
                "Doctors cannot assign appointments to another doctor."
            );

        error.statusCode = 403;

        throw error;

    }


    // --------------------------------------------------------
    // Check Doctor User Account
    // --------------------------------------------------------

    if (
        !doctor.userId ||
        doctor.userId.isActive !== true
    ) {

        throw new Error(
            "Doctor account is inactive."
        );

    }


    // --------------------------------------------------------
    // Check Doctor Profile Status
    // --------------------------------------------------------

    if (
        doctor.isActive !== true
    ) {

        throw new Error(
            "Doctor profile is inactive."
        );

    }


    // --------------------------------------------------------
    // Determine Appointment Date
    // --------------------------------------------------------

    const appointmentTime =
        appointmentData.appointmentDate
            ? new Date(
                appointmentData.appointmentDate
            )
            : new Date(
                existingAppointment.appointmentDate
            );


    // --------------------------------------------------------
    // Validate Appointment Date
    // --------------------------------------------------------

    if (
        Number.isNaN(
            appointmentTime.getTime()
        )
    ) {

        throw new Error(
            "Invalid appointment date."
        );

    }


    // --------------------------------------------------------
    // Future Date Validation
    // --------------------------------------------------------

    if (
        appointmentTime <= new Date()
    ) {

        throw new Error(
            "Appointment date must be in the future."
        );

    }


    // --------------------------------------------------------
    // Check Doctor Availability
    // Only required when changing/rescheduling appointment.
    // --------------------------------------------------------

    const changingDoctor =
        appointmentData.doctorId &&
        appointmentData.doctorId.toString() !==
        existingAppointment.doctorId._id.toString();


    const changingDate =
        appointmentData.appointmentDate &&
        appointmentTime.getTime() !==
        new Date(
            existingAppointment.appointmentDate
        ).getTime();


    if (
        changingDoctor ||
        changingDate
    ) {

        if (
            doctor.availability !== true
        ) {

            throw new Error(
                "Doctor is currently unavailable."
            );

        }

    }


    // --------------------------------------------------------
    // Prevent Doctor Double Booking During Update
    // --------------------------------------------------------

    const doctorAppointments =
        await findAppointmentsByDoctor(
            doctorId
        );


    const conflictingAppointment =
        doctorAppointments.find(
            (appointment) => {

                // Ignore current appointment.

                if (
                    appointment._id.toString() ===
                    appointmentId.toString()
                ) {

                    return false;

                }


                const existingTime =
                    new Date(
                        appointment.appointmentDate
                    );


                const inactiveStatus = [
                    "Cancelled",
                    "No Show",
                ].includes(
                    appointment.status
                );


                return (
                    !inactiveStatus &&
                    existingTime.getTime() ===
                    appointmentTime.getTime()
                );

            }
        );


    if (
        conflictingAppointment
    ) {

        throw new Error(
            "Doctor already has an appointment at this time."
        );

    }


    // --------------------------------------------------------
    // Update Appointment
    // --------------------------------------------------------

    return await updateAppointment(

        appointmentId,

        {

            ...appointmentData,

            patientId,

            doctorId,

            appointmentDate:
                appointmentTime,

        }

    );

};


// ============================================================
// Delete Appointment
// DELETE /api/appointments/:id
// ============================================================

export const deleteAppointmentService = async (
    appointmentId
) => {

    // --------------------------------------------------------
    // Verify Appointment Exists
    // --------------------------------------------------------

    const appointment =
        await findAppointmentById(
            appointmentId
        );


    if (!appointment) {

        const error =
            new Error(
                "Appointment not found."
            );

        error.statusCode = 404;

        throw error;

    }


    // --------------------------------------------------------
    // Delete Appointment
    // --------------------------------------------------------

    await deleteAppointment(
        appointmentId
    );


    return {

        message:
            "Appointment deleted successfully.",

    };

};