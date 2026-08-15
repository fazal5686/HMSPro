// ============================================================
// File: tests/billing.test.js
// Purpose: Automated tests for HMSPro Billing module.
// ============================================================

import request from "supertest";
import mongoose from "mongoose";
import "dotenv/config";

import app from "../app.js";

// ============================================================
// Models
// ============================================================

import Patient from "../models/Patient.js";

// ============================================================
// Test Configuration
// ============================================================

const ADMIN_EMAIL = "admin@hmspro.com";

const ADMIN_PASSWORD =
    process.env.TEST_ADMIN_PASSWORD;

// ============================================================
// Billing Test Suite
// ============================================================

describe("HMSPro Billing API", () => {

    let token;
    let billingId;
    let patientId;

    // ========================================================
    // Login and get existing patient
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

        // ----------------------------------------------------
        // Admin Login
        // ----------------------------------------------------

        const loginResponse =
            await request(app)
                .post("/api/auth/login")
                .send({
                    email: ADMIN_EMAIL,
                    password: ADMIN_PASSWORD,
                });

        if (loginResponse.statusCode !== 200) {

            throw new Error(
                `Admin login failed. Status: ${loginResponse.statusCode}. ` +
                `Message: ${
                    loginResponse.body?.message ||
                    "Unknown error"
                }`
            );

        }

        token =
            loginResponse.body.data.token;

        // ----------------------------------------------------
        // Find Existing Patient
        // ----------------------------------------------------

        const patient =
            await Patient.findOne();

        if (!patient) {

            throw new Error(
                "No patient found in database. Create a patient before running billing tests."
            );

        }

        patientId =
            patient._id.toString();

    }, 30000);


    // ========================================================
    // Create Billing
    // ========================================================

    test(
        "POST /api/billings should create a billing record",
        async () => {

            const uniqueInvoiceNumber =
                `INV-TEST-${Date.now()}`;

            const response =
                await request(app)
                    .post("/api/billings")
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    )
                    .send({

                        patientId:
                            patientId,

                        invoiceNumber:
                            uniqueInvoiceNumber,

                        consultationCharges:
                            2000,

                        roomCharges:
                            3000,

                        medicineCharges:
                            1000,

                        labCharges:
                            500,

                        otherCharges:
                            500,

                        discount:
                            500,

                        tax:
                            250,

                        amountPaid:
                            3000,

                        paymentMethod:
                            "Cash",

                    });

            expect(response.statusCode)
                .toBe(201);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.data)
                .toBeDefined();

            expect(response.body.data.patientId)
                .toBe(patientId);

            expect(response.body.data.invoiceNumber)
                .toBe(uniqueInvoiceNumber);

            // ------------------------------------------------
            // Expected calculation
            //
            // Subtotal:
            // 2000 + 3000 + 1000 + 500 + 500
            // = 7000
            //
            // Total:
            // 7000 - 500 + 250
            // = 6750
            //
            // Paid:
            // 3000
            //
            // Balance:
            // 6750 - 3000
            // = 3750
            // ------------------------------------------------

            expect(response.body.data.totalAmount)
                .toBe(6750);

            expect(response.body.data.amountPaid)
                .toBe(3000);

            expect(response.body.data.balance)
                .toBe(3750);

            expect(response.body.data.paymentStatus)
                .toBe("Partial");

            billingId =
                response.body.data._id;

        },
        30000
    );


    // ========================================================
    // Get All Billings
    // ========================================================

    test(
        "GET /api/billings should return billings",
        async () => {

            const response =
                await request(app)
                    .get("/api/billings")
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    );

            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(
                Array.isArray(
                    response.body.data
                )
            ).toBe(true);

        },
        30000
    );


    // ========================================================
    // Get Billing By ID
    // ========================================================

    test(
        "GET /api/billings/:id should return billing",
        async () => {

            const response =
                await request(app)
                    .get(
                        `/api/billings/${billingId}`
                    )
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    );

            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.data)
                .toBeDefined();

            expect(response.body.data._id)
                .toBe(billingId);

        },
        30000
    );


    // ========================================================
    // Get Billings By Patient
    // ========================================================

    test(
        "GET /api/billings/patient/:patientId should return patient billings",
        async () => {

            const response =
                await request(app)
                    .get(
                        `/api/billings/patient/${patientId}`
                    )
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    );

            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(
                Array.isArray(
                    response.body.data
                )
            ).toBe(true);

        },
        30000
    );


    // ========================================================
    // Update Billing
    // ========================================================

    test(
        "PUT /api/billings/:id should update billing",
        async () => {

            const response =
                await request(app)
                    .put(
                        `/api/billings/${billingId}`
                    )
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    )
                    .send({

                        medicineCharges:
                            1500,

                        amountPaid:
                            4000,

                        paymentMethod:
                            "Card",

                    });

            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.data)
                .toBeDefined();

            // ------------------------------------------------
            // New subtotal:
            //
            // 2000 + 3000 + 1500 + 500 + 500
            // = 7500
            //
            // Discount = 500
            // Tax = 250
            //
            // Total = 7250
            //
            // Paid = 4000
            //
            // Balance = 3250
            // ------------------------------------------------

            expect(response.body.data.totalAmount)
                .toBe(7250);

            expect(response.body.data.amountPaid)
                .toBe(4000);

            expect(response.body.data.balance)
                .toBe(3250);

            expect(response.body.data.paymentStatus)
                .toBe("Partial");

            expect(response.body.data.paymentMethod)
                .toBe("Card");

        },
        30000
    );


    // ========================================================
    // Get Updated Billing
    // ========================================================

    test(
        "GET /api/billings/:id should return updated billing",
        async () => {

            const response =
                await request(app)
                    .get(
                        `/api/billings/${billingId}`
                    )
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    );

            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.data._id)
                .toBe(billingId);

            expect(response.body.data.totalAmount)
                .toBe(7250);

            expect(response.body.data.amountPaid)
                .toBe(4000);

            expect(response.body.data.balance)
                .toBe(3250);

        },
        30000
    );


    // ========================================================
    // Delete Billing
    // ========================================================

    test(
        "DELETE /api/billings/:id should delete billing",
        async () => {

            const response =
                await request(app)
                    .delete(
                        `/api/billings/${billingId}`
                    )
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
                    "Billing record deleted successfully."
                );

        },
        30000
    );


    // ========================================================
    // Get Deleted Billing
    // ========================================================

    test(
        "GET deleted billing should return 404",
        async () => {

            const response =
                await request(app)
                    .get(
                        `/api/billings/${billingId}`
                    )
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    );

            expect(response.statusCode)
                .toBe(404);

            expect(response.body.success)
                .toBe(false);

            expect(response.body.message)
                .toBe(
                    "Billing record not found."
                );

        },
        30000
    );
        // ========================================================
    // Authentication & Validation Tests
    // ========================================================

    // ========================================================
    // Create Billing Without Authentication
    // ========================================================

    test(
        "POST /api/billings without authentication should return 401",
        async () => {

            const response =
                await request(app)
                    .post("/api/billings")
                    .send({

                        patientId:
                            patientId,

                        invoiceNumber:
                            `INV-UNAUTH-${Date.now()}`,

                        consultationCharges:
                            1000,

                    });

            expect(response.statusCode)
                .toBe(401);

            expect(response.body.success)
                .toBe(false);

        },
        30000
    );


    // ========================================================
    // Get All Billings Without Authentication
    // ========================================================

    test(
        "GET /api/billings without authentication should return 401",
        async () => {

            const response =
                await request(app)
                    .get("/api/billings");

            expect(response.statusCode)
                .toBe(401);

            expect(response.body.success)
                .toBe(false);

        },
        30000
    );


    // ========================================================
    // Create Billing With Missing Required Fields
    // ========================================================

    test(
        "POST /api/billings with missing required fields should return validation error",
        async () => {

            const response =
                await request(app)
                    .post("/api/billings")
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    )
                    .send({});

            expect(response.statusCode)
                .toBeGreaterThanOrEqual(400);

            expect(response.statusCode)
                .toBeLessThan(500);

            expect(response.body.success)
                .toBe(false);

        },
        30000
    );


    // ========================================================
    // Get Billing With Invalid ID
    // ========================================================

    test(
        "GET /api/billings/:id with invalid ID should return validation error",
        async () => {

            const response =
                await request(app)
                    .get(
                        "/api/billings/invalid-billing-id"
                    )
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    );

            expect(response.statusCode)
                .toBeGreaterThanOrEqual(400);

            expect(response.statusCode)
                .toBeLessThan(500);

            expect(response.body.success)
                .toBe(false);

        },
        30000
    );
        // ========================================================
    // Billing Business Rule Tests
    // ========================================================

    // ========================================================
    // Duplicate Invoice Number
    // ========================================================

    test(
        "POST /api/billings with duplicate invoice number should return 409",
        async () => {

            const response =
                await request(app)
                    .post("/api/billings")
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    )
                    .send({

                        patientId:
                            patientId,

                        invoiceNumber:
                            "DUPLICATE-TEST-INVOICE",

                        consultationCharges:
                            1000,

                    });

            // ------------------------------------------------
            // First request should create the invoice.
            // ------------------------------------------------

            expect(response.statusCode)
                .toBe(201);

            expect(response.body.success)
                .toBe(true);

            // ------------------------------------------------
            // Second request uses the same invoice number.
            // ------------------------------------------------

            const duplicateResponse =
                await request(app)
                    .post("/api/billings")
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    )
                    .send({

                        patientId:
                            patientId,

                        invoiceNumber:
                            "DUPLICATE-TEST-INVOICE",

                        consultationCharges:
                            1500,

                    });

            expect(duplicateResponse.statusCode)
                .toBe(409);

            expect(duplicateResponse.body.success)
                .toBe(false);

            expect(duplicateResponse.body.message)
                .toBe(
                    "Invoice number already exists."
                );

        },
        30000
    );


    // ========================================================
    // Overpayment
    // ========================================================

    test(
        "POST /api/billings with amount paid greater than total should return 400",
        async () => {

            const response =
                await request(app)
                    .post("/api/billings")
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    )
                    .send({

                        patientId:
                            patientId,

                        invoiceNumber:
                            `INV-OVERPAY-${Date.now()}`,

                        consultationCharges:
                            1000,

                        amountPaid:
                            1500,

                    });

            expect(response.statusCode)
                .toBe(400);

            expect(response.body.success)
                .toBe(false);

            expect(response.body.message)
                .toBe(
                    "Amount paid cannot exceed total amount."
                );

        },
        30000
    );


    // ========================================================
    // Update Non-Existent Billing
    // ========================================================

    test(
        "PUT /api/billings/:id for non-existent billing should return 404",
        async () => {

            const fakeBillingId =
                new mongoose.Types.ObjectId().toString();

            const response =
                await request(app)
                    .put(
                        `/api/billings/${fakeBillingId}`
                    )
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    )
                    .send({

                        amountPaid:
                            0,

                    });

            expect(response.statusCode)
                .toBe(404);

            expect(response.body.success)
                .toBe(false);

            expect(response.body.message)
                .toBe(
                    "Billing record not found."
                );

        },
        30000
    );


    // ========================================================
    // Delete Non-Existent Billing
    // ========================================================

    test(
        "DELETE /api/billings/:id for non-existent billing should return 404",
        async () => {

            const fakeBillingId =
                new mongoose.Types.ObjectId().toString();

            const response =
                await request(app)
                    .delete(
                        `/api/billings/${fakeBillingId}`
                    )
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    );

            expect(response.statusCode)
                .toBe(404);

            expect(response.body.success)
                .toBe(false);

            expect(response.body.message)
                .toBe(
                    "Billing record not found."
                );

        },
        30000
    );


    // ========================================================
    // Full Payment / Paid Status
    // ========================================================

    test(
        "PUT /api/billings/:id should calculate Paid status when fully paid",
        async () => {

            // ------------------------------------------------
            // Create a separate billing record for this test.
            // ------------------------------------------------

            const paidInvoiceNumber =
                `INV-PAID-${Date.now()}`;

            const createResponse =
                await request(app)
                    .post("/api/billings")
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    )
                    .send({

                        patientId:
                            patientId,

                        invoiceNumber:
                            paidInvoiceNumber,

                        consultationCharges:
                            2000,

                        roomCharges:
                            1000,

                        medicineCharges:
                            500,

                        amountPaid:
                            0,

                    });

            expect(createResponse.statusCode)
                .toBe(201);

            expect(createResponse.body.success)
                .toBe(true);

            const paidBillingId =
                createResponse.body.data._id;

            // ------------------------------------------------
            // Total:
            //
            // 2000 + 1000 + 500 = 3500
            // ------------------------------------------------

            expect(
                createResponse.body.data.totalAmount
            ).toBe(3500);

            expect(
                createResponse.body.data.balance
            ).toBe(3500);

            expect(
                createResponse.body.data.paymentStatus
            ).toBe("Pending");

            // ------------------------------------------------
            // Pay the complete amount.
            // ------------------------------------------------

            const updateResponse =
                await request(app)
                    .put(
                        `/api/billings/${paidBillingId}`
                    )
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    )
                    .send({

                        amountPaid:
                            3500,

                    });

            expect(updateResponse.statusCode)
                .toBe(200);

            expect(updateResponse.body.success)
                .toBe(true);

            expect(
                updateResponse.body.data.totalAmount
            ).toBe(3500);

            expect(
                updateResponse.body.data.amountPaid
            ).toBe(3500);

            expect(
                updateResponse.body.data.balance
            ).toBe(0);

            expect(
                updateResponse.body.data.paymentStatus
            ).toBe("Paid");

            // ------------------------------------------------
            // Clean up this additional test billing record.
            // ------------------------------------------------

            const deleteResponse =
                await request(app)
                    .delete(
                        `/api/billings/${paidBillingId}`
                    )
                    .set(
                        "Authorization",
                        `Bearer ${token}`
                    );

            expect(deleteResponse.statusCode)
                .toBe(200);

        },
        30000
    );
    // ========================================================
    // Close MongoDB connection
    // ========================================================

    afterAll(async () => {

        await mongoose.connection.close();

    });
});