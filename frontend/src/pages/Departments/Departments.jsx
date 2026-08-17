// ============================================================
// File: pages/Departments/Departments.jsx
// Purpose: HMSPro Departments management page.
// ============================================================

import {
    Building2,
    Search,
    Plus,
    Users,
    Stethoscope,
    MoreHorizontal,
    ChevronRight,
} from "lucide-react";

import "./Departments.css";


// ============================================================
// Temporary Department Data
// ============================================================

const departments = [
    {
        id: 1,
        name: "Cardiology",
        description: "Heart and cardiovascular care.",
        head: "Dr. Sarah Ahmed",
        doctors: 8,
        status: "Active",
    },
    {
        id: 2,
        name: "Neurology",
        description: "Diagnosis and treatment of neurological disorders.",
        head: "Dr. Hamza Ali",
        doctors: 6,
        status: "Active",
    },
    {
        id: 3,
        name: "Pediatrics",
        description: "Medical care for infants, children and adolescents.",
        head: "Dr. Ayesha Noor",
        doctors: 7,
        status: "Active",
    },
    {
        id: 4,
        name: "Orthopedics",
        description: "Bone, joint and musculoskeletal care.",
        head: "Dr. Bilal Ahmad",
        doctors: 5,
        status: "Active",
    },
    {
        id: 5,
        name: "General Medicine",
        description: "Primary and general medical services.",
        head: "Dr. Ali Hassan",
        doctors: 10,
        status: "Active",
    },
    {
        id: 6,
        name: "Emergency",
        description: "24/7 emergency medical services.",
        head: "Dr. Usman Khan",
        doctors: 12,
        status: "Active",
    },
];


// ============================================================
// Departments Component
// ============================================================

const Departments = () => {

    return (

        <div className="departments-page">


            {/* ==================================================
                Page Header
                ================================================== */}

            <section className="departments-heading">

                <div>

                    <div className="departments-eyebrow">

                        <Building2 size={15} />

                        <span>
                            Hospital Organization
                        </span>

                    </div>


                    <h1>
                        Departments
                    </h1>


                    <p>
                        Manage hospital departments, specialties,
                        and assigned medical staff.
                    </p>

                </div>


                <button
                    type="button"
                    className="departments-primary-button"
                >

                    <Plus size={18} />

                    <span>
                        Add Department
                    </span>

                </button>

            </section>


            {/* ==================================================
                Summary Cards
                ================================================== */}

            <section className="department-summary">


                <article className="department-summary-card">

                    <div className="department-summary-icon blue">

                        <Building2 size={21} />

                    </div>

                    <div>

                        <span>
                            Total Departments
                        </span>

                        <strong>
                            {departments.length}
                        </strong>

                    </div>

                </article>


                <article className="department-summary-card">

                    <div className="department-summary-icon teal">

                        <Stethoscope size={21} />

                    </div>

                    <div>

                        <span>
                            Total Doctors
                        </span>

                        <strong>
                            {departments.reduce(
                                (total, department) =>
                                    total + department.doctors,
                                0
                            )}
                        </strong>

                    </div>

                </article>


                <article className="department-summary-card">

                    <div className="department-summary-icon purple">

                        <Users size={21} />

                    </div>

                    <div>

                        <span>
                            Active Departments
                        </span>

                        <strong>
                            {
                                departments.filter(
                                    (department) =>
                                        department.status === "Active"
                                ).length
                            }
                        </strong>

                    </div>

                </article>


            </section>


            {/* ==================================================
                Department Content
                ================================================== */}

            <section className="departments-card">


                {/* ==================================================
                    Card Header
                    ================================================== */}

                <div className="departments-card-header">

                    <div>

                        <span className="department-card-kicker">
                            DEPARTMENT DIRECTORY
                        </span>

                        <h2>
                            Hospital Departments
                        </h2>

                    </div>


                    <div className="department-search">

                        <Search size={17} />

                        <input
                            type="text"
                            placeholder="Search departments..."
                            aria-label="Search departments"
                        />

                    </div>

                </div>


                {/* ==================================================
                    Department List
                    ================================================== */}

                <div className="department-list">

                    {departments.map((department) => (

                        <article
                            className="department-row"
                            key={department.id}
                        >


                            <div className="department-main-icon">

                                <Building2 size={21} />

                            </div>


                            <div className="department-info">

                                <strong>
                                    {department.name}
                                </strong>

                                <span>
                                    {department.description}
                                </span>

                            </div>


                            <div className="department-head">

                                <span>
                                    Department Head
                                </span>

                                <strong>
                                    {department.head}
                                </strong>

                            </div>


                            <div className="department-doctors">

                                <span>
                                    <Users size={15} />

                                    Doctors
                                </span>

                                <strong>
                                    {department.doctors}
                                </strong>

                            </div>


                            <span className="department-status">
                                {department.status}
                            </span>


                            <button
                                type="button"
                                className="department-action"
                                aria-label={`Options for ${department.name}`}
                            >

                                <MoreHorizontal size={18} />

                            </button>


                            <ChevronRight
                                size={16}
                                className="department-arrow"
                            />

                        </article>

                    ))}

                </div>


                {/* ==================================================
                    Footer
                    ================================================== */}

                <div className="departments-footer">

                    <span>
                        Showing {departments.length} departments
                    </span>

                    <button
                        type="button"
                        className="departments-view-button"
                    >

                        View department details

                        <ChevronRight size={16} />

                    </button>

                </div>


            </section>

        </div>

    );

};


export default Departments;