// ============================================================
// File: utils/hashPassword.js
// Purpose: Provides reusable password hashing and comparison
// utilities for HMSPro authentication.
// ============================================================

import bcrypt from "bcryptjs";

/**
 * Hash a plain-text password.
 *
 * @param {string} password - Plain password entered by the user.
 * @returns {Promise<string>} - Secure hashed password.
 */
export const hashPassword = async (password) => {
    const saltRounds = 10;

    return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare a plain password with its hashed version.
 *
 * @param {string} password - Plain password.
 * @param {string} hashedPassword - Password stored in database.
 * @returns {Promise<boolean>}
 */
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};