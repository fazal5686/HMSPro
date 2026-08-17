import {
    AlertCircle,
    BedDouble,
    CalendarCheck2,
    CheckCircle2,
    ClipboardCheck,
    FileText,
    Search,
    UserRound,
    RefreshCw,
} from "lucide-react";

import "./Discharges.css";


// ============================================================
// Discharges Component
// ============================================================

const Discharges = () => {

    // ========================================================
    // Temporary data
    //
    // Discharge records will be connected to the Admission/
    // Discharge backend workflow when the dedicated frontend
    // API integration is finalized.
    // ========================================================

    const discharges = [];


    // ========================================================
    // Summary values
    // ========================================================

    const totalDischarges =
        discharges.length;

    const todayDischarges =
        discharges.filter(
            (item) => item.today
        ).length;

    const pendingDischarges =
        discharges.filter(
            (item) => item.status === "Pending"
        ).length;


    // ========================================================
    // Component
    // ========================================================

    return (

        <div className="discharges-page">


            {/* ==================================================
                Header
                ================================================== */}

            <section className="discharges-header">

                <div>

                    <div className="discharges-eyebrow">

                        <ClipboardCheck size={16} />

                        <span>
                            PATIENT TRANSITIONS
                        </span>

                    </div>


                    <h1>
                        Discharges
                    </h1>


                    <p>
                        Monitor patient discharges, discharge
                        status and completed hospital stays.
                    </p>

                </div>


                <button
                    type="button"
                    className="discharges-refresh-button"
                >

                    <RefreshCw size={17} />

                    <span>
                        Refresh
                    </span>

                </button>

            </section>



            {/* ==================================================
                Summary Cards
                ================================================== */}

            <section className="discharges-summary-grid">


                <article className="discharge-summary-card">

                    <div className="discharge-summary-icon blue">

                        <FileText size={21} />

                    </div>


                    <div>

                        <span>
                            Total Discharges
                        </span>

                        <strong>
                            {totalDischarges}
                        </strong>

                    </div>

                </article>



                <article className="discharge-summary-card">

                    <div className="discharge-summary-icon green">

                        <CheckCircle2 size={21} />

                    </div>


                    <div>

                        <span>
                            Completed Today
                        </span>

                        <strong>
                            {todayDischarges}
                        </strong>

                    </div>

                </article>



                <article className="discharge-summary-card">

                    <div className="discharge-summary-icon orange">

                        <AlertCircle size={21} />

                    </div>


                    <div>

                        <span>
                            Pending
                        </span>

                        <strong>
                            {pendingDischarges}
                        </strong>

                    </div>

                </article>


            </section>



            {/* ==================================================
                Search Toolbar
                ================================================== */}

            <section className="discharges-toolbar">

                <div className="discharges-search">

                    <Search size={18} />

                    <input
                        type="search"
                        placeholder="Search by patient, admission or doctor..."
                        aria-label="Search discharges"
                    />

                </div>


                <div className="discharges-filter">

                    <CalendarCheck2 size={16} />

                    <select
                        defaultValue="all"
                        aria-label="Filter discharge status"
                    >

                        <option value="all">
                            All Statuses
                        </option>

                        <option value="completed">
                            Completed
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                    </select>

                </div>

            </section>



            {/* ==================================================
                Discharge Records
                ================================================== */}

            <section className="discharges-card">


                <div className="discharges-card-header">

                    <div>

                        <span className="discharges-card-kicker">
                            DISCHARGE RECORDS
                        </span>

                        <h2>
                            Patient Discharge Directory
                        </h2>

                    </div>


                    <div className="discharges-card-count">

                        {totalDischarges}

                    </div>

                </div>



                {/* ==================================================
                    Empty State
                    ================================================== */}

                {discharges.length === 0 ? (

                    <div className="discharges-empty">

                        <div className="discharges-empty-icon">

                            <BedDouble size={30} />

                        </div>


                        <h3>
                            No discharge records found
                        </h3>


                        <p>
                            Completed patient discharges will
                            appear here after they are recorded
                            through the admission workflow.
                        </p>


                        <div className="discharges-empty-note">

                            <CheckCircle2 size={16} />

                            <span>
                                Discharge records are linked to
                                hospital admissions.
                            </span>

                        </div>

                    </div>

                ) : (

                    <div className="discharges-table-wrapper">

                        <table className="discharges-table">

                            <thead>

                                <tr>

                                    <th>
                                        Patient
                                    </th>

                                    <th>
                                        Admission
                                    </th>

                                    <th>
                                        Doctor
                                    </th>

                                    <th>
                                        Discharge Date
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {discharges.map(
                                    (discharge) => (

                                        <tr
                                            key={
                                                discharge.id
                                            }
                                        >

                                            <td>

                                                <div className="discharge-patient">

                                                    <div className="discharge-patient-icon">

                                                        <UserRound size={16} />

                                                    </div>

                                                    <span>
                                                        {discharge.patient}
                                                    </span>

                                                </div>

                                            </td>


                                            <td>
                                                {discharge.admission}
                                            </td>


                                            <td>
                                                {discharge.doctor}
                                            </td>


                                            <td>
                                                {discharge.dischargeDate}
                                            </td>


                                            <td>

                                                <span
                                                    className={`discharge-status ${
                                                        discharge.status === "Completed"
                                                            ? "completed"
                                                            : "pending"
                                                    }`}
                                                >

                                                    {discharge.status}

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
                Footer
                ================================================== */}

            <section className="discharges-footer">

                <div>

                    <CheckCircle2 size={17} />

                    <span>
                        Discharge workflow is connected to
                        patient admissions.
                    </span>

                </div>


                <span>
                    HMSPro Clinical Operations
                </span>

            </section>


        </div>

    );

};


export default Discharges;