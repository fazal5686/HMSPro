// ============================================================
// File: controllers/reportController.js
// Purpose: HTTP controllers for HMSPro Reports module.
// Handles report requests and passes errors to the global
// error-handling middleware.
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

export const getDashboardReport = async (
    req,
    res,
    next
) => {

    try {

        const report =
            await getDashboardReportService();

        return res.status(200).json({

            success: true,

            message:
                "Dashboard report retrieved successfully.",

            data: report,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Appointment Report
// GET /api/reports/appointments
// ============================================================

export const getAppointmentReport = async (
    req,
    res,
    next
) => {

    try {

        const report =
            await getAppointmentReportService();

        return res.status(200).json({

            success: true,

            message:
                "Appointment report retrieved successfully.",

            data: report,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Admission Report
// GET /api/reports/admissions
// ============================================================

export const getAdmissionReport = async (
    req,
    res,
    next
) => {

    try {

        const report =
            await getAdmissionReportService();

        return res.status(200).json({

            success: true,

            message:
                "Admission report retrieved successfully.",

            data: report,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Billing Report
// GET /api/reports/billing
// ============================================================

export const getBillingReport = async (
    req,
    res,
    next
) => {

    try {

        const report =
            await getBillingReportService();

        return res.status(200).json({

            success: true,

            message:
                "Billing report retrieved successfully.",

            data: report,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Medicine Inventory Report
// GET /api/reports/medicines
// ============================================================

export const getMedicineInventoryReport = async (
    req,
    res,
    next
) => {

    try {

        const report =
            await getMedicineInventoryReportService();

        return res.status(200).json({

            success: true,

            message:
                "Medicine inventory report retrieved successfully.",

            data: report,

        });

    } catch (error) {

        next(error);

    }

};