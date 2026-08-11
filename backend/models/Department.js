// ============================================================
// File: models/Department.js
// Purpose: Department database model for HMSPro.
// ============================================================

import mongoose from "mongoose";

// ============================================================
// Department Schema
// ============================================================

const departmentSchema = new mongoose.Schema(
    {

        // ----------------------------------------------------
        // Department Name
        // ----------------------------------------------------

        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },


        // ----------------------------------------------------
        // Department Description
        // ----------------------------------------------------

        description: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },


        // ----------------------------------------------------
        // Department Head
        // References a Doctor
        // ----------------------------------------------------

        headDoctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            default: null,
        },


        // ----------------------------------------------------
        // Department Location
        // ----------------------------------------------------

        location: {
            type: String,
            trim: true,
            maxlength: 200,
            default: "",
        },


        // ----------------------------------------------------
        // Department Phone
        // ----------------------------------------------------

        phone: {
            type: String,
            trim: true,
            maxlength: 20,
            default: "",
        },


        // ----------------------------------------------------
        // Active Status
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
// Department Model
// ============================================================

const Department = mongoose.model(
    "Department",
    departmentSchema
);

// ============================================================
// Export Model
// ============================================================

export default Department;