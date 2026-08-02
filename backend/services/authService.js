// ============================================================
// File: services/authService.js
// Purpose: Contains all authentication business logic.
// This layer sits between the Controller and Repository.
// ============================================================

import {
    findUserByEmail,
    createUser,
    updateLastLogin,
} from "../repositories/authRepository.js";

import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import generateToken from "../utils/generateToken.js";

/**
 * ============================================================
 * Register a New User
 * ============================================================
 */
export const registerUserService = async (userData) => {

    // Check whether the email is already registered.
    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        throw new Error("Email already exists.");
    }

    // Hash the plain password.
    const hashedPassword = await hashPassword(userData.password);

    // Replace the plain password with the hashed password.
    userData.password = hashedPassword;

    // Save the user in the database.
    const newUser = await createUser(userData);

    // Generate JWT token.
    const token = generateToken(newUser);

    // Return user information and token.
    return {
        token,
        user: {
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            role: newUser.role,
            phone: newUser.phone,
            profileImage: newUser.profileImage,
            isActive: newUser.isActive,
        },
    };
};

/**
 * ============================================================
 * Login Existing User
 * ============================================================
 */
export const loginUserService = async (email, password) => {

    // Find user by email.
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    // Prevent login if account is inactive.
    if (!user.isActive) {
        throw new Error("Your account has been deactivated.");
    }

    // Compare entered password with hashed password.
    const passwordMatched = await comparePassword(
        password,
        user.password
    );

    if (!passwordMatched) {
        throw new Error("Invalid email or password.");
    }

    // Update last login timestamp.
    await updateLastLogin(user._id);

    // Generate JWT token.
    const token = generateToken(user);

    // Return authenticated user.
    return {
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            phone: user.phone,
            profileImage: user.profileImage,
            isActive: user.isActive,
        },
    };
};