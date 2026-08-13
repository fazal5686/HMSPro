// ============================================================
// File: controllers/billingController.js
// Purpose: Handle HTTP requests for Billing module.
// ============================================================

import {
    createBillingService,
    getBillingByIdService,
    getAllBillingsService,
    getBillingsByPatientService,
    getBillingsByAdmissionService,
    updateBillingService,
    deleteBillingService,
} from "../services/billingService.js";

// ============================================================
// Create Billing
// POST /api/billings
// ============================================================

export const createBilling = async (
    req,
    res
) => {

    try {

        const billing =
            await createBillingService(
                req.body
            );

        return res.status(201).json({

            success: true,

            message:
                "Billing record created successfully.",

            data: billing,

        });

    } catch (error) {

        // ----------------------------------------------------
        // Duplicate invoice number
        // ----------------------------------------------------

        if (
            error.message ===
            "Invoice number already exists."
        ) {

            return res.status(409).json({

                success: false,

                message: error.message,

            });

        }

        // ----------------------------------------------------
        // Invalid payment amount
        // ----------------------------------------------------

        if (
            error.message ===
            "Amount paid cannot exceed total amount."
        ) {

            return res.status(400).json({

                success: false,

                message: error.message,

            });

        }

        // ----------------------------------------------------
        // Other server errors
        // ----------------------------------------------------

        console.error(
            "Create Billing Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Internal server error.",

        });

    }

};

// ============================================================
// Get Billing By ID
// GET /api/billings/:id
// ============================================================

export const getBillingById = async (
    req,
    res
) => {

    try {

        const billing =
            await getBillingByIdService(
                req.params.id
            );

        return res.status(200).json({

            success: true,

            data: billing,

        });

    } catch (error) {

        // ----------------------------------------------------
        // Billing not found
        // ----------------------------------------------------

        if (
            error.message ===
            "Billing record not found."
        ) {

            return res.status(404).json({

                success: false,

                message: error.message,

            });

        }

        // ----------------------------------------------------
        // Other errors
        // ----------------------------------------------------

        console.error(
            "Get Billing By ID Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Internal server error.",

        });

    }

};

// ============================================================
// Get All Billings
// GET /api/billings
// ============================================================

export const getAllBillings = async (
    req,
    res
) => {

    try {

        const billings =
            await getAllBillingsService();

        return res.status(200).json({

            success: true,

            data: billings,

        });

    } catch (error) {

        console.error(
            "Get All Billings Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Internal server error.",

        });

    }

};

// ============================================================
// Get Billings By Patient
// GET /api/billings/patient/:patientId
// ============================================================

export const getBillingsByPatient = async (
    req,
    res
) => {

    try {

        const billings =
            await getBillingsByPatientService(
                req.params.patientId
            );

        return res.status(200).json({

            success: true,

            data: billings,

        });

    } catch (error) {

        console.error(
            "Get Billings By Patient Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Internal server error.",

        });

    }

};

// ============================================================
// Get Billings By Admission
// GET /api/billings/admission/:admissionId
// ============================================================

export const getBillingsByAdmission = async (
    req,
    res
) => {

    try {

        const billings =
            await getBillingsByAdmissionService(
                req.params.admissionId
            );

        return res.status(200).json({

            success: true,

            data: billings,

        });

    } catch (error) {

        console.error(
            "Get Billings By Admission Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Internal server error.",

        });

    }

};

// ============================================================
// Update Billing
// PUT /api/billings/:id
// ============================================================

export const updateBilling = async (
    req,
    res
) => {

    try {

        const billing =
            await updateBillingService(
                req.params.id,
                req.body
            );

        return res.status(200).json({

            success: true,

            message:
                "Billing record updated successfully.",

            data: billing,

        });

    } catch (error) {

        // ----------------------------------------------------
        // Billing not found
        // ----------------------------------------------------

        if (
            error.message ===
            "Billing record not found."
        ) {

            return res.status(404).json({

                success: false,

                message: error.message,

            });

        }

        // ----------------------------------------------------
        // Duplicate invoice number
        // ----------------------------------------------------

        if (
            error.message ===
            "Invoice number already exists."
        ) {

            return res.status(409).json({

                success: false,

                message: error.message,

            });

        }

        // ----------------------------------------------------
        // Invalid payment amount
        // ----------------------------------------------------

        if (
            error.message ===
            "Amount paid cannot exceed total amount."
        ) {

            return res.status(400).json({

                success: false,

                message: error.message,

            });

        }

        // ----------------------------------------------------
        // Other errors
        // ----------------------------------------------------

        console.error(
            "Update Billing Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Internal server error.",

        });

    }

};

// ============================================================
// Delete Billing
// DELETE /api/billings/:id
// ============================================================

export const deleteBilling = async (
    req,
    res
) => {

    try {

        await deleteBillingService(
            req.params.id
        );

        return res.status(200).json({

            success: true,

            message:
                "Billing record deleted successfully.",

        });

    } catch (error) {

        // ----------------------------------------------------
        // Billing not found
        // ----------------------------------------------------

        if (
            error.message ===
            "Billing record not found."
        ) {

            return res.status(404).json({

                success: false,

                message: error.message,

            });

        }

        // ----------------------------------------------------
        // Other errors
        // ----------------------------------------------------

        console.error(
            "Delete Billing Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Internal server error.",

        });

    }

};