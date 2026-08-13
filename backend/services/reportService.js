// ============================================================
// File: services/reportService.js
// Purpose: Business logic for HMSPro Reports module.
// ============================================================

import {
    getDashboardReport,
    getAppointmentReport,
    getAdmissionReport,
    getBillingReport,
    getMedicineInventoryReport,
} from "../repositories/reportRepository.js";

// ============================================================
// Dashboard Report
// ============================================================

export const getDashboardReportService = async () => {

    const report = await getDashboardReport();

    return report;
};

// ============================================================
// Appointment Report
// ============================================================

export const getAppointmentReportService = async () => {

    const report = await getAppointmentReport();

    return report;
};

// ============================================================
// Admission Report
// ============================================================

export const getAdmissionReportService = async () => {

    const report = await getAdmissionReport();

    return report;
};

// ============================================================
// Billing Report
// ============================================================

export const getBillingReportService = async () => {

    const report = await getBillingReport();

    return report;
};

// ============================================================
// Medicine Inventory Report
// ============================================================

export const getMedicineInventoryReportService = async () => {

    const report = await getMedicineInventoryReport();

    return report;
};