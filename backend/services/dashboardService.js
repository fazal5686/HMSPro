
// ============================================================
// File: services/dashboardService.js
// Purpose: Business logic for HMSPro Dashboard statistics.
// ============================================================

import {
    getDashboardStatistics,
} from "../repositories/dashboardRepository.js";


// ============================================================
// Get Dashboard Statistics
// ============================================================

export const getDashboardStatisticsService =
    async () => {

        // ----------------------------------------------------
        // Get statistics from repository
        // ----------------------------------------------------

        const statistics =
            await getDashboardStatistics();


        // ----------------------------------------------------
        // Return dashboard data
        // ----------------------------------------------------

        return statistics;

    };
