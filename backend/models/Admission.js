
// ============================================================
// File: models/Admission.js
// Purpose: MongoDB schema for Patient Admissions.
// ============================================================

import mongoose from "mongoose";

// ============================================================
// Admission Schema
// ============================================================

const admissionSchema = new mongoose.Schema(
    {

        // ----------------------------------------------------
        // Patient
        // ----------------------------------------------------

        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },

        // ----------------------------------------------------
        // Doctor responsible for admission
        // ----------------------------------------------------

        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },

        // ----------------------------------------------------
        // Room assigned to patient
        // ----------------------------------------------------

        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },

        // ----------------------------------------------------
        // Admission Date
        // ----------------------------------------------------

        admissionDate: {
            type: Date,
            required: true,
            default: Date.now,
        },

        // ----------------------------------------------------
        // Expected Discharge Date
        // ----------------------------------------------------

        expectedDischargeDate: {
            type: Date,
        },

        // ----------------------------------------------------
        // Actual Discharge Date
        // ----------------------------------------------------

        dischargeDate: {
            type: Date,
        },

        // ----------------------------------------------------
        // Reason for Admission
        // ----------------------------------------------------

        reason: {
            type: String,
            required: true,
            trim: true,
        },

        // ----------------------------------------------------
        // Diagnosis
        // ----------------------------------------------------

        diagnosis: {
            type: String,
            trim: true,
            default: "",
        },

        // ----------------------------------------------------
        // Admission Status
        // ----------------------------------------------------

        status: {
            type: String,
            enum: [
                "Admitted",
                "Discharged",
                "Cancelled",
            ],
            default: "Admitted",
        },

        // ----------------------------------------------------
        // Additional Notes
        // ----------------------------------------------------

        notes: {
            type: String,
            trim: true,
            default: "",
        },

        // ----------------------------------------------------
        // Active Flag
        // ----------------------------------------------------

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
// Indexes
// ============================================================

admissionSchema.index({
    patientId: 1,
});

admissionSchema.index({
    doctorId: 1,
});

admissionSchema.index({
    roomId: 1,
});

admissionSchema.index({
    status: 1,
});

// ============================================================
// Export Model
// ============================================================

const Admission = mongoose.model(
    "Admission",
    admissionSchema
);

export default Admission;
