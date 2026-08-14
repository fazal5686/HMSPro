// ============================================================
// File: cron/appointmentCron.js
// Purpose: Automatically mark missed appointments as "No Show".
// ============================================================

import Appointment from "../models/Appointment.js";

import logger from "../utils/logger.js";


// ============================================================
// Mark Missed Appointments
// ============================================================

export const markMissedAppointments = async () => {

    try {

        // --------------------------------------------------------
        // Current date/time
        // --------------------------------------------------------

        const now = new Date();


        // --------------------------------------------------------
        // Find appointments that are already past and still
        // Pending or Confirmed.
        // --------------------------------------------------------

        const result =
            await Appointment.updateMany(

                {
                    appointmentDate: {
                        $lt: now,
                    },

                    status: {
                        $in: [
                            "Pending",
                            "Confirmed",
                        ],
                    },

                },

                {
                    $set: {
                        status: "No Show",
                    },

                }

            );


        // --------------------------------------------------------
        // Log only when appointments were actually updated.
        // --------------------------------------------------------

        if (
            result.modifiedCount > 0
        ) {

            logger.info(
                `HMSPro cron: ${result.modifiedCount} missed appointment(s) marked as No Show.`
            );

        }

    }
    catch (error) {

        // --------------------------------------------------------
        // Cron errors should be logged instead of crashing
        // the HMSPro server.
        // --------------------------------------------------------

        logger.error(
            `HMSPro cron appointment job failed: ${error.message}`
        );

    }

};