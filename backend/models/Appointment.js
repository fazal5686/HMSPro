
// ============================================================
// File: models/Appointment.js
// Purpose: Stores appointment information between
//          a Patient and a Doctor.
// ============================================================

import mongoose from "mongoose";


// ============================================================
// Appointment Schema
// ============================================================

const appointmentSchema = new mongoose.Schema(

    {

        // --------------------------------------------------------
        // Patient reference
        // --------------------------------------------------------

        patientId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Patient",

            required: true,

        },


        // --------------------------------------------------------
        // Doctor reference
        // --------------------------------------------------------

        doctorId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Doctor",

            required: true,

        },


        // --------------------------------------------------------
        // Appointment date
        // --------------------------------------------------------

        appointmentDate: {

            type: Date,

            required: true,

        },


        // --------------------------------------------------------
        // Appointment reason
        // --------------------------------------------------------

        reason: {

            type: String,

            required: true,

            trim: true,

            maxlength: 500,

        },


        // --------------------------------------------------------
        // Appointment status
        // --------------------------------------------------------

        status: {

            type: String,

            enum: [

                "Pending",

                "Confirmed",

                "Completed",

                "Cancelled",

                "No Show"

            ],

            default: "Pending",

        },


        // --------------------------------------------------------
        // Additional notes
        // --------------------------------------------------------

        notes: {

            type: String,

            trim: true,

            default: "",

            maxlength: 1000,

        },

    },

    {

        timestamps: true,

    }

);


// ============================================================
// Indexes
// ============================================================

// Helps retrieve appointments for a patient quickly.
appointmentSchema.index({

    patientId: 1,

    appointmentDate: -1,

});


// Helps retrieve appointments for a doctor quickly.
appointmentSchema.index({

    doctorId: 1,

    appointmentDate: -1,

});


// ============================================================
// Appointment Model
// ============================================================

const Appointment = mongoose.model(

    "Appointment",

    appointmentSchema

);


export default Appointment;
