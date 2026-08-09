// ============================================================
// File: routes/doctorRoutes.js
// Purpose: Doctor API routes for HMSPro.
// ============================================================


import express from "express";

console.log("Doctor routes file loaded");


import {

    createDoctorValidator,
    updateDoctorValidator

} from "../validators/doctorValidator.js";


import validateRequest from "../middleware/validateRequest.js";

import protect from "../middleware/protect.js";

import authorize from "../middleware/authorize.js";

import { ROLES } from "../constants/roles.js";

import upload from "../middleware/uploadMiddleware.js";


import {

    createDoctor,

    getMyDoctorProfile,

    getDoctorById,

    getAllDoctors,

    updateDoctor,

    deleteDoctor

} from "../controllers/doctorController.js";




// Create router

const router = express.Router();





// ============================================================
// Create Doctor Profile
// Admin only
// Supports profile image upload
// ============================================================


router.post(

    "/",

    protect,

    authorize(ROLES.ADMIN),

    upload.single("profileImage"),

    createDoctorValidator,

    validateRequest,

    createDoctor

);






// ============================================================
// Get All Doctors
// Authenticated users
// ============================================================


router.get(

    "/",

    protect,

    getAllDoctors

);






// ============================================================
// Get Logged-in Doctor Profile
// Doctor/Admin
// ============================================================


router.get(

    "/me",

    protect,

    getMyDoctorProfile

);






// ============================================================
// Get Doctor By Doctor ID
// ============================================================


router.get(

    "/:id",

    protect,

    getDoctorById

);






// ============================================================
// Update Doctor Profile
// Admin only
// Supports profile image update
// ============================================================


router.put(

    "/:id",

    protect,

    authorize(ROLES.ADMIN),

    upload.single("profileImage"),

    updateDoctorValidator,

    validateRequest,

    updateDoctor

);






// ============================================================
// Delete Doctor
// Admin only
// ============================================================


router.delete(

    "/:id",

    protect,

    authorize(ROLES.ADMIN),

    deleteDoctor

);



export default router;