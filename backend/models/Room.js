
// ============================================================
// File: models/Room.js
// Purpose: Mongoose model for Hospital Room module.
// ============================================================

import mongoose from "mongoose";

// ============================================================
// Room Schema
// ============================================================

const roomSchema = new mongoose.Schema(
    {

        // ----------------------------------------------------
        // Room Number
        // Example: R-101, ICU-01
        // ----------------------------------------------------

        roomNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        // ----------------------------------------------------
        // Room Type
        // ----------------------------------------------------

        roomType: {
            type: String,
            required: true,
            enum: [
                "General",
                "Private",
                "Semi-Private",
                "ICU",
                "Emergency",
                "Operation Theater",
            ],
            trim: true,
        },

        // ----------------------------------------------------
        // Department
        // References Department collection
        // ----------------------------------------------------

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },

        // ----------------------------------------------------
        // Floor
        // ----------------------------------------------------

        floor: {
            type: String,
            required: true,
            trim: true,
        },

        // ----------------------------------------------------
        // Room Status
        // ----------------------------------------------------

        status: {
            type: String,
            enum: [
                "Available",
                "Occupied",
                "Reserved",
                "Maintenance",
            ],
            default: "Available",
        },

        // ----------------------------------------------------
        // Daily Charge
        // ----------------------------------------------------

        dailyCharge: {
            type: Number,
            required: true,
            min: 0,
        },

        // ----------------------------------------------------
        // Description
        // ----------------------------------------------------

        description: {
            type: String,
            trim: true,
            default: "",
        },

        // ----------------------------------------------------
        // Active / Inactive
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
// Export Model
// ============================================================

const Room = mongoose.model(
    "Room",
    roomSchema
);

export default Room;
