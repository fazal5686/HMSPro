// ============================================================
// File: tests/department.test.js
// Purpose: Integration tests for HMSPro Department module.
// Tests Department CRUD operations, validation, authentication,
// authorization, duplicate prevention, and invalid IDs.
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
        `HMS Department Test Admin ${testSuffix}`,

    email:
        `hmspro.department.admin.${testSuffix}@gmail.com`,

    password:
        "Admin@123456",

    role:
        "Admin",

    phone:
        "03331234567",

};


const receptionistUser = {

    fullName:
        `HMS Department Test Receptionist ${testSuffix}`,

    email:
        `hmspro.department.receptionist.${testSuffix}@gmail.com`,

    password:
        "Reception@123456",

    role:
        "Receptionist",

    phone:
        "03441234567",

};


const departmentData = {

    name:
        `Cardiology ${testSuffix}`,

    description:
        "Department for cardiac care and treatment.",

    location:
        "First Floor",

    phone:
        "0511234567",

    isActive:
        true,

};


// ============================================================
// Runtime Variables
// ============================================================

let adminToken;

let receptionistToken;

let departmentId;


// ============================================================
// Test Suite
// ============================================================

describe(
    "HMSPro Department API",
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
            "POST /api/auth/register should register admin",
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


                adminToken =
                    response.body.data.token;


                expect(
                    adminToken
                )
                    .toBeDefined();

            }
        );


        // ====================================================
        // Register Receptionist
        // ====================================================

        test(
            "POST /api/auth/register should register receptionist",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/auth/register"
                        )

                        .send(receptionistUser);


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
        // Login Receptionist
        // ====================================================

        test(
            "POST /api/auth/login should login receptionist",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/auth/login"
                        )

                        .send({

                            email:
                                receptionistUser.email,

                            password:
                                receptionistUser.password,

                        });


                expect(
                    response.statusCode
                )
                    .toBe(200);


                expect(
                    response.body.success
                )
                    .toBe(true);


                receptionistToken =
                    response.body.data.token;


                expect(
                    receptionistToken
                )
                    .toBeDefined();

            }
        );


        // ====================================================
        // Create Department
        // POST /api/departments
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

                        .send(
                            departmentData
                        );


                expect(
                    response.statusCode
                )
                    .toBe(201);


                expect(
                    response.body.success
                )
                    .toBe(true);


                expect(
                    response.body.message
                )
                    .toBe(
                        "Department created successfully."
                    );


                expect(
                    response.body.data
                )
                    .toBeDefined();


                expect(
                    response.body.data.name
                )
                    .toBe(
                        departmentData.name
                    );


                expect(
                    response.body.data.description
                )
                    .toBe(
                        departmentData.description
                    );


                expect(
                    response.body.data.location
                )
                    .toBe(
                        departmentData.location
                    );


                expect(
                    response.body.data.phone
                )
                    .toBe(
                        departmentData.phone
                    );


                departmentId =
                    response.body.data._id;


                expect(
                    departmentId
                )
                    .toBeDefined();

            }
        );


        // ====================================================
        // Get All Departments
        // GET /api/departments
        // ====================================================

        test(
            "GET /api/departments should return all departments",
            async () => {

                const response =
                    await request(app)

                        .get(
                            "/api/departments"
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
                    response.body.count
                )
                    .toBeGreaterThanOrEqual(1);


                expect(
                    Array.isArray(
                        response.body.data
                    )
                )
                    .toBe(true);

            }
        );


        // ====================================================
        // Get Department By ID
        // GET /api/departments/:id
        // ====================================================

        test(
            "GET /api/departments/:id should return department",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/departments/${departmentId}`
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
                    .toBe(
                        departmentId
                    );


                expect(
                    response.body.data.name
                )
                    .toBe(
                        departmentData.name
                    );

            }
        );


        // ====================================================
        // Update Department
        // PUT /api/departments/:id
        // ====================================================

        test(
            "PUT /api/departments/:id should update department",
            async () => {

                const response =
                    await request(app)

                        .put(
                            `/api/departments/${departmentId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${adminToken}`
                        )

                        .send({

                            description:
                                "Updated cardiac care department.",

                            location:
                                "Second Floor",

                            phone:
                                "0519876543",

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
                    response.body.message
                )
                    .toBe(
                        "Department updated successfully."
                    );


                expect(
                    response.body.data.description
                )
                    .toBe(
                        "Updated cardiac care department."
                    );


                expect(
                    response.body.data.location
                )
                    .toBe(
                        "Second Floor"
                    );


                expect(
                    response.body.data.phone
                )
                    .toBe(
                        "0519876543"
                    );

            }
        );


        // ====================================================
        // Duplicate Department
        // POST /api/departments
        // ====================================================

        test(
            "POST /api/departments should reject duplicate name",
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

                            ...departmentData,

                            name:
                                departmentData.name,

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
                        "Department already exists."
                    );

            }
        );


        // ====================================================
        // Invalid Department ID
        // GET /api/departments/:id
        // ====================================================

        test(
            "GET /api/departments/:id should reject invalid ID",
            async () => {

                const response =
                    await request(app)

                        .get(
                            "/api/departments/invalid-id"
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
        // Unauthorized Access
        // GET /api/departments
        // ====================================================

        test(
            "GET /api/departments should reject unauthenticated request",
            async () => {

                const response =
                    await request(app)
                        .get(
                            "/api/departments"
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
        // Receptionist Create Restriction
        // POST /api/departments
        // ====================================================

        test(
            "POST /api/departments should forbid receptionist",
            async () => {

                const response =
                    await request(app)

                        .post(
                            "/api/departments"
                        )

                        .set(
                            "Authorization",
                            `Bearer ${receptionistToken}`
                        )

                        .send({

                            name:
                                `Forbidden Department ${testSuffix}`,

                            description:
                                "Should not be created.",

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
        // Receptionist Read Access
        // GET /api/departments
        // ====================================================

        test(
            "GET /api/departments should allow receptionist",
            async () => {

                const response =
                    await request(app)

                        .get(
                            "/api/departments"
                        )

                        .set(
                            "Authorization",
                            `Bearer ${receptionistToken}`
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

            }
        );


        // ====================================================
        // Receptionist Update Restriction
        // PUT /api/departments/:id
        // ====================================================

        test(
            "PUT /api/departments/:id should forbid receptionist",
            async () => {

                const response =
                    await request(app)

                        .put(
                            `/api/departments/${departmentId}`
                        )

                        .set(
                            "Authorization",
                            `Bearer ${receptionistToken}`
                        )

                        .send({

                            location:
                                "Unauthorized Location",

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
        // Delete Department
        // DELETE /api/departments/:id
        // ====================================================

        test(
            "DELETE /api/departments/:id should delete department",
            async () => {

                const response =
                    await request(app)

                        .delete(
                            `/api/departments/${departmentId}`
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
                        "Department deleted successfully."
                    );

            }
        );


        // ====================================================
        // Verify Deleted Department
        // GET /api/departments/:id
        // ====================================================

        test(
            "GET /api/departments/:id should return 404 after deletion",
            async () => {

                const response =
                    await request(app)

                        .get(
                            `/api/departments/${departmentId}`
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


                expect(
                    response.body.message
                )
                    .toBe(
                        "Department not found."
                    );

            }
        );


        // ====================================================
        // Disconnect MongoDB
        // ====================================================

        afterAll(
            async () => {

                await mongoose.disconnect();

            },
            30000
        );

    }
);