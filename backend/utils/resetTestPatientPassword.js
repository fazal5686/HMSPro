// ============================================================
// File: utils/resetTestPatientPassword.js
// Purpose: Reset password for HMSPro Appointment Test Patient.
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
// Test Patient Details
// ============================================================

const TEST_PATIENT_EMAIL =
    "appointment.patient@hmspro.com";

const NEW_PASSWORD =
    "TestPatient@123";

// ============================================================
// Reset Test Patient Password
// ============================================================

const resetTestPatientPassword = async () => {

    try {

        // ----------------------------------------------------
        // Connect to MongoDB
        // ----------------------------------------------------

        await connectDB();


        // ----------------------------------------------------
        // Find Test Patient
        // ----------------------------------------------------

        const user = await User.findOne({

            email: TEST_PATIENT_EMAIL

        });


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
            "Test Patient password reset successfully."
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

resetTestPatientPassword();