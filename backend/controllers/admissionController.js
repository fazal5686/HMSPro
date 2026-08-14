
// ============================================================
// File: controllers/admissionController.js
// Purpose: HTTP controllers for Admission module.
// ============================================================

import {
    createAdmissionService,
    getAdmissionByIdService,
    getAllAdmissionsService,
    getAdmissionsByPatientService,
    getAdmissionsByDoctorService,
    getAdmissionsByRoomService,
    updateAdmissionService,
    dischargeAdmissionService,
    deleteAdmissionService,
} from "../services/admissionService.js";

// ============================================================
// Create Admission
// POST /api/admissions
// ============================================================

export const createAdmission = async (
    req,
    res,
    next
) => {

    try {

        const admission =
            await createAdmissionService(
                req.body
            );

        res.status(201).json({

            success: true,

            message:
                "Admission created successfully.",

            data: admission,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Get Admission By ID
// GET /api/admissions/:id
// ============================================================

export const getAdmissionById = async (
    req,
    res,
    next
) => {

    try {

        const admission =
            await getAdmissionByIdService(
                req.params.id
            );

        res.status(200).json({

            success: true,

            data: admission,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Get All Admissions
// GET /api/admissions
// ============================================================

export const getAllAdmissions = async (
    req,
    res,
    next
) => {

    try {

        const admissions =
            await getAllAdmissionsService();

        res.status(200).json({

            success: true,

            count: admissions.length,

            data: admissions,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Get Admissions By Patient
// GET /api/admissions/patient/:patientId
// ============================================================

export const getAdmissionsByPatient = async (
    req,
    res,
    next
) => {

    try {

        const admissions =
            await getAdmissionsByPatientService(
                req.params.patientId
            );

        res.status(200).json({

            success: true,

            count: admissions.length,

            data: admissions,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Get Admissions By Doctor
// GET /api/admissions/doctor/:doctorId
// ============================================================

export const getAdmissionsByDoctor = async (
    req,
    res,
    next
) => {

    try {

        const admissions =
            await getAdmissionsByDoctorService(
                req.params.doctorId
            );

        res.status(200).json({

            success: true,

            count: admissions.length,

            data: admissions,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Get Admissions By Room
// GET /api/admissions/room/:roomId
// ============================================================

export const getAdmissionsByRoom = async (
    req,
    res,
    next
) => {

    try {

        const admissions =
            await getAdmissionsByRoomService(
                req.params.roomId
            );

        res.status(200).json({

            success: true,

            count: admissions.length,

            data: admissions,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Update Admission
// PUT /api/admissions/:id
// ============================================================

export const updateAdmission = async (
    req,
    res,
    next
) => {

    try {

        const admission =
            await updateAdmissionService(
                req.params.id,
                req.body
            );

        res.status(200).json({

            success: true,

            message:
                "Admission updated successfully.",

            data: admission,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Discharge Admission
// PUT /api/admissions/:id/discharge
// ============================================================

export const dischargeAdmission = async (
    req,
    res,
    next
) => {

    try {

        const admission =
            await dischargeAdmissionService(
                req.params.id,
                req.body
            );

        res.status(200).json({

            success: true,

            message:
                "Patient discharged successfully.",

            data: admission,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Delete Admission
// DELETE /api/admissions/:id
// ============================================================

export const deleteAdmission = async (
    req,
    res,
    next
) => {

    try {

        await deleteAdmissionService(
            req.params.id
        );

        res.status(200).json({

            success: true,

            message:
                "Admission deleted successfully.",

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Export Controller
// ============================================================
