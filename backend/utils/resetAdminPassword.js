// ============================================================
// File: utils/resetAdminPassword.js
// Purpose: Reset password for HMSPro Admin account.
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
// Admin Details
// ============================================================

const ADMIN_EMAIL = "admin@hmspro.com";

// IMPORTANT:
// Replace this with your NEW password.
// Do not send the password to ChatGPT.
const NEW_PASSWORD = "malakzabeehullahkhan";

// ============================================================
// Reset Admin Password
// ============================================================

const resetAdminPassword = async () => {

    try {

        // ----------------------------------------------------
        // Connect to MongoDB
        // ----------------------------------------------------

        await connectDB();

        // ----------------------------------------------------
        // Find Admin
        // ----------------------------------------------------

        const user = await User.findOne({

            email: ADMIN_EMAIL

        });

        if (!user) {

            console.log(
                "Admin user not found."
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
            "Admin password reset successfully."
        );

        console.log(
            "Email:",
            ADMIN_EMAIL
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

resetAdminPassword();