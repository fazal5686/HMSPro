// ============================================================
// File: D:\HMSPro\frontend\src\services\userService.js
// Purpose: Handles all HMSPro User Management API communication.
//
// Flow:
// Users.jsx
//     ↓
// userService.js
//     ↓
// apiRoutes.js
//     ↓
// axios.js
//     ↓
// /api/users
//     ↓
// HMSPro Backend
// ============================================================

import API from "../api/axios.js";

import API_ROUTES from "../api/apiRoutes.js";


// ============================================================
// Create User
// POST /api/users
// ============================================================

export const createUser = async (userData) => {

    const response = await API.post(

        API_ROUTES.USERS.BASE,

        userData

    );

    return response.data.data;

};


// ============================================================
// Get All Users
// GET /api/users/all
// ============================================================

export const getAllUsers = async () => {

    const response = await API.get(

        API_ROUTES.USERS.ALL

    );

    return response.data.data;

};


// ============================================================
// Get Users
//
// Supports:
// search
// role
// isActive
//
// GET /api/users
// ============================================================

export const getUsers = async ({
    search = "",
    role = "",
    isActive = "",
} = {}) => {

    const response = await API.get(

        API_ROUTES.USERS.BASE,

        {
            params: {
                search,
                role,
                isActive,
            },
        }

    );

    return response.data.data;

};


// ============================================================
// Get Users By Role
// GET /api/users/role/:role
// ============================================================

export const getUsersByRole = async (role) => {

    const response = await API.get(

        API_ROUTES.USERS.BY_ROLE(role)

    );

    return response.data.data;

};


// ============================================================
// Get User By ID
// GET /api/users/:id
// ============================================================

export const getUserById = async (id) => {

    const response = await API.get(

        API_ROUTES.USERS.BY_ID(id)

    );

    return response.data.data;

};


// ============================================================
// Update User
// PUT /api/users/:id
// ============================================================

export const updateUser = async (
    id,
    userData
) => {

    const response = await API.put(

        API_ROUTES.USERS.BY_ID(id),

        userData

    );

    return response.data.data;

};


// ============================================================
// Update User Status
//
// Body:
// {
//     isActive: true
// }
//
// PATCH /api/users/:id/status
// ============================================================

export const updateUserStatus = async (
    id,
    isActive
) => {

    const response = await API.patch(

        API_ROUTES.USERS.STATUS(id),

        {
            isActive,
        }

    );

    return response.data.data;

};


// ============================================================
// Update User Password
//
// Body:
// {
//     newPassword: "NewPassword123"
// }
//
// PATCH /api/users/:id/password
// ============================================================

export const updateUserPassword = async (
    id,
    newPassword
) => {

    const response = await API.patch(

        API_ROUTES.USERS.PASSWORD(id),

        {
            newPassword,
        }

    );

    return response.data.data;

};


// ============================================================
// Delete User
// DELETE /api/users/:id
// ============================================================

export const deleteUser = async (id) => {

    const response = await API.delete(

        API_ROUTES.USERS.BY_ID(id)

    );

    return response.data.data;

};