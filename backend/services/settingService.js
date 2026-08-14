// ============================================================
// File: services/settingService.js
// Purpose: Business logic for HMSPro Settings module.
// ============================================================

import {
    findSettings,
    createSettings,
    updateSettings,
    deleteSettings,
    settingsExist,
} from "../repositories/settingRepository.js";

// ============================================================
// Get Settings
// ============================================================

export const getSettingsService = async () => {

    const settings = await findSettings();

    if (!settings) {
        throw new Error(
            "Hospital settings have not been configured yet."
        );
    }

    return settings;
};

// ============================================================
// Create Settings
// Only one settings document is allowed.
// ============================================================

export const createSettingsService = async (
    settingsData
) => {

    const exists = await settingsExist();

    if (exists) {
        throw new Error(
            "Hospital settings already exist."
        );
    }

    const settings =
        await createSettings(settingsData);

    return settings;
};

// ============================================================
// Update Settings
// Updates the existing settings document.
// ============================================================

export const updateSettingsService = async (
    settingsData
) => {

    const currentSettings =
        await findSettings();

    if (!currentSettings) {
        throw new Error(
            "Hospital settings have not been configured yet."
        );
    }

    const settings =
        await updateSettings(
            currentSettings._id,
            settingsData
        );

    if (!settings) {
        throw new Error(
            "Failed to update hospital settings."
        );
    }

    return settings;
};

// ============================================================
// Delete Settings
// Removes the single settings document.
// ============================================================

export const deleteSettingsService = async () => {

    const currentSettings =
        await findSettings();

    if (!currentSettings) {
        throw new Error(
            "Hospital settings not found."
        );
    }

    const settings =
        await deleteSettings(
            currentSettings._id
        );

    if (!settings) {
        throw new Error(
            "Failed to delete hospital settings."
        );
    }

    return settings;
};