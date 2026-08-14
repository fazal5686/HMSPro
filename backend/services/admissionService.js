
// ============================================================
// File: services/admissionService.js
// Purpose: Business logic for Admission module.
// ============================================================

import {
    createAdmission,
    findAdmissionById,
    findAllAdmissions,
    findAdmissionsByPatient,
    findAdmissionsByDoctor,
    findAdmissionsByRoom,
    updateAdmission,
    deleteAdmission,
} from "../repositories/admissionRepository.js";

import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Room from "../models/Room.js";

// ============================================================
// Create Admission
// ============================================================

export const createAdmissionService = async (
    admissionData
) => {

    const {
        patientId,
        doctorId,
        roomId,
    } = admissionData;

    // --------------------------------------------------------
    // Verify Patient
    // --------------------------------------------------------

    const patient =
        await Patient.findById(patientId);

    if (!patient) {

        const error = new Error(
            "Patient not found."
        );

        error.statusCode = 404;

        throw error;

    }

    // --------------------------------------------------------
    // Verify Doctor
    // --------------------------------------------------------

    const doctor =
        await Doctor.findById(doctorId);

    if (!doctor) {

        const error = new Error(
            "Doctor not found."
        );

        error.statusCode = 404;

        throw error;

    }

    // --------------------------------------------------------
    // Verify Doctor is Active
    // --------------------------------------------------------

    if (!doctor.isActive) {

        const error = new Error(
            "Doctor is not active."
        );

        error.statusCode = 400;

        throw error;

    }

    // --------------------------------------------------------
    // Verify Room
    // --------------------------------------------------------

    const room =
        await Room.findById(roomId);

    if (!room) {

        const error = new Error(
            "Room not found."
        );

        error.statusCode = 404;

        throw error;

    }

    // --------------------------------------------------------
    // Verify Room is Active
    // --------------------------------------------------------

    if (!room.isActive) {

        const error = new Error(
            "Room is not active."
        );

        error.statusCode = 400;

        throw error;

    }

    // --------------------------------------------------------
    // Verify Room Availability
    // --------------------------------------------------------

    if (room.status !== "Available") {

        const error = new Error(
            "Room is not available."
        );

        error.statusCode = 400;

        throw error;

    }

    // --------------------------------------------------------
    // Check Existing Active Admission
    // --------------------------------------------------------

    const existingAdmissions =
        await findAdmissionsByPatient(
            patientId
        );

    const activeAdmission =
        existingAdmissions.find(
            (admission) =>
                admission.status === "Admitted"
        );

    if (activeAdmission) {

        const error = new Error(
            "Patient already has an active admission."
        );

        error.statusCode = 400;

        throw error;

    }

    // --------------------------------------------------------
    // Create Admission
    // --------------------------------------------------------

    const admission =
        await createAdmission(
            admissionData
        );

    // --------------------------------------------------------
    // Mark Room as Occupied
    // --------------------------------------------------------

    room.status = "Occupied";

    await room.save();

    // --------------------------------------------------------
    // Return Populated Admission
    // --------------------------------------------------------

    return await findAdmissionById(
        admission._id
    );

};

// ============================================================
// Get Admission By ID
// ============================================================

export const getAdmissionByIdService = async (
    id
) => {

    const admission =
        await findAdmissionById(id);

    if (!admission) {

        const error = new Error(
            "Admission not found."
        );

        error.statusCode = 404;

        throw error;

    }

    return admission;

};

// ============================================================
// Get All Admissions
// ============================================================

export const getAllAdmissionsService =
    async () => {

        return await findAllAdmissions();

    };

// ============================================================
// Get Admissions By Patient
// ============================================================

export const getAdmissionsByPatientService =
    async (
        patientId
    ) => {

        const patient =
            await Patient.findById(
                patientId
            );

        if (!patient) {

            const error = new Error(
                "Patient not found."
            );

            error.statusCode = 404;

            throw error;

        }

        return await findAdmissionsByPatient(
            patientId
        );

    };

// ============================================================
// Get Admissions By Doctor
// ============================================================

export const getAdmissionsByDoctorService =
    async (
        doctorId
    ) => {

        const doctor =
            await Doctor.findById(
                doctorId
            );

        if (!doctor) {

            const error = new Error(
                "Doctor not found."
            );

            error.statusCode = 404;

            throw error;

        }

        return await findAdmissionsByDoctor(
            doctorId
        );

    };

// ============================================================
// Get Admissions By Room
// ============================================================

export const getAdmissionsByRoomService =
    async (
        roomId
    ) => {

        const room =
            await Room.findById(
                roomId
            );

        if (!room) {

            const error = new Error(
                "Room not found."
            );

            error.statusCode = 404;

            throw error;

        }

        return await findAdmissionsByRoom(
            roomId
        );

    };

// ============================================================
// Update Admission
// ============================================================

export const updateAdmissionService =
    async (
        id,
        admissionData
    ) => {

        const existingAdmission =
            await findAdmissionById(id);

        if (!existingAdmission) {

            const error = new Error(
                "Admission not found."
            );

            error.statusCode = 404;

            throw error;

        }

        // ----------------------------------------------------
        // Handle Discharge Through Update
        // ----------------------------------------------------

        if (
            admissionData.status ===
            "Discharged"
        ) {

            admissionData.dischargeDate =
                admissionData.dischargeDate ||
                new Date();

        }

        const updatedAdmission =
            await updateAdmission(
                id,
                admissionData
            );

        // ----------------------------------------------------
        // Release Room After Discharge
        // ----------------------------------------------------

        if (
            admissionData.status ===
            "Discharged"
        ) {

            const roomId =
                existingAdmission.roomId?._id ||
                existingAdmission.roomId;

            const room =
                await Room.findById(
                    roomId
                );

            if (room) {

                room.status =
                    "Available";

                await room.save();

            }

        }

        return updatedAdmission;

    };

// ============================================================
// Discharge Admission
// PUT /api/admissions/:id/discharge
// ============================================================

export const dischargeAdmissionService =
    async (
        id,
        dischargeData = {}
    ) => {

        // ----------------------------------------------------
        // Find Existing Admission
        // ----------------------------------------------------

        const existingAdmission =
            await findAdmissionById(id);

        if (!existingAdmission) {

            const error = new Error(
                "Admission not found."
            );

            error.statusCode = 404;

            throw error;

        }

        // ----------------------------------------------------
        // Prevent Re-discharge
        // ----------------------------------------------------

        if (
            existingAdmission.status ===
            "Discharged"
        ) {

            const error = new Error(
                "Admission is already discharged."
            );

            error.statusCode = 400;

            throw error;

        }

        // ----------------------------------------------------
        // Set Discharge Information
        // ----------------------------------------------------

        const updateData = {

            status: "Discharged",

            dischargeDate:
                dischargeData.dischargeDate ||
                new Date(),

        };

        // ----------------------------------------------------
        // Optional Diagnosis
        // ----------------------------------------------------

        if (
            dischargeData.diagnosis !== undefined
        ) {

            updateData.diagnosis =
                dischargeData.diagnosis;

        }

        // ----------------------------------------------------
        // Optional Notes
        // ----------------------------------------------------

        if (
            dischargeData.notes !== undefined
        ) {

            updateData.notes =
                dischargeData.notes;

        }

        // ----------------------------------------------------
        // Mark Admission as Inactive
        // ----------------------------------------------------

        updateData.isActive = false;

        // ----------------------------------------------------
        // Update Admission
        // ----------------------------------------------------

        const updatedAdmission =
            await updateAdmission(
                id,
                updateData
            );

        // ----------------------------------------------------
        // Release Assigned Room
        // ----------------------------------------------------

        const roomId =
            existingAdmission.roomId?._id ||
            existingAdmission.roomId;

        const room =
            await Room.findById(
                roomId
            );

        if (room) {

            room.status =
                "Available";

            await room.save();

        }

        // ----------------------------------------------------
        // Return Updated Admission
        // ----------------------------------------------------

        return updatedAdmission;

    };

// ============================================================
// Delete Admission
// ============================================================

export const deleteAdmissionService =
    async (
        id
    ) => {

        const admission =
            await findAdmissionById(id);

        if (!admission) {

            const error = new Error(
                "Admission not found."
            );

            error.statusCode = 404;

            throw error;

        }

        // ----------------------------------------------------
        // Release Room if Admission is Active
        // ----------------------------------------------------

        if (
            admission.status ===
            "Admitted"
        ) {

            const roomId =
                admission.roomId?._id ||
                admission.roomId;

            const room =
                await Room.findById(
                    roomId
                );

            if (room) {

                room.status =
                    "Available";

                await room.save();

            }

        }

        await deleteAdmission(id);

    };
