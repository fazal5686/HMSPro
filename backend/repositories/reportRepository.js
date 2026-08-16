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
// Returns appointment statistics by status and
// weekly appointment chart data.
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


    // ========================================================
    // Weekly Appointment Chart
    //
    // Current week:
    // Monday 00:00 -> next Monday 00:00
    //
    // Timezone:
    // Asia/Karachi
    //
    // Scheduled:
    // Pending + Confirmed
    //
    // Completed:
    // Completed
    // ========================================================

    const weeklyAppointments =
        await Appointment.aggregate([

            // ------------------------------------------------
            // Calculate the beginning of the current week.
            //
            // Monday is the first day of the week.
            // Asia/Karachi controls the local date boundary.
            // ------------------------------------------------

            {
                $set: {

                    weekStart: {

                        $dateTrunc: {

                            date: "$$NOW",

                            unit: "week",

                            binSize: 1,

                            timezone: "Asia/Karachi",

                            startOfWeek: "monday",

                        },

                    },

                },

            },


            // ------------------------------------------------
            // Keep appointments inside the current week.
            //
            // Start:
            // Monday 00:00
            //
            // End:
            // Next Monday 00:00
            // ------------------------------------------------

            {
                $match: {

                    $expr: {

                        $and: [

                            {
                                $gte: [
                                    "$appointmentDate",
                                    "$weekStart",
                                ],
                            },

                            {
                                $lt: [

                                    "$appointmentDate",

                                    {
                                        $dateAdd: {

                                            startDate:
                                                "$weekStart",

                                            unit: "week",

                                            amount: 1,

                                        },

                                    },

                                ],
                            },

                        ],

                    },

                },

            },


            // ------------------------------------------------
            // Group appointments by ISO weekday.
            //
            // 1 = Monday
            // 2 = Tuesday
            // 3 = Wednesday
            // 4 = Thursday
            // 5 = Friday
            // 6 = Saturday
            // 7 = Sunday
            // ------------------------------------------------

            {
                $group: {

                    _id: {

                        $isoDayOfWeek: {

                            date: "$appointmentDate",

                            timezone: "Asia/Karachi",

                        },

                    },


                    // ----------------------------------------
                    // Scheduled = Pending + Confirmed
                    // ----------------------------------------

                    scheduled: {

                        $sum: {

                            $cond: [

                                {
                                    $in: [

                                        "$status",

                                        [
                                            "Pending",
                                            "Confirmed",
                                        ],

                                    ],

                                },

                                1,

                                0,

                            ],

                        },

                    },


                    // ----------------------------------------
                    // Completed = Completed
                    // ----------------------------------------

                    completed: {

                        $sum: {

                            $cond: [

                                {
                                    $eq: [
                                        "$status",
                                        "Completed",
                                    ],
                                },

                                1,

                                0,

                            ],

                        },

                    },

                },

            },


            // ------------------------------------------------
            // Sort Monday -> Sunday.
            // ------------------------------------------------

            {
                $sort: {
                    _id: 1,
                },
            },

        ]);


    // ========================================================
    // Dashboard day labels.
    //
    // MongoDB ISO weekday:
    // 1 = Monday
    // 2 = Tuesday
    // 3 = Wednesday
    // 4 = Thursday
    // 5 = Friday
    // 6 = Saturday
    // 7 = Sunday
    // ========================================================

    const dayNames = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
    ];


    // ========================================================
    // Always return all seven days.
    //
    // Days without appointments receive:
    //
    // scheduled = 0
    // completed = 0
    // ========================================================

    const weeklyAppointmentData =
        dayNames.map((day, index) => {

            const dayNumber = index + 1;


            const dayData =
                weeklyAppointments.find(
                    (item) =>
                        Number(item._id) === dayNumber
                );


            return {

                day,

                scheduled:
                    dayData?.scheduled ?? 0,

                completed:
                    dayData?.completed ?? 0,

            };

        });


    // ========================================================
    // Return Appointment Report
    // ========================================================

    return {

        totalAppointments,

        pendingAppointments,

        confirmedAppointments,

        completedAppointments,

        cancelledAppointments,

        noShowAppointments,

        weeklyAppointmentData,

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
    // Supports:
    // totalAmount
    // grandTotal
    // amount
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


    // ========================================================
    // Calculate total inventory value.
    //
    // Formula:
    //
    // quantity × unitPrice
    // ========================================================

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