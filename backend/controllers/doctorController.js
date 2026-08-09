
// ============================================================
// File: controllers/doctorController.js
// Purpose: Handle HTTP requests for Doctor module.
// ============================================================

import {
    createDoctorService,
    getDoctorByUserIdService,
    getDoctorByIdService,
    getAllDoctorsService,
    updateDoctorService,
    deleteDoctorService,
} from "../services/doctorService.js";


// ============================================================
// Create Doctor Profile
// POST /api/doctors
// Admin creates a profile for an existing Doctor user.
// ============================================================

export const createDoctor = async (req, res) => {

    try {

        // --------------------------------------------------------
        // Doctor userId must come from request body.
        // The service will verify:
        // 1. User exists.
        // 2. User has Doctor role.
        // 3. Doctor profile does not already exist.
        // --------------------------------------------------------

        if (!req.body.userId) {

            return res.status(400).json({

                success: false,

                message: "Doctor userId is required.",

            });

        }


        // --------------------------------------------------------
        // Prepare Doctor data
        // --------------------------------------------------------

        const doctorData = {

            ...req.body,

            userId: req.body.userId,

        };


        // --------------------------------------------------------
        // Add profile image if uploaded
        // --------------------------------------------------------

        if (req.file) {

            doctorData.profileImage = req.file.path;

        }


        // --------------------------------------------------------
        // Create Doctor profile
        // --------------------------------------------------------

        const doctor = await createDoctorService(

            doctorData

        );


        // --------------------------------------------------------
        // Success response
        // --------------------------------------------------------

        return res.status(201).json({

            success: true,

            message: "Doctor profile created successfully.",

            data: doctor,

        });


    } catch (error) {

        // --------------------------------------------------------
        // Error response
        // --------------------------------------------------------

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};


// ============================================================
// Get Logged-in Doctor Profile
// GET /api/doctors/me
// ============================================================

export const getMyDoctorProfile = async (req, res) => {

    try {

        const doctor = await getDoctorByUserIdService(

            req.user.id

        );


        if (!doctor) {

            return res.status(404).json({

                success: false,

                message: "Doctor profile not found.",

            });

        }


        return res.status(200).json({

            success: true,

            data: doctor,

        });


    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// ============================================================
// Get Doctor By ID
// GET /api/doctors/:id
// ============================================================

export const getDoctorById = async (req, res) => {

    try {

        const doctor = await getDoctorByIdService(

            req.params.id

        );


        return res.status(200).json({

            success: true,

            data: doctor,

        });


    } catch (error) {

        return res.status(404).json({

            success: false,

            message: error.message,

        });

    }

};


// ============================================================
// Get All Doctors
// GET /api/doctors
// ============================================================

export const getAllDoctors = async (req, res) => {

    try {

        const doctors = await getAllDoctorsService();


        return res.status(200).json({

            success: true,

            count: doctors.length,

            data: doctors,

        });


    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// ============================================================
// Update Doctor Profile
// PUT /api/doctors/:id
// ============================================================

export const updateDoctor = async (req, res) => {

    try {

        // --------------------------------------------------------
        // Prepare update data
        // --------------------------------------------------------

        const doctorData = {

            ...req.body,

        };


        // --------------------------------------------------------
        // Add new profile image if uploaded
        // --------------------------------------------------------

        if (req.file) {

            doctorData.profileImage = req.file.path;

        }


        // --------------------------------------------------------
        // Update Doctor profile
        // --------------------------------------------------------

        const doctor = await updateDoctorService(

            req.params.id,

            doctorData

        );


        return res.status(200).json({

            success: true,

            message: "Doctor profile updated successfully.",

            data: doctor,

        });


    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};


// ============================================================
// Delete Doctor Profile
// DELETE /api/doctors/:id
// ============================================================

export const deleteDoctor = async (req, res) => {

    try {

        await deleteDoctorService(

            req.params.id

        );


        return res.status(200).json({

            success: true,

            message: "Doctor profile deleted successfully.",

        });


    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};
