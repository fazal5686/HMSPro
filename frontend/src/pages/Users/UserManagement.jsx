// ============================================================
// File: pages/Users/UserManagement.jsx
// Purpose: HMSPro Admin User Management page.
// ============================================================

import { useMemo, useState } from "react";

import {
    Plus,
    Search,
    Pencil,
    UserCheck,
    UserX,
    ShieldCheck,
    Users,
} from "lucide-react";

import "./UserManagement.css";


// ============================================================
// Temporary UI data
// This will be replaced with the real backend API.
// ============================================================

const initialUsers = [

    {
        id: 1,
        name: "HMS Admin",
        email: "admin@hmspro.com",
        role: "Admin",
        status: "Active",
    },

    {
        id: 2,
        name: "Dr. Ahmad Khan",
        email: "doctor@hmspro.com",
        role: "Doctor",
        status: "Active",
    },

    {
        id: 3,
        name: "Appointment Test Patient",
        email: "appointment.patient@hmspro.com",
        role: "Patient",
        status: "Active",
    },

];


// ============================================================
// User Management Component
// ============================================================

const UserManagement = () => {

    const [users, setUsers] =
        useState(initialUsers);


    const [search, setSearch] =
        useState("");


    const [roleFilter, setRoleFilter] =
        useState("All");


    // ========================================================
    // Filter users
    // ========================================================

    const filteredUsers = useMemo(() => {

        return users.filter((user) => {

            const searchValue =
                search.toLowerCase().trim();


            const matchesSearch =
                user.name.toLowerCase().includes(searchValue) ||
                user.email.toLowerCase().includes(searchValue);


            const matchesRole =
                roleFilter === "All" ||
                user.role === roleFilter;


            return (
                matchesSearch &&
                matchesRole
            );

        });

    }, [users, search, roleFilter]);


    // ========================================================
    // Toggle User Status
    // ========================================================

    const toggleStatus = (id) => {

        setUsers((currentUsers) =>

            currentUsers.map((user) =>

                user.id === id

                    ? {

                        ...user,

                        status:
                            user.status === "Active"
                                ? "Inactive"
                                : "Active",

                    }

                    : user

            )

        );

    };


    // ========================================================
    // Add User
    // ========================================================

    const handleAddUser = () => {

        alert(
            "Add User form will be connected next."
        );

    };


    // ========================================================
    // Edit User
    // ========================================================

    const handleEditUser = (user) => {

        alert(
            `Edit user: ${user.name}`
        );

    };


    // ========================================================
    // Statistics
    // ========================================================

    const totalUsers = users.length;

    const activeUsers =
        users.filter(
            (user) => user.status === "Active"
        ).length;

    const inactiveUsers =
        users.filter(
            (user) => user.status === "Inactive"
        ).length;


    // ========================================================
    // JSX
    // ========================================================

    return (

        <div className="user-management">


            {/* ==================================================
                Page Header
                ================================================== */}

            <div className="user-page-header">

                <div>

                    <p className="page-eyebrow">
                        ADMINISTRATION
                    </p>

                    <h1>
                        User Management
                    </h1>

                    <p className="page-description">
                        Manage HMSPro users, roles and
                        account access.
                    </p>

                </div>


                <button
                    type="button"
                    className="add-user-button"
                    onClick={handleAddUser}
                >

                    <Plus size={18} />

                    <span>
                        Add User
                    </span>

                </button>

            </div>


            {/* ==================================================
                Statistics
                ================================================== */}

            <div className="user-stat-grid">


                <div className="user-stat-card">

                    <div className="user-stat-icon">
                        <Users size={21} />
                    </div>

                    <div>

                        <span>
                            Total Users
                        </span>

                        <strong>
                            {totalUsers}
                        </strong>

                    </div>

                </div>



                <div className="user-stat-card">

                    <div className="user-stat-icon">
                        <UserCheck size={21} />
                    </div>

                    <div>

                        <span>
                            Active Users
                        </span>

                        <strong>
                            {activeUsers}
                        </strong>

                    </div>

                </div>



                <div className="user-stat-card">

                    <div className="user-stat-icon">
                        <UserX size={21} />
                    </div>

                    <div>

                        <span>
                            Inactive Users
                        </span>

                        <strong>
                            {inactiveUsers}
                        </strong>

                    </div>

                </div>



                <div className="user-stat-card">

                    <div className="user-stat-icon">
                        <ShieldCheck size={21} />
                    </div>

                    <div>

                        <span>
                            Roles
                        </span>

                        <strong>
                            9
                        </strong>

                    </div>

                </div>

            </div>


            {/* ==================================================
                User Table Card
                ================================================== */}

            <div className="user-table-card">


                {/* Toolbar */}

                <div className="user-toolbar">


                    <div className="user-search">

                        <Search size={18} />

                        <input
                            type="search"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder="Search users..."
                        />

                    </div>


                    <select
                        value={roleFilter}
                        onChange={(e) =>
                            setRoleFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="All">
                            All Roles
                        </option>

                        <option value="Admin">
                            Admin
                        </option>

                        <option value="Doctor">
                            Doctor
                        </option>

                        <option value="Patient">
                            Patient
                        </option>

                        <option value="Nurse">
                            Nurse
                        </option>

                        <option value="Receptionist">
                            Receptionist
                        </option>

                        <option value="Pharmacist">
                            Pharmacist
                        </option>

                        <option value="Accountant">
                            Accountant
                        </option>

                        <option value="LabTechnician">
                            Lab Technician
                        </option>

                    </select>

                </div>


                {/* Table */}

                <div className="user-table-wrapper">

                    <table className="user-table">

                        <thead>

                            <tr>

                                <th>
                                    USER
                                </th>

                                <th>
                                    EMAIL
                                </th>

                                <th>
                                    ROLE
                                </th>

                                <th>
                                    STATUS
                                </th>

                                <th>
                                    ACTIONS
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

                                            <td>

                                                <div className="user-name-cell">

                                                    <div className="user-avatar">

                                                        {user.name
                                                            .charAt(0)
                                                            .toUpperCase()}

                                                    </div>

                                                    <strong>
                                                        {user.name}
                                                    </strong>

                                                </div>

                                            </td>


                                            <td>

                                                <span className="user-email">

                                                    {user.email}

                                                </span>

                                            </td>


                                            <td>

                                                <span
                                                    className={`role-badge role-${user.role.toLowerCase()}`}
                                                >
                                                    {user.role}
                                                </span>

                                            </td>


                                            <td>

                                                <span
                                                    className={`status-badge ${
                                                        user.status ===
                                                        "Active"
                                                            ? "status-active"
                                                            : "status-inactive"
                                                    }`}
                                                >

                                                    {user.status}

                                                </span>

                                            </td>


                                            <td>

                                                <div className="user-actions">

                                                    <button
                                                        type="button"
                                                        title="Edit User"
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
                                                        title={
                                                            user.status ===
                                                            "Active"
                                                                ? "Deactivate User"
                                                                : "Activate User"
                                                        }
                                                        onClick={() =>
                                                            toggleStatus(
                                                                user.id
                                                            )
                                                        }
                                                    >

                                                        {user.status ===
                                                        "Active" ? (

                                                            <UserX
                                                                size={16}
                                                            />

                                                        ) : (

                                                            <UserCheck
                                                                size={16}
                                                            />

                                                        )}

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
                                        className="no-users"
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


export default UserManagement;