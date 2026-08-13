// ============================================================
// File: utils/resetTestPatientBPassword.js
// Purpose: Reset password for HMSPro Patient B security testing.
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
// Patient B Details
// ============================================================

const TEST_PATIENT_EMAIL =
    "patient@test.com";

const NEW_PASSWORD =
    "TestPatientB@123";

// ============================================================
// Reset Patient B Password
// ============================================================

const resetTestPatientBPassword = async () => {

    try {

        // ----------------------------------------------------
        // Connect to MongoDB
        // ----------------------------------------------------

        await connectDB();

        // ----------------------------------------------------
        // Find Patient B
        // ----------------------------------------------------

        const user = await User.findOne({
            email: TEST_PATIENT_EMAIL
        });

        if (!user) {

            console.log(
                "Patient B user not found."
            );

            process.exit(1);

        }

        // ----------------------------------------------------
        // Verify Role
        // ----------------------------------------------------

        if (user.role !== "Patient") {

            console.log(
                "User exists but is not a Patient."
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
            "Patient B password reset successfully."
        );

        console.log(
            "Email:",
            TEST_PATIENT_EMAIL
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
            "Patient Profile ID:",
            "6a7c88e26e5e7249874eeb86"
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

resetTestPatientBPassword();