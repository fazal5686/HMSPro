// ============================================================
// File: repositories/settingRepository.js
// Purpose: Database operations for HMSPro Settings module.
// This layer ONLY communicates with MongoDB.
// Business logic belongs in the service layer.
// ============================================================

import Setting from "../models/Setting.js";

// ============================================================
// Get Settings
// Returns the single HMSPro system settings document.
// ============================================================

export const findSettings = async () => {

    const settings = await Setting.findOne()
        .populate("updatedBy", "fullName email role");

    return settings;
};

// ============================================================
// Create Settings
// Creates the initial HMSPro settings document.
// ============================================================

export const createSettings = async (settingsData) => {

    const settings = await Setting.create(settingsData);

    return settings;
};

// ============================================================
// Update Settings
// Updates the existing HMSPro settings document.
// ============================================================

export const updateSettings = async (
    settingsId,
    settingsData
) => {

    const settings =
        await Setting.findByIdAndUpdate(
            settingsId,
            settingsData,
            {
                new: true,
                runValidators: true,
            }
        ).populate(
            "updatedBy",
            "fullName email role"
        );

    return settings;
};

// ============================================================
// Delete Settings
// Deletes the HMSPro settings document.
// ============================================================

export const deleteSettings = async (settingsId) => {

    const settings =
        await Setting.findByIdAndDelete(
            settingsId
        );

    return settings;
};

// ============================================================
// Check Settings Existence
// Used by the service layer to enforce one settings record.
// ============================================================

export const settingsExist = async () => {

    const count =
        await Setting.countDocuments();

    return count > 0;
};