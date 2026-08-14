// ============================================================
// File: tests/app.test.js
// Purpose: Basic HMSPro API health-check test.
// ============================================================

import request from "supertest";

import app from "../app.js";

// ============================================================
// Health Check Test
// ============================================================

describe("HMSPro Backend Health Check", () => {

    test(
        "GET / should return 200 and backend running message",
        async () => {

            const response = await request(app)
                .get("/");

            expect(response.statusCode)
                .toBe(200);

            expect(response.body)
                .toEqual({
                    success: true,
                    message: "HMSPro Backend Running",
                });
        }
    );

});