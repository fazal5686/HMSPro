import {
    Activity,
    CheckCircle2,
    Clock3,
    Plus,
    Search,
    ShieldCheck,
    UserRound,
    Users,
} from "lucide-react";

import "./Nurses.css";


// ============================================================
// File: pages/Nurses/Nurses.jsx
// Purpose: HMSPro Nurses Center.
// ============================================================

const Nurses = () => {

    return (

        <div className="nurses-page">

            {/* ==================================================
                Header
                ================================================== */}

            <section className="nurses-header">

                <div>

                    <div className="nurses-eyebrow">

                        <Users size={16} />

                        <span>
                            NURSING SERVICES
                        </span>

                    </div>

                    <h1>
                        Nurses
                    </h1>

                    <p>
                        Manage nursing staff, availability and
                        clinical nursing assignments.
                    </p>

                </div>


                <button
                    type="button"
                    className="nurses-primary-button"
                >

                    <Plus size={17} />

                    Add Nurse

                </button>

            </section>


            {/* ==================================================
                Summary Cards
                ================================================== */}

            <section className="nurses-summary-grid">

                <article className="nurses-summary-card">

                    <div className="nurses-summary-icon blue">
                        <Users size={21} />
                    </div>

                    <div>
                        <span>Total Nurses</span>
                        <strong>0</strong>
                        <small>Registered nursing staff</small>
                    </div>

                </article>


                <article className="nurses-summary-card">

                    <div className="nurses-summary-icon green">
                        <CheckCircle2 size={21} />
                    </div>

                    <div>
                        <span>Active Nurses</span>
                        <strong>0</strong>
                        <small>Currently active staff</small>
                    </div>

                </article>


                <article className="nurses-summary-card">

                    <div className="nurses-summary-icon orange">
                        <Clock3 size={21} />
                    </div>

                    <div>
                        <span>On Duty</span>
                        <strong>0</strong>
                        <small>Nurses currently on duty</small>
                    </div>

                </article>


                <article className="nurses-summary-card">

                    <div className="nurses-summary-icon purple">
                        <ShieldCheck size={21} />
                    </div>

                    <div>
                        <span>Assignments</span>
                        <strong>0</strong>
                        <small>Active nursing assignments</small>
                    </div>

                </article>

            </section>


            {/* ==================================================
                Main Nurses Card
                ================================================== */}

            <section className="nurses-card">

                <div className="nurses-card-header">

                    <div>

                        <span className="nurses-card-kicker">
                            NURSING STAFF
                        </span>

                        <h2>
                            Nurse Directory
                        </h2>

                    </div>

                </div>


                {/* ==================================================
                    Toolbar
                    ================================================== */}

                <div className="nurses-toolbar">

                    <div className="nurses-search">

                        <Search size={17} />

                        <input
                            type="search"
                            placeholder="Search nurse..."
                            aria-label="Search nurses"
                        />

                    </div>


                    <select
                        className="nurses-filter"
                        defaultValue="all"
                    >

                        <option value="all">
                            All Status
                        </option>

                        <option value="active">
                            Active
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>

                    </select>


                    <select
                        className="nurses-filter"
                        defaultValue="all"
                    >

                        <option value="all">
                            All Shifts
                        </option>

                        <option value="morning">
                            Morning
                        </option>

                        <option value="evening">
                            Evening
                        </option>

                        <option value="night">
                            Night
                        </option>

                    </select>

                </div>


                {/* ==================================================
                    Directory Table
                    ================================================== */}

                <div className="nurses-table-wrapper">

                    <table className="nurses-table">

                        <thead>

                            <tr>

                                <th>
                                    Nurse
                                </th>

                                <th>
                                    Employee ID
                                </th>

                                <th>
                                    Department
                                </th>

                                <th>
                                    Shift
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Assignment
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            <tr>

                                <td>

                                    <div className="nurse-placeholder">

                                        <div className="nurse-avatar">
                                            <UserRound size={16} />
                                        </div>

                                        <div>

                                            <strong>
                                                No nurses registered
                                            </strong>

                                            <span>
                                                Nurse records will appear here
                                            </span>

                                        </div>

                                    </div>

                                </td>


                                <td>
                                    —
                                </td>


                                <td>
                                    —
                                </td>


                                <td>
                                    —
                                </td>


                                <td>

                                    <span className="nurse-status">
                                        Pending
                                    </span>

                                </td>


                                <td>
                                    —
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>


                {/* ==================================================
                    Empty State
                    ================================================== */}

                <div className="nurses-empty">

                    <div className="nurses-empty-icon">

                        <Activity size={30} />

                    </div>

                    <h3>
                        Nursing module ready
                    </h3>

                    <p>
                        The Nurses frontend workspace is ready.
                        Live nurse records and assignments will
                        appear here when the Nurses backend module
                        is connected.
                    </p>

                </div>

            </section>


            {/* ==================================================
                Footer
                ================================================== */}

            <section className="nurses-footer">

                <div>

                    <CheckCircle2 size={17} />

                    <span>
                        HMSPro Nursing Center
                    </span>

                </div>

                <span>
                    Nursing staff management
                </span>

            </section>

        </div>

    );

};


export default Nurses;