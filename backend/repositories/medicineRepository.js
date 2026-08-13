// ============================================================
// File: repositories/medicineRepository.js
// Purpose: Database operations for Medicine module.
// This layer ONLY communicates with MongoDB.
// No business logic should be written here.
// ============================================================

import Medicine from "../models/Medicine.js";

// ============================================================
// Create Medicine
// ============================================================

export const createMedicine = async (medicineData) => {

    return await Medicine.create(
        medicineData
    );

};

// ============================================================
// Find Medicine By ID
// ============================================================

export const findMedicineById = async (id) => {

    return await Medicine.findById(
        id
    );

};

// ============================================================
// Find Medicine By Name
// ============================================================

export const findMedicineByName = async (name) => {

    return await Medicine.findOne({

        name: {
            $regex: `^${name}$`,
            $options: "i",
        },

    });

};

// ============================================================
// Get All Medicines
// ============================================================

export const findAllMedicines = async () => {

    return await Medicine.find()

        .sort({
            name: 1,
        });

};

// ============================================================
// Update Medicine
// ============================================================

export const updateMedicine = async (
    id,
    medicineData
) => {

    return await Medicine.findByIdAndUpdate(

        id,

        medicineData,

        {
            new: true,
            runValidators: true,
        }

    );

};

// ============================================================
// Delete Medicine
// ============================================================

export const deleteMedicine = async (id) => {

    return await Medicine.findByIdAndDelete(
        id
    );

};