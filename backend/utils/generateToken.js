// ============================================================
// File: utils/generateToken.js
// Purpose: Generate JWT access tokens for authenticated users.
// ============================================================

import jwt from "jsonwebtoken";

/**
 * Generate a JWT token.
 *
 * @param {Object} user
 * @returns {string}
 */
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );
};

export default generateToken;