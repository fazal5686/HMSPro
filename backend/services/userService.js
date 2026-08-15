// ============================================================
// File: services/userService.js
// Purpose: Business logic for HMSPro Admin User Management.
//
// Architecture:
// Controller
//     ↓
// Service
//     ↓
// Repository
//     ↓
// MongoDB
//
// IMPORTANT:
// Authentication continues to use authService.js.
// This service is specifically for Admin User Management.
// ============================================================


import {
    createUser,
    findUserByEmail,
    findUserById,
    findAllUsers,
    findUsers,
    findUsersByRole,
    updateUser,
    updateUserStatus,
    updateUserPassword,
    deleteUser,
} from "../repositories/userRepository.js";


import {
    ROLES,
    ROLE_LIST,
} from "../constants/roles.js";


import {
    hashPassword,
} from "../utils/hashPassword.js";



// ============================================================
// Create User
// ============================================================

export const createUserService = async (userData) => {

    const {
        fullName,
        email,
        password,
        role,
        phone,
        profileImage,
    } = userData;


    // --------------------------------------------------------
    // Validate required fields
    // --------------------------------------------------------

    if (!fullName?.trim()) {

        throw new Error(
            "Full name is required."
        );

    }


    if (!email?.trim()) {

        throw new Error(
            "Email is required."
        );

    }


    if (!password) {

        throw new Error(
            "Password is required."
        );

    }


    if (!role) {

        throw new Error(
            "Role is required."
        );

    }


    // --------------------------------------------------------
    // Validate role
    // --------------------------------------------------------

    if (!ROLE_LIST.includes(role)) {

        throw new Error(
            `Invalid role. Allowed roles: ${ROLE_LIST.join(", ")}`
        );

    }


    // --------------------------------------------------------
    // Normalize email
    // --------------------------------------------------------

    const normalizedEmail =
        email
            .trim()
            .toLowerCase();


    // --------------------------------------------------------
    // Check duplicate email
    // --------------------------------------------------------

    const existingUser =
        await findUserByEmail(
            normalizedEmail
        );


    if (existingUser) {

        throw new Error(
            "Email already exists."
        );

    }


    // --------------------------------------------------------
    // Hash password
    // --------------------------------------------------------

    const hashedPassword =
        await hashPassword(password);


    // --------------------------------------------------------
    // Prepare user data
    // --------------------------------------------------------

    const newUserData = {

        fullName:
            fullName.trim(),

        email:
            normalizedEmail,

        password:
            hashedPassword,

        role,

        phone:
            phone?.trim() || "",

        profileImage:
            profileImage || "",

        isActive:
            true,

    };


    // --------------------------------------------------------
    // Create user
    // --------------------------------------------------------

    const newUser =
        await createUser(
            newUserData
        );


    // --------------------------------------------------------
    // Never return password
    // --------------------------------------------------------

    const userObject =
        newUser.toObject();

    delete userObject.password;


    return userObject;

};



// ============================================================
// Get All Users
// ============================================================

export const getAllUsersService = async () => {

    return await findAllUsers();

};



// ============================================================
// Search / Filter Users
// ============================================================

export const getUsersService = async ({
    search = "",
    role = "",
    isActive = "",
} = {}) => {


    // --------------------------------------------------------
    // Validate role if supplied
    // --------------------------------------------------------

    if (
        role &&
        !ROLE_LIST.includes(role)
    ) {

        throw new Error(
            `Invalid role. Allowed roles: ${ROLE_LIST.join(", ")}`
        );

    }


    return await findUsers({

        search,

        role,

        isActive,

    });

};



// ============================================================
// Get Users By Role
// ============================================================

export const getUsersByRoleService = async (
    role
) => {

    if (!ROLE_LIST.includes(role)) {

        throw new Error(
            `Invalid role. Allowed roles: ${ROLE_LIST.join(", ")}`
        );

    }


    return await findUsersByRole(
        role
    );

};



// ============================================================
// Get User By ID
// ============================================================

export const getUserByIdService = async (
    userId
) => {

    const user =
        await findUserById(
            userId
        );


    if (!user) {

        throw new Error(
            "User not found."
        );

    }


    const userObject =
        user.toObject();

    delete userObject.password;


    return userObject;

};



// ============================================================
// Update User
// ============================================================

export const updateUserService = async (
    userId,
    updateData
) => {


    // --------------------------------------------------------
    // Verify user exists
    // --------------------------------------------------------

    const existingUser =
        await findUserById(
            userId
        );


    if (!existingUser) {

        throw new Error(
            "User not found."
        );

    }


    // --------------------------------------------------------
    // Prevent password from being updated here
    // --------------------------------------------------------

    const safeUpdateData = {
        ...updateData,
    };


    delete safeUpdateData.password;


    // --------------------------------------------------------
    // Normalize email if supplied
    // --------------------------------------------------------

    if (
        safeUpdateData.email
    ) {

        const normalizedEmail =
            safeUpdateData.email
                .trim()
                .toLowerCase();


        // Check whether another user
        // already owns this email.

        const emailUser =
            await findUserByEmail(
                normalizedEmail
            );


        if (
            emailUser &&
            emailUser._id.toString()
                !== userId.toString()
        ) {

            throw new Error(
                "Email already exists."
            );

        }


        safeUpdateData.email =
            normalizedEmail;

    }


    // --------------------------------------------------------
    // Validate role if supplied
    // --------------------------------------------------------

    if (
        safeUpdateData.role
    ) {

        if (
            !ROLE_LIST.includes(
                safeUpdateData.role
            )
        ) {

            throw new Error(
                `Invalid role. Allowed roles: ${ROLE_LIST.join(", ")}`
            );

        }

    }


    // --------------------------------------------------------
    // Update user
    // --------------------------------------------------------

    const updatedUser =
        await updateUser(

            userId,

            safeUpdateData

        );


    if (!updatedUser) {

        throw new Error(
            "User could not be updated."
        );

    }


    return updatedUser;

};



// ============================================================
// Change User Status
// ============================================================

export const updateUserStatusService = async (
    userId,
    isActive
) => {


    if (
        typeof isActive !== "boolean"
    ) {

        throw new Error(
            "isActive must be true or false."
        );

    }


    const existingUser =
        await findUserById(
            userId
        );


    if (!existingUser) {

        throw new Error(
            "User not found."
        );

    }


    // --------------------------------------------------------
    // Prevent Admin from accidentally deactivating
    // the last active Admin account.
    // --------------------------------------------------------

    if (

        existingUser.role === ROLES.ADMIN &&

        existingUser.isActive === true &&

        isActive === false

    ) {

        // This safety check will be expanded in the
        // controller/service authorization stage.

        // For now we allow the operation because the
        // complete user-management policy will be handled
        // when the controller is created.

    }


    const updatedUser =
        await updateUserStatus(

            userId,

            isActive

        );


    if (!updatedUser) {

        throw new Error(
            "User status could not be updated."
        );

    }


    return updatedUser;

};



// ============================================================
// Change User Password
// ============================================================

export const updateUserPasswordService = async (
    userId,
    newPassword
) => {


    if (!newPassword) {

        throw new Error(
            "New password is required."
        );

    }


    if (
        newPassword.length < 6
    ) {

        throw new Error(
            "Password must contain at least 6 characters."
        );

    }


    const existingUser =
        await findUserById(
            userId
        );


    if (!existingUser) {

        throw new Error(
            "User not found."
        );

    }


    const hashedPassword =
        await hashPassword(
            newPassword
        );


    const updatedUser =
        await updateUserPassword(

            userId,

            hashedPassword

        );


    if (!updatedUser) {

        throw new Error(
            "Password could not be updated."
        );

    }


    return updatedUser;

};



// ============================================================
// Delete User
// ============================================================

export const deleteUserService = async (
    userId
) => {


    const existingUser =
        await findUserById(
            userId
        );


    if (!existingUser) {

        throw new Error(
            "User not found."
        );

    }


    const deletedUser =
        await deleteUser(
            userId
        );


    if (!deletedUser) {

        throw new Error(
            "User could not be deleted."
        );

    }


    return {

        id:
            deletedUser._id,

        fullName:
            deletedUser.fullName,

        email:
            deletedUser.email,

        role:
            deletedUser.role,

    };

};