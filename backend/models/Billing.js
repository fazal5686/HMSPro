
// ============================================================
// File: models/Billing.js
// Purpose: Billing database model for HMSPro.
// ============================================================

import mongoose from "mongoose";

// ============================================================
// Billing Schema
// ============================================================

const billingSchema = new mongoose.Schema(
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
        // Admission Reference
        // Optional because not every bill requires admission.
// ----------------------------------------------------

        admissionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admission",
            default: null,
        },


        // ----------------------------------------------------
        // Invoice Number
        // ----------------------------------------------------

        invoiceNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: 50,
        },


        // ----------------------------------------------------
        // Consultation Charges
        // ----------------------------------------------------

        consultationCharges: {
            type: Number,
            min: 0,
            default: 0,
        },


        // ----------------------------------------------------
        // Room Charges
        // ----------------------------------------------------

        roomCharges: {
            type: Number,
            min: 0,
            default: 0,
        },


        // ----------------------------------------------------
        // Medicine Charges
        // ----------------------------------------------------

        medicineCharges: {
            type: Number,
            min: 0,
            default: 0,
        },


        // ----------------------------------------------------
        // Lab Charges
        // ----------------------------------------------------

        labCharges: {
            type: Number,
            min: 0,
            default: 0,
        },


        // ----------------------------------------------------
        // Other Charges
        // ----------------------------------------------------

        otherCharges: {
            type: Number,
            min: 0,
            default: 0,
        },


        // ----------------------------------------------------
        // Discount
        // ----------------------------------------------------

        discount: {
            type: Number,
            min: 0,
            default: 0,
        },


        // ----------------------------------------------------
        // Tax
        // ----------------------------------------------------

        tax: {
            type: Number,
            min: 0,
            default: 0,
        },


        // ----------------------------------------------------
        // Total Amount
        // ----------------------------------------------------

        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },


        // ----------------------------------------------------
        // Amount Paid
        // ----------------------------------------------------

        amountPaid: {
            type: Number,
            min: 0,
            default: 0,
        },


        // ----------------------------------------------------
        // Balance
        // ----------------------------------------------------

        balance: {
            type: Number,
            min: 0,
            default: 0,
        },


        // ----------------------------------------------------
        // Payment Status
        // ----------------------------------------------------

        paymentStatus: {
            type: String,
            enum: [
                "Pending",
                "Partial",
                "Paid",
            ],
            default: "Pending",
        },


        // ----------------------------------------------------
        // Payment Method
        // ----------------------------------------------------

        paymentMethod: {
            type: String,
            enum: [
                "Cash",
                "Card",
                "Bank Transfer",
                "Online",
                "Other",
            ],
            default: "Cash",
        },


        // ----------------------------------------------------
        // Billing Date
        // ----------------------------------------------------

        billingDate: {
            type: Date,
            default: Date.now,
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
// Billing Model
// ============================================================

const Billing = mongoose.model(
    "Billing",
    billingSchema
);

// ============================================================
// Export Model
// ============================================================

export default Billing;
