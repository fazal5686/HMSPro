// ============================================================
// File: services/billingService.js
// Purpose: Frontend API service for Billing module.
// ============================================================

import API from "../api/axios.js";

import API_ROUTES from "../api/apiRoutes.js";


// ============================================================
// Create Billing Record
// ============================================================

export const createBilling = async (
    billingData
) => {

    const response =
        await API.post(

            API_ROUTES.BILLINGS.BASE,

            billingData

        );

    return response.data?.data;

};


// ============================================================
// Get All Billing Records
// ============================================================

export const getAllBillings = async () => {

    const response =
        await API.get(

            API_ROUTES.BILLINGS.ALL

        );

    return response.data?.data ?? [];

};


// ============================================================
// Get Billing By ID
// ============================================================

export const getBillingById = async (
    billingId
) => {

    const response =
        await API.get(

            API_ROUTES.BILLINGS.BY_ID(
                billingId
            )

        );

    return response.data?.data;

};


// ============================================================
// Get Billing Records By Patient
// ============================================================

export const getPatientBillings = async (
    patientId
) => {

    const response =
        await API.get(

            API_ROUTES.BILLINGS.BY_PATIENT(
                patientId
            )

        );

    return response.data?.data ?? [];

};


// ============================================================
// Update Billing Record
// ============================================================

export const updateBilling = async (
    billingId,
    billingData
) => {

    const response =
        await API.put(

            API_ROUTES.BILLINGS.BY_ID(
                billingId
            ),

            billingData

        );

    return response.data?.data;

};


// ============================================================
// Delete Billing Record
// ============================================================

export const deleteBilling = async (
    billingId
) => {

    const response =
        await API.delete(

            API_ROUTES.BILLINGS.BY_ID(
                billingId
            )

        );

    return response.data;

};


// ============================================================
// End of Billing Service
// ============================================================