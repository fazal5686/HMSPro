// ============================================================
// File: repositories/reportRepository.js
// Purpose: Database operations for HMSPro Reports module.
// This layer ONLY communicates with MongoDB.
// No business logic should be written here.
// ============================================================

import Appointment from "../models/Appointment.js";
import Admission from "../models/Admission.js";
import Billing from "../models/Billing.js";
import Medicine from "../models/Medicine.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";


// ============================================================
// Dashboard Report
// Returns overall HMSPro statistics.
// ============================================================

export const getDashboardReport = async () => {

    const [

        totalPatients,

        totalDoctors,

        activeDoctors,

        totalAppointments,

        totalAdmissions,

        activeAdmissions,

        totalMedicines,

        activeMedicines,

    ] = await Promise.all([

        Patient.countDocuments(),

        Doctor.countDocuments(),

        Doctor.countDocuments({
            isActive: true,
        }),

        Appointment.countDocuments(),

        Admission.countDocuments(),

        Admission.countDocuments({
            dischargeDate: null,
        }),

        Medicine.countDocuments(),

        Medicine.countDocuments({
            isActive: true,
        }),

    ]);


    return {

        totalPatients,

        totalDoctors,

        activeDoctors,

        totalAppointments,

        totalAdmissions,

        activeAdmissions,

        totalMedicines,

        activeMedicines,

    };

};


// ============================================================
// Appointment Report
// Returns appointment statistics by status.
// ============================================================

export const getAppointmentReport = async () => {

    const [

        totalAppointments,

        pendingAppointments,

        confirmedAppointments,

        completedAppointments,

        cancelledAppointments,

        noShowAppointments,

    ] = await Promise.all([

        Appointment.countDocuments(),

        Appointment.countDocuments({
            status: "Pending",
        }),

        Appointment.countDocuments({
            status: "Confirmed",
        }),

        Appointment.countDocuments({
            status: "Completed",
        }),

        Appointment.countDocuments({
            status: "Cancelled",
        }),

        Appointment.countDocuments({
            status: "No Show",
        }),

    ]);


    return {

        totalAppointments,

        pendingAppointments,

        confirmedAppointments,

        completedAppointments,

        cancelledAppointments,

        noShowAppointments,

    };

};


// ============================================================
// Admission Report
// Returns admission statistics.
// ============================================================

export const getAdmissionReport = async () => {

    const [

        totalAdmissions,

        activeAdmissions,

        dischargedAdmissions,

    ] = await Promise.all([

        Admission.countDocuments(),

        Admission.countDocuments({
            dischargeDate: null,
        }),

        Admission.countDocuments({
            dischargeDate: {
                $ne: null,
            },
        }),

    ]);


    return {

        totalAdmissions,

        activeAdmissions,

        dischargedAdmissions,

    };

};


// ============================================================
// Billing Report
// Returns billing statistics.
// ============================================================

export const getBillingReport = async () => {

    const totalBills =
        await Billing.countDocuments();


    // --------------------------------------------------------
    // Calculate total billing amount.
    //
    // The aggregation supports the common amount field names
    // used in HMSPro billing records.
    // --------------------------------------------------------

    const amountResult =
        await Billing.aggregate([

            {
                $group: {

                    _id: null,

                    totalAmount: {

                        $sum: {

                            $ifNull: [

                                "$totalAmount",

                                {
                                    $ifNull: [
                                        "$grandTotal",
                                        {
                                            $ifNull: [
                                                "$amount",
                                                0,
                                            ],
                                        },
                                    ],
                                },

                            ],

                        },

                    },

                },

            },

        ]);


    const totalAmount =
        amountResult.length > 0
            ? amountResult[0].totalAmount
            : 0;


    return {

        totalBills,

        totalAmount,

    };

};


// ============================================================
// Medicine Inventory Report
// Returns medicine stock statistics.
// ============================================================

export const getMedicineInventoryReport = async () => {

    const [

        totalMedicines,

        activeMedicines,

        inactiveMedicines,

        lowStockMedicines,

        outOfStockMedicines,

    ] = await Promise.all([

        Medicine.countDocuments(),

        Medicine.countDocuments({
            isActive: true,
        }),

        Medicine.countDocuments({
            isActive: false,
        }),

        Medicine.countDocuments({

            $expr: {

                $and: [

                    {
                        $lte: [
                            "$quantity",
                            "$reorderLevel",
                        ],
                    },

                    {
                        $gt: [
                            "$quantity",
                            0,
                        ],
                    },

                ],

            },

        }),

        Medicine.countDocuments({
            quantity: 0,
        }),

    ]);


    // --------------------------------------------------------
    // Calculate total inventory value.
    // quantity × unitPrice
    // --------------------------------------------------------

    const inventoryValueResult =
        await Medicine.aggregate([

            {

                $group: {

                    _id: null,

                    totalInventoryValue: {

                        $sum: {

                            $multiply: [

                                {
                                    $ifNull: [
                                        "$quantity",
                                        0,
                                    ],
                                },

                                {
                                    $ifNull: [
                                        "$unitPrice",
                                        0,
                                    ],
                                },

                            ],

                        },

                    },

                },

            },

        ]);


    const totalInventoryValue =
        inventoryValueResult.length > 0
            ? inventoryValueResult[0]
                .totalInventoryValue
            : 0;


    return {

        totalMedicines,

        activeMedicines,

        inactiveMedicines,

        lowStockMedicines,

        outOfStockMedicines,

        totalInventoryValue,

    };

};