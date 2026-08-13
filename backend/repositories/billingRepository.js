// ============================================================
// File: repositories/billingRepository.js
// Purpose: Database operations for Billing module.
// This layer ONLY communicates with MongoDB.
// No business logic should be written here.
// ============================================================

import Billing from "../models/Billing.js";

// ============================================================
// Create Billing
// ============================================================

export const createBilling = async (billingData) => {

    return await Billing.create(
        billingData
    );

};

// ============================================================
// Find Billing By ID
// ============================================================

export const findBillingById = async (id) => {

    return await Billing.findById(
        id
    );

};

// ============================================================
// Find Billing By Invoice Number
// ============================================================

export const findBillingByInvoiceNumber = async (
    invoiceNumber
) => {

    return await Billing.findOne({

        invoiceNumber: invoiceNumber,

    });

};

// ============================================================
// Get All Billings
// ============================================================

export const findAllBillings = async () => {

    return await Billing.find()

        .sort({
            createdAt: -1,
        });

};

// ============================================================
// Find Billings By Patient
// ============================================================

export const findBillingsByPatient = async (
    patientId
) => {

    return await Billing.find({

        patientId: patientId,

    })

        .sort({
            createdAt: -1,
        });

};

// ============================================================
// Find Billings By Admission
// ============================================================

export const findBillingsByAdmission = async (
    admissionId
) => {

    return await Billing.find({

        admissionId: admissionId,

    })

        .sort({
            createdAt: -1,
        });

};

// ============================================================
// Update Billing
// ============================================================

export const updateBilling = async (
    id,
    billingData
) => {

    return await Billing.findByIdAndUpdate(

        id,

        billingData,

        {
            new: true,
            runValidators: true,
        }

    );

};

// ============================================================
// Delete Billing
// ============================================================

export const deleteBilling = async (id) => {

    return await Billing.findByIdAndDelete(
        id
    );

};