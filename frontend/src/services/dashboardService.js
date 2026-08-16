// ============================================================
// File: services/dashboardService.js
// Purpose: Handles Dashboard API communication.
// ============================================================


import API from "../api/axios.js";

import API_ROUTES from "../api/apiRoutes.js";



// ============================================================
// Get Dashboard Statistics
// ============================================================

const getDashboardStats = async () => {

    const response = await API.get(
        API_ROUTES.REPORTS.DASHBOARD
    );

    return response.data;

};



export default {

    getDashboardStats,

};