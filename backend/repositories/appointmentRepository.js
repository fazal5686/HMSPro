
// ============================================================
// File: repositories/appointmentRepository.js
// Purpose: Database operations for Appointment collection.
// This layer ONLY communicates with MongoDB.
// No business logic should be written here.
// ============================================================

import Appointment from "../models/Appointment.js";


// ============================================================
// Create Appointment
// ============================================================

export const createAppointment = async (appointmentData) => {

    return await Appointment.create(

        appointmentData

    );

};


// ============================================================
// Find Appointment By ID
// ============================================================

export const findAppointmentById = async (appointmentId) => {

    return await Appointment.findById(

        appointmentId

    )

    .populate({

        path: "patientId",

        populate: {

            path: "userId",

            select: "fullName email phone role",

        },

    })

    .populate({

        path: "doctorId",

        populate: {

            path: "userId",

            select: "fullName email phone role",

        },

    });

};


// ============================================================
// Get All Appointments
// ============================================================

export const findAllAppointments = async () => {

    return await Appointment.find()

    .populate({

        path: "patientId",

        populate: {

            path: "userId",

            select: "fullName email phone role",

        },

    })

    .populate({

        path: "doctorId",

        populate: {

            path: "userId",

            select: "fullName email phone role",

        },

    })

    .sort({

        appointmentDate: -1,

    });

};


// ============================================================
// Find Appointments By Patient
// ============================================================

export const findAppointmentsByPatient = async (patientId) => {

    return await Appointment.find({

        patientId,

    })

    .populate({

        path: "doctorId",

        populate: {

            path: "userId",

            select: "fullName email phone role",

        },

    })

    .sort({

        appointmentDate: -1,

    });

};


// ============================================================
// Find Appointments By Doctor
// ============================================================

export const findAppointmentsByDoctor = async (doctorId) => {

    return await Appointment.find({

        doctorId,

    })

    .populate({

        path: "patientId",

        populate: {

            path: "userId",

            select: "fullName email phone role",

        },

    })

    .sort({

        appointmentDate: -1,

    });

};


// ============================================================
// Update Appointment
// ============================================================

export const updateAppointment = async (

    appointmentId,

    appointmentData

) => {

    return await Appointment.findByIdAndUpdate(

        appointmentId,

        appointmentData,

        {

            new: true,

            runValidators: true,

        }

    )

    .populate({

        path: "patientId",

        populate: {

            path: "userId",

            select: "fullName email phone role",

        },

    })

    .populate({

        path: "doctorId",

        populate: {

            path: "userId",

            select: "fullName email phone role",

        },

    });

};


// ============================================================
// Delete Appointment
// ============================================================

export const deleteAppointment = async (appointmentId) => {

    return await Appointment.findByIdAndDelete(

        appointmentId

    );

};
