// ============================================================
// File: models/Nurse.js
// Purpose: Nurse profile schema for HMSPro.
// ============================================================

import mongoose from "mongoose";


// ============================================================
// Nurse Schema
// ============================================================

const nurseSchema = new mongoose.Schema(
    {

        // --------------------------------------------------------
        // User Reference
        // One User can have only one Nurse profile.
        // --------------------------------------------------------

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },


        // --------------------------------------------------------
        // Educational Qualification
        // --------------------------------------------------------

        qualification: {
            type: String,
            required: true,
            trim: true,
        },


        // --------------------------------------------------------
        // Professional Experience
        // --------------------------------------------------------

        experience: {
            type: Number,
            required: true,
            min: 0,
        },


        // --------------------------------------------------------
        // Nursing License Number
        // Must be unique.
        // --------------------------------------------------------

        licenseNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },


        // --------------------------------------------------------
        // Department
        // --------------------------------------------------------

        department: {
            type: String,
            trim: true,
            default: null,
        },


        // --------------------------------------------------------
        // Nurse Shift
        // --------------------------------------------------------

        shift: {
            type: String,
            enum: [
                "Morning",
                "Evening",
                "Night",
                "Rotating",
            ],
            default: "Morning",
        },


        // --------------------------------------------------------
        // Nurse Profile Image
        // --------------------------------------------------------

        profileImage: {
            type: String,
            default: null,
        },


        // --------------------------------------------------------
        // Availability
        // true  = Available
        // false = Not Available
        // --------------------------------------------------------

        availability: {
            type: Boolean,
            default: true,
        },


        // --------------------------------------------------------
        // Account Status
        // true  = Active
        // false = Disabled
        // --------------------------------------------------------

        isActive: {
            type: Boolean,
            default: true,
        },

    },

    {
        timestamps: true,
    }
);


// ============================================================
// Nurse Model
// ============================================================

const Nurse = mongoose.model(
    "Nurse",
    nurseSchema
);


export default Nurse;
