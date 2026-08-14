// ============================================================
// File: tests/setting.test.js
// Purpose: Automated tests for HMSPro Settings module.
// ============================================================

import request from "supertest";
import mongoose from "mongoose";
import "dotenv/config";

import app from "../app.js";

// ============================================================
// Settings Test Suite
// ============================================================

describe("HMSPro Settings API", () => {

    let token;

    // ========================================================
    // Connect Database and Login before tests
    // ========================================================

    beforeAll(async () => {

        // ----------------------------------------------------
        // Verify test password is available
        // ----------------------------------------------------

        if (!process.env.TEST_ADMIN_PASSWORD) {

            throw new Error(
                "TEST_ADMIN_PASSWORD environment variable is not set."
            );

        }

        // ----------------------------------------------------
        // Connect to MongoDB
        // ----------------------------------------------------

        await mongoose.connect(
            process.env.MONGODB_URI
        );

        // ----------------------------------------------------
        // Login as HMS Admin
        // ----------------------------------------------------

        const response = await request(app)
            .post("/api/auth/login")
            .send({

                email: "admin@hmspro.com",

                password:
                    process.env.TEST_ADMIN_PASSWORD,

            });

        // ----------------------------------------------------
        // Verify Login
        // ----------------------------------------------------

        if (response.statusCode !== 200) {

            throw new Error(
                `Admin login failed: ${response.statusCode} - ${
                    response.body?.message ||
                    "Unknown error"
                }`
            );

        }

        // ----------------------------------------------------
        // Store JWT token
        // ----------------------------------------------------

        token = response.body.data.token;

    }, 30000);

    // ========================================================
    // GET Settings
    // ========================================================

    test(
        "GET /api/settings should return hospital settings",
        async () => {

            const response = await request(app)
                .get("/api/settings")
                .set(
                    "Authorization",
                    `Bearer ${token}`
                );

            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.message)
                .toBe(
                    "Hospital settings retrieved successfully."
                );

            expect(response.body.data)
                .toBeDefined();

            expect(response.body.data.hospitalName)
                .toBeDefined();

        }
    );

    // ========================================================
    // PUT Settings
    // ========================================================

    test(
        "PUT /api/settings should update hospital settings",
        async () => {

            const response = await request(app)
                .put("/api/settings")
                .set(
                    "Authorization",
                    `Bearer ${token}`
                )
                .send({

                    hospitalName:
                        "HMSPro General Hospital & Medical Center",

                    hospitalPhone:
                        "03009998888",

                    timeFormat:
                        "24-hour",

                    emailNotifications:
                        false,

                    defaultAppointmentDuration:
                        45,

                    taxEnabled:
                        true,

                    taxPercentage:
                        5,

                });

            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.message)
                .toBe(
                    "Hospital settings updated successfully."
                );

            expect(response.body.data)
                .toBeDefined();

            expect(response.body.data.hospitalName)
                .toBe(
                    "HMSPro General Hospital & Medical Center"
                );

            expect(response.body.data.hospitalPhone)
                .toBe(
                    "03009998888"
                );

            expect(response.body.data.timeFormat)
                .toBe(
                    "24-hour"
                );

            expect(response.body.data.emailNotifications)
                .toBe(false);

            expect(
                response.body.data.defaultAppointmentDuration
            )
                .toBe(45);

            expect(response.body.data.taxEnabled)
                .toBe(true);

            expect(response.body.data.taxPercentage)
                .toBe(5);

        }
    );

    // ========================================================
    // GET Settings After Update
    // ========================================================

    test(
        "GET /api/settings should return updated settings",
        async () => {

            const response = await request(app)
                .get("/api/settings")
                .set(
                    "Authorization",
                    `Bearer ${token}`
                );

            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.data.hospitalName)
                .toBe(
                    "HMSPro General Hospital & Medical Center"
                );

            expect(response.body.data.hospitalPhone)
                .toBe(
                    "03009998888"
                );

            expect(response.body.data.timeFormat)
                .toBe(
                    "24-hour"
                );

            expect(response.body.data.emailNotifications)
                .toBe(false);

            expect(
                response.body.data.defaultAppointmentDuration
            )
                .toBe(45);

            expect(response.body.data.taxEnabled)
                .toBe(true);

            expect(response.body.data.taxPercentage)
                .toBe(5);

        }
    );

    // ========================================================
    // Close MongoDB after tests
    // ========================================================

    afterAll(async () => {

        await mongoose.connection.close();

    });

});