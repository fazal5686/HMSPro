// ============================================================
// File: repositories/departmentRepository.js
// Purpose: Database operations for Department module.
// ============================================================

import Department from "../models/Department.js";

// ============================================================
// Create Department
// ============================================================

export const createDepartment = async (departmentData) => {

    return await Department.create(
        departmentData
    );

};

// ============================================================
// Find Department By ID
// ============================================================

export const findDepartmentById = async (id) => {

    return await Department.findById(id)
        .populate(
            "headDoctor",
            "userId specialization qualification experience licenseNumber"
        );

};

// ============================================================
// Find Department By Name
// ============================================================

export const findDepartmentByName = async (name) => {

    return await Department.findOne({
        name: {
            $regex: `^${name}$`,
            $options: "i",
        },
    });

};

// ============================================================
// Get All Departments
// ============================================================

export const findAllDepartments = async () => {

    return await Department.find()
        .populate(
            "headDoctor",
            "userId specialization qualification experience licenseNumber"
        )
        .sort({
            name: 1,
        });

};

// ============================================================
// Update Department
// ============================================================

export const updateDepartment = async (
    id,
    departmentData
) => {

    return await Department.findByIdAndUpdate(

        id,

        departmentData,

        {
            new: true,
            runValidators: true,
        }

    ).populate(
        "headDoctor",
        "userId specialization qualification experience licenseNumber"
    );

};

// ============================================================
// Delete Department
// ============================================================

export const deleteDepartment = async (id) => {

    return await Department.findByIdAndDelete(
        id
    );

};