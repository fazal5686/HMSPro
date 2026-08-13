// ============================================================
// File: controllers/medicineController.js
// Purpose: HTTP controllers for Medicine module.
// ============================================================

import {
    createMedicineService,
    getMedicineByIdService,
    getAllMedicinesService,
    updateMedicineService,
    deleteMedicineService,
} from "../services/medicineService.js";

// ============================================================
// Create Medicine
// POST /api/medicines
// ============================================================

export const createMedicine = async (req, res, next) => {

    try {

        const medicine =
            await createMedicineService(
                req.body
            );

        res.status(201).json({

            success: true,

            message:
                "Medicine created successfully.",

            data: medicine,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Get Medicine By ID
// GET /api/medicines/:id
// ============================================================

export const getMedicineById = async (req, res, next) => {

    try {

        const medicine =
            await getMedicineByIdService(
                req.params.id
            );

        res.status(200).json({

            success: true,

            data: medicine,

        });

    } catch (error) {

        if (
            error.message ===
            "Medicine not found."
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Medicine not found.",

            });

        }

        next(error);

    }

};

// ============================================================
// Get All Medicines
// GET /api/medicines
// ============================================================

export const getAllMedicines = async (req, res, next) => {

    try {

        const medicines =
            await getAllMedicinesService();

        res.status(200).json({

            success: true,

            count: medicines.length,

            data: medicines,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Update Medicine
// PUT /api/medicines/:id
// ============================================================

export const updateMedicine = async (req, res, next) => {

    try {

        const medicine =
            await updateMedicineService(

                req.params.id,

                req.body

            );

        res.status(200).json({

            success: true,

            message:
                "Medicine updated successfully.",

            data: medicine,

        });

    } catch (error) {

        if (
            error.message ===
            "Medicine not found."
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Medicine not found.",

            });

        }

        next(error);

    }

};

// ============================================================
// Delete Medicine
// DELETE /api/medicines/:id
// ============================================================

export const deleteMedicine = async (req, res, next) => {

    try {

        await deleteMedicineService(
            req.params.id
        );

        res.status(200).json({

            success: true,

            message:
                "Medicine deleted successfully.",

        });

    } catch (error) {

        if (
            error.message ===
            "Medicine not found."
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Medicine not found.",

            });

        }

        next(error);

    }

};