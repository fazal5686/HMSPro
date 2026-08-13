// ============================================================
// File: middleware/authMiddleware.js
// Purpose: Verify JWT token and protect private routes.
// ============================================================

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ============================================================
// Middleware: Protect Routes
// Checks Authorization header
// Verifies JWT token
// Attaches logged-in user to req.user
// ============================================================

export const protect = async (req, res, next) => {
    try {

        // --------------------------------------------------------
        // Get token from Authorization header
        // --------------------------------------------------------

        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // --------------------------------------------------------
        // If token is missing
        // --------------------------------------------------------

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. Token missing.",
            });
        }

        // --------------------------------------------------------
        // Verify JWT token
        // --------------------------------------------------------

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // --------------------------------------------------------
        // Find logged-in user
        // --------------------------------------------------------

        const user = await User.findById(decoded.id)
            .select("-password");

        // --------------------------------------------------------
        // User not found
        // --------------------------------------------------------

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }

        // --------------------------------------------------------
        // Attach user to request
        // --------------------------------------------------------

        req.user = user;

        // --------------------------------------------------------
        // Continue
        // --------------------------------------------------------

        next();

    } catch (error) {

        console.error(
            "Authentication error:",
            error.message
        );

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};