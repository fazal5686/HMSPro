
// ============================================================
// File:
// D:\HMSPro\frontend\src\api\apiRoutes.js
//
// Purpose:
// Central location for all HMSPro frontend API endpoints.
//
// Rule:
// Frontend services and pages should use these constants
// instead of hard-coded API endpoint strings.
// ============================================================


const API_ROUTES = {


    // ========================================================
    // Authentication
    // ========================================================

    AUTH: {

        LOGIN:
            "/auth/login",

        REGISTER:
            "/auth/register",

        ME:
            "/auth/me",

    },


    // ========================================================
    // Patients
    // ========================================================

    PATIENTS: {

        PROFILE:
            "/patients/profile",
    
        LIST:
            "/patients",
    
    },


    // ========================================================
    // Appointments
    // ========================================================

    APPOINTMENTS: {

        BASE:
            "/appointments",

        ALL:
            "/appointments",

        BY_ID: (id) =>
            `/appointments/${id}`,

        BY_PATIENT: (patientId) =>
            `/appointments/patient/${patientId}`,

        BY_DOCTOR: (doctorId) =>
            `/appointments/doctor/${doctorId}`,

    },


    // ========================================================
    // Billing
    // ========================================================

    BILLINGS: {

        BASE:
            "/billings",

        ALL:
            "/billings",

        BY_ID: (id) =>
            `/billings/${id}`,

        BY_PATIENT: (patientId) =>
            `/billings/patient/${patientId}`,

    },


    // ========================================================
    // Users
    // ========================================================

    USERS: {

        BASE:
            "/users",

        ALL:
            "/users/all",

        BY_ROLE: (role) =>
            `/users/role/${role}`,

        BY_ID: (id) =>
            `/users/${id}`,

        STATUS: (id) =>
            `/users/${id}/status`,

        PASSWORD: (id) =>
            `/users/${id}/password`,

    },


    // ========================================================
    // Reports
    // ========================================================

    REPORTS: {

        DASHBOARD:
            "/reports/dashboard",

        APPOINTMENTS:
            "/reports/appointments",

        ADMISSIONS:
            "/reports/admissions",

        BILLING:
            "/reports/billing",

        MEDICINES:
            "/reports/medicines",

    },


};


// ============================================================
// Export
// ============================================================

export default API_ROUTES;
