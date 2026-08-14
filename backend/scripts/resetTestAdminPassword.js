
// ============================================================
// File: utils/resetTestAdminPassword.js
// Purpose: Reset password for HMSPro Test Admin account.
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
// Test Admin Details
// ============================================================

const TEST_ADMIN_EMAIL = "admin@hmspro.com";

const NEW_PASSWORD =
    process.env.TEST_ADMIN_PASSWORD;

// ============================================================
// Reset Test Admin Password
// ============================================================

const resetTestAdminPassword = async () => {

    try {

        // ----------------------------------------------------
        // Check Test Password
        // ----------------------------------------------------

        if (!NEW_PASSWORD) {

            console.log(
                "TEST_ADMIN_PASSWORD is not configured in .env."
            );

            process.exit(1);

        }

        // ----------------------------------------------------
        // Connect to MongoDB
        // ----------------------------------------------------

        await connectDB();

        // ----------------------------------------------------
        // Find Test Admin
        // ----------------------------------------------------

        const user = await User.findOne({

            email: TEST_ADMIN_EMAIL

        });

        if (!user) {

            console.log(
                "Test Admin user not found."
            );

            process.exit(1);

        }

        // ----------------------------------------------------
        // Verify Role
        // ----------------------------------------------------

        if (user.role !== "Admin") {

            console.log(
                "User exists but is not an Admin."
            );

            console.log(
                "Current role:",
                user.role
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
            "Test Admin password reset successfully."
        );

        console.log(
            "Email:",
            TEST_ADMIN_EMAIL
        );

        console.log(
            "Password synchronized with TEST_ADMIN_PASSWORD."
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
            "Admin password reset failed:",
            error.message
        );

        process.exit(1);

    }

};

// ============================================================
// Execute
// ============================================================

resetTestAdminPassword();
