// ============================================================
// File: tests/patient.test.js
// Purpose: Automated tests for HMSPro Patient module.
// ============================================================

import request from "supertest";
import mongoose from "mongoose";
import "dotenv/config";

import app from "../app.js";

// ============================================================
// Test Configuration
// ============================================================

const PATIENT_EMAIL =
    `patient.test.${Date.now()}@hmspro.com`;

const PATIENT_PASSWORD =
    process.env.TEST_PATIENT_PASSWORD ||
    "Patient@12345";

// ============================================================
// Patient Test Suite
// ============================================================

describe("HMSPro Patient API", () => {

    let token;
    let patientUserId;

    // ========================================================
    // Create Patient User and Login
    // ========================================================

    beforeAll(async () => {

        await mongoose.connect(
            process.env.MONGODB_URI
        );

        // ----------------------------------------------------
        // Register a dedicated test patient account
        // ----------------------------------------------------

        const registerResponse =
            await request(app)
                .post("/api/auth/register")
                .send({

                    fullName:
                        "HMSPro Patient Test",

                    email:
                        PATIENT_EMAIL,

                    password:
                        PATIENT_PASSWORD,

                    role:
                        "Patient",

                    phone:
                        "03001234567",

                });

        if (
            registerResponse.statusCode !== 201 &&
            registerResponse.statusCode !== 200
        ) {

            throw new Error(
                `Patient registration failed. ` +
                `Status: ${registerResponse.statusCode}. ` +
                `Message: ${
                    registerResponse.body?.message ||
                    "Unknown error"
                }`
            );

        }

        // ----------------------------------------------------
        // Login
        // ----------------------------------------------------

        const loginResponse =
            await request(app)
                .post("/api/auth/login")
                .send({

                    email:
                        PATIENT_EMAIL,

                    password:
                        PATIENT_PASSWORD,

                });

        if (
            loginResponse.statusCode !== 200
        ) {

            throw new Error(
                `Patient login failed. ` +
                `Status: ${loginResponse.statusCode}. ` +
                `Message: ${
                    loginResponse.body?.message ||
                    "Unknown error"
                }`
            );

        }

        token =
            loginResponse.body.data.token;

        patientUserId =
            loginResponse.body.data.user?._id ||
            loginResponse.body.data.user?.id;

    }, 30000);

    // ========================================================
    // Create Patient Profile
    // ========================================================

    test(
        "POST /api/patients/profile should create patient profile",
        async () => {

            const response =
                await request(app)
                    .post("/api/patients/profile")
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    )
                    .send({

                        dateOfBirth:
                            "1995-05-15",

                        gender:
                            "Male",

                        bloodGroup:
                            "O+",

                        address:
                            "HMSPro Test Address",

                        city:
                            "Rawalpindi",

                        emergencyContact:
                            "03111234567",

                        medicalHistory:
                            "No major medical history.",

                        allergies:
                            "None",

                    });

            expect(
                response.statusCode
            ).toBe(201);

            expect(
                response.body.success
            ).toBe(true);

            expect(
                response.body.message
            ).toBe(
                "Patient profile created successfully."
            );

            expect(
                response.body.data
            ).toBeDefined();

            expect(
                response.body.data.userId
            ).toBeDefined();

            expect(
                response.body.data.gender
            ).toBe("Male");

            expect(
                response.body.data.bloodGroup
            ).toBe("O+");

        }
    );

    // ========================================================
    // Get Patient Profile
    // ========================================================

    test(
        "GET /api/patients/profile should return patient profile",
        async () => {

            const response =
                await request(app)
                    .get("/api/patients/profile")
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    );

            expect(
                response.statusCode
            ).toBe(200);

            expect(
                response.body.success
            ).toBe(true);

            expect(
                response.body.message
            ).toBe(
                "Patient profile retrieved successfully."
            );

            expect(
                response.body.data
            ).toBeDefined();

            expect(
                response.body.data.gender
            ).toBe("Male");

            expect(
                response.body.data.bloodGroup
            ).toBe("O+");

        }
    );

    // ========================================================
    // Update Patient Profile
    // ========================================================

    test(
        "PUT /api/patients/profile should update patient profile",
        async () => {

            const response =
                await request(app)
                    .put("/api/patients/profile")
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    )
                    .send({

                        address:
                            "Updated HMSPro Address",

                        city:
                            "Islamabad",

                        emergencyContact:
                            "03221234567",

                        medicalHistory:
                            "Updated medical history.",

                    });

            expect(
                response.statusCode
            ).toBe(200);

            expect(
                response.body.success
            ).toBe(true);

            expect(
                response.body.message
            ).toBe(
                "Patient profile updated successfully."
            );

            expect(
                response.body.data.address
            ).toBe(
                "Updated HMSPro Address"
            );

            expect(
                response.body.data.city
            ).toBe(
                "Islamabad"
            );

            expect(
                response.body.data.emergencyContact
            ).toBe(
                "03221234567"
            );

        }
    );

    // ========================================================
    // Get Updated Patient Profile
    // ========================================================

    test(
        "GET /api/patients/profile should return updated profile",
        async () => {

            const response =
                await request(app)
                    .get("/api/patients/profile")
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    );

            expect(
                response.statusCode
            ).toBe(200);

            expect(
                response.body.data.address
            ).toBe(
                "Updated HMSPro Address"
            );

            expect(
                response.body.data.city
            ).toBe(
                "Islamabad"
            );

            expect(
                response.body.data.medicalHistory
            ).toBe(
                "Updated medical history."
            );

        }
    );

    // ========================================================
    // Duplicate Patient Profile
    // ========================================================

    test(
        "POST /api/patients/profile should reject duplicate profile",
        async () => {

            const response =
                await request(app)
                    .post("/api/patients/profile")
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    )
                    .send({

                        dateOfBirth:
                            "1995-05-15",

                        gender:
                            "Male",

                        bloodGroup:
                            "O+",

                        address:
                            "Duplicate Address",

                    });

            // ------------------------------------------------
            // Current controller forwards service errors to
            // the global error handler.
            // The service specifically throws:
            // "Patient profile already exists."
            // ------------------------------------------------

            expect(
                response.statusCode
            ).toBeGreaterThanOrEqual(400);

            expect(
                response.body.success
            ).toBe(false);

        }
    );

    // ========================================================
    // Unauthorized Access
    // ========================================================

    test(
        "GET /api/patients/profile should reject unauthenticated request",
        async () => {

            const response =
                await request(app)
                    .get("/api/patients/profile");

            expect(
                response.statusCode
            ).toBe(401);

            expect(
                response.body.success
            ).toBe(false);

        }
    );

    // ========================================================
    // Close MongoDB Connection
    // ========================================================

    afterAll(async () => {

        await mongoose.connection.close();

    });

});