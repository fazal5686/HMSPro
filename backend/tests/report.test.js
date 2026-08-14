
// ============================================================
// File: tests/report.test.js
// Purpose: Automated tests for HMSPro Reports module.
// Reports are statistical/analytical reports.
// No CRUD Report records are created.
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

// ============================================================
// Reports Test Suite
// ============================================================

describe("HMSPro Reports API", () => {

    let adminToken;

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

        // ====================================================
        // Login as Admin
        // ====================================================

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.data).toBeDefined();

        expect(response.body.data.token).toBeDefined();

        adminToken =
            response.body.data.token;

    }, 30000);

    // ========================================================
    // Dashboard Report
    // ========================================================

    test(
        "GET /api/reports/dashboard should return dashboard report",
        async () => {

            const response = await request(app)
                .get("/api/reports/dashboard")
                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );

            expect(response.statusCode).toBe(200);

            expect(response.body.success).toBe(true);

            expect(response.body.data).toBeDefined();

        }
    );

    // ========================================================
    // Appointment Report
    // ========================================================

    test(
        "GET /api/reports/appointments should return appointment report",
        async () => {

            const response = await request(app)
                .get("/api/reports/appointments")
                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );

            expect(response.statusCode).toBe(200);

            expect(response.body.success).toBe(true);

            expect(response.body.data).toBeDefined();

        }
    );

    // ========================================================
    // Admission Report
    // ========================================================

    test(
        "GET /api/reports/admissions should return admission report",
        async () => {

            const response = await request(app)
                .get("/api/reports/admissions")
                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );

            expect(response.statusCode).toBe(200);

            expect(response.body.success).toBe(true);

            expect(response.body.data).toBeDefined();

        }
    );

    // ========================================================
    // Billing Report
    // ========================================================

    test(
        "GET /api/reports/billing should return billing report",
        async () => {

            const response = await request(app)
                .get("/api/reports/billing")
                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );

            expect(response.statusCode).toBe(200);

            expect(response.body.success).toBe(true);

            expect(response.body.data).toBeDefined();

        }
    );

    // ========================================================
    // Medicine Inventory Report
    // ========================================================

    test(
        "GET /api/reports/medicines should return medicine inventory report",
        async () => {

            const response = await request(app)
                .get("/api/reports/medicines")
                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );

            expect(response.statusCode).toBe(200);

            expect(response.body.success).toBe(true);

            expect(response.body.data).toBeDefined();

        }
    );

    // ========================================================
    // Authentication Protection
    // ========================================================

    test(
        "GET /api/reports/dashboard should reject unauthenticated request",
        async () => {

            const response = await request(app)
                .get("/api/reports/dashboard");

            expect(response.statusCode).toBe(401);

            expect(response.body.success).toBe(false);

        }
    );

    // ========================================================
    // Close Database Connection
    // ========================================================

    afterAll(async () => {

        await mongoose.connection.close();

    });

});
