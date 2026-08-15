// ============================================================
// File: controllers/userController.js
// Purpose: HTTP controllers for HMSPro Admin User Management.
//
// Flow:
// Route
//   ↓
// Controller
//   ↓
// Service
//   ↓
// Repository
//   ↓
// MongoDB
//
// IMPORTANT:
// Authentication remains handled by authController.js.
// This controller is for administrative user management.
// ============================================================

import {
    createUserService,
    getAllUsersService,
    getUsersService,
    getUsersByRoleService,
    getUserByIdService,
    updateUserService,
    updateUserStatusService,
    updateUserPasswordService,
    deleteUserService,
} from "../services/userService.js";


// ============================================================
// Helper: Send Standard Error Response
// ============================================================

const handleControllerError = (
    res,
    error,
    defaultMessage
) => {

    console.error(
        defaultMessage,
        error
    );


    const statusCode =
        error.message === "User not found."
            ? 404
            : error.message === "Email already exists."
                ? 409
                : 400;


    return res.status(statusCode).json({

        success: false,

        message:
            error.message ||
            defaultMessage,

    });

};


// ============================================================
// Create User
// ============================================================

export const createUser = async (
    req,
    res
) => {

    try {

        const user =
            await createUserService(
                req.body
            );


        return res.status(201).json({

            success: true,

            message:
                "User created successfully.",

            data: user,

        });

    } catch (error) {

        return handleControllerError(

            res,

            error,

            "Failed to create user."

        );

    }

};


// ============================================================
// Get All Users
// ============================================================

export const getAllUsers = async (
    req,
    res
) => {

    try {

        const users =
            await getAllUsersService();


        return res.status(200).json({

            success: true,

            message:
                "Users retrieved successfully.",

            data: users,

        });

    } catch (error) {

        return handleControllerError(

            res,

            error,

            "Failed to retrieve users."

        );

    }

};


// ============================================================
// Search / Filter Users
// ============================================================
//
// Query examples:
//
// /api/users?search=Ahmad
// /api/users?role=Doctor
// /api/users?isActive=true
// /api/users?search=Ahmad&role=Doctor
//
// ============================================================

export const getUsers = async (
    req,
    res
) => {

    try {

        const {
            search = "",
            role = "",
            isActive = "",
        } = req.query;


        const users =
            await getUsersService({

                search,

                role,

                isActive,

            });


        return res.status(200).json({

            success: true,

            message:
                "Users retrieved successfully.",

            data: users,

        });

    } catch (error) {

        return handleControllerError(

            res,

            error,

            "Failed to retrieve users."

        );

    }

};


// ============================================================
// Get Users By Role
// ============================================================

export const getUsersByRole = async (
    req,
    res
) => {

    try {

        const {
            role,
        } = req.params;


        const users =
            await getUsersByRoleService(
                role
            );


        return res.status(200).json({

            success: true,

            message:
                "Users retrieved successfully.",

            data: users,

        });

    } catch (error) {

        return handleControllerError(

            res,

            error,

            "Failed to retrieve users by role."

        );

    }

};


// ============================================================
// Get User By ID
// ============================================================

export const getUserById = async (
    req,
    res
) => {

    try {

        const {
            id,
        } = req.params;


        const user =
            await getUserByIdService(
                id
            );


        return res.status(200).json({

            success: true,

            message:
                "User retrieved successfully.",

            data: user,

        });

    } catch (error) {

        return handleControllerError(

            res,

            error,

            "Failed to retrieve user."

        );

    }

};


// ============================================================
// Update User
// ============================================================

export const updateUser = async (
    req,
    res
) => {

    try {

        const {
            id,
        } = req.params;


        const user =
            await updateUserService(

                id,

                req.body

            );


        return res.status(200).json({

            success: true,

            message:
                "User updated successfully.",

            data: user,

        });

    } catch (error) {

        return handleControllerError(

            res,

            error,

            "Failed to update user."

        );

    }

};


// ============================================================
// Update User Status
// ============================================================

export const updateUserStatus = async (
    req,
    res
) => {

    try {

        const {
            id,
        } = req.params;


        const {
            isActive,
        } = req.body;


        const user =
            await updateUserStatusService(

                id,

                isActive

            );


        return res.status(200).json({

            success: true,

            message:
                isActive
                    ? "User activated successfully."
                    : "User deactivated successfully.",

            data: user,

        });

    } catch (error) {

        return handleControllerError(

            res,

            error,

            "Failed to update user status."

        );

    }

};


// ============================================================
// Update User Password
// ============================================================

export const updateUserPassword = async (
    req,
    res
) => {

    try {

        const {
            id,
        } = req.params;


        const {
            newPassword,
        } = req.body;


        const user =
            await updateUserPasswordService(

                id,

                newPassword

            );


        return res.status(200).json({

            success: true,

            message:
                "User password updated successfully.",

            data: user,

        });

    } catch (error) {

        return handleControllerError(

            res,

            error,

            "Failed to update user password."

        );

    }

};


// ============================================================
// Delete User
// ============================================================

export const deleteUser = async (
    req,
    res
) => {

    try {

        const {
            id,
        } = req.params;


        const deletedUser =
            await deleteUserService(
                id
            );


        return res.status(200).json({

            success: true,

            message:
                "User deleted successfully.",

            data:
                deletedUser,

        });

    } catch (error) {

        return handleControllerError(

            res,

            error,

            "Failed to delete user."

        );

    }

};
