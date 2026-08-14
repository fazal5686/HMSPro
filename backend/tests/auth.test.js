// ============================================================
// File: tests/auth.test.js
// Purpose: Automated tests for HMSPro Authentication module.
// ============================================================

import request from "supertest";
import mongoose from "mongoose";
import "dotenv/config";

import app from "../app.js";

// ============================================================
// Test Configuration
// ============================================================

const ADMIN_EMAIL = "admin@hmspro.com";

const ADMIN_PASSWORD =
    process.env.TEST_ADMIN_PASSWORD;

const TEST_USER_EMAIL =
    `auth-test-${Date.now()}@hmspro.com`;

const TEST_USER_PASSWORD =
    "Test@123456";

// ============================================================
// Authentication Test Suite
// ============================================================

describe("HMSPro Authentication API", () => {

    let adminToken;
    let patientToken;

    // ========================================================
    // Connect Database
    // ========================================================

    beforeAll(async () => {

        await mongoose.connect(
            process.env.MONGODB_URI
        );

        if (!ADMIN_PASSWORD) {

            throw new Error(
                "TEST_ADMIN_PASSWORD environment variable is not set."
            );

        }

    }, 30000);

    // ========================================================
    // Register User
    // ========================================================

    test(
        "POST /api/auth/register should register a new user",
        async () => {

            const response = await request(app)
                .post("/api/auth/register")
                .send({

                    fullName:
                        "HMSPro Auth Test User",

                    email:
                        TEST_USER_EMAIL,

                    password:
                        TEST_USER_PASSWORD,

                    phone:
                        "03331234567",

                });

            expect(response.statusCode)
                .toBe(201);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.data)
                .toHaveProperty("token");

            expect(response.body.data.user)
                .toHaveProperty(
                    "email",
                    TEST_USER_EMAIL
                );

        }
    );

    // ========================================================
    // Duplicate Email
    // ========================================================

    test(
        "POST /api/auth/register should reject duplicate email",
        async () => {

            const response = await request(app)
                .post("/api/auth/register")
                .send({

                    fullName:
                        "Duplicate Auth Test User",

                    email:
                        TEST_USER_EMAIL,

                    password:
                        TEST_USER_PASSWORD,

                    phone:
                        "03331234567",

                });

            expect(response.statusCode)
                .toBe(409);

            expect(response.body.success)
                .toBe(false);

            expect(response.body.message)
                .toBe(
                    "Email already exists."
                );

        }
    );

    // ========================================================
    // Register Validation
    // ========================================================

    test(
        "POST /api/auth/register should reject invalid registration data",
        async () => {

            const response = await request(app)
                .post("/api/auth/register")
                .send({

                    fullName: "",

                    email:
                        "invalid-email",

                    password:
                        "123",

                });

            expect(response.statusCode)
                .toBe(400);

            expect(response.body.success)
                .toBe(false);

        }
    );

    // ========================================================
    // Login Admin
    // ========================================================

    test(
        "POST /api/auth/login should login admin successfully",
        async () => {

            const response = await request(app)
                .post("/api/auth/login")
                .send({

                    email:
                        ADMIN_EMAIL,

                    password:
                        ADMIN_PASSWORD,

                });

            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.data)
                .toHaveProperty("token");

            expect(response.body.data.user)
                .toHaveProperty(
                    "email",
                    ADMIN_EMAIL
                );

            expect(response.body.data.user)
                .toHaveProperty(
                    "role",
                    "Admin"
                );

            adminToken =
                response.body.data.token;

        }
    );

    // ========================================================
    // Invalid Login
    // ========================================================

    test(
        "POST /api/auth/login should reject invalid credentials",
        async () => {

            const response = await request(app)
                .post("/api/auth/login")
                .send({

                    email:
                        ADMIN_EMAIL,

                    password:
                        "WrongPassword123",

                });

            expect(response.statusCode)
                .toBe(401);

            expect(response.body.success)
                .toBe(false);

            expect(response.body.message)
                .toBe(
                    "Invalid email or password."
                );

        }
    );

    // ========================================================
    // Login Validation
    // ========================================================

    test(
        "POST /api/auth/login should reject invalid input",
        async () => {

            const response = await request(app)
                .post("/api/auth/login")
                .send({

                    email:
                        "not-an-email",

                    password:
                        "",

                });

            expect(response.statusCode)
                .toBe(400);

            expect(response.body.success)
                .toBe(false);

        }
    );

    // ========================================================
    // Current User
    // ========================================================

    test(
        "GET /api/auth/me should return current admin",
        async () => {

            const response = await request(app)
                .get("/api/auth/me")
                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );

            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.data)
                .toHaveProperty(
                    "email",
                    ADMIN_EMAIL
                );

            expect(response.body.data)
                .toHaveProperty(
                    "role",
                    "Admin"
                );

        }
    );

    // ========================================================
    // Current User Without Token
    // ========================================================

    test(
        "GET /api/auth/me should reject missing token",
        async () => {

            const response = await request(app)
                .get("/api/auth/me");

            expect(response.statusCode)
                .toBe(401);

            expect(response.body.success)
                .toBe(false);

            expect(response.body.message)
                .toBe(
                    "Not authorized. Token missing."
                );

        }
    );

    // ========================================================
    // Current User Invalid Token
    // ========================================================

    test(
        "GET /api/auth/me should reject invalid token",
        async () => {

            const response = await request(app)
                .get("/api/auth/me")
                .set(
                    "Authorization",
                    "Bearer invalid.test.token"
                );

            expect(response.statusCode)
                .toBe(401);

            expect(response.body.success)
                .toBe(false);

            expect(response.body.message)
                .toBe(
                    "Invalid or expired token."
                );

        }
    );

    // ========================================================
    // Patient Access
    // ========================================================

    test(
        "GET /api/auth/patient-test should reject Admin role",
        async () => {

            const response = await request(app)
                .get("/api/auth/patient-test")
                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );

            expect(response.statusCode)
                .toBe(403);

            expect(response.body.success)
                .toBe(false);

            expect(response.body.message)
                .toBe(
                    "Access denied. Permission insufficient."
                );

        }
    );
// ========================================================
    // Close MongoDB connection after tests
    // ========================================================

    afterAll(async () => {
        await mongoose.connection.close();
    });
});