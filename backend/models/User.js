// ============================================================
// File: models/User.js
// Purpose: Defines the User schema for HMSPro.
// Every authenticated person in the system uses this model.
// ============================================================

import { ROLES, ROLE_LIST } from "../constants/roles.js";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        // Full name of the user.
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        // Email used for login.
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        // Encrypted password (hashed with bcrypt).
        password: {
            type: String,
            required: true,
        },

        // User role.
role: {
    type: String,
    required: true,
    enum: ROLE_LIST,
    default: ROLES.PATIENT,
},

        // Contact number.
        phone: {
            type: String,
            trim: true,
        },

        // Profile image path.
        profileImage: {
            type: String,
            default: "",
        },

        // Account status.
        isActive: {
            type: Boolean,
            default: true,
        },

        // Last successful login.
        lastLogin: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;