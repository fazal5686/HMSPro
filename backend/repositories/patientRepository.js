
// ============================================================
// File: repositories/patientRepository.js
// Purpose: Database operations for Patient collection.
// This layer ONLY communicates with MongoDB.
// No business logic should be written here.
// ============================================================

import Patient from "../models/Patient.js";


// ============================================================
// Create Patient Profile
// ============================================================

export const createPatient = async (patientData) => {

    return await Patient.create(

        patientData

    );

};


// ============================================================
// Find Patient By User ID
// ============================================================

export const findPatientByUserId = async (userId) => {

    return await Patient.findOne({

        userId,

    })

    .populate({

        path: "userId",

        select: "fullName email phone role isActive",

    });

};


// ============================================================
// Find Patient By Patient ID
// Used by Appointment module.
// ============================================================

export const findPatientById = async (patientId) => {

    return await Patient.findById(

        patientId

    )

    .populate({

        path: "userId",

        select: "fullName email phone role isActive",

    });

};


// ============================================================
// Update Patient Profile
// ============================================================

export const updatePatient = async (

    userId,

    patientData

) => {

    return await Patient.findOneAndUpdate(

        {

            userId,

        },

        patientData,

        {

            new: true,

            runValidators: true,

        }

    )

    .populate({

        path: "userId",

        select: "fullName email phone role isActive",

    });

};


// ============================================================
// Delete Patient Profile
// ============================================================

export const deletePatient = async (userId) => {

    return await Patient.findOneAndDelete({

        userId,

    });

};
