// ============================================================
// File: middleware/authMiddleware.js
// Purpose: Verify JWT token and protect private routes
// ============================================================

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ============================================================
// Middleware: Protect Routes
// Checks Authorization header
// Verifies JWT token
// Attaches logged-in user to req.user
// ============================================================

const protect = async (req, res, next) => {
    try {

        // Get token from Authorization header
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }


        // If token missing
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. Token missing."
            });
        }


        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // Find user from decoded id
        const user = await User.findById(decoded.id)
            .select("-password");


        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found."
            });
        }


        // Attach user data
        req.user = user;


        // Continue to controller
        next();


    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });

    }
};


module.exports = {
    protect
};