// ============================================================
// File: routes/patientRoutes.js
// Purpose: Patient API routes.
// ============================================================


import express from "express";


import {

    createPatientProfile,

    getPatientProfile,

    updatePatientProfile,

    getAllPatients,

    getPatientById,

    updatePatientById

} from "../controllers/patientController.js";


import protect
    from "../middleware/protect.js";


import authorize
    from "../middleware/authorize.js";


const router = express.Router();




// ============================================================
// Patient Profile Routes
// Patient role only
// ============================================================


// Create patient profile
router.post(

    "/profile",

    protect,

    authorize("Patient"),

    createPatientProfile

);


// Get patient profile
router.get(

    "/profile",

    protect,

    authorize("Patient"),

    getPatientProfile

);


// Update patient profile
router.put(

    "/profile",

    protect,

    authorize("Patient"),

    updatePatientProfile

);




// ============================================================
// Administrative Patient Directory
// Admin + SuperAdmin
// ============================================================


// Get all patients
router.get(

    "/",

    protect,

    authorize(

        "Admin",

        "SuperAdmin"

    ),

    getAllPatients

);


// Get patient by ID
router.get(

    "/:id",

    protect,

    authorize(

        "Admin",

        "SuperAdmin"

    ),

    getPatientById

);


// Update patient by ID
router.put(

    "/:id",

    protect,

    authorize(

        "Admin",

        "SuperAdmin"

    ),

    updatePatientById

);


export default router;