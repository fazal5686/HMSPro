// ============================================================
// File: middleware/protect.js
// Purpose: Protects private routes by verifying JWT tokens.
// ============================================================

import jwt from "jsonwebtoken";

import { findUserById } from "../repositories/authRepository.js";


// ============================================================
// Protect Middleware
// ============================================================

const protect = async (req, res, next) => {

    try {

        let token;


        // ========================================================
        // Get Token From Authorization Header
        // ========================================================

        const authHeader = req.headers.authorization;

        if (
            authHeader &&
            authHeader.startsWith("Bearer ")
        ) {

            token = authHeader.split(" ")[1];

        }


        // ========================================================
        // Check Token
        // ========================================================

        if (!token) {

            return res.status(401).json({
                success: false,
                message: "Not authorized. Token missing.",
            });

        }


        // ========================================================
        // Verify JWT Token
        // ========================================================

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // ========================================================
        // Find User
        // ========================================================

        const user = await findUserById(decoded.id);


        if (!user || !user.isActive) {

            return res.status(401).json({
                success: false,
                message: "User no longer exists.",
            });

        }


        // ========================================================
        // Attach User To Request
        // ========================================================

        req.user = user;


        // ========================================================
        // Continue
        // ========================================================

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });

    }

};


export default protect;