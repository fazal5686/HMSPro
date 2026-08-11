
// ============================================================
// File: controllers/departmentController.js
// Purpose: HTTP controllers for Department module.
// ============================================================

import {
    createDepartmentService,
    getDepartmentByIdService,
    getAllDepartmentsService,
    updateDepartmentService,
    deleteDepartmentService,
} from "../services/departmentService.js";

// ============================================================
// Create Department
// POST /api/departments
// ============================================================

export const createDepartment = async (req, res, next) => {

    try {

        const department =
            await createDepartmentService(
                req.body
            );

        res.status(201).json({

            success: true,

            message:
                "Department created successfully.",

            data: department,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Get Department By ID
// GET /api/departments/:id
// ============================================================

export const getDepartmentById = async (req, res, next) => {

    try {

        const department =
            await getDepartmentByIdService(
                req.params.id
            );

        res.status(200).json({

            success: true,

            data: department,

        });

    } catch (error) {

        // Department does not exist
        if (error.message === "Department not found.") {

            return res.status(404).json({

                success: false,

                message: "Department not found.",

            });

        }

        next(error);

    }

};

// ============================================================
// Get All Departments
// GET /api/departments
// ============================================================

export const getAllDepartments = async (req, res, next) => {

    try {

        const departments =
            await getAllDepartmentsService();

        res.status(200).json({

            success: true,

            count: departments.length,

            data: departments,

        });

    } catch (error) {

        next(error);

    }

};

// ============================================================
// Update Department
// PUT /api/departments/:id
// ============================================================

export const updateDepartment = async (req, res, next) => {

    try {

        const department =
            await updateDepartmentService(
                req.params.id,
                req.body
            );

        res.status(200).json({

            success: true,

            message:
                "Department updated successfully.",

            data: department,

        });

    } catch (error) {

        // Department does not exist
        if (error.message === "Department not found.") {

            return res.status(404).json({

                success: false,

                message: "Department not found.",

            });

        }

        next(error);

    }

};

// ============================================================
// Delete Department
// DELETE /api/departments/:id
// ============================================================

export const deleteDepartment = async (req, res, next) => {

    try {

        await deleteDepartmentService(
            req.params.id
        );

        res.status(200).json({

            success: true,

            message:
                "Department deleted successfully.",

        });

    } catch (error) {

        // Department does not exist
        if (error.message === "Department not found.") {

            return res.status(404).json({

                success: false,

                message: "Department not found.",

            });

        }

        next(error);

    }

};
