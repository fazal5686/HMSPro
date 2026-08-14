// ============================================================
// File: models/Setting.js
// Purpose: Store HMSPro system and hospital settings.
// ============================================================

import mongoose from "mongoose";

// ============================================================
// Setting Schema
// ============================================================

const settingSchema = new mongoose.Schema(
    {
        // --------------------------------------------------------
        // Hospital Information
        // --------------------------------------------------------

        hospitalName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        hospitalAddress: {
            type: String,
            trim: true,
            maxlength: 300,
            default: "",
        },

        hospitalPhone: {
            type: String,
            trim: true,
            maxlength: 30,
            default: "",
        },

        hospitalEmail: {
            type: String,
            trim: true,
            lowercase: true,
            maxlength: 150,
            default: "",
        },

        hospitalWebsite: {
            type: String,
            trim: true,
            maxlength: 200,
            default: "",
        },

        // --------------------------------------------------------
        // System Settings
        // --------------------------------------------------------

        currency: {
            type: String,
            trim: true,
            uppercase: true,
            maxlength: 10,
            default: "PKR",
        },

        timezone: {
            type: String,
            trim: true,
            default: "Asia/Karachi",
        },

        dateFormat: {
            type: String,
            trim: true,
            default: "DD-MM-YYYY",
        },

        timeFormat: {
            type: String,
            enum: ["12-hour", "24-hour"],
            default: "12-hour",
        },

        // --------------------------------------------------------
        // Notification Settings
        // --------------------------------------------------------

        emailNotifications: {
            type: Boolean,
            default: true,
        },

        smsNotifications: {
            type: Boolean,
            default: false,
        },

        appointmentReminders: {
            type: Boolean,
            default: true,
        },

        // --------------------------------------------------------
        // Appointment Settings
        // --------------------------------------------------------

        defaultAppointmentDuration: {
            type: Number,
            min: 5,
            default: 30,
        },

        allowPatientRegistration: {
            type: Boolean,
            default: true,
        },

        // --------------------------------------------------------
        // Billing Settings
        // --------------------------------------------------------

        taxEnabled: {
            type: Boolean,
            default: false,
        },

        taxPercentage: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },

        // --------------------------------------------------------
        // Record Status
        // --------------------------------------------------------

        isActive: {
            type: Boolean,
            default: true,
        },

        // --------------------------------------------------------
        // Audit Information
        // --------------------------------------------------------

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// ============================================================
// Export Model
// ============================================================

const Setting = mongoose.model("Setting", settingSchema);

export default Setting;