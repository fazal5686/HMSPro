// ============================================================
// File: services/authService.js
// Purpose: Handles all authentication API communication.
// This layer communicates with the backend auth APIs.
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

    const response = await API.post(
        API_ROUTES.AUTH.LOGIN,
        credentials
    );


    // Extract backend response data.

    const {
        token,
        user,
    } = response.data.data;



    // Save JWT token.

    setToken(token);



    // Return user information.

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


    const {
        token,
        user,
    } = response.data.data;



    // Save token after registration.

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


    const response = await API.get(

        API_ROUTES.AUTH.ME

    );


    return response.data.data;


};