// ============================================================
// File: services/reportService.js
// Purpose: Business logic for HMSPro Reports module.
// This layer handles report-related business operations.
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

    return await getDashboardReport();

};

// ============================================================
// Appointment Report
// ============================================================

export const getAppointmentReportService = async () => {

    return await getAppointmentReport();

};

// ============================================================
// Admission Report
// ============================================================

export const getAdmissionReportService = async () => {

    return await getAdmissionReport();

};

// ============================================================
// Billing Report
// ============================================================

export const getBillingReportService = async () => {

    return await getBillingReport();

};

// ============================================================
// Medicine Inventory Report
// ============================================================

export const getMedicineInventoryReportService = async () => {

    return await getMedicineInventoryReport();

};