// ============================================================
// File: constants/roles.js
// Purpose: Centralized user role definitions for HMSPro.
// Import this file whenever role names are needed.
// ============================================================

export const ROLES = {
    SUPER_ADMIN: "SuperAdmin",
    ADMIN: "Admin",
    DOCTOR: "Doctor",
    RECEPTIONIST: "Receptionist",
    NURSE: "Nurse",
    LAB_TECHNICIAN: "LabTechnician",
    PHARMACIST: "Pharmacist",
    ACCOUNTANT: "Accountant",
    PATIENT: "Patient",
};

// Export all roles as an array.
// Useful for Mongoose enums and validation.
export const ROLE_LIST = Object.values(ROLES);