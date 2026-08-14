// ============================================================
// File: tests/medicine.test.js
// Purpose: Automated tests for HMSPro Medicine module.
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
// Medicine Test Suite
// ============================================================

describe("HMSPro Medicine API", () => {

    let token;
    let medicineId;

    // ========================================================
    // Login before tests
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
    
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
            });
    
        if (response.statusCode !== 200) {
    
            throw new Error(
                `Admin login failed. Status: ${response.statusCode}. ` +
                `Message: ${
                    response.body?.message || "Unknown error"
                }`
            );
    
        }
    
        token = response.body.data.token;
    
    }, 30000);

    // ========================================================
    // Create Medicine
    // ========================================================

    test("POST /api/medicines should create a medicine", async () => {

        const uniqueMedicineName =
            `Paracetamol Test ${Date.now()}`;

        const response = await request(app)
            .post("/api/medicines")
            .set(
                "Authorization",
                `Bearer ${token}`
            )
            .send({

                name:
                    uniqueMedicineName,

                genericName:
                    "Paracetamol",

                category:
                    "Analgesic",

                manufacturer:
                    "HMSPro Pharmaceuticals",

                strength:
                    "500mg",

                dosageForm:
                    "Tablet",

                unitPrice:
                    25,

                quantity:
                    100,

                reorderLevel:
                    20,

                expiryDate:
                    "2028-12-31",

                isActive:
                    true,

            });

        expect(response.statusCode)
            .toBe(201);

        expect(response.body.success)
            .toBe(true);

        expect(response.body.message)
            .toBe(
                "Medicine created successfully."
            );

        expect(response.body.data)
            .toBeDefined();

        expect(response.body.data._id)
            .toBeDefined();

        expect(response.body.data.name)
            .toBe(uniqueMedicineName);

        expect(response.body.data.genericName)
            .toBe("Paracetamol");

        expect(response.body.data.category)
            .toBe("Analgesic");

        expect(response.body.data.manufacturer)
            .toBe("HMSPro Pharmaceuticals");

        expect(response.body.data.strength)
            .toBe("500mg");

        expect(response.body.data.dosageForm)
            .toBe("Tablet");

        expect(response.body.data.unitPrice)
            .toBe(25);

        expect(response.body.data.quantity)
            .toBe(100);

        expect(response.body.data.reorderLevel)
            .toBe(20);

        expect(response.body.data.isActive)
            .toBe(true);

        medicineId =
            response.body.data._id;

    });

    // ========================================================
    // Get All Medicines
    // ========================================================

    test("GET /api/medicines should return medicines", async () => {

        const response = await request(app)
            .get("/api/medicines")
            .set(
                "Authorization",
                `Bearer ${token}`
            );

        expect(response.statusCode)
            .toBe(200);

        expect(response.body.success)
            .toBe(true);

        expect(response.body.count)
            .toEqual(
                expect.any(Number)
            );

        expect(response.body.data)
            .toBeInstanceOf(Array);

        expect(
            response.body.data.some(
                medicine =>
                    medicine._id === medicineId
            )
        ).toBe(true);

    });

    // ========================================================
    // Get Medicine By ID
    // ========================================================

    test("GET /api/medicines/:id should return medicine", async () => {

        const response = await request(app)
            .get(
                `/api/medicines/${medicineId}`
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
            .toBe(medicineId);

        expect(response.body.data.genericName)
            .toBe("Paracetamol");

    });

    // ========================================================
    // Update Medicine
    // ========================================================

    test("PUT /api/medicines/:id should update medicine", async () => {

        const response = await request(app)
            .put(
                `/api/medicines/${medicineId}`
            )
            .set(
                "Authorization",
                `Bearer ${token}`
            )
            .send({

                unitPrice:
                    30,

                quantity:
                    150,

                reorderLevel:
                    25,

            });

        expect(response.statusCode)
            .toBe(200);

        expect(response.body.success)
            .toBe(true);

        expect(response.body.message)
            .toBe(
                "Medicine updated successfully."
            );

        expect(response.body.data)
            .toBeDefined();

        expect(response.body.data._id)
            .toBe(medicineId);

        expect(response.body.data.unitPrice)
            .toBe(30);

        expect(response.body.data.quantity)
            .toBe(150);

        expect(response.body.data.reorderLevel)
            .toBe(25);

    });

    // ========================================================
    // Verify Updated Medicine
    // ========================================================

    test("GET /api/medicines/:id should return updated medicine", async () => {

        const response = await request(app)
            .get(
                `/api/medicines/${medicineId}`
            )
            .set(
                "Authorization",
                `Bearer ${token}`
            );

        expect(response.statusCode)
            .toBe(200);

        expect(response.body.success)
            .toBe(true);

        expect(response.body.data.unitPrice)
            .toBe(30);

        expect(response.body.data.quantity)
            .toBe(150);

        expect(response.body.data.reorderLevel)
            .toBe(25);

    });

    // ========================================================
    // Delete Medicine
    // ========================================================

    test("DELETE /api/medicines/:id should delete medicine", async () => {

        const response = await request(app)
            .delete(
                `/api/medicines/${medicineId}`
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
                "Medicine deleted successfully."
            );

    });

    // ========================================================
    // Verify Deleted Medicine
    // ========================================================

    test("GET deleted medicine should return 404", async () => {

        const response = await request(app)
            .get(
                `/api/medicines/${medicineId}`
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
                "Medicine not found."
            );

    });
    // ========================================================
    // Close MongoDB connection
    // ========================================================

    afterAll(async () => {

        await mongoose.connection.close();

    });
});