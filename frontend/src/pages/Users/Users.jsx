// ============================================================
// File:
// D:\HMSPro\frontend\src\pages\Users\Users.jsx
//
// Purpose:
// HMSPro User Management page.
//
// Access:
// Admin / SuperAdmin
//
// Responsibilities:
// 1. Display system users.
// 2. Search users.
// 3. Filter users by role.
// 4. Filter users by status.
// 5. Provide Add User action.
// 6. Provide Edit/Delete action placeholders.
// ============================================================

import {
    useMemo,
    useState,
} from "react";

import {
    Plus,
    Search,
    ShieldCheck,
    UserRound,
    UserCog,
    Pencil,
    Trash2,
} from "lucide-react";

import "./Users.css";



// ============================================================
// Initial Development Data
//
// This is temporary frontend data.
// It will later be replaced by the backend Users API.
// ============================================================

const initialUsers = [

    {
        id: 1,
        fullName: "HMS Admin",
        email: "admin@hmspro.com",
        role: "Admin",
        status: "Active",
    },

    {
        id: 2,
        fullName: "Dr. Ahmad Khan",
        email: "doctor.ahmad@hmspro.com",
        role: "Doctor",
        status: "Active",
    },

    {
        id: 3,
        fullName: "Dr. Malak Amanullah Khan",
        email: "doctor.malak@hmspro.com",
        role: "Doctor",
        status: "Active",
    },

    {
        id: 4,
        fullName: "Appointment Test Patient",
        email: "appointment.patient@hmspro.com",
        role: "Patient",
        status: "Active",
    },

];



// ============================================================
// Users Component
// ============================================================

const Users = () => {


    const [users, setUsers] =
        useState(initialUsers);


    const [searchTerm, setSearchTerm] =
        useState("");


    const [roleFilter, setRoleFilter] =
        useState("All");


    const [statusFilter, setStatusFilter] =
        useState("All");



    // ========================================================
    // Filter Users
    // ========================================================

    const filteredUsers = useMemo(() => {

        return users.filter((user) => {

            const search =
                searchTerm
                    .trim()
                    .toLowerCase();


            const matchesSearch =
                !search ||
                user.fullName
                    .toLowerCase()
                    .includes(search) ||
                user.email
                    .toLowerCase()
                    .includes(search);


            const matchesRole =
                roleFilter === "All" ||
                user.role === roleFilter;


            const matchesStatus =
                statusFilter === "All" ||
                user.status === statusFilter;


            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus
            );

        });

    }, [
        users,
        searchTerm,
        roleFilter,
        statusFilter,
    ]);



    // ========================================================
    // Add User
    //
    // API integration will be added later.
    // ========================================================

    const handleAddUser = () => {

        console.log(
            "Add User clicked."
        );

    };



    // ========================================================
    // Edit User
    // ========================================================

    const handleEditUser = (user) => {

        console.log(
            "Edit User:",
            user
        );

    };



    // ========================================================
    // Delete User
    // ========================================================

    const handleDeleteUser = (user) => {

        const confirmed =
            window.confirm(
                `Delete user "${user.fullName}"?`
            );


        if (!confirmed) {
            return;
        }


        setUsers((currentUsers) =>
            currentUsers.filter(
                (item) =>
                    item.id !== user.id
            )
        );

    };



    // ========================================================
    // JSX
    // ========================================================

    return (

        <div className="users-page">


            {/* ==================================================
                Page Header
                ================================================== */}

            <div className="users-page-header">


                <div>

                    <div className="users-title-row">

                        <div className="users-title-icon">

                            <UserCog
                                size={25}
                            />

                        </div>


                        <div>

                            <h1>
                                User Management
                            </h1>

                            <p>
                                Manage HMSPro system users,
                                roles, and account access.
                            </p>

                        </div>

                    </div>

                </div>



                <button
                    type="button"
                    className="users-add-button"
                    onClick={handleAddUser}
                >

                    <Plus
                        size={18}
                    />

                    <span>
                        Add User
                    </span>

                </button>


            </div>



            {/* ==================================================
                Summary Cards
                ================================================== */}

            <div className="users-summary-grid">


                <div className="users-summary-card">

                    <div className="users-summary-icon">

                        <UserRound
                            size={21}
                        />

                    </div>


                    <div>

                        <span>
                            Total Users
                        </span>

                        <strong>
                            {users.length}
                        </strong>

                    </div>

                </div>



                <div className="users-summary-card">

                    <div className="users-summary-icon">

                        <ShieldCheck
                            size={21}
                        />

                    </div>


                    <div>

                        <span>
                            Active Users
                        </span>

                        <strong>
                            {
                                users.filter(
                                    (user) =>
                                        user.status ===
                                        "Active"
                                ).length
                            }
                        </strong>

                    </div>

                </div>



                <div className="users-summary-card">

                    <div className="users-summary-icon">

                        <UserCog
                            size={21}
                        />

                    </div>


                    <div>

                        <span>
                            Administrators
                        </span>

                        <strong>
                            {
                                users.filter(
                                    (user) =>
                                        user.role ===
                                            "Admin" ||
                                        user.role ===
                                            "SuperAdmin"
                                ).length
                            }
                        </strong>

                    </div>

                </div>


            </div>



            {/* ==================================================
                Filters
                ================================================== */}

            <div className="users-toolbar">


                <div className="users-search-box">

                    <Search
                        size={18}
                    />

                    <input
                        type="search"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(
                                e.target.value
                            )
                        }
                    />

                </div>



                <select
                    value={roleFilter}
                    onChange={(e) =>
                        setRoleFilter(
                            e.target.value
                        )
                    }
                    className="users-filter"
                >

                    <option value="All">
                        All Roles
                    </option>

                    <option value="SuperAdmin">
                        SuperAdmin
                    </option>

                    <option value="Admin">
                        Admin
                    </option>

                    <option value="Doctor">
                        Doctor
                    </option>

                    <option value="Receptionist">
                        Receptionist
                    </option>

                    <option value="Nurse">
                        Nurse
                    </option>

                    <option value="LabTechnician">
                        Lab Technician
                    </option>

                    <option value="Pharmacist">
                        Pharmacist
                    </option>

                    <option value="Accountant">
                        Accountant
                    </option>

                    <option value="Patient">
                        Patient
                    </option>

                </select>



                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
                    }
                    className="users-filter"
                >

                    <option value="All">
                        All Status
                    </option>

                    <option value="Active">
                        Active
                    </option>

                    <option value="Inactive">
                        Inactive
                    </option>

                </select>


            </div>



            {/* ==================================================
                Users Table
                ================================================== */}

            <div className="users-table-card">


                <div className="users-table-header">

                    <div>

                        <h2>
                            System Users
                        </h2>

                        <p>
                            {filteredUsers.length} user
                            {filteredUsers.length !== 1
                                ? "s"
                                : ""}
                        </p>

                    </div>

                </div>



                <div className="users-table-wrapper">

                    <table className="users-table">


                        <thead>

                            <tr>

                                <th>
                                    User
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Role
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>



                        <tbody>

                            {filteredUsers.length > 0 ? (

                                filteredUsers.map(
                                    (user) => (

                                        <tr
                                            key={user.id}
                                        >


                                            {/* User */}

                                            <td>

                                                <div className="users-user-cell">


                                                    <div className="users-avatar">

                                                        {
                                                            user.fullName
                                                                .charAt(0)
                                                                .toUpperCase()
                                                        }

                                                    </div>


                                                    <strong>
                                                        {user.fullName}
                                                    </strong>


                                                </div>

                                            </td>



                                            {/* Email */}

                                            <td>

                                                <span className="users-email">

                                                    {user.email}

                                                </span>

                                            </td>



                                            {/* Role */}

                                            <td>

                                                <span
                                                    className={`users-role users-role-${user.role.toLowerCase()}`}
                                                >

                                                    {user.role}

                                                </span>

                                            </td>



                                            {/* Status */}

                                            <td>

                                                <span
                                                    className={`users-status users-status-${user.status.toLowerCase()}`}
                                                >

                                                    <span className="users-status-dot">
                                                    </span>

                                                    {user.status}

                                                </span>

                                            </td>



                                            {/* Actions */}

                                            <td>

                                                <div className="users-actions">


                                                    <button
                                                        type="button"
                                                        className="users-action-button"
                                                        title="Edit user"
                                                        aria-label={`Edit ${user.fullName}`}
                                                        onClick={() =>
                                                            handleEditUser(
                                                                user
                                                            )
                                                        }
                                                    >

                                                        <Pencil
                                                            size={16}
                                                        />

                                                    </button>



                                                    <button
                                                        type="button"
                                                        className="users-action-button users-action-delete"
                                                        title="Delete user"
                                                        aria-label={`Delete ${user.fullName}`}
                                                        onClick={() =>
                                                            handleDeleteUser(
                                                                user
                                                            )
                                                        }
                                                    >

                                                        <Trash2
                                                            size={16}
                                                        />

                                                    </button>


                                                </div>

                                            </td>


                                        </tr>

                                    )
                                )

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="users-empty"
                                    >

                                        No users found.

                                    </td>

                                </tr>

                            )}

                        </tbody>


                    </table>

                </div>


            </div>


        </div>

    );

};


export default Users;