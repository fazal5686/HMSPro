// ============================================================
// File:
// D:\HMSPro\frontend\src\pages\Receptionists\Receptionists.jsx
//
// Purpose:
// HMSPro Receptionists management page.
// Frontend presentation layer prepared for future receptionist
// API integration.
// ============================================================

import {
    Search,
    UserRound,
    Phone,
    Mail,
    ShieldCheck,
    UserPlus,
    RefreshCw,
} from "lucide-react";

import "./Receptionists.css";


// ============================================================
// Receptionists Component
// ============================================================

const Receptionists = () => {

    // ========================================================
    // Temporary presentation data
    //
    // Real receptionist API integration can be connected here
    // when the backend Receptionist module is finalized.
    // ========================================================

    const receptionists = [];


    // ========================================================
    // Render
    // ========================================================

    return (

        <div className="receptionists-page">


            {/* ==================================================
                Page Header
                ================================================== */}

            <section className="receptionists-header">

                <div>

                    <div className="receptionists-eyebrow">

                        <UserRound size={16} />

                        <span>
                            STAFF MANAGEMENT
                        </span>

                    </div>


                    <h1>
                        Receptionists
                    </h1>


                    <p>
                        Manage front-desk staff, contact information
                        and receptionist access.
                    </p>

                </div>


                <button
                    type="button"
                    className="receptionists-primary-button"
                >

                    <UserPlus size={17} />

                    <span>
                        Add Receptionist
                    </span>

                </button>

            </section>



            {/* ==================================================
                Summary Cards
                ================================================== */}

            <section className="receptionists-summary-grid">


                <article className="receptionist-summary-card">

                    <div className="receptionist-summary-icon blue">

                        <UserRound size={21} />

                    </div>


                    <div>

                        <span>
                            Total Receptionists
                        </span>

                        <strong>
                            {receptionists.length}
                        </strong>

                    </div>

                </article>



                <article className="receptionist-summary-card">

                    <div className="receptionist-summary-icon green">

                        <ShieldCheck size={21} />

                    </div>


                    <div>

                        <span>
                            Active Staff
                        </span>

                        <strong>
                            {receptionists.length}
                        </strong>

                    </div>

                </article>



                <article className="receptionist-summary-card">

                    <div className="receptionist-summary-icon purple">

                        <Phone size={21} />

                    </div>


                    <div>

                        <span>
                            Front Desk
                        </span>

                        <strong>
                            {receptionists.length}
                        </strong>

                    </div>

                </article>


            </section>



            {/* ==================================================
                Search / Toolbar
                ================================================== */}

            <section className="receptionists-toolbar">

                <div className="receptionists-search">

                    <Search size={18} />

                    <input
                        type="search"
                        placeholder="Search receptionists..."
                        aria-label="Search receptionists"
                    />

                </div>


                <button
                    type="button"
                    className="receptionists-refresh-button"
                    aria-label="Refresh receptionists"
                >

                    <RefreshCw size={17} />

                    <span>
                        Refresh
                    </span>

                </button>

            </section>



            {/* ==================================================
                Receptionists Table
                ================================================== */}

            <section className="receptionists-card">


                <div className="receptionists-card-header">

                    <div>

                        <span className="receptionists-card-kicker">
                            RECEPTION STAFF
                        </span>

                        <h2>
                            Receptionist Directory
                        </h2>

                    </div>


                    <div className="receptionists-card-count">

                        {receptionists.length}

                    </div>

                </div>



                {receptionists.length === 0 ? (

                    <div className="receptionists-empty">

                        <div className="receptionists-empty-icon">

                            <UserRound size={30} />

                        </div>


                        <h3>
                            No receptionists found
                        </h3>


                        <p>
                            Receptionist records will appear here
                            once they are created.
                        </p>


                        <button
                            type="button"
                            className="receptionists-empty-button"
                        >

                            <UserPlus size={16} />

                            Add Receptionist

                        </button>

                    </div>

                ) : (

                    <div className="receptionists-table-wrapper">

                        <table className="receptionists-table">

                            <thead>

                                <tr>

                                    <th>
                                        Receptionist
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Phone
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {receptionists.map(
                                    (receptionist) => (

                                        <tr
                                            key={
                                                receptionist.id
                                            }
                                        >

                                            <td>
                                                {receptionist.name}
                                            </td>

                                            <td>
                                                {receptionist.email}
                                            </td>

                                            <td>
                                                {receptionist.phone}
                                            </td>

                                            <td>

                                                <span className="receptionist-status active">
                                                    Active
                                                </span>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </section>



            {/* ==================================================
                Information Footer
                ================================================== */}

            <section className="receptionists-footer">

                <div>

                    <Mail size={17} />

                    <span>
                        Receptionist management is ready for
                        backend API integration.
                    </span>

                </div>


                <span>
                    HMSPro Staff Management
                </span>

            </section>


        </div>

    );

};


export default Receptionists;