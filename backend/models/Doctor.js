// ============================================================
// File: models/Doctor.js
// Purpose: Doctor profile schema for HMSPro.
// ============================================================

import mongoose from "mongoose";


// ============================================================
// Doctor Schema
// ============================================================

const doctorSchema = new mongoose.Schema(
    {

        // --------------------------------------------------------
        // User Reference
        // One User can have only one Doctor profile.
        // --------------------------------------------------------

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },


        // --------------------------------------------------------
        // Doctor Specialization
        // --------------------------------------------------------

        specialization: {
            type: String,
            required: true,
            trim: true,
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
        // Medical License Number
        // Must be unique for every doctor.
        // --------------------------------------------------------

        licenseNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },


        // --------------------------------------------------------
        // Consultation Fee
        // --------------------------------------------------------

        consultationFee: {
            type: Number,
            default: 0,
            min: 0,
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
        // Doctor Profile Image
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
// Doctor Model
// ============================================================

const Doctor = mongoose.model(
    "Doctor",
    doctorSchema
);


export default Doctor;
