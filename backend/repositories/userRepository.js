// ============================================================
// File: repositories/userRepository.js
// Purpose: Database operations for User collection.
// ============================================================

import User from "../models/User.js";


// Create new user
export const createUser = async (userData) => {

    return await User.create(userData);

};


// Find user by email
export const findUserByEmail = async (email) => {

    return await User.findOne({
        email
    });

};


// Find user by ID
export const findUserById = async (id) => {

    return await User.findById(id);

};


// Update last login time
export const updateLastLogin = async (userId) => {

    return await User.findByIdAndUpdate(

        userId,

        {
            lastLogin: new Date()
        },

        {
            new: true
        }

    );

};