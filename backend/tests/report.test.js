
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
    // Dashboard Report Structure
    // ========================================================

    test(
        "Dashboard report should contain valid statistics",
        async () => {

            const response = await request(app)
                .get("/api/reports/dashboard")
                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );

            expect(response.statusCode).toBe(200);

            const report =
                response.body.data;

            expect(report.totalPatients)
                .toEqual(expect.any(Number));

            expect(report.totalDoctors)
                .toEqual(expect.any(Number));

            expect(report.activeDoctors)
                .toEqual(expect.any(Number));

            expect(report.totalAppointments)
                .toEqual(expect.any(Number));

            expect(report.totalAdmissions)
                .toEqual(expect.any(Number));

            expect(report.activeAdmissions)
                .toEqual(expect.any(Number));

            expect(report.totalMedicines)
                .toEqual(expect.any(Number));

            expect(report.activeMedicines)
                .toEqual(expect.any(Number));

            expect(report.activeDoctors)
                .toBeLessThanOrEqual(
                    report.totalDoctors
                );

            expect(report.activeAdmissions)
                .toBeLessThanOrEqual(
                    report.totalAdmissions
                );

            expect(report.activeMedicines)
                .toBeLessThanOrEqual(
                    report.totalMedicines
                );

        }
    );


    // ========================================================
    // Appointment Report Structure
    // ========================================================

    test(
        "Appointment report should contain valid status statistics",
        async () => {

            const response = await request(app)
                .get("/api/reports/appointments")
                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );

            expect(response.statusCode).toBe(200);

            const report =
                response.body.data;

            expect(report.totalAppointments)
                .toEqual(expect.any(Number));

            expect(report.pendingAppointments)
                .toEqual(expect.any(Number));

            expect(report.confirmedAppointments)
                .toEqual(expect.any(Number));

            expect(report.completedAppointments)
                .toEqual(expect.any(Number));

            expect(report.cancelledAppointments)
                .toEqual(expect.any(Number));

            expect(report.noShowAppointments)
                .toEqual(expect.any(Number));

            expect(report.pendingAppointments)
                .toBeLessThanOrEqual(
                    report.totalAppointments
                );

            expect(report.confirmedAppointments)
                .toBeLessThanOrEqual(
                    report.totalAppointments
                );

            expect(report.completedAppointments)
                .toBeLessThanOrEqual(
                    report.totalAppointments
                );

            expect(report.cancelledAppointments)
                .toBeLessThanOrEqual(
                    report.totalAppointments
                );

            expect(report.noShowAppointments)
                .toBeLessThanOrEqual(
                    report.totalAppointments
                );

        }
    );


    // ========================================================
    // Admission Report Structure
    // ========================================================

    test(
        "Admission report should contain valid admission statistics",
        async () => {

            const response = await request(app)
                .get("/api/reports/admissions")
                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );

            expect(response.statusCode).toBe(200);

            const report =
                response.body.data;

            expect(report.totalAdmissions)
                .toEqual(expect.any(Number));

            expect(report.activeAdmissions)
                .toEqual(expect.any(Number));

            expect(report.dischargedAdmissions)
                .toEqual(expect.any(Number));

            expect(
                report.activeAdmissions +
                report.dischargedAdmissions
            ).toBe(
                report.totalAdmissions
            );

        }
    );


    // ========================================================
    // Billing Report Structure
    // ========================================================

    test(
        "Billing report should contain valid billing statistics",
        async () => {

            const response = await request(app)
                .get("/api/reports/billing")
                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );

            expect(response.statusCode).toBe(200);

            const report =
                response.body.data;

            expect(report.totalBills)
                .toEqual(expect.any(Number));

            expect(report.totalAmount)
                .toEqual(expect.any(Number));

            expect(report.totalBills)
                .toBeGreaterThanOrEqual(0);

            expect(report.totalAmount)
                .toBeGreaterThanOrEqual(0);

        }
    );


    // ========================================================
    // Medicine Inventory Report Structure
    // ========================================================

    test(
        "Medicine inventory report should contain valid inventory statistics",
        async () => {

            const response = await request(app)
                .get("/api/reports/medicines")
                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );

            expect(response.statusCode).toBe(200);

            const report =
                response.body.data;

            expect(report.totalMedicines)
                .toEqual(expect.any(Number));

            expect(report.activeMedicines)
                .toEqual(expect.any(Number));

            expect(report.inactiveMedicines)
                .toEqual(expect.any(Number));

            expect(report.lowStockMedicines)
                .toEqual(expect.any(Number));

            expect(report.outOfStockMedicines)
                .toEqual(expect.any(Number));

            expect(report.totalInventoryValue)
                .toEqual(expect.any(Number));

            expect(
                report.activeMedicines +
                report.inactiveMedicines
            ).toBe(
                report.totalMedicines
            );

            expect(report.totalInventoryValue)
                .toBeGreaterThanOrEqual(0);

        }
    );
        // ========================================================
    // Appointment Report Authentication
    // ========================================================

    test(
        "GET /api/reports/appointments should reject unauthenticated request",
        async () => {

            const response = await request(app)
                .get("/api/reports/appointments");

            expect(response.statusCode).toBe(401);

            expect(response.body.success).toBe(false);

        }
    );


    // ========================================================
    // Admission Report Authentication
    // ========================================================

    test(
        "GET /api/reports/admissions should reject unauthenticated request",
        async () => {

            const response = await request(app)
                .get("/api/reports/admissions");

            expect(response.statusCode).toBe(401);

            expect(response.body.success).toBe(false);

        }
    );


    // ========================================================
    // Billing Report Authentication
    // ========================================================

    test(
        "GET /api/reports/billing should reject unauthenticated request",
        async () => {

            const response = await request(app)
                .get("/api/reports/billing");

            expect(response.statusCode).toBe(401);

            expect(response.body.success).toBe(false);

        }
    );


    // ========================================================
    // Medicine Report Authentication
    // ========================================================

    test(
        "GET /api/reports/medicines should reject unauthenticated request",
        async () => {

            const response = await request(app)
                .get("/api/reports/medicines");

            expect(response.statusCode).toBe(401);

            expect(response.body.success).toBe(false);

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
