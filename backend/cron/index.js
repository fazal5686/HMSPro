// ============================================================
// File: cron/index.js
// Purpose: HMSPro scheduled job manager.
// ============================================================

import cron from "node-cron";

import logger from "../utils/logger.js";

import {
    markMissedAppointments,
} from "./appointmentCron.js";


// ============================================================
// Start Cron Jobs
// ============================================================

export const startCronJobs = () => {

    // --------------------------------------------------------
    // Appointment Status Automation
    // Runs every minute.
    // --------------------------------------------------------

    cron.schedule(
        "* * * * *",
        async () => {

            await markMissedAppointments();

        }
    );


    // --------------------------------------------------------
    // Scheduler Health Check
    // Runs every minute.
    // --------------------------------------------------------

    cron.schedule(
        "* * * * *",
        () => {

            logger.info(
                "HMSPro cron scheduler is running."
            );

        }
    );


    // --------------------------------------------------------
    // Startup Log
    // --------------------------------------------------------

    logger.info(
        "HMSPro cron jobs initialized successfully."
    );

};