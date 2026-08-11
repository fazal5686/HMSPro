// ============================================================
// File: services/departmentService.js
// Purpose: Business logic for Department module.
// ============================================================

import {
    createDepartment,
    findDepartmentById,
    findDepartmentByName,
    findAllDepartments,
    updateDepartment,
    deleteDepartment,
} from "../repositories/departmentRepository.js";

// ============================================================
// Create Department
// ============================================================

export const createDepartmentService = async (
    departmentData
) => {

    const existingDepartment =
        await findDepartmentByName(
            departmentData.name
        );

    if (existingDepartment) {

        throw new Error(
            "Department already exists."
        );

    }

    return await createDepartment(
        departmentData
    );

};

// ============================================================
// Get Department By ID
// ============================================================

export const getDepartmentByIdService = async (
    id
) => {

    const department =
        await findDepartmentById(id);

    if (!department) {

        throw new Error(
            "Department not found."
        );

    }

    return department;

};

// ============================================================
// Get All Departments
// ============================================================

export const getAllDepartmentsService = async () => {

    return await findAllDepartments();

};

// ============================================================
// Update Department
// ============================================================

export const updateDepartmentService = async (
    id,
    departmentData
) => {

    const department =
        await findDepartmentById(id);

    if (!department) {

        throw new Error(
            "Department not found."
        );

    }

    // --------------------------------------------------------
    // Check duplicate name when name is being changed
    // --------------------------------------------------------

    if (
        departmentData.name &&
        departmentData.name.toLowerCase() !==
        department.name.toLowerCase()
    ) {

        const existingDepartment =
            await findDepartmentByName(
                departmentData.name
            );

        if (
            existingDepartment &&
            existingDepartment._id.toString() !==
            id.toString()
        ) {

            throw new Error(
                "Department already exists."
            );

        }

    }

    return await updateDepartment(
        id,
        departmentData
    );

};

// ============================================================
// Delete Department
// ============================================================

export const deleteDepartmentService = async (
    id
) => {

    const department =
        await findDepartmentById(id);

    if (!department) {

        throw new Error(
            "Department not found."
        );

    }

    return await deleteDepartment(id);

};