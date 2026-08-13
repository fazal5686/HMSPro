// ============================================================
// File: services/billingService.js
// Purpose: Business logic for Billing module.
// ============================================================

import {
    createBilling,
    findBillingById,
    findBillingByInvoiceNumber,
    findAllBillings,
    findBillingsByPatient,
    findBillingsByAdmission,
    updateBilling,
    deleteBilling,
} from "../repositories/billingRepository.js";

// ============================================================
// Calculate Billing Amounts
// ============================================================

const calculateBillingAmounts = (billingData) => {

    const consultationCharges =
        Number(billingData.consultationCharges || 0);

    const roomCharges =
        Number(billingData.roomCharges || 0);

    const medicineCharges =
        Number(billingData.medicineCharges || 0);

    const labCharges =
        Number(billingData.labCharges || 0);

    const otherCharges =
        Number(billingData.otherCharges || 0);

    const discount =
        Number(billingData.discount || 0);

    const tax =
        Number(billingData.tax || 0);

    const amountPaid =
        Number(billingData.amountPaid || 0);

    // --------------------------------------------------------
    // Calculate subtotal
    // --------------------------------------------------------

    const subtotal =
        consultationCharges +
        roomCharges +
        medicineCharges +
        labCharges +
        otherCharges;

    // --------------------------------------------------------
    // Calculate total
    // --------------------------------------------------------

    const totalAmount =
        Math.max(
            0,
            subtotal - discount + tax
        );

    // --------------------------------------------------------
    // Prevent overpayment
    // --------------------------------------------------------

    if (amountPaid > totalAmount) {

        throw new Error(
            "Amount paid cannot exceed total amount."
        );

    }

    // --------------------------------------------------------
    // Calculate balance
    // --------------------------------------------------------

    const balance =
        totalAmount - amountPaid;

    // --------------------------------------------------------
    // Calculate payment status
    // --------------------------------------------------------

    let paymentStatus = "Pending";

    if (
        amountPaid === totalAmount &&
        totalAmount > 0
    ) {

        paymentStatus = "Paid";

    } else if (
        amountPaid > 0 &&
        amountPaid < totalAmount
    ) {

        paymentStatus = "Partial";

    }

    return {

        consultationCharges,
        roomCharges,
        medicineCharges,
        labCharges,
        otherCharges,
        discount,
        tax,
        totalAmount,
        amountPaid,
        balance,
        paymentStatus,

    };

};

// ============================================================
// Create Billing
// ============================================================

export const createBillingService = async (
    billingData
) => {

    // --------------------------------------------------------
    // Check duplicate invoice number
    // --------------------------------------------------------

    const existingBilling =
        await findBillingByInvoiceNumber(
            billingData.invoiceNumber
        );

    if (existingBilling) {

        throw new Error(
            "Invoice number already exists."
        );

    }

    // --------------------------------------------------------
    // Calculate all billing amounts
    // --------------------------------------------------------

    const calculatedAmounts =
        calculateBillingAmounts(
            billingData
        );

    // --------------------------------------------------------
    // Calculated values override client values
    // --------------------------------------------------------

    const finalBillingData = {

        ...billingData,

        ...calculatedAmounts,

    };

    return await createBilling(
        finalBillingData
    );

};

// ============================================================
// Get Billing By ID
// ============================================================

export const getBillingByIdService = async (
    id
) => {

    const billing =
        await findBillingById(id);

    if (!billing) {

        throw new Error(
            "Billing record not found."
        );

    }

    return billing;

};

// ============================================================
// Get All Billings
// ============================================================

export const getAllBillingsService = async () => {

    return await findAllBillings();

};

// ============================================================
// Get Billings By Patient
// ============================================================

export const getBillingsByPatientService = async (
    patientId
) => {

    return await findBillingsByPatient(
        patientId
    );

};

// ============================================================
// Get Billings By Admission
// ============================================================

export const getBillingsByAdmissionService = async (
    admissionId
) => {

    return await findBillingsByAdmission(
        admissionId
    );

};

// ============================================================
// Update Billing
// ============================================================

export const updateBillingService = async (
    id,
    billingData
) => {

    const billing =
        await findBillingById(id);

    if (!billing) {

        throw new Error(
            "Billing record not found."
        );

    }

    // --------------------------------------------------------
    // Check duplicate invoice number when changed
    // --------------------------------------------------------

    if (
        billingData.invoiceNumber &&
        billingData.invoiceNumber !==
        billing.invoiceNumber
    ) {

        const existingBilling =
            await findBillingByInvoiceNumber(
                billingData.invoiceNumber
            );

        if (
            existingBilling &&
            existingBilling._id.toString() !==
            id.toString()
        ) {

            throw new Error(
                "Invoice number already exists."
            );

        }

    }

    // --------------------------------------------------------
    // Merge existing charges with update data
    // --------------------------------------------------------

    const mergedBillingData = {

        consultationCharges:
            billingData.consultationCharges !== undefined
                ? billingData.consultationCharges
                : billing.consultationCharges,

        roomCharges:
            billingData.roomCharges !== undefined
                ? billingData.roomCharges
                : billing.roomCharges,

        medicineCharges:
            billingData.medicineCharges !== undefined
                ? billingData.medicineCharges
                : billing.medicineCharges,

        labCharges:
            billingData.labCharges !== undefined
                ? billingData.labCharges
                : billing.labCharges,

        otherCharges:
            billingData.otherCharges !== undefined
                ? billingData.otherCharges
                : billing.otherCharges,

        discount:
            billingData.discount !== undefined
                ? billingData.discount
                : billing.discount,

        tax:
            billingData.tax !== undefined
                ? billingData.tax
                : billing.tax,

        amountPaid:
            billingData.amountPaid !== undefined
                ? billingData.amountPaid
                : billing.amountPaid,

    };

    // --------------------------------------------------------
    // Recalculate billing amounts
    // --------------------------------------------------------

    const calculatedAmounts =
        calculateBillingAmounts(
            mergedBillingData
        );

    const finalBillingData = {

        ...billingData,

        ...calculatedAmounts,

    };

    return await updateBilling(
        id,
        finalBillingData
    );

};

// ============================================================
// Delete Billing
// ============================================================

export const deleteBillingService = async (
    id
) => {

    const billing =
        await findBillingById(id);

    if (!billing) {

        throw new Error(
            "Billing record not found."
        );

    }

    return await deleteBilling(id);

};