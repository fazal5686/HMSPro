// ============================================================
// File: controllers/patientController.js
// Purpose: Patient HTTP controllers.
// ============================================================


import {

    createPatientProfileService,

    getPatientProfileService,

    updatePatientProfileService,

    getAllPatientsService,

    getPatientByIdService,

    updatePatientByIdService

} from "../services/patientService.js";




// ============================================================
// Create Patient Profile
// Patient self-service
// ============================================================

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


    } catch (error) {

        next(error);

    }

};




// ============================================================
// Get Patient Profile
// Patient self-service
// ============================================================

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


    } catch (error) {

        next(error);

    }

};




// ============================================================
// Update Patient Profile
// Patient self-service
// ============================================================

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


    } catch (error) {

        next(error);

    }

};




// ============================================================
// Get All Patients
// Administrative Patient Directory
// ============================================================

export const getAllPatients = async (

    req,

    res,

    next

) => {

    try {

        const patients =
            await getAllPatientsService();


        res.status(200).json({

            success: true,

            message:
                "Patients retrieved successfully.",

            count: patients.length,

            data: patients

        });


    } catch (error) {

        next(error);

    }

};




// ============================================================
// Get Patient By ID
// Administrative Patient Directory
// ============================================================

export const getPatientById = async (

    req,

    res,

    next

) => {

    try {

        const patient =
            await getPatientByIdService(

                req.params.id

            );


        res.status(200).json({

            success: true,

            message:
                "Patient retrieved successfully.",

            data: patient

        });


    } catch (error) {

        next(error);

    }

};




// ============================================================
// Update Patient By ID
// Administrative Patient Directory
// ============================================================

export const updatePatientById = async (

    req,

    res,

    next

) => {

    try {

        const patient =
            await updatePatientByIdService(

                req.params.id,

                req.body

            );


        res.status(200).json({

            success: true,

            message:
                "Patient updated successfully.",

            data: patient

        });


    } catch (error) {

        next(error);

    }

};