
// ============================================================
// File: tests/dashboard.test.js
// Purpose: Automated tests for HMSPro Dashboard module.
// Dashboard provides statistical information.
// No CRUD Dashboard records are created.
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
// Dashboard Test Suite
// ============================================================

describe("HMSPro Dashboard API", () => {

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
    // Dashboard Statistics
    // ========================================================

    test(
        "GET /api/dashboard should return dashboard statistics",
        async () => {

            const response = await request(app)
                .get("/api/dashboard")
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
    // Validate Dashboard Structure
    // ========================================================

    test(
        "GET /api/dashboard should return expected statistics structure",
        async () => {

            const response = await request(app)
                .get("/api/dashboard")
                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );

            expect(response.statusCode).toBe(200);

            expect(response.body.success).toBe(true);

            expect(response.body.data).toBeDefined();

            expect(response.body.data.users).toBeDefined();

            expect(response.body.data.patients).toBeDefined();

            expect(response.body.data.doctors).toBeDefined();

            expect(response.body.data.appointments).toBeDefined();

            expect(response.body.data.admissions).toBeDefined();

            expect(response.body.data.rooms).toBeDefined();

            expect(response.body.data.medicines).toBeDefined();

            expect(response.body.data.billings).toBeDefined();

        }
    );

    // ========================================================
    // Validate Numeric Statistics
    // ========================================================

    test(
        "GET /api/dashboard should return numeric statistics",
        async () => {

            const response = await request(app)
                .get("/api/dashboard")
                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );

            expect(response.statusCode).toBe(200);

            const data =
                response.body.data;

            expect(typeof data.users.total).toBe("number");

            expect(typeof data.users.active).toBe("number");

            expect(typeof data.patients.total).toBe("number");

            expect(typeof data.doctors.total).toBe("number");

            expect(typeof data.doctors.active).toBe("number");

            expect(typeof data.appointments.total).toBe("number");

            expect(typeof data.admissions.total).toBe("number");

            expect(typeof data.admissions.active).toBe("number");

            expect(typeof data.rooms.total).toBe("number");

            expect(typeof data.rooms.available).toBe("number");

            expect(typeof data.rooms.occupied).toBe("number");

            expect(typeof data.medicines.total).toBe("number");

            expect(typeof data.medicines.active).toBe("number");

            expect(typeof data.billings.total).toBe("number");

        }
    );

    // ========================================================
    // Authentication Protection
    // ========================================================

    test(
        "GET /api/dashboard should reject unauthenticated request",
        async () => {

            const response = await request(app)
                .get("/api/dashboard");

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
