
// ============================================================
// File: repositories/admissionRepository.js
// Purpose: Database operations for Admission module.
// ============================================================

import Admission from "../models/Admission.js";

// ============================================================
// Create Admission
// ============================================================

export const createAdmission = async (
    admissionData
) => {

    return await Admission.create(
        admissionData
    );

};

// ============================================================
// Find Admission By ID
// ============================================================

export const findAdmissionById = async (
    id
) => {

    return await Admission.findById(id)

        .populate(
            "patientId"
        )

        .populate(
            "doctorId"
        )

        .populate(
            "roomId"
        );

};

// ============================================================
// Find All Admissions
// ============================================================

export const findAllAdmissions = async () => {

    return await Admission.find()

        .populate(
            "patientId"
        )

        .populate(
            "doctorId"
        )

        .populate(
            "roomId"
        )

        .sort({
            admissionDate: -1,
        });

};

// ============================================================
// Find Admissions By Patient
// ============================================================

export const findAdmissionsByPatient = async (
    patientId
) => {

    return await Admission.find({
        patientId,
    })

        .populate(
            "patientId"
        )

        .populate(
            "doctorId"
        )

        .populate(
            "roomId"
        )

        .sort({
            admissionDate: -1,
        });

};

// ============================================================
// Find Admissions By Doctor
// ============================================================

export const findAdmissionsByDoctor = async (
    doctorId
) => {

    return await Admission.find({
        doctorId,
    })

        .populate(
            "patientId"
        )

        .populate(
            "doctorId"
        )

        .populate(
            "roomId"
        )

        .sort({
            admissionDate: -1,
        });

};

// ============================================================
// Find Admissions By Room
// ============================================================

export const findAdmissionsByRoom = async (
    roomId
) => {

    return await Admission.find({
        roomId,
    })

        .populate(
            "patientId"
        )

        .populate(
            "doctorId"
        )

        .populate(
            "roomId"
        )

        .sort({
            admissionDate: -1,
        });

};

// ============================================================
// Update Admission
// ============================================================

export const updateAdmission = async (
    id,
    admissionData
) => {

    return await Admission.findByIdAndUpdate(

        id,

        admissionData,

        {
            new: true,
            runValidators: true,
        }

    )

        .populate(
            "patientId"
        )

        .populate(
            "doctorId"
        )

        .populate(
            "roomId"
        );

};

// ============================================================
// Delete Admission
// ============================================================

export const deleteAdmission = async (
    id
) => {

    return await Admission.findByIdAndDelete(
        id
    );

};
