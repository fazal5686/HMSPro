// ============================================================
// File: repositories/userRepository.js
// Purpose: Database operations for HMSPro User Management.
//
// This repository is used by the Admin User Management module.
//
// IMPORTANT:
// Authentication currently uses authRepository.js.
// Do NOT remove or modify authRepository.js for this module.
// ============================================================

import User from "../models/User.js";


// ============================================================
// Create User
// ============================================================

export const createUser = async (userData) => {

    return await User.create(userData);

};


// ============================================================
// Find User By Email
// ============================================================

export const findUserByEmail = async (email) => {

    return await User.findOne({
        email: email.toLowerCase().trim(),
    });

};


// ============================================================
// Find User By ID
// ============================================================

export const findUserById = async (id) => {

    return await User.findById(id);

};


// ============================================================
// Find All Users
//
// Password is explicitly excluded from the result.
// ============================================================

export const findAllUsers = async () => {

    return await User.find({})
        .select("-password")
        .sort({
            createdAt: -1,
        });

};


// ============================================================
// Find Users With Filters
//
// Supported filters:
//      search
//      role
//      isActive
// ============================================================

export const findUsers = async ({
    search = "",
    role = "",
    isActive = "",
} = {}) => {

    const query = {};


    // --------------------------------------------------------
    // Search by name, email, or phone
    // --------------------------------------------------------

    if (search.trim()) {

        const searchRegex = new RegExp(
            search.trim(),
            "i"
        );

        query.$or = [

            {
                fullName: searchRegex,
            },

            {
                email: searchRegex,
            },

            {
                phone: searchRegex,
            },

        ];

    }


    // --------------------------------------------------------
    // Filter by role
    // --------------------------------------------------------

    if (role.trim()) {

        query.role = role.trim();

    }


    // --------------------------------------------------------
    // Filter by account status
    // --------------------------------------------------------

    if (isActive !== "") {

        query.isActive =
            isActive === true ||
            isActive === "true";

    }


    return await User.find(query)
        .select("-password")
        .sort({
            createdAt: -1,
        });

};


// ============================================================
// Find Users By Role
// ============================================================

export const findUsersByRole = async (role) => {

    return await User.find({
        role,
    })
        .select("-password")
        .sort({
            createdAt: -1,
        });

};


// ============================================================
// Update User
// ============================================================
//
// Password should NOT normally be updated through this method.
// Password management will be handled separately.
// ============================================================

export const updateUser = async (
    userId,
    updateData
) => {

    return await User.findByIdAndUpdate(

        userId,

        updateData,

        {
            new: true,
            runValidators: true,
        }

    ).select("-password");

};


// ============================================================
// Update Account Status
// ============================================================

export const updateUserStatus = async (
    userId,
    isActive
) => {

    return await User.findByIdAndUpdate(

        userId,

        {
            isActive,
        },

        {
            new: true,
            runValidators: true,
        }

    ).select("-password");

};


// ============================================================
// Update User Password
// ============================================================
//
// This method expects an already hashed password.
// Hashing belongs in the service layer.
// ============================================================

export const updateUserPassword = async (
    userId,
    hashedPassword
) => {

    return await User.findByIdAndUpdate(

        userId,

        {
            password: hashedPassword,
        },

        {
            new: true,
            runValidators: true,
        }

    ).select("-password");

};


// ============================================================
// Delete User
// ============================================================

export const deleteUser = async (userId) => {

    return await User.findByIdAndDelete(
        userId
    );

};


// ============================================================
// Update Last Login
// ============================================================
//
// Kept here for compatibility with any existing code that
// may use userRepository directly.
// ============================================================

export const updateLastLogin = async (userId) => {

    return await User.findByIdAndUpdate(

        userId,

        {
            lastLogin: new Date(),
        },

        {
            new: true,
        }

    );

};