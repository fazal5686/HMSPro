// ============================================================
// File: pages/Radiology/Radiology.jsx
// Purpose: HMSPro Radiology Center.
// ============================================================

import {
    Activity,
    CalendarDays,
    CheckCircle2,
    Clock3,
    FileImage,
    Plus,
    RefreshCw,
    Search,
    UserRound,
} from "lucide-react";

import "./Radiology.css";


// ============================================================
// Sample Radiology Data
// ============================================================

const radiologyStudies = [
    {
        id: "RAD-1001",
        patient: "No radiology studies yet",
        study: "—",
        modality: "—",
        doctor: "—",
        status: "Pending",
        date: "—",
    },
];


// ============================================================
// Radiology Component
// ============================================================

const Radiology = () => {

    return (

        <div className="radiology-page">


            {/* ==================================================
                Header
                ================================================== */}

            <section className="radiology-header">

                <div>

                    <div className="radiology-eyebrow">

                        <FileImage size={16} />

                        <span>
                            DIAGNOSTIC IMAGING
                        </span>

                    </div>


                    <h1>
                        Radiology
                    </h1>


                    <p>
                        Manage diagnostic imaging studies,
                        radiology requests and examination status.
                    </p>

                </div>


                <button
                    type="button"
                    className="radiology-primary-button"
                >

                    <Plus size={17} />

                    New Study

                </button>

            </section>



            {/* ==================================================
                Summary Cards
                ================================================== */}

            <section className="radiology-summary-grid">


                <article className="radiology-summary-card">

                    <div className="radiology-summary-icon blue">

                        <FileImage size={21} />

                    </div>


                    <div>

                        <span>
                            Total Studies
                        </span>

                        <strong>
                            0
                        </strong>

                        <small>
                            All radiology studies
                        </small>

                    </div>

                </article>



                <article className="radiology-summary-card">

                    <div className="radiology-summary-icon orange">

                        <Clock3 size={21} />

                    </div>


                    <div>

                        <span>
                            Pending
                        </span>

                        <strong>
                            0
                        </strong>

                        <small>
                            Awaiting examination
                        </small>

                    </div>

                </article>



                <article className="radiology-summary-card">

                    <div className="radiology-summary-icon green">

                        <CheckCircle2 size={21} />

                    </div>


                    <div>

                        <span>
                            Completed
                        </span>

                        <strong>
                            0
                        </strong>

                        <small>
                            Completed studies
                        </small>

                    </div>

                </article>



                <article className="radiology-summary-card">

                    <div className="radiology-summary-icon purple">

                        <Activity size={21} />

                    </div>


                    <div>

                        <span>
                            Reports
                        </span>

                        <strong>
                            0
                        </strong>

                        <small>
                            Reports available
                        </small>

                    </div>

                </article>


            </section>



            {/* ==================================================
                Main Card
                ================================================== */}

            <section className="radiology-card">


                {/* ==================================================
                    Card Header
                    ================================================== */}

                <div className="radiology-card-header">

                    <div>

                        <span className="radiology-card-kicker">
                            RADIOLOGY WORKLIST
                        </span>

                        <h2>
                            Imaging Studies
                        </h2>

                    </div>


                    <button
                        type="button"
                        className="radiology-refresh-button"
                    >

                        <RefreshCw size={16} />

                        Refresh

                    </button>

                </div>



                {/* ==================================================
                    Search / Filters
                    ================================================== */}

                <div className="radiology-toolbar">


                    <div className="radiology-search">

                        <Search size={17} />

                        <input
                            type="search"
                            placeholder="Search patient or study..."
                            aria-label="Search radiology studies"
                        />

                    </div>


                    <select
                        className="radiology-filter"
                        defaultValue="all"
                    >

                        <option value="all">
                            All Status
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="completed">
                            Completed
                        </option>

                        <option value="cancelled">
                            Cancelled
                        </option>

                    </select>


                    <select
                        className="radiology-filter"
                        defaultValue="all"
                    >

                        <option value="all">
                            All Modalities
                        </option>

                        <option value="xray">
                            X-Ray
                        </option>

                        <option value="ct">
                            CT Scan
                        </option>

                        <option value="mri">
                            MRI
                        </option>

                        <option value="ultrasound">
                            Ultrasound
                        </option>

                    </select>


                </div>



                {/* ==================================================
                    Table
                    ================================================== */}

                <div className="radiology-table-wrapper">

                    <table className="radiology-table">

                        <thead>

                            <tr>

                                <th>
                                    Study ID
                                </th>

                                <th>
                                    Patient
                                </th>

                                <th>
                                    Study
                                </th>

                                <th>
                                    Modality
                                </th>

                                <th>
                                    Referring Doctor
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Status
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {radiologyStudies.map(
                                (study) => (

                                    <tr key={study.id}>

                                        <td>
                                            <strong>
                                                {study.id}
                                            </strong>
                                        </td>


                                        <td>

                                            <div className="radiology-patient">

                                                <div className="radiology-patient-icon">

                                                    <UserRound
                                                        size={16}
                                                    />

                                                </div>

                                                <span>
                                                    {study.patient}
                                                </span>

                                            </div>

                                        </td>


                                        <td>
                                            {study.study}
                                        </td>


                                        <td>
                                            {study.modality}
                                        </td>


                                        <td>
                                            {study.doctor}
                                        </td>


                                        <td>

                                            <div className="radiology-date">

                                                <CalendarDays
                                                    size={15}
                                                />

                                                {study.date}

                                            </div>

                                        </td>


                                        <td>

                                            <span className="radiology-status pending">

                                                {study.status}

                                            </span>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>



                {/* ==================================================
                    Empty / Future Integration Notice
                    ================================================== */}

                <div className="radiology-empty">

                    <div className="radiology-empty-icon">

                        <FileImage size={30} />

                    </div>


                    <h3>
                        Radiology module ready
                    </h3>


                    <p>
                        The Radiology frontend workspace is ready.
                        Live study records will appear here when
                        the Radiology backend module is connected.
                    </p>

                </div>


            </section>



            {/* ==================================================
                Footer
                ================================================== */}

            <section className="radiology-footer">

                <div>

                    <CheckCircle2 size={17} />

                    <span>
                        HMSPro Radiology Center
                    </span>

                </div>


                <span>
                    Diagnostic imaging management
                </span>

            </section>


        </div>

    );

};


export default Radiology;