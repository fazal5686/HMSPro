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
// Helper: Convert MongoDB ID / populated ID to string
// ============================================================

const getIdString = (value) => {

    if (!value) {
        return null;
    }

    if (value._id) {
        return value._id.toString();
    }

    return value.toString();
};

// ============================================================
// Helper: Check whether two IDs are equal
// ============================================================

const isSameId = (firstId, secondId) => {

    const first = getIdString(firstId);
    const second = getIdString(secondId);

    if (!first || !second) {
        return false;
    }

    return first === second;
};

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
    // Prevent Appointment In The Past
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
// GET /api/appointments/:id
//
// Security:
// Admin / SuperAdmin / Receptionist / Staff
//     -> Can access appointment.
//
// Doctor
//     -> Can access only their own appointments.
//
// Patient
//     -> Can access only their own appointments.
// ============================================================

export const getAppointmentByIdService = async (
    appointmentId,
    currentUser
) => {

    // --------------------------------------------------------
    // Check Current User
    // --------------------------------------------------------

    if (!currentUser) {

        const error = new Error(
            "Not authorized."
        );

        error.statusCode = 401;

        throw error;

    }

    // --------------------------------------------------------
    // Check Appointment
    // --------------------------------------------------------

    // --------------------------------------------------------
// Check Appointment
// --------------------------------------------------------

const appointment =
await findAppointmentById(
    appointmentId
);

// --------------------------------------------------------
// Temporary Security Debug
// --------------------------------------------------------

console.log(
"========== APPOINTMENT DEBUG =========="
);

console.log(
"Current User ID:",
currentUser._id.toString()
);

console.log(
"Current User Role:",
currentUser.role
);

console.log(
"Appointment Patient ID:",
appointment?.patientId?._id?.toString()
);

console.log(
"Appointment Patient User ID:",
appointment?.patientId?.userId?._id?.toString()
);

console.log(
"Comparison:",
appointment?.patientId?.userId?._id?.toString() ===
currentUser._id.toString()
);

console.log(
"======================================="
);

// --------------------------------------------------------
// Appointment Not Found
// --------------------------------------------------------

if (!appointment) {

const error = new Error(
    "Appointment not found."
);

error.statusCode = 404;

throw error;

}

    // --------------------------------------------------------
    // Privileged Roles
    // --------------------------------------------------------

    const privilegedRoles = [

        "SuperAdmin",
        "Admin",
        "Receptionist",
        "Nurse",
        "LabTechnician",
        "Pharmacist",
        "Accountant",

    ];

    if (
        privilegedRoles.includes(
            currentUser.role
        )
    ) {

        return appointment;

    }

    // --------------------------------------------------------
    // Patient Ownership Check
    // --------------------------------------------------------

    if (
        currentUser.role === "Patient"
    ) {

        if (
            !appointment.patientId ||
            !appointment.patientId.userId
        ) {

            const error = new Error(
                "Patient ownership information not found."
            );

            error.statusCode = 403;

            throw error;

        }

        const appointmentPatientUserId =
            getIdString(
                appointment.patientId.userId
            );

        if (
            !isSameId(
                appointmentPatientUserId,
                currentUser._id
            )
        ) {

            const error = new Error(
                "You are not authorized to access this appointment."
            );

            error.statusCode = 403;

            throw error;

        }

        return appointment;

    }

    // --------------------------------------------------------
    // Doctor Ownership Check
    // --------------------------------------------------------

    if (
        currentUser.role === "Doctor"
    ) {

        if (
            !appointment.doctorId ||
            !appointment.doctorId.userId
        ) {

            const error = new Error(
                "Doctor ownership information not found."
            );

            error.statusCode = 403;

            throw error;

        }

        const appointmentDoctorUserId =
            getIdString(
                appointment.doctorId.userId
            );

        if (
            !isSameId(
                appointmentDoctorUserId,
                currentUser._id
            )
        ) {

            const error = new Error(
                "You are not authorized to access this appointment."
            );

            error.statusCode = 403;

            throw error;

        }

        return appointment;

    }

    // --------------------------------------------------------
    // Other Roles
    // --------------------------------------------------------

    const error = new Error(
        "You are not authorized to access this appointment."
    );

    error.statusCode = 403;

    throw error;

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
// GET /api/appointments/patient/:patientId
//
// Security:
// Admin / SuperAdmin / Receptionist
//     -> Can access any patient.
//
// Patient
//     -> Can access only their own appointments.
// ============================================================

export const getPatientAppointmentsService = async (
    patientId,
    currentUser
) => {

    // --------------------------------------------------------
    // Check Current User
    // --------------------------------------------------------

    if (!currentUser) {

        const error = new Error(
            "Not authorized."
        );

        error.statusCode = 401;

        throw error;

    }

    // --------------------------------------------------------
    // Check Patient Profile
    // --------------------------------------------------------

    const patient =
        await findPatientById(
            patientId
        );

    if (!patient) {

        const error = new Error(
            "Patient profile not found."
        );

        error.statusCode = 404;

        throw error;

    }

    // --------------------------------------------------------
    // Patient Ownership Check
    // --------------------------------------------------------

    if (
        currentUser.role === "Patient"
    ) {

        if (
            !patient.userId
        ) {

            const error = new Error(
                "Patient ownership information not found."
            );

            error.statusCode = 403;

            throw error;

        }

        if (
            !isSameId(
                patient.userId,
                currentUser._id
            )
        ) {

            const error = new Error(
                "You are not authorized to access these appointments."
            );

            error.statusCode = 403;

            throw error;

        }

    }

    // --------------------------------------------------------
    // Return Patient Appointments
    // --------------------------------------------------------

    return await findAppointmentsByPatient(
        patientId
    );

};

// ============================================================
// Get Doctor Appointments
// GET /api/appointments/doctor/:doctorId
//
// Security:
// Admin / SuperAdmin / Receptionist
//     -> Can access any doctor.
//
// Doctor
//     -> Can access only their own appointments.
// ============================================================

export const getDoctorAppointmentsService = async (
    doctorId,
    currentUser
) => {

    // --------------------------------------------------------
    // Check Current User
    // --------------------------------------------------------

    if (!currentUser) {

        const error = new Error(
            "Not authorized."
        );

        error.statusCode = 401;

        throw error;

    }

    // --------------------------------------------------------
    // Check Doctor Profile
    // --------------------------------------------------------

    const doctor =
        await findDoctorById(
            doctorId
        );

    if (!doctor) {

        const error = new Error(
            "Doctor profile not found."
        );

        error.statusCode = 404;

        throw error;

    }

    // --------------------------------------------------------
    // Doctor Ownership Check
    // --------------------------------------------------------

    if (
        currentUser.role === "Doctor"
    ) {

        if (
            !doctor.userId
        ) {

            const error = new Error(
                "Doctor ownership information not found."
            );

            error.statusCode = 403;

            throw error;

        }

        if (
            !isSameId(
                doctor.userId,
                currentUser._id
            )
        ) {

            const error = new Error(
                "You are not authorized to access these appointments."
            );

            error.statusCode = 403;

            throw error;

        }

    }

    // --------------------------------------------------------
    // Return Doctor Appointments
    // --------------------------------------------------------

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
    // Determine Effective Doctor
    // --------------------------------------------------------

    const effectiveDoctorId =
        appointmentData.doctorId ||
        getIdString(
            existingAppointment.doctorId
        );

    // --------------------------------------------------------
    // Determine Effective Patient
    // --------------------------------------------------------

    const effectivePatientId =
        appointmentData.patientId ||
        getIdString(
            existingAppointment.patientId
        );

    // --------------------------------------------------------
    // If Doctor Is Being Changed
    // --------------------------------------------------------

    if (
        appointmentData.doctorId
    ) {

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
    // If Patient Is Being Changed
    // --------------------------------------------------------

    if (
        appointmentData.patientId
    ) {

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
    // Validate Effective Doctor
    // --------------------------------------------------------

    const effectiveDoctor =
        await findDoctorById(
            effectiveDoctorId
        );

    if (!effectiveDoctor) {

        throw new Error(
            "Doctor profile not found."
        );

    }

    if (!effectiveDoctor.isActive) {

        throw new Error(
            "Doctor account is inactive."
        );

    }

    if (!effectiveDoctor.availability) {

        throw new Error(
            "Doctor is currently unavailable."
        );

    }

    // --------------------------------------------------------
    // Validate Effective Patient
    // --------------------------------------------------------

    const effectivePatient =
        await findPatientById(
            effectivePatientId
        );

    if (!effectivePatient) {

        throw new Error(
            "Patient profile not found."
        );

    }

    if (
        !effectivePatient.userId ||
        !effectivePatient.userId.isActive
    ) {

        throw new Error(
            "Patient account is inactive."
        );

    }

    // --------------------------------------------------------
    // If Appointment Date Is Being Changed
    // --------------------------------------------------------

    let appointmentDate =
        existingAppointment.appointmentDate;

    if (
        appointmentData.appointmentDate
    ) {

        appointmentDate =
            new Date(
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

    const doctorAppointments =
        await findAppointmentsByDoctor(
            effectiveDoctorId
        );

    const conflictingAppointment =
        doctorAppointments.find(
            (appointment) => {

                // --------------------------------------------
                // Ignore Current Appointment
                // --------------------------------------------

                if (
                    isSameId(
                        appointment._id,
                        appointmentId
                    )
                ) {

                    return false;

                }

                // --------------------------------------------
                // Compare Appointment Time
                // --------------------------------------------

                const existingDate =
                    new Date(
                        appointment.appointmentDate
                    );

                const sameTime =
                    existingDate.getTime() ===
                    new Date(
                        appointmentDate
                    ).getTime();

                // --------------------------------------------
                // Ignore Cancelled / No Show
                // --------------------------------------------

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
        appointmentData
    );

};

// ============================================================
// Delete Appointment
// ============================================================

export const deleteAppointmentService = async (
    appointmentId
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
    // Delete Appointment
    // --------------------------------------------------------

    return await deleteAppointment(
        appointmentId
    );

};