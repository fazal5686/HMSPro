// ============================================================
// File: D:\HMSPro\frontend\src\api\apiRoutes.js
// Purpose: Central location for all backend API endpoints.
// ============================================================


const API_ROUTES = {


    // ========================================================
    // Authentication
    // ========================================================

    AUTH: {

        LOGIN: "/auth/login",

        REGISTER: "/auth/register",

        ME: "/auth/me",

    },


    // ========================================================
    // Patients
    // ========================================================

    PATIENTS: {

        PROFILE: "/patients/profile",

    },


    // ========================================================
    // Users
    // ========================================================

    USERS: {

        BASE: "/users",

        ALL: "/users/all",

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

        DASHBOARD: "/reports/dashboard",

        APPOINTMENTS: "/reports/appointments",

        ADMISSIONS: "/reports/admissions",

        BILLING: "/reports/billing",

    },


};


export default API_ROUTES;