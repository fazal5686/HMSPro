
// ============================================================
// File: validators/roomValidator.js
// Purpose: Validation rules for Room module.
// ============================================================

import { body, param } from "express-validator";

// ============================================================
// Create Room Validation
// POST /api/rooms
// ============================================================

export const createRoomValidator = [

    // --------------------------------------------------------
    // Room Number
    // --------------------------------------------------------

    body("roomNumber")
        .trim()
        .notEmpty()
        .withMessage(
            "Room number is required."
        )
        .isLength({
            min: 1,
            max: 30,
        })
        .withMessage(
            "Room number must not exceed 30 characters."
        ),

    // --------------------------------------------------------
    // Room Type
    // --------------------------------------------------------

    body("roomType")
        .trim()
        .notEmpty()
        .withMessage(
            "Room type is required."
        )
        .isIn([
            "General",
            "Private",
            "Semi-Private",
            "ICU",
            "Emergency",
            "Operation Theater",
        ])
        .withMessage(
            "Invalid room type."
        ),

    // --------------------------------------------------------
    // Department
    // --------------------------------------------------------

    body("department")
        .trim()
        .notEmpty()
        .withMessage(
            "Department is required."
        )
        .isMongoId()
        .withMessage(
            "Department must be a valid MongoDB ID."
        ),

    // --------------------------------------------------------
    // Floor
    // --------------------------------------------------------

    body("floor")
        .trim()
        .notEmpty()
        .withMessage(
            "Floor is required."
        )
        .isLength({
            max: 50,
        })
        .withMessage(
            "Floor cannot exceed 50 characters."
        ),

    // --------------------------------------------------------
    // Status
    // --------------------------------------------------------

    body("status")
        .optional()
        .isIn([
            "Available",
            "Occupied",
            "Reserved",
            "Maintenance",
        ])
        .withMessage(
            "Invalid room status."
        ),

    // --------------------------------------------------------
    // Daily Charge
    // --------------------------------------------------------

    body("dailyCharge")
        .notEmpty()
        .withMessage(
            "Daily charge is required."
        )
        .isFloat({
            min: 0,
        })
        .withMessage(
            "Daily charge must be a positive number or zero."
        ),

    // --------------------------------------------------------
    // Description
    // --------------------------------------------------------

    body("description")
        .optional()
        .trim()
        .isLength({
            max: 500,
        })
        .withMessage(
            "Description cannot exceed 500 characters."
        ),

    // --------------------------------------------------------
    // Active Status
    // --------------------------------------------------------

    body("isActive")
        .optional()
        .isBoolean()
        .withMessage(
            "Active status must be true or false."
        ),
];

// ============================================================
// Update Room Validation
// PUT /api/rooms/:id
// ============================================================

export const updateRoomValidator = [

    // --------------------------------------------------------
    // Room ID
    // --------------------------------------------------------

    param("id")
        .isMongoId()
        .withMessage(
            "Room ID must be a valid MongoDB ID."
        ),

    // --------------------------------------------------------
    // Room Number
    // --------------------------------------------------------

    body("roomNumber")
        .optional()
        .trim()
        .isLength({
            min: 1,
            max: 30,
        })
        .withMessage(
            "Room number must not exceed 30 characters."
        ),

    // --------------------------------------------------------
    // Room Type
    // --------------------------------------------------------

    body("roomType")
        .optional()
        .trim()
        .isIn([
            "General",
            "Private",
            "Semi-Private",
            "ICU",
            "Emergency",
            "Operation Theater",
        ])
        .withMessage(
            "Invalid room type."
        ),

    // --------------------------------------------------------
    // Department
    // --------------------------------------------------------

    body("department")
        .optional()
        .trim()
        .isMongoId()
        .withMessage(
            "Department must be a valid MongoDB ID."
        ),

    // --------------------------------------------------------
    // Floor
    // --------------------------------------------------------

    body("floor")
        .optional()
        .trim()
        .isLength({
            max: 50,
        })
        .withMessage(
            "Floor cannot exceed 50 characters."
        ),

    // --------------------------------------------------------
    // Status
    // --------------------------------------------------------

    body("status")
        .optional()
        .isIn([
            "Available",
            "Occupied",
            "Reserved",
            "Maintenance",
        ])
        .withMessage(
            "Invalid room status."
        ),

    // --------------------------------------------------------
    // Daily Charge
    // --------------------------------------------------------

    body("dailyCharge")
        .optional()
        .isFloat({
            min: 0,
        })
        .withMessage(
            "Daily charge must be a positive number or zero."
        ),

    // --------------------------------------------------------
    // Description
    // --------------------------------------------------------

    body("description")
        .optional()
        .trim()
        .isLength({
            max: 500,
        })
        .withMessage(
            "Description cannot exceed 500 characters."
        ),

    // --------------------------------------------------------
    // Active Status
    // --------------------------------------------------------

    body("isActive")
        .optional()
        .isBoolean()
        .withMessage(
            "Active status must be true or false."
        ),
];

// ============================================================
// Room ID Validation
// GET /api/rooms/:id
// DELETE /api/rooms/:id
// ============================================================

export const roomIdValidator = [

    param("id")
        .isMongoId()
        .withMessage(
            "Room ID must be a valid MongoDB ID."
        ),

];
