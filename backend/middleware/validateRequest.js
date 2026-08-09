// ============================================================
// File: middleware/validateRequest.js
// Purpose: Handle express-validator validation errors.
// ============================================================

import { validationResult } from "express-validator";

const validateRequest = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({

            success: false,

            message: "Validation failed.",

            errors: errors.array()

        });

    }

    next();

};

export default validateRequest;