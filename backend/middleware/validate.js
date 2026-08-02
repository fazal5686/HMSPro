// ============================================================
// File: middleware/validate.js
// Purpose: Executes validation rules and returns errors.
// ============================================================

import { validationResult } from "express-validator";


const validate = (req, res, next) => {

    const errors = validationResult(req);


    // If validation errors exist.
    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            message: "Validation failed.",
            errors: errors.array(),
        });

    }


    // Continue to controller.
    next();
};


export default validate;