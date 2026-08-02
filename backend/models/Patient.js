// ============================================================
// File: models/Patient.js
// Purpose: Stores patient-specific information.
// ============================================================

import mongoose from "mongoose";


const patientSchema = new mongoose.Schema(

    {

        // Link patient profile with User account
        userId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

            unique: true,

        },


        dateOfBirth: {

            type: Date,

        },


        gender: {

            type: String,

            enum: [
                "Male",
                "Female",
                "Other"
            ],

        },


        bloodGroup: {

            type: String,

            enum: [
                "A+",
                "A-",
                "B+",
                "B-",
                "AB+",
                "AB-",
                "O+",
                "O-"
            ],

        },


        address: {

            type: String,

            trim: true,

        },


        city: {

            type: String,

            trim: true,

        },


        emergencyContact: {

            type: String,

            trim: true,

        },


        medicalHistory: {

            type: String,

            default: "",

        },


        allergies: {

            type: String,

            default: "",

        },

    },

    {

        timestamps: true,

    }

);


export default mongoose.model(
    "Patient",
    patientSchema
);