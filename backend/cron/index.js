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
// Prevent Duplicate Scheduler Initialization
// ============================================================

let cronJobsStarted = false;


// ============================================================
// Start Cron Jobs
// ============================================================

export const startCronJobs = () => {

    // --------------------------------------------------------
    // Prevent duplicate initialization.
    // --------------------------------------------------------

    if (cronJobsStarted) {

        logger.warn(
            "HMSPro cron jobs are already running."
        );

        return;

    }


    cronJobsStarted = true;


    // --------------------------------------------------------
    // Appointment Status Automation
    //
    // Runs every minute.
    // Automatically marks overdue appointments as missed.
    // --------------------------------------------------------

    cron.schedule(
        "* * * * *",
        async () => {

            try {

                await markMissedAppointments();

            } catch (error) {

                logger.error(
                    `Appointment cron error: ${error.message}`
                );

            }

        }
    );


    // --------------------------------------------------------
    // Scheduler Health Check
    //
    // Runs every 5 minutes instead of every minute.
    // This keeps the backend console/logs clean.
    // --------------------------------------------------------

    cron.schedule(
        "*/5 * * * *",
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
