// ============================================================
// File: models/Medicine.js
// Purpose: Medicine database model for HMSPro.
// ============================================================

import mongoose from "mongoose";

// ============================================================
// Medicine Schema
// ============================================================

const medicineSchema = new mongoose.Schema(
    {

        // ----------------------------------------------------
        // Medicine Name
        // ----------------------------------------------------

        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 150,
        },


        // ----------------------------------------------------
        // Generic Name
        // ----------------------------------------------------

        genericName: {
            type: String,
            trim: true,
            maxlength: 150,
            default: "",
        },


        // ----------------------------------------------------
        // Medicine Category
        // ----------------------------------------------------

        category: {
            type: String,
            trim: true,
            maxlength: 100,
            default: "",
        },


        // ----------------------------------------------------
        // Manufacturer
        // ----------------------------------------------------

        manufacturer: {
            type: String,
            trim: true,
            maxlength: 150,
            default: "",
        },


        // ----------------------------------------------------
        // Strength
        // Example: 500mg, 5mg/5ml
        // ----------------------------------------------------

        strength: {
            type: String,
            trim: true,
            maxlength: 50,
            default: "",
        },


        // ----------------------------------------------------
        // Dosage Form
        // Example: Tablet, Capsule, Syrup, Injection
        // ----------------------------------------------------

        dosageForm: {
            type: String,
            trim: true,
            maxlength: 50,
            default: "",
        },


        // ----------------------------------------------------
        // Unit Price
        // ----------------------------------------------------

        unitPrice: {
            type: Number,
            required: true,
            min: 0,
        },


        // ----------------------------------------------------
        // Available Quantity
        // ----------------------------------------------------

        quantity: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },


        // ----------------------------------------------------
        // Reorder Level
        // Minimum quantity before restocking is required.
        // ----------------------------------------------------

        reorderLevel: {
            type: Number,
            min: 0,
            default: 10,
        },


        // ----------------------------------------------------
        // Expiry Date
        // ----------------------------------------------------

        expiryDate: {
            type: Date,
            default: null,
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
// Medicine Model
// ============================================================

const Medicine = mongoose.model(
    "Medicine",
    medicineSchema
);

// ============================================================
// Export Model
// ============================================================

export default Medicine;