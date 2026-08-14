// ============================================================
// File: tests/appointmentCron.test.js
// Purpose: Automated tests for HMSPro Appointment Cron Job.
// ============================================================

import mongoose from "mongoose";
import "dotenv/config";

import Appointment from "../models/Appointment.js";

import {
    markMissedAppointments,
} from "../cron/appointmentCron.js";


// ============================================================
// Test Suite
// ============================================================

describe(
    "HMSPro Appointment Cron Job",
    () => {

        // ====================================================
        // Connect MongoDB
        // ====================================================

        beforeAll(
            async () => {

                await mongoose.connect(
                    process.env.MONGODB_URI
                );

            },
            30000
        );


        // ====================================================
        // Test: Pending past appointment
        // ====================================================

        test(
            "should mark past Pending appointment as No Show",
            async () => {

                const appointment =
                    await Appointment.create({

                        patientId:
                            new mongoose.Types.ObjectId(),

                        doctorId:
                            new mongoose.Types.ObjectId(),

                        appointmentDate:
                            new Date(
                                Date.now() -
                                60 * 60 * 1000
                            ),

                        reason:
                            "Cron Pending test.",

                        status:
                            "Pending",

                    });


                await markMissedAppointments();


                const updatedAppointment =
                    await Appointment.findById(
                        appointment._id
                    );


                expect(
                    updatedAppointment.status
                )
                    .toBe(
                        "No Show"
                    );


                await Appointment.deleteOne({
                    _id:
                        appointment._id,
                });

            }
        );


        // ====================================================
        // Test: Confirmed past appointment
        // ====================================================

        test(
            "should mark past Confirmed appointment as No Show",
            async () => {

                const appointment =
                    await Appointment.create({

                        patientId:
                            new mongoose.Types.ObjectId(),

                        doctorId:
                            new mongoose.Types.ObjectId(),

                        appointmentDate:
                            new Date(
                                Date.now() -
                                2 * 60 * 60 * 1000
                            ),

                        reason:
                            "Cron Confirmed test.",

                        status:
                            "Confirmed",

                    });


                await markMissedAppointments();


                const updatedAppointment =
                    await Appointment.findById(
                        appointment._id
                    );


                expect(
                    updatedAppointment.status
                )
                    .toBe(
                        "No Show"
                    );


                await Appointment.deleteOne({
                    _id:
                        appointment._id,
                });

            }
        );


        // ====================================================
        // Test: Future Pending appointment
        // ====================================================

        test(
            "should NOT change future Pending appointment",
            async () => {

                const appointment =
                    await Appointment.create({

                        patientId:
                            new mongoose.Types.ObjectId(),

                        doctorId:
                            new mongoose.Types.ObjectId(),

                        appointmentDate:
                            new Date(
                                Date.now() +
                                60 * 60 * 1000
                            ),

                        reason:
                            "Cron future test.",

                        status:
                            "Pending",

                    });


                await markMissedAppointments();


                const updatedAppointment =
                    await Appointment.findById(
                        appointment._id
                    );


                expect(
                    updatedAppointment.status
                )
                    .toBe(
                        "Pending"
                    );


                await Appointment.deleteOne({
                    _id:
                        appointment._id,
                });

            }
        );


        // ====================================================
        // Test: Cancelled past appointment
        // ====================================================

        test(
            "should NOT change past Cancelled appointment",
            async () => {

                const appointment =
                    await Appointment.create({

                        patientId:
                            new mongoose.Types.ObjectId(),

                        doctorId:
                            new mongoose.Types.ObjectId(),

                        appointmentDate:
                            new Date(
                                Date.now() -
                                60 * 60 * 1000
                            ),

                        reason:
                            "Cron Cancelled test.",

                        status:
                            "Cancelled",

                    });


                await markMissedAppointments();


                const updatedAppointment =
                    await Appointment.findById(
                        appointment._id
                    );


                expect(
                    updatedAppointment.status
                )
                    .toBe(
                        "Cancelled"
                    );


                await Appointment.deleteOne({
                    _id:
                        appointment._id,
                });

            }
        );


        // ====================================================
        // Test: Completed past appointment
        // ====================================================

        test(
            "should NOT change past Completed appointment",
            async () => {

                const appointment =
                    await Appointment.create({

                        patientId:
                            new mongoose.Types.ObjectId(),

                        doctorId:
                            new mongoose.Types.ObjectId(),

                        appointmentDate:
                            new Date(
                                Date.now() -
                                60 * 60 * 1000
                            ),

                        reason:
                            "Cron Completed test.",

                        status:
                            "Completed",

                    });


                await markMissedAppointments();


                const updatedAppointment =
                    await Appointment.findById(
                        appointment._id
                    );


                expect(
                    updatedAppointment.status
                )
                    .toBe(
                        "Completed"
                    );


                await Appointment.deleteOne({
                    _id:
                        appointment._id,
                });

            }
        );


        // ====================================================
        // Close MongoDB Connection
        // ====================================================

        afterAll(
            async () => {

                await mongoose.connection.close();

            }
        );

    }
);