// ============================================================
// File: controllers/nurseController.js
// Purpose: HTTP controllers for Nurse module.
// ============================================================

import {
    createNurseService,
    getNurseByUserIdService,
    getNurseByIdService,
    getAllNursesService,
    updateNurseService,
    deleteNurseService,
} from "../services/nurseService.js";


// ============================================================
// Create Nurse Profile
// POST /api/nurses
// Admin only.
// ============================================================

export const createNurse = async (req, res) => {

    try {

        if (!req.body.userId) {

            return res.status(400).json({

                success: false,

                message: "Nurse userId is required.",

            });

        }


        const nurseData = {

            ...req.body,

            userId: req.body.userId,

        };


        if (req.file) {

            nurseData.profileImage =
                req.file.path;

        }


        const nurse =
            await createNurseService(
                nurseData
            );


        return res.status(201).json({

            success: true,

            message:
                "Nurse profile created successfully.",

            data: nurse,

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};


// ============================================================
// Get Logged-in Nurse Profile
// GET /api/nurses/me
// ============================================================

export const getMyNurseProfile = async (
    req,
    res
) => {

    try {

        const nurse =
            await getNurseByUserIdService(
                req.user.id
            );


        if (!nurse) {

            return res.status(404).json({

                success: false,

                message:
                    "Nurse profile not found.",

            });

        }


        return res.status(200).json({

            success: true,

            data: nurse,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// ============================================================
// Get Nurse By ID
// GET /api/nurses/:id
// ============================================================

export const getNurseById = async (
    req,
    res
) => {

    try {

        const nurse =
            await getNurseByIdService(
                req.params.id
            );


        return res.status(200).json({

            success: true,

            data: nurse,

        });

    } catch (error) {

        return res.status(404).json({

            success: false,

            message: error.message,

        });

    }

};


// ============================================================
// Get All Nurses
// GET /api/nurses
// ============================================================

export const getAllNurses = async (
    req,
    res
) => {

    try {

        const nurses =
            await getAllNursesService();


        return res.status(200).json({

            success: true,

            count: nurses.length,

            data: nurses,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// ============================================================
// Update Nurse
// PUT /api/nurses/:id
// Admin only.
// ============================================================

export const updateNurse = async (
    req,
    res
) => {

    try {

        const nurseData = {

            ...req.body,

        };


        if (req.file) {

            nurseData.profileImage =
                req.file.path;

        }


        const nurse =
            await updateNurseService(
                req.params.id,
                nurseData
            );


        return res.status(200).json({

            success: true,

            message:
                "Nurse profile updated successfully.",

            data: nurse,

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};


// ============================================================
// Delete Nurse
// DELETE /api/nurses/:id
// Admin only.
// ============================================================

export const deleteNurse = async (
    req,
    res
) => {

    try {

        await deleteNurseService(
            req.params.id
        );


        return res.status(200).json({

            success: true,

            message:
                "Nurse profile deleted successfully.",

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};
