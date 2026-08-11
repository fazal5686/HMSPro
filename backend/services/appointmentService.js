
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
// Create Appointment
// ============================================================

export const createAppointmentService = async (
    appointmentData
) => {

    // --------------------------------------------------------
    // Check Patient
    // --------------------------------------------------------

    const patient = await findPatientById(

        appointmentData.patientId

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
        !patient.userId.isActive
    ) {

        throw new Error(

            "Patient account is inactive."

        );

    }


    // --------------------------------------------------------
    // Check Doctor
    // --------------------------------------------------------

    const doctor = await findDoctorById(

        appointmentData.doctorId

    );


    if (!doctor) {

        throw new Error(

            "Doctor profile not found."

        );

    }


    // --------------------------------------------------------
    // Check Doctor Status
    // --------------------------------------------------------

    if (!doctor.isActive) {

        throw new Error(

            "Doctor account is inactive."

        );

    }


    // --------------------------------------------------------
    // Check Doctor Availability
    // --------------------------------------------------------

    if (!doctor.availability) {

        throw new Error(

            "Doctor is currently unavailable."

        );

    }


    // --------------------------------------------------------
    // Check Appointment Date
    // --------------------------------------------------------

    const appointmentDate = new Date(

        appointmentData.appointmentDate

    );


    if (
        Number.isNaN(
            appointmentDate.getTime()
        )
    ) {

        throw new Error(

            "Invalid appointment date."

        );

    }


    // --------------------------------------------------------
    // Prevent appointment in the past
    // --------------------------------------------------------

    if (
        appointmentDate <= new Date()
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

            appointmentData.doctorId

        );


    const conflictingAppointment =
        doctorAppointments.find(

            (appointment) => {

                const existingDate =
                    new Date(
                        appointment.appointmentDate
                    );


                const sameTime =
                    existingDate.getTime() ===
                    appointmentDate.getTime();


                const activeStatus =
                    ![
                        "Cancelled",
                        "No Show",
                    ].includes(
                        appointment.status
                    );


                return (
                    sameTime &&
                    activeStatus
                );

            }

        );


    if (conflictingAppointment) {

        throw new Error(

            "Doctor already has an appointment at this time."

        );

    }


    // --------------------------------------------------------
    // Save Appointment
    // --------------------------------------------------------

    return await createAppointment({

        ...appointmentData,

        appointmentDate,

    });

};


// ============================================================
// Get Appointment By ID
// ============================================================

export const getAppointmentByIdService = async (
    appointmentId
) => {

    const appointment =
        await findAppointmentById(

            appointmentId

        );


    if (!appointment) {

        throw new Error(

            "Appointment not found."

        );

    }


    return appointment;

};


// ============================================================
// Get All Appointments
// ============================================================

export const getAllAppointmentsService =
    async () => {

        return await findAllAppointments();

    };


// ============================================================
// Get Patient Appointments
// ============================================================

export const getPatientAppointmentsService =
    async (patientId) => {

        const patient =
            await findPatientById(

                patientId

            );


        if (!patient) {

            throw new Error(

                "Patient profile not found."

            );

        }


        return await findAppointmentsByPatient(

            patientId

        );

    };


// ============================================================
// Get Doctor Appointments
// ============================================================

export const getDoctorAppointmentsService =
    async (doctorId) => {

        const doctor =
            await findDoctorById(

                doctorId

            );


        if (!doctor) {

            throw new Error(

                "Doctor profile not found."

            );

        }


        return await findAppointmentsByDoctor(

            doctorId

        );

    };


// ============================================================
// Update Appointment
// ============================================================

export const updateAppointmentService = async (

    appointmentId,

    appointmentData

) => {

    // --------------------------------------------------------
    // Check Appointment
    // --------------------------------------------------------

    const existingAppointment =
        await findAppointmentById(

            appointmentId

        );


    if (!existingAppointment) {

        throw new Error(

            "Appointment not found."

        );

    }


    // --------------------------------------------------------
    // If doctor is being changed
    // --------------------------------------------------------

    if (appointmentData.doctorId) {

        const doctor =
            await findDoctorById(

                appointmentData.doctorId

            );


        if (!doctor) {

            throw new Error(

                "Doctor profile not found."

            );

        }


        if (!doctor.isActive) {

            throw new Error(

                "Doctor account is inactive."

            );

        }


        if (!doctor.availability) {

            throw new Error(

                "Doctor is currently unavailable."

            );

        }

    }


    // --------------------------------------------------------
    // If patient is being changed
    // --------------------------------------------------------

    if (appointmentData.patientId) {

        const patient =
            await findPatientById(

                appointmentData.patientId

            );


        if (!patient) {

            throw new Error(

                "Patient profile not found."

            );

        }


        if (
            !patient.userId ||
            !patient.userId.isActive
        ) {

            throw new Error(

                "Patient account is inactive."

            );

        }

    }


    // --------------------------------------------------------
    // If appointment date is being changed
    // --------------------------------------------------------

    let appointmentDate;

    if (appointmentData.appointmentDate) {

        appointmentDate = new Date(

            appointmentData.appointmentDate

        );


        if (
            Number.isNaN(
                appointmentDate.getTime()
            )
        ) {

            throw new Error(

                "Invalid appointment date."

            );

        }


        if (
            appointmentDate <= new Date()
        ) {

            throw new Error(

                "Appointment date must be in the future."

            );

        }


        appointmentData.appointmentDate =
            appointmentDate;

    }


    // --------------------------------------------------------
    // Prevent Doctor Double Booking During Update
    // --------------------------------------------------------

    if (
        appointmentData.doctorId ||
        appointmentData.appointmentDate
    ) {

        const doctorId =
            appointmentData.doctorId ||
            existingAppointment.doctorId._id;


        const date =
            appointmentDate ||
            existingAppointment.appointmentDate;


        const doctorAppointments =
            await findAppointmentsByDoctor(

                doctorId

            );


        const conflictingAppointment =
            doctorAppointments.find(

                (appointment) => {

                    // Ignore current appointment
                    if (
                        appointment._id.toString() ===
                        appointmentId.toString()
                    ) {

                        return false;

                    }


                    const existingDate =
                        new Date(
                            appointment.appointmentDate
                        );


                    const sameTime =
                        existingDate.getTime() ===
                        new Date(date).getTime();


                    const activeStatus =
                        ![
                            "Cancelled",
                            "No Show",
                        ].includes(
                            appointment.status
                        );


                    return (
                        sameTime &&
                        activeStatus
                    );

                }

            );


        if (conflictingAppointment) {

            throw new Error(

                "Doctor already has an appointment at this time."

            );

        }

    }


    // --------------------------------------------------------
    // Update Appointment
    // --------------------------------------------------------

    return await updateAppointment(

        appointmentId,

        appointmentData

    );

};


// ============================================================
// Delete Appointment
// ============================================================

export const deleteAppointmentService = async (
    appointmentId
) => {

    const existingAppointment =
        await findAppointmentById(

            appointmentId

        );


    if (!existingAppointment) {

        throw new Error(

            "Appointment not found."

        );

    }


    return await deleteAppointment(

        appointmentId

    );

};
