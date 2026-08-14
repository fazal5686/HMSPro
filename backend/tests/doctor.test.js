// ============================================================
// File: tests/doctor.test.js
// Purpose: Automated tests for HMSPro Doctor API.
// ============================================================

import request from "supertest";
import mongoose from "mongoose";
import "dotenv/config";

import app from "../app.js";


// ============================================================
// Test Data
// ============================================================

const adminUser = {

    fullName: "HMSPro Doctor Test Admin",

    email: `doctor-admin-${Date.now()}@hmspro.com`,

    password: "Admin@123456",

    role: "Admin",

    phone: "03331234567",

};


const doctorUser = {

    fullName: "HMSPro Test Doctor",

    email: `doctor-user-${Date.now()}@hmspro.com`,

    password: "Doctor@123456",

    role: "Doctor",

    phone: "03441234567",

};


let adminToken;

let doctorToken;

let doctorUserId;

let doctorId;


// ============================================================
// Test Suite
// ============================================================

describe("HMSPro Doctor API", () => {
    beforeAll(async () => {

        await mongoose.connect(
            process.env.MONGODB_URI
        );

    }, 30000);

    // ========================================================
    // Create Admin User and Login
    // ========================================================

    test(
        "POST /api/auth/register should register admin user",
        async () => {

            const response = await request(app)

                .post("/api/auth/register")

                .send(adminUser);


            expect(response.statusCode)
                .toBe(201);

            expect(response.body.success)
                .toBe(true);

        }
    );


    test(
        "POST /api/auth/login should login admin",
        async () => {

            const response = await request(app)

                .post("/api/auth/login")

                .send({

                    email: adminUser.email,

                    password: adminUser.password,

                });


            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.data.token)
                .toBeDefined();


            adminToken =
                response.body.data.token;

        }
    );


    // ========================================================
    // Register Doctor User
    // ========================================================

    test(
        "POST /api/auth/register should register doctor user",
        async () => {

            const response = await request(app)

                .post("/api/auth/register")

                .send(doctorUser);


            expect(response.statusCode)
                .toBe(201);

            expect(response.body.success)
                .toBe(true);


            doctorUserId =
                response.body.data.user.id;

        }
    );


    // ========================================================
    // Create Doctor Profile
    // ========================================================

    test(
        "POST /api/doctors should create doctor profile",
        async () => {

            const response = await request(app)

                .post("/api/doctors")

                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                )

                .send({

                    userId: doctorUserId,

                    specialization: "Cardiology",

                    qualification: "MBBS, FCPS",

                    experience: 10,

                    licenseNumber: "TEST-DOC-1001",

                    consultationFee: 2000,

                    department: "Cardiology",

                });


            expect(response.statusCode)
                .toBe(201);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.data)
                .toBeDefined();


            doctorId =
                response.body.data._id;


            expect(doctorId)
                .toBeDefined();

        }
    );


    // ========================================================
    // Get All Doctors
    // ========================================================

    test(
        "GET /api/doctors should return all doctors",
        async () => {

            const response = await request(app)

                .get("/api/doctors")

                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );


            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.data)
                .toBeDefined();

        }
    );


    // ========================================================
    // Login Doctor
    // ========================================================

    test(
        "POST /api/auth/login should login doctor",
        async () => {

            const response = await request(app)

                .post("/api/auth/login")

                .send({

                    email: doctorUser.email,

                    password: doctorUser.password,

                });


            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.data.token)
                .toBeDefined();


            doctorToken =
                response.body.data.token;

        }
    );


    // ========================================================
    // Get My Doctor Profile
    // ========================================================

    test(
        "GET /api/doctors/me should return logged-in doctor profile",
        async () => {

            const response = await request(app)

                .get("/api/doctors/me")

                .set(
                    "Authorization",
                    `Bearer ${doctorToken}`
                );


            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.data)
                .toBeDefined();

            expect(
                response.body.data._id
            )
                .toBe(doctorId);

        }
    );


    // ========================================================
    // Get Doctor By ID
    // ========================================================

    test(
        "GET /api/doctors/:id should return doctor",
        async () => {

            const response = await request(app)

                .get(
                    `/api/doctors/${doctorId}`
                )

                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );


            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.data)
                .toBeDefined();

            expect(
                response.body.data._id
            )
                .toBe(doctorId);

        }
    );


    // ========================================================
    // Update Doctor
    // ========================================================

    test(
        "PUT /api/doctors/:id should update doctor",
        async () => {

            const response = await request(app)

                .put(
                    `/api/doctors/${doctorId}`
                )

                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                )

                .send({

                    experience: 12,

                    consultationFee: 2500,

                    department: "Cardiology",

                });


            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.data)
                .toBeDefined();


            expect(
                response.body.data.experience
            )
                .toBe(12);


            expect(
                response.body.data.consultationFee
            )
                .toBe(2500);

        }
    );


    // ========================================================
    // Doctor Cannot Create Doctor Profile
    // ========================================================

    test(
        "POST /api/doctors should reject Doctor role",
        async () => {

            const response = await request(app)

                .post("/api/doctors")

                .set(
                    "Authorization",
                    `Bearer ${doctorToken}`
                )

                .send({

                    userId: doctorUserId,

                    specialization: "Neurology",

                    qualification: "MBBS",

                    experience: 5,

                    licenseNumber: "TEST-DOC-9999",

                    consultationFee: 1500,

                    department: "Neurology",

                });


            expect(response.statusCode)
                .toBe(403);

            expect(response.body.success)
                .toBe(false);

        }
    );


    // ========================================================
    // Delete Doctor
    // ========================================================

    test(
        "DELETE /api/doctors/:id should delete doctor",
        async () => {

            const response = await request(app)

                .delete(
                    `/api/doctors/${doctorId}`
                )

                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );


            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

        }
    );


    // ========================================================
    // Confirm Doctor Deleted
    // ========================================================

    test(
        "GET /api/doctors/:id should return 404 after deletion",
        async () => {

            const response = await request(app)

                .get(
                    `/api/doctors/${doctorId}`
                )

                .set(
                    "Authorization",
                    `Bearer ${adminToken}`
                );


            expect(response.statusCode)
                .toBe(404);

            expect(response.body.success)
                .toBe(false);

        }
    );
    // ========================================================
    // Close MongoDB connection
    // ========================================================
    afterAll(async () => {

        await mongoose.connection.close();

    });
});