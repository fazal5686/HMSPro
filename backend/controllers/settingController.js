// ============================================================
// File: controllers/settingController.js
// Purpose: Handle HTTP requests for HMSPro Settings module.
// ============================================================

import {
    getSettingsService,
    createSettingsService,
    updateSettingsService,
    deleteSettingsService,
} from "../services/settingService.js";

// ============================================================
// Get Settings
// GET /api/settings
// ============================================================

export const getSettings = async (req, res) => {

    try {

        const settings =
            await getSettingsService();

        return res.status(200).json({

            success: true,

            message: "Hospital settings retrieved successfully.",

            data: settings,

        });

    } catch (error) {

        console.error(
            "Get settings error:",
            error.message
        );

        return res.status(404).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================================
// Create Settings
// POST /api/settings
// ============================================================

export const createSettings = async (req, res) => {

    try {

        const settings =
            await createSettingsService(
                {
                    ...req.body,
                    updatedBy: req.user._id,
                }
            );

        return res.status(201).json({

            success: true,

            message: "Hospital settings created successfully.",

            data: settings,

        });

    } catch (error) {

        console.error(
            "Create settings error:",
            error.message
        );

        // --------------------------------------------------------
        // Duplicate settings
        // --------------------------------------------------------

        if (
            error.message ===
            "Hospital settings already exist."
        ) {

            return res.status(409).json({

                success: false,

                message: error.message,

            });

        }

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================================
// Update Settings
// PUT /api/settings
// ============================================================

export const updateSettings = async (req, res) => {

    try {

        const settings =
            await updateSettingsService(
                {
                    ...req.body,
                    updatedBy: req.user._id,
                }
            );

        return res.status(200).json({

            success: true,

            message: "Hospital settings updated successfully.",

            data: settings,

        });

    } catch (error) {

        console.error(
            "Update settings error:",
            error.message
        );

        return res.status(404).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================================
// Delete Settings
// DELETE /api/settings
// ============================================================

export const deleteSettings = async (req, res) => {

    try {

        const settings =
            await deleteSettingsService();

        return res.status(200).json({

            success: true,

            message: "Hospital settings deleted successfully.",

            data: settings,

        });

    } catch (error) {

        console.error(
            "Delete settings error:",
            error.message
        );

        return res.status(404).json({

            success: false,

            message: error.message,

        });

    }

};