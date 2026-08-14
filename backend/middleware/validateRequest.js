
// ============================================================
// File: middleware/validateRequest.js
// Purpose: Handle express-validator validation errors.
// ============================================================

import { validationResult } from "express-validator";

// ============================================================
// Validate Request Middleware
// ============================================================

const validateRequest = (req, res, next) => {

    const errors = validationResult(req);

    // --------------------------------------------------------
    // Validation Errors
    // --------------------------------------------------------

    if (!errors.isEmpty()) {

        return res.status(400).json({

            success: false,

            message: "Validation failed.",

            errors: errors.array(),

        });

    }

    // --------------------------------------------------------
    // Continue Request
    // --------------------------------------------------------

    next();

};

// ============================================================
// Export
// ============================================================

export default validateRequest;
