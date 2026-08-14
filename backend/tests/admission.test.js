
// ============================================================
// File: tests/admission.test.js
// Purpose: Automated tests for HMSPro Admission API.
// ============================================================

import request from "supertest";
import mongoose from "mongoose";
import "dotenv/config";

import app from "../app.js";


// ============================================================
// Unique Test Suffix
// ============================================================

const testSuffix =
    Date.now().toString();


// ============================================================
// Test Data
// ============================================================

const adminUser = {

    fullName:
        `HMSPro Admission Test Admin ${testSuffix}`,

    email:
        `hmspro.admission.admin.${testSuffix}@gmail.com`,

    password:
        "Admin@123456",

    role:
        "Admin",

    phone:
        "03331234567",

};


const patientUser = {

    fullName:
        `HMSPro Admission Test Patient ${testSuffix}`,

    email:
        `hmspro.admission.patient.${testSuffix}@gmail.com`,

    password:
        "Patient@123456",

    role:
        "Patient",

    phone:
        "03441234567",

};


const doctorUser = {

    fullName:
        `HMSPro Admission Test Doctor ${testSuffix}`,

    email:
        `hmspro.admission.doctor.${testSuffix}@gmail.com`,

    password:
        "Doctor@123456",

    role:
        "Doctor",

    phone:
        "03661234567",

};


// ============================================================
// Runtime Variables
// ============================================================

let adminToken;

let patientToken;

let patientId;

let doctorUserId;

let doctorId;

let departmentId;

let roomId;

let admissionId;


// ============================================================
// Test Suite
// ============================================================

describe(
    "HMSPro Admission API",
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
        // Register Admin
        // ====================================================

        test(
            "POST /api/auth/register should register admin user",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/auth/register"
                        )

                        .send(adminUser);


                expect(
                    response.statusCode
                )
                    .toBe(201);


                expect(
                    response.body.success
                )
                    .toBe(true);

            }
        );


        // ====================================================
        // Login Admin
        // ====================================================

        test(
            "POST /api/auth/login should login admin",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/auth/login"
                        )

                        .send({

                            email:
                                adminUser.email,

                            password:
                                adminUser.password,

                        });


                expect(
                    response.statusCode
                )
                    .toBe(200);


                expect(
                    response.body.success
                )
                    .toBe(true);


                expect(
                    response.body.data.token
                )
                    .toBeDefined();


                adminToken =
                    response.body.data.token;

            }
        );


        // ====================================================
        // Register Patient
        // ====================================================

        test(
            "POST /api/auth/register should register patient user",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/auth/register"
                        )

                        .send(patientUser);


                expect(
                    response.statusCode
                )
                    .toBe(201);


                expect(
                    response.body.success
                )
                    .toBe(true);

            }
        );


        // ====================================================
        // Login Patient
        // ====================================================

        test(
            "POST /api/auth/login should login patient",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/auth/login"
                        )

                        .send({

                            email:
                                patientUser.email,

                            password:
                                patientUser.password,

                        });


                expect(
                    response.statusCode
                )
                    .toBe(200);


                expect(
                    response.body.success
                )
                    .toBe(true);


                expect(
                    response.body.data.token
                )
                    .toBeDefined();


                patientToken =
                    response.body.data.token;

            }
        );


        // ====================================================
        // Create Patient Profile
        // ====================================================

        test(
            "POST /api/patients/profile should create patient profile",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/patients/profile"
                        )

                        .set(
                            "Authorization",
                            `Bearer ${patientToken}`
                        )

                        .send({

                            dateOfBirth:
                                "1990-05-15",

                            gender:
                                "Male",

                            bloodGroup:
                                "O+",

                            address:
                                "HMSPro Admission Test Address",

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
                )
                    .toBe(201);


                expect(
                    response.body.success
                )
                    .toBe(true);


                expect(
                    response.body.data
                )
                    .toBeDefined();


                patientId =
                    response.body.data._id ||
                    response.body.data.id;


                expect(
                    patientId
                )
                    .toBeDefined();

            }
        );


        // ====================================================
        // Register Doctor
        // ====================================================

        test(
            "POST /api/auth/register should register doctor user",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/auth/register"
                        )

                        .send(doctorUser);


                expect(
                    response.statusCode
                )
                    .toBe(201);


                expect(
                    response.body.success
                )
                    .toBe(true);


                doctorUserId =
                    response.body.data.user.id;


                expect(
                    doctorUserId
                )
                    .toBeDefined();

            }
        );


        // ====================================================
        // Create Doctor Profile
        // ====================================================

        test(
            "POST /api/doctors should create doctor profile",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/doctors"
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        )

                        .send({

                            userId:
                                doctorUserId,

                            specialization:
                                "Cardiology",

                            qualification:
                                "MBBS, FCPS",

                            experience:
                                10,

                            licenseNumber:
                                `TEST-ADM-DOC-${testSuffix}`,

                            consultationFee:
                                2000,

                            department:
                                "Cardiology",

                        });


                expect(
                    response.statusCode
                )
                    .toBe(201);


                expect(
                    response.body.success
                )
                    .toBe(true);


                expect(
                    response.body.data
                )
                    .toBeDefined();


                doctorId =
                    response.body.data._id;


                expect(
                    doctorId
                )
                    .toBeDefined();

            }
        );


        // ====================================================
        // Create Department
        // ====================================================

        test(
            "POST /api/departments should create department",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/departments"
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        )

                        .send({

                            name:
                                `Admission Test Department ${testSuffix}`,

                            description:
                                "Department created for automated Admission testing.",

                            location:
                                "Ground Floor",

                            phone:
                                "0511234567",

                        });


                expect(
                    response.statusCode
                )
                    .toBe(201);


                expect(
                    response.body.success
                )
                    .toBe(true);


                expect(
                    response.body.data
                )
                    .toBeDefined();


                departmentId =
                    response.body.data._id;


                expect(
                    departmentId
                )
                    .toBeDefined();

            }
        );


        // ====================================================
        // Create Room
        // ====================================================

        test(
            "POST /api/rooms should create room",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/rooms"
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        )

                        .send({

                            roomNumber:
                                `ADM-${testSuffix}`,

                            roomType:
                                "Private",

                            department:
                                departmentId,

                            floor:
                                "1st Floor",

                            status:
                                "Available",

                            dailyCharge:
                                5000,

                            description:
                                "Room for automated Admission testing.",

                        });


                expect(
                    response.statusCode
                )
                    .toBe(201);


                expect(
                    response.body.success
                )
                    .toBe(true);


                expect(
                    response.body.data
                )
                    .toBeDefined();


                roomId =
                    response.body.data._id;


                expect(
                    roomId
                )
                    .toBeDefined();


                expect(
                    response.body.data.status
                )
                    .toBe(
                        "Available"
                    );

            }
        );


        // ====================================================
        // Create Admission
        // ====================================================

        test(
            "POST /api/admissions should create admission",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/admissions"
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        )

                        .send({

                            patientId:
                                patientId,

                            doctorId:
                                doctorId,

                            roomId:
                                roomId,

                            admissionDate:
                                new Date().toISOString(),

                            reason:
                                "Automated admission test.",

                            diagnosis:
                                "Cardiology observation.",

                        });


                expect(
                    response.statusCode
                )
                    .toBe(201);


                expect(
                    response.body.success
                )
                    .toBe(true);


                expect(
                    response.body.data
                )
                    .toBeDefined();


                admissionId =
                    response.body.data._id;


                expect(
                    admissionId
                )
                    .toBeDefined();


                expect(
                    response.body.data.patientId
                )
                    .toBeDefined();


                expect(
                    response.body.data.doctorId
                )
                    .toBeDefined();


                expect(
                    response.body.data.roomId
                )
                    .toBeDefined();


                expect(
                    response.body.data.status
                )
                    .toBeDefined();

            }
        );


        // ====================================================
        // Verify Room Automatically Became Occupied
        // ====================================================

        test(
            "GET /api/rooms/:id should show room as Occupied after admission",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/rooms/${roomId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        );


                expect(
                    response.statusCode
                )
                    .toBe(200);


                expect(
                    response.body.success
                )
                    .toBe(true);


                expect(
                    response.body.data.status
                )
                    .toBe(
                        "Occupied"
                    );

            }
        );


        // ====================================================
        // Get All Admissions
        // ====================================================

        test(
            "GET /api/admissions should return all admissions",
            async () => {

                const response =
                    await request(app)

                        .get(
                            "/api/admissions"
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        );


                expect(
                    response.statusCode
                )
                    .toBe(200);


                expect(
                    response.body.success
                )
                    .toBe(true);


                expect(
                    response.body.data
                )
                    .toBeDefined();


                expect(
                    Array.isArray(
                        response.body.data
                    )
                )
                    .toBe(true);


                expect(
                    response.body.count
                )
                    .toBeGreaterThanOrEqual(1);

            }
        );


        // ====================================================
        // Get Admission By ID
        // ====================================================

        test(
            "GET /api/admissions/:id should return admission",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/admissions/${admissionId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        );


                expect(
                    response.statusCode
                )
                    .toBe(200);


                expect(
                    response.body.success
                )
                    .toBe(true);


                expect(
                    response.body.data
                )
                    .toBeDefined();


                expect(
                    response.body.data._id
                )
                    .toBe(admissionId);

            }
        );


        // ====================================================
        // Get Admissions By Patient
        // ====================================================

        test(
            "GET /api/admissions/patient/:patientId should return patient admissions",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/admissions/patient/${patientId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        );


                expect(
                    response.statusCode
                )
                    .toBe(200);


                expect(
                    response.body.success
                )
                    .toBe(true);


                expect(
                    response.body.data
                )
                    .toBeDefined();


                expect(
                    Array.isArray(
                        response.body.data
                    )
                )
                    .toBe(true);


                expect(
                    response.body.count
                )
                    .toBeGreaterThanOrEqual(1);

            }
        );


        // ====================================================
        // Get Admissions By Doctor
        // ====================================================

        test(
            "GET /api/admissions/doctor/:doctorId should return doctor admissions",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/admissions/doctor/${doctorId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        );


                expect(
                    response.statusCode
                )
                    .toBe(200);


                expect(
                    response.body.success
                )
                    .toBe(true);


                expect(
                    response.body.data
                )
                    .toBeDefined();


                expect(
                    Array.isArray(
                        response.body.data
                    )
                )
                    .toBe(true);


                expect(
                    response.body.count
                )
                    .toBeGreaterThanOrEqual(1);

            }
        );


        // ====================================================
        // Update Admission
        // ====================================================

        test(
            "PUT /api/admissions/:id should update admission",
            async () => {

                const response =
                    await request(app)

                        .put(
                            `/api/admissions/${admissionId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        )

                        .send({

                            diagnosis:
                                "Updated cardiology observation.",

                            notes:
                                "Updated by automated Admission test.",

                        });


                expect(
                    response.statusCode
                )
                    .toBe(200);


                expect(
                    response.body.success
                )
                    .toBe(true);


                expect(
                    response.body.data
                )
                    .toBeDefined();


                expect(
                    response.body.data.diagnosis
                )
                    .toBe(
                        "Updated cardiology observation."
                    );

            }
        );


        // ====================================================
        // Discharge Patient
        // ====================================================

        test(
            "PUT /api/admissions/:id/discharge should discharge patient",
            async () => {

                const response =
                    await request(app)

                        .put(
                            `/api/admissions/${admissionId}/discharge`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        );


                expect(
                    response.statusCode
                )
                    .toBe(200);


                expect(
                    response.body.success
                )
                    .toBe(true);


                expect(
                    response.body.data
                )
                    .toBeDefined();


                expect(
                    response.body.data.dischargeDate
                )
                    .toBeDefined();


                expect(
                    response.body.data.dischargeDate
                )
                    .not
                    .toBeNull();

            }
        );


        // ====================================================
        // Verify Room Automatically Released
        // ====================================================

        test(
            "GET /api/rooms/:id should show room as Available after discharge",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/rooms/${roomId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        );


                expect(
                    response.statusCode
                )
                    .toBe(200);


                expect(
                    response.body.success
                )
                    .toBe(true);


                expect(
                    response.body.data.status
                )
                    .toBe(
                        "Available"
                    );

            }
        );


        // ====================================================
        // Delete Admission
        // ====================================================

        test(
            "DELETE /api/admissions/:id should delete admission",
            async () => {

                const response =
                    await request(app)

                        .delete(
                            `/api/admissions/${admissionId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        );


                expect(
                    response.statusCode
                )
                    .toBe(200);


                expect(
                    response.body.success
                )
                    .toBe(true);


                expect(
                    response.body.message
                )
                    .toBe(
                        "Admission deleted successfully."
                    );

            }
        );


        // ====================================================
        // Confirm Admission Deleted
        // ====================================================

        test(
            "GET /api/admissions/:id should return 404 after deletion",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/admissions/${admissionId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        );


                expect(
                    response.statusCode
                )
                    .toBe(404);


                expect(
                    response.body.success
                )
                    .toBe(false);

            }
        );


        // ====================================================
        // Invalid Admission ID
        // ====================================================

        test(
            "GET /api/admissions/:id should reject invalid ID",
            async () => {

                const response =
                    await request(app)

                        .get(
                            "/api/admissions/invalid-id"
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        );


                expect(
                    response.statusCode
                )
                    .toBe(400);


                expect(
                    response.body.success
                )
                    .toBe(false);

            }
        );


        // ====================================================
        // Unauthorized Admission Access
        // ====================================================

        test(
            "GET /api/admissions/:id should reject unauthenticated request",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/admissions/${admissionId}`
                        );


                expect(
                    response.statusCode
                )
                    .toBe(401);


                expect(
                    response.body.success
                )
                    .toBe(false);

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
