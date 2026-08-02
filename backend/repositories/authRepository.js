// ============================================================
// File: repositories/authRepository.js
// Purpose: Handles all database operations related to users.
// This layer ONLY communicates with MongoDB.
// No business logic should be written here.
// ============================================================

import User from "../models/User.js";


// ============================================================
// Find a user by email address.
// Used during login.
// ============================================================

/**
 * @param {string} email
 * @returns {Promise<Object|null>}
 */
export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};



// ============================================================
// Find a user by MongoDB ID.
// Password is excluded for security.
// Used by protect middleware.
// ============================================================

/**
 * @param {string} userId
 * @returns {Promise<Object|null>}
 */
export const findUserById = async (userId) => {
    return await User.findById(userId)
        .select("-password");
};



// ============================================================
// Create a new user.
// Used during registration.
// ============================================================

/**
 * @param {Object} userData
 * @returns {Promise<Object>}
 */
export const createUser = async (userData) => {
    return await User.create(userData);
};



// ============================================================
// Update user's last login date and time.
// ============================================================

/**
 * @param {string} userId
 * @returns {Promise<Object|null>}
 */
export const updateLastLogin = async (userId) => {
    return await User.findByIdAndUpdate(
        userId,
        {
            lastLogin: new Date(),
        },
        {
            new: true,
        }
    );
};



// ============================================================
// Update user's password.
// ============================================================

/**
 * @param {string} userId
 * @param {string} hashedPassword
 * @returns {Promise<Object|null>}
 */
export const updatePassword = async (userId, hashedPassword) => {
    return await User.findByIdAndUpdate(
        userId,
        {
            password: hashedPassword,
        },
        {
            new: true,
        }
    );
};