// ============================================================
// File: tests/appointment.test.js
// Purpose: Automated tests for HMSPro Appointment API.
// ============================================================

import request from "supertest";
import mongoose from "mongoose";
import "dotenv/config";

import app from "../app.js";


// ============================================================
// Unique Test Suffix
// Allows the test to be executed repeatedly without
// email/license-number conflicts in MongoDB.
// ============================================================

const testSuffix =
    Date.now().toString();


// ============================================================
// Test Data
// ============================================================

const adminUser = {

    fullName:
        `HMSPro Appointment Test Admin ${testSuffix}`,

    email:
        `hmspro.appointment.admin.${testSuffix}@gmail.com`,

    password:
        "Admin@123456",

    role:
        "Admin",

    phone:
        "03331234567",

};


const patientUser = {

    fullName:
        `HMSPro Appointment Test Patient ${testSuffix}`,

    email:
        `hmspro.appointment.patient.${testSuffix}@gmail.com`,

    password:
        "Patient@123456",

    role:
        "Patient",

    phone:
        "03441234567",

};


const secondPatientUser = {

    fullName:
        `HMSPro Second Appointment Patient ${testSuffix}`,

    email:
        `hmspro.appointment.patient2.${testSuffix}@gmail.com`,

    password:
        "Patient@123456",

    role:
        "Patient",

    phone:
        "03551234567",

};


const doctorUser = {

    fullName:
        `HMSPro Appointment Test Doctor ${testSuffix}`,

    email:
        `hmspro.appointment.doctor.${testSuffix}@gmail.com`,

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

let secondPatientToken;

let doctorToken;

let patientId;

let secondPatientId;

let doctorUserId;

let doctorId;

let appointmentId;

let appointmentDate;


// ============================================================
// Test Suite
// ============================================================

describe(
    "HMSPro Appointment API",
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
        // Create Admin User
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
        // Register Patient User
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
                                "1995-05-15",

                            gender:
                                "Male",

                            bloodGroup:
                                "O+",

                            address:
                                "HMSPro Appointment Test Address",

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
        // Register Second Patient
        // ====================================================

        test(
            "POST /api/auth/register should register second patient",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/auth/register"
                        )

                        .send(secondPatientUser);


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
        // Login Second Patient
        // ====================================================

        test(
            "POST /api/auth/login should login second patient",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/auth/login"
                        )

                        .send({

                            email:
                                secondPatientUser.email,

                            password:
                                secondPatientUser.password,

                        });


                expect(
                    response.statusCode
                )
                    .toBe(200);


                expect(
                    response.body.success
                )
                    .toBe(true);


                secondPatientToken =
                    response.body.data.token;

            }
        );


        // ====================================================
        // Create Second Patient Profile
        // ====================================================

        test(
            "POST /api/patients/profile should create second patient profile",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/patients/profile"
                        )

                        .set(
                            "Authorization",
                            `Bearer ${secondPatientToken}`
                        )

                        .send({

                            dateOfBirth:
                                "1990-08-20",

                            gender:
                                "Male",

                            bloodGroup:
                                "A+",

                            address:
                                "HMSPro Second Patient Address",

                            city:
                                "Islamabad",

                            emergencyContact:
                                "03221234567",

                            medicalHistory:
                                "None.",

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


                secondPatientId =
                    response.body.data._id ||
                    response.body.data.id;


                expect(
                    secondPatientId
                )
                    .toBeDefined();

            }
        );


        // ====================================================
        // Register Doctor User
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
                                `TEST-APT-DOC-${testSuffix}`,

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
        // Login Doctor
        // ====================================================

        test(
            "POST /api/auth/login should login doctor",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/auth/login"
                        )

                        .send({

                            email:
                                doctorUser.email,

                            password:
                                doctorUser.password,

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


                doctorToken =
                    response.body.data.token;

            }
        );


        // ====================================================
        // Generate Future Appointment Date
        // ====================================================

        test(
            "should prepare a future appointment date",
            () => {

                const futureDate =
                    new Date(
                        Date.now() +
                        24 * 60 * 60 * 1000
                    );


                futureDate.setSeconds(0);
                futureDate.setMilliseconds(0);


                appointmentDate =
                    futureDate.toISOString();


                expect(
                    new Date(
                        appointmentDate
                    ).getTime()
                )
                    .toBeGreaterThan(
                        Date.now()
                    );

            }
        );


        // ====================================================
        // Create Appointment
        // ====================================================

        test(
            "POST /api/appointments should create appointment",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/appointments"
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

                            appointmentDate:
                                appointmentDate,

                            reason:
                                "Routine cardiology consultation.",

                            notes:
                                "Automated appointment test.",

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


                appointmentId =
                    response.body.data._id;


                expect(
                    appointmentId
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
                    response.body.data.reason
                )
                    .toBe(
                        "Routine cardiology consultation."
                    );

            }
        );


        // ====================================================
        // Get All Appointments
        // ====================================================

        test(
            "GET /api/appointments should return all appointments",
            async () => {

                const response =
                    await request(app)

                        .get(
                            "/api/appointments"
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
        // Patient Cannot Get All Appointments
        // ====================================================

        test(
            "GET /api/appointments should reject Patient role",
            async () => {

                const response =
                    await request(app)

                        .get(
                            "/api/appointments"
                        )

                        .set(
                            "Authorization",
                            `Bearer ${patientToken}`
                        );


                expect(
                    response.statusCode
                )
                    .toBe(403);


                expect(
                    response.body.success
                )
                    .toBe(false);

            }
        );


        // ====================================================
        // Get Appointment By ID - Admin
        // ====================================================

        test(
            "GET /api/appointments/:id should return appointment for Admin",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/appointments/${appointmentId}`
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
                    .toBe(appointmentId);

            }
        );


        // ====================================================
        // Get Patient Appointments - Patient
        // ====================================================

        test(
            "GET /api/appointments/patient/:patientId should return own appointments",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/appointments/patient/${patientId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${patientToken}`
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
        // Patient Cannot View Another Patient's Appointments
        // ====================================================

        test(
            "GET /api/appointments/patient/:patientId should reject another patient",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/appointments/patient/${secondPatientId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${patientToken}`
                        );


                expect(
                    response.statusCode
                )
                    .toBe(403);


                expect(
                    response.body.success
                )
                    .toBe(false);

            }
        );


        // ====================================================
        // Get Doctor Appointments - Doctor
        // ====================================================

        test(
            "GET /api/appointments/doctor/:doctorId should return own appointments",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/appointments/doctor/${doctorId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${doctorToken}`
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
        // Doctor Can Get Appointment By ID
        // ====================================================

        test(
            "GET /api/appointments/:id should allow Doctor to access own appointment",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/appointments/${appointmentId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${doctorToken}`
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
                    response.body.data._id
                )
                    .toBe(appointmentId);

            }
        );


        // ====================================================
        // Patient Can Get Appointment By ID
        // ====================================================

        test(
            "GET /api/appointments/:id should allow Patient to access own appointment",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/appointments/${appointmentId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${patientToken}`
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
                    response.body.data._id
                )
                    .toBe(appointmentId);

            }
        );


        // ====================================================
        // Second Patient Cannot Access Appointment
        // ====================================================

        test(
            "GET /api/appointments/:id should reject another Patient",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/appointments/${appointmentId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${secondPatientToken}`
                        );


                expect(
                    response.statusCode
                )
                    .toBe(403);


                expect(
                    response.body.success
                )
                    .toBe(false);

            }
        );


        // ====================================================
        // Doctor Can Update Own Appointment
        // ====================================================

        test(
            "PUT /api/appointments/:id should allow Doctor to update own appointment",
            async () => {

                const response =
                    await request(app)

                        .put(
                            `/api/appointments/${appointmentId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${doctorToken}`
                        )

                        .send({

                            status:
                                "Confirmed",

                            reason:
                                "Updated cardiology consultation.",

                            notes:
                                "Updated by automated Doctor test.",

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
                    response.body.data.status
                )
                    .toBe(
                        "Confirmed"
                    );


                expect(
                    response.body.data.reason
                )
                    .toBe(
                        "Updated cardiology consultation."
                    );

            }
        );


        // ====================================================
        // Patient Cannot Update Appointment
        // ====================================================

        test(
            "PUT /api/appointments/:id should reject Patient role",
            async () => {

                const response =
                    await request(app)

                        .put(
                            `/api/appointments/${appointmentId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${patientToken}`
                        )

                        .send({

                            reason:
                                "Patient should not update this.",

                        });


                expect(
                    response.statusCode
                )
                    .toBe(403);


                expect(
                    response.body.success
                )
                    .toBe(false);

            }
        );


        // ====================================================
        // Doctor Double Booking Prevention
        // ====================================================

        test(
            "POST /api/appointments should reject doctor double booking",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/appointments"
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        )

                        .send({

                            patientId:
                                secondPatientId,

                            doctorId:
                                doctorId,

                            appointmentDate:
                                appointmentDate,

                            reason:
                                "Double booking test.",

                            notes:
                                "This appointment should be rejected.",

                        });


                expect(
                    response.statusCode
                )
                    .toBe(400);


                expect(
                    response.body.success
                )
                    .toBe(false);


                expect(
                    response.body.message
                )
                    .toBe(
                        "Doctor already has an appointment at this time."
                    );

            }
        );


        // ====================================================
        // Invalid Appointment Date
        // ====================================================

        test(
            "POST /api/appointments should reject past appointment date",
            async () => {

                const pastDate =
                    new Date(
                        Date.now() -
                        24 * 60 * 60 * 1000
                    ).toISOString();


                const response =
                    await request(app)

                        .post(
                            "/api/appointments"
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        )

                        .send({

                            patientId:
                                secondPatientId,

                            doctorId:
                                doctorId,

                            appointmentDate:
                                pastDate,

                            reason:
                                "Past appointment test.",

                        });


                expect(
                    response.statusCode
                )
                    .toBe(400);


                expect(
                    response.body.success
                )
                    .toBe(false);


                expect(
                    response.body.message
                )
                    .toBe(
                        "Appointment date must be in the future."
                    );

            }
        );


        // ====================================================
        // Invalid Appointment ID
        // ====================================================

        test(
            "GET /api/appointments/:id should reject invalid ID",
            async () => {

                const response =
                    await request(app)

                        .get(
                            "/api/appointments/invalid-id"
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
        // Unauthorized Appointment Access
        // ====================================================

        test(
            "GET /api/appointments/:id should reject unauthenticated request",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/appointments/${appointmentId}`
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
        // Non-Admin Cannot Delete Appointment
        // ====================================================

        test(
            "DELETE /api/appointments/:id should reject Doctor role",
            async () => {

                const response =
                    await request(app)

                        .delete(
                            `/api/appointments/${appointmentId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${doctorToken}`
                        );


                expect(
                    response.statusCode
                )
                    .toBe(403);


                expect(
                    response.body.success
                )
                    .toBe(false);

            }
        );


        // ====================================================
        // Admin Deletes Appointment
        // ====================================================

        test(
            "DELETE /api/appointments/:id should delete appointment",
            async () => {

                const response =
                    await request(app)

                        .delete(
                            `/api/appointments/${appointmentId}`
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
                        "Appointment deleted successfully."
                    );

            }
        );


        // ====================================================
        // Confirm Appointment Deleted
        // ====================================================

        test(
            "GET /api/appointments/:id should return 404 after deletion",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/appointments/${appointmentId}`
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
        // Close MongoDB Connection
        // ====================================================

        afterAll(
            async () => {

                await mongoose.connection.close();

            }
        );

    }
);