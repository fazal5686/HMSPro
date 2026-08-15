// ============================================================
// File: utils/resetTestPatientPassword.js
// Purpose: Reset the HMSPro test Patient password.
// Development/testing utility only.
// ============================================================

import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/User.js";


// Load environment variables

dotenv.config();


// ============================================================
// Test Patient Information
// ============================================================

const USER_ID = "6a7ffc1ac02e3844c4309486";

const NEW_PASSWORD = "HMSPro@Patient2026";


// ============================================================
// Reset Password
// ============================================================

const resetTestPatientPassword = async () => {

    try {

        // ----------------------------------------------------
        // Connect to HMSPro MongoDB
        // ----------------------------------------------------

        await mongoose.connect(
            process.env.MONGODB_URI
        );

        console.log(
            "MongoDB connected."
        );


        // ----------------------------------------------------
        // Find Test Patient
        // ----------------------------------------------------

        const user = await User.findById(
            USER_ID
        );


        if (!user) {

            console.log(
                "Test Patient user not found."
            );

            process.exit(1);

        }


        // ----------------------------------------------------
        // Verify Role
        // ----------------------------------------------------

        if (user.role !== "Patient") {

            console.log(
                `User exists but role is "${user.role}", not "Patient".`
            );

            process.exit(1);

        }


        // ----------------------------------------------------
        // Hash New Password
        // ----------------------------------------------------

        user.password = await bcrypt.hash(
            NEW_PASSWORD,
            10
        );


        // ----------------------------------------------------
        // Save User
        // ----------------------------------------------------

        await user.save();


        // ----------------------------------------------------
        // Success
        // ----------------------------------------------------

        console.log("");

        console.log(
            "=============================================="
        );

        console.log(
            "Test Patient password reset successfully."
        );

        console.log(
            "=============================================="
        );

        console.log("");

        console.log(
            "Name:",
            user.fullName
        );

        console.log(
            "Email:",
            user.email
        );

        console.log(
            "Role:",
            user.role
        );

        console.log(
            "User ID:",
            user._id.toString()
        );

        console.log(
            "New Password:",
            NEW_PASSWORD
        );

        console.log("");


    } catch (error) {

        console.error(
            "Password reset failed:",
            error.message
        );

        process.exit(1);

    } finally {

        await mongoose.connection.close();

    }

};


// ============================================================
// Run Utility
// ============================================================

resetTestPatientPassword();