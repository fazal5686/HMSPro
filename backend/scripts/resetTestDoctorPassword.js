// ============================================================
// File: utils/resetTestDoctorPassword.js
// Purpose: Reset password for HMSPro Test Doctor account.
// Temporary utility for development/testing.
// ============================================================

import dotenv from "dotenv";

import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";

import User from "../models/User.js";

// ============================================================
// Load Environment Variables
// ============================================================

dotenv.config();

// ============================================================
// Test Doctor Details
// ============================================================

const TEST_DOCTOR_EMAIL = "testdoctor@hmspro.com";

const NEW_PASSWORD = "TestDoctor@123";

// ============================================================
// Reset Test Doctor Password
// ============================================================

const resetTestDoctorPassword = async () => {

    try {

        // ----------------------------------------------------
        // Connect to MongoDB
        // ----------------------------------------------------

        await connectDB();

        // ----------------------------------------------------
        // Find Test Doctor
        // ----------------------------------------------------

        const user = await User.findOne({

            email: TEST_DOCTOR_EMAIL

        });

        if (!user) {

            console.log(
                "Test Doctor user not found."
            );

            process.exit(1);

        }

        // ----------------------------------------------------
        // Verify Role
        // ----------------------------------------------------

        if (user.role !== "Doctor") {

            console.log(
                "User exists but is not a Doctor."
            );

            process.exit(1);

        }

        // ----------------------------------------------------
        // Hash New Password
        // ----------------------------------------------------

        user.password =
            await bcrypt.hash(
                NEW_PASSWORD,
                10
            );

        // ----------------------------------------------------
        // Activate Account
        // ----------------------------------------------------

        user.isActive = true;

        // ----------------------------------------------------
        // Save
        // ----------------------------------------------------

        await user.save();

        // ----------------------------------------------------
        // Success
        // ----------------------------------------------------

        console.log(
            "============================================"
        );

        console.log(
            "Test Doctor password reset successfully."
        );

        console.log(
            "Email:",
            TEST_DOCTOR_EMAIL
        );

        console.log(
            "New Password:",
            NEW_PASSWORD
        );

        console.log(
            "User ID:",
            user._id.toString()
        );

        console.log(
            "============================================"
        );

        process.exit(0);

    }

    catch (error) {

        console.error(
            "Password reset failed:",
            error.message
        );

        process.exit(1);

    }

};

// ============================================================
// Execute
// ============================================================

resetTestDoctorPassword();