// ============================================================
// File: services/authService.js
// Purpose: Handles all authentication API communication.
// ============================================================

import API from "../api/axios.js";

import API_ROUTES from "../api/apiRoutes.js";

import {
    setToken,
    removeToken,
} from "../utils/storage.js";


// ============================================================
// Login User
// ============================================================

export const loginUser = async (credentials) => {

    // Always remove any previous session before a new login.
    removeToken();

    const cleanCredentials = {
        email: credentials.email?.trim().toLowerCase(),
        password: credentials.password,
    };

    const response = await API.post(
        API_ROUTES.AUTH.LOGIN,
        cleanCredentials
    );

    const responseData = response.data?.data;

    if (!responseData?.token || !responseData?.user) {

        throw new Error(
            "Invalid login response from server."
        );

    }

    const {
        token,
        user,
    } = responseData;

    // Save the NEW user's token.
    setToken(token);

    return user;
};


// ============================================================
// Register User
// ============================================================

export const registerUser = async (userData) => {

    const response = await API.post(
        API_ROUTES.AUTH.REGISTER,
        userData
    );

    const responseData = response.data?.data;

    if (!responseData?.token || !responseData?.user) {

        throw new Error(
            "Invalid registration response from server."
        );

    }

    const {
        token,
        user,
    } = responseData;

    setToken(token);

    return user;
};


// ============================================================
// Logout User
// ============================================================

export const logoutUser = () => {

    removeToken();

};


// ============================================================
// Get Current User
// ============================================================

export const getCurrentUser = async () => {

    const token = localStorage.getItem(
        "hmspro_token"
    );

    if (!token) {

        throw new Error(
            "No authentication token."
        );

    }

    const response = await API.get(
        API_ROUTES.AUTH.ME
    );

    return response.data?.data;
};