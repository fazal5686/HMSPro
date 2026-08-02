// ============================================================
// File: controllers/authController.js
// Purpose: Handles HTTP requests for authentication.
// This layer communicates between Routes and Services.
// ============================================================

import {
    registerUserService,
    loginUserService,
} from "../services/authService.js";

/**
 * ============================================================
 * Register New User
 * POST /api/auth/register
 * ============================================================
 */
export const registerUser = async (req, res, next) => {
    try {

        // Send request data to the service layer.
        const result = await registerUserService(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            data: result,
        });

    } catch (error) {
        next(error);
    }
};

/**
 * ============================================================
 * Login User
 * POST /api/auth/login
 * ============================================================
 */
export const loginUser = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        // Authenticate user.
        const result = await loginUserService(email, password);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            data: result,
        });

    } catch (error) {
        next(error);
    }
};
// ============================================================
// Get Current User
// ============================================================

export const getCurrentUser = async (req, res, next) => {


    try {


        res.status(200).json({

            success: true,

            message: "Current user retrieved successfully.",

            data: req.user,

        });


    } catch (error) {


        next(error);


    }


};