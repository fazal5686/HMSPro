// ============================================================
// File: controllers/reportController.js
// Purpose: Handle HTTP requests for HMSPro Reports module.
// ============================================================

import {
    getDashboardReportService,
    getAppointmentReportService,
    getAdmissionReportService,
    getBillingReportService,
    getMedicineInventoryReportService,
} from "../services/reportService.js";

// ============================================================
// Dashboard Report
// GET /api/reports/dashboard
// ============================================================

export const getDashboardReport = async (req, res) => {

    try {

        const report =
            await getDashboardReportService();

        return res.status(200).json({

            success: true,

            message: "Dashboard report retrieved successfully.",

            data: report,

        });

    } catch (error) {

        console.error(
            "Dashboard report error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Failed to retrieve dashboard report.",

            error: error.message,

        });

    }

};

// ============================================================
// Appointment Report
// GET /api/reports/appointments
// ============================================================

export const getAppointmentReport = async (req, res) => {

    try {

        const report =
            await getAppointmentReportService();

        return res.status(200).json({

            success: true,

            message: "Appointment report retrieved successfully.",

            data: report,

        });

    } catch (error) {

        console.error(
            "Appointment report error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Failed to retrieve appointment report.",

            error: error.message,

        });

    }

};

// ============================================================
// Admission Report
// GET /api/reports/admissions
// ============================================================

export const getAdmissionReport = async (req, res) => {

    try {

        const report =
            await getAdmissionReportService();

        return res.status(200).json({

            success: true,

            message: "Admission report retrieved successfully.",

            data: report,

        });

    } catch (error) {

        console.error(
            "Admission report error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Failed to retrieve admission report.",

            error: error.message,

        });

    }

};

// ============================================================
// Billing Report
// GET /api/reports/billing
// ============================================================

export const getBillingReport = async (req, res) => {

    try {

        const report =
            await getBillingReportService();

        return res.status(200).json({

            success: true,

            message: "Billing report retrieved successfully.",

            data: report,

        });

    } catch (error) {

        console.error(
            "Billing report error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Failed to retrieve billing report.",

            error: error.message,

        });

    }

};

// ============================================================
// Medicine Inventory Report
// GET /api/reports/medicines
// ============================================================

export const getMedicineInventoryReport = async (req, res) => {

    try {

        const report =
            await getMedicineInventoryReportService();

        return res.status(200).json({

            success: true,

            message: "Medicine inventory report retrieved successfully.",

            data: report,

        });

    } catch (error) {

        console.error(
            "Medicine inventory report error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Failed to retrieve medicine inventory report.",

            error: error.message,

        });

    }

};