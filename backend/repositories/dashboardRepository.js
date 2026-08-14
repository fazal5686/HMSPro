// ============================================================
// File: repositories/dashboardRepository.js
// Purpose: Database queries for HMSPro Dashboard statistics.
// ============================================================

import User from "../models/User.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";
import Admission from "../models/Admission.js";
import Room from "../models/Room.js";
import Medicine from "../models/Medicine.js";
import Billing from "../models/Billing.js";

// ============================================================
// Get Dashboard Statistics
// ============================================================

export const getDashboardStatistics = async () => {

    // --------------------------------------------------------
    // Execute independent database queries in parallel
    // --------------------------------------------------------

    const [
        totalUsers,
        activeUsers,
        totalPatients,
        totalDoctors,
        activeDoctors,
        totalAppointments,
        totalAdmissions,
        activeAdmissions,
        totalRooms,
        availableRooms,
        occupiedRooms,
        totalMedicines,
        activeMedicines,
        totalBillings,
    ] = await Promise.all([

        // Users
        User.countDocuments(),

        User.countDocuments({
            isActive: true,
        }),

        // Patients
        Patient.countDocuments(),

        // Doctors
        Doctor.countDocuments(),

        Doctor.countDocuments({
            isActive: true,
        }),

        // Appointments
        Appointment.countDocuments(),

        // Admissions
        Admission.countDocuments(),

        Admission.countDocuments({
            dischargeDate: null,
        }),

        // Rooms
        Room.countDocuments(),

        Room.countDocuments({
            status: "Available",
        }),

        Room.countDocuments({
            status: "Occupied",
        }),

        // Medicines
        Medicine.countDocuments(),

        Medicine.countDocuments({
            isActive: true,
        }),

        // Billing
        Billing.countDocuments(),
    ]);

    // --------------------------------------------------------
    // Return Dashboard Statistics
    // --------------------------------------------------------

    return {

        users: {
            total: totalUsers,
            active: activeUsers,
        },

        patients: {
            total: totalPatients,
        },

        doctors: {
            total: totalDoctors,
            active: activeDoctors,
        },

        appointments: {
            total: totalAppointments,
        },

        admissions: {
            total: totalAdmissions,
            active: activeAdmissions,
        },

        rooms: {
            total: totalRooms,
            available: availableRooms,
            occupied: occupiedRooms,
        },

        medicines: {
            total: totalMedicines,
            active: activeMedicines,
        },

        billings: {
            total: totalBillings,
        },

    };
};