// ============================================================
// File: controllers/patientController.js
// Purpose: Patient HTTP controllers.
// ============================================================


import {

    createPatientProfileService,

    getPatientProfileService,

    updatePatientProfileService

} from "../services/patientService.js";





// Create Profile

export const createPatientProfile = async (
    req,
    res,
    next
) => {

    try {

        console.log("REQ BODY:", req.body);
    
        const patient =
            await createPatientProfileService(
                req.user._id,
                req.body
            );


        res.status(201).json({

            success: true,

            message:
            "Patient profile created successfully.",

            data: patient

        });


    } catch(error) {

        next(error);

    }

};





// Get Profile

export const getPatientProfile = async (
    req,
    res,
    next
) => {

    try {


        const patient =
            await getPatientProfileService(
                req.user._id
            );


        res.status(200).json({

            success: true,

            message:
            "Patient profile retrieved successfully.",

            data: patient

        });


    } catch(error) {

        next(error);

    }

};





// Update Profile

export const updatePatientProfile = async (
    req,
    res,
    next
) => {

    try {

        console.log("UPDATE BODY:", req.body);


        const patient =
            await updatePatientProfileService(
                req.user._id,
                req.body
            );
        res.status(200).json({

            success: true,

            message:
            "Patient profile updated successfully.",

            data: patient

        });


    } catch(error) {

        next(error);

    }

};