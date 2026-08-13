// ============================================================
// File: services/medicineService.js
// Purpose: Business logic for Medicine module.
// ============================================================

import {
    createMedicine,
    findMedicineById,
    findMedicineByName,
    findAllMedicines,
    updateMedicine,
    deleteMedicine,
} from "../repositories/medicineRepository.js";

// ============================================================
// Create Medicine
// ============================================================

export const createMedicineService = async (
    medicineData
) => {

    const existingMedicine =
        await findMedicineByName(
            medicineData.name
        );

    if (existingMedicine) {

        throw new Error(
            "Medicine already exists."
        );

    }

    return await createMedicine(
        medicineData
    );

};

// ============================================================
// Get Medicine By ID
// ============================================================

export const getMedicineByIdService = async (
    id
) => {

    const medicine =
        await findMedicineById(id);

    if (!medicine) {

        throw new Error(
            "Medicine not found."
        );

    }

    return medicine;

};

// ============================================================
// Get All Medicines
// ============================================================

export const getAllMedicinesService = async () => {

    return await findAllMedicines();

};

// ============================================================
// Update Medicine
// ============================================================

export const updateMedicineService = async (
    id,
    medicineData
) => {

    const medicine =
        await findMedicineById(id);

    if (!medicine) {

        throw new Error(
            "Medicine not found."
        );

    }

    // --------------------------------------------------------
    // Check duplicate name when name is being changed
    // --------------------------------------------------------

    if (
        medicineData.name &&
        medicineData.name.toLowerCase() !==
        medicine.name.toLowerCase()
    ) {

        const existingMedicine =
            await findMedicineByName(
                medicineData.name
            );

        if (
            existingMedicine &&
            existingMedicine._id.toString() !==
            id.toString()
        ) {

            throw new Error(
                "Medicine already exists."
            );

        }

    }

    return await updateMedicine(
        id,
        medicineData
    );

};

// ============================================================
// Delete Medicine
// ============================================================

export const deleteMedicineService = async (
    id
) => {

    const medicine =
        await findMedicineById(id);

    if (!medicine) {

        throw new Error(
            "Medicine not found."
        );

    }

    return await deleteMedicine(id);

};