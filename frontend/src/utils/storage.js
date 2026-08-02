// ============================================================
// File: utils/storage.js
// Purpose: Handles browser localStorage operations.
// ============================================================


// Save token

export const setToken = (token) => {

    localStorage.setItem(
        "hmspro_token",
        token
    );

};



// Get token

export const getToken = () => {

    return localStorage.getItem(
        "hmspro_token"
    );

};



// Remove token

export const removeToken = () => {

    localStorage.removeItem(
        "hmspro_token"
    );

};