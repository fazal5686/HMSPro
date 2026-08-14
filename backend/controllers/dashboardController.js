
// ============================================================
// File: controllers/dashboardController.js
// Purpose: Controllers for HMSPro Dashboard statistics.
// ============================================================

import {
    getDashboardStatisticsService,
} from "../services/dashboardService.js";


// ============================================================
// Get Dashboard Statistics
// GET /api/dashboard
// ============================================================

export const getDashboardStatistics =
    async (req, res, next) => {

        try {

            // ------------------------------------------------
            // Get dashboard statistics from service
            // ------------------------------------------------

            const statistics =
                await getDashboardStatisticsService();


            // ------------------------------------------------
            // Send successful response
            // ------------------------------------------------

            return res.status(200).json({

                success: true,

                message:
                    "Dashboard statistics retrieved successfully.",

                data: statistics,

            });

        } catch (error) {

            // ------------------------------------------------
            // Pass error to global error handler
            // ------------------------------------------------

            next(error);

        }

    };
