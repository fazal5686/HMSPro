// ============================================================
// File: pages/Admissions/Admissions.jsx
// Purpose: HMSPro Admissions management page.
// Displays live admission data from the backend.
// ============================================================

import { useEffect, useMemo, useState } from "react";

import {
    BedDouble,
    CalendarDays,
    CheckCircle2,
    Clock3,
    MoreHorizontal,
    RefreshCw,
    Search,
    UserRound,
} from "lucide-react";

import API from "../../api/axios.js";

import "./Admissions.css";


// ============================================================
// Admissions Component
// ============================================================

const Admissions = () => {

    const [admissions, setAdmissions] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");


    // ========================================================
    // Load Admissions
    // ========================================================

    const loadAdmissions = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await API.get("/admissions");

            const data =
                response.data?.data ?? [];

            setAdmissions(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Admissions loading error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load admissions."
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // Initial Load
    // ========================================================

    useEffect(() => {

        loadAdmissions();

    }, []);


    // ========================================================
    // Statistics
    // ========================================================

    const statistics = useMemo(() => {

        const active =
            admissions.filter(
                (admission) =>
                    admission.status === "Admitted" ||
                    admission.status === "Active"
            ).length;

        const discharged =
            admissions.filter(
                (admission) =>
                    admission.status === "Discharged"
            ).length;

        const pending =
            admissions.filter(
                (admission) =>
                    admission.status === "Pending"
            ).length;

        return {

            total:
                admissions.length,

            active,

            discharged,

            pending,

        };

    }, [admissions]);


    // ========================================================
    // Helper: Patient Name
    // ========================================================

    const getPatientName = (admission) => {

        const patient =
            admission.patientId;

        if (!patient) {
            return "Unknown Patient";
        }

        if (
            patient.userId &&
            typeof patient.userId === "object"
        ) {

            return (
                patient.userId.fullName ||
                "Unknown Patient"
            );

        }

        return (
            patient.fullName ||
            patient.name ||
            "Unknown Patient"
        );

    };


    // ========================================================
    // Helper: Doctor Name
    // ========================================================

    const getDoctorName = (admission) => {

        const doctor =
            admission.doctorId;

        if (!doctor) {
            return "Not assigned";
        }

        if (
            doctor.userId &&
            typeof doctor.userId === "object"
        ) {

            return (
                doctor.userId.fullName ||
                "Not assigned"
            );

        }

        return (
            doctor.fullName ||
            doctor.name ||
            "Not assigned"
        );

    };


    // ========================================================
    // Helper: Room
    // ========================================================

    const getRoomName = (admission) => {

        const room =
            admission.roomId;

        if (!room) {
            return "Not assigned";
        }

        if (typeof room === "object") {

            return (
                room.roomNumber ||
                room.number ||
                room.name ||
                "Assigned"
            );

        }

        return String(room);

    };


    // ========================================================
    // Helper: Date
    // ========================================================

    const formatDate = (value) => {

        if (!value) {
            return "—";
        }

        const date =
            new Date(value);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return "—";

        }

        return date.toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "short",
                day: "numeric",
            }
        );

    };


    // ========================================================
    // Filter Admissions
    // ========================================================

    const filteredAdmissions =
        useMemo(() => {

            const searchValue =
                search
                    .trim()
                    .toLowerCase();

            return admissions.filter(
                (admission) => {

                    const patientName =
                        getPatientName(
                            admission
                        ).toLowerCase();

                    const doctorName =
                        getDoctorName(
                            admission
                        ).toLowerCase();

                    const roomName =
                        getRoomName(
                            admission
                        ).toLowerCase();

                    const status =
                        String(
                            admission.status ||
                            ""
                        ).toLowerCase();

                    const matchesSearch =
                        !searchValue ||
                        patientName.includes(
                            searchValue
                        ) ||
                        doctorName.includes(
                            searchValue
                        ) ||
                        roomName.includes(
                            searchValue
                        ) ||
                        status.includes(
                            searchValue
                        );

                    const matchesStatus =
                        statusFilter === "All" ||
                        admission.status ===
                            statusFilter;

                    return (
                        matchesSearch &&
                        matchesStatus
                    );

                }
            );

        }, [
            admissions,
            search,
            statusFilter,
        ]);


    // ========================================================
    // Status Class
    // ========================================================

    const getStatusClass = (status) => {

        return String(
            status || "Unknown"
        )
            .toLowerCase()
            .replace(/\s+/g, "-");

    };


    // ========================================================
    // Render
    // ========================================================

    return (

        <div className="admissions-page">


            {/* ==================================================
                Page Header
                ================================================== */}

            <section className="admissions-heading">

                <div>

                    <div className="admissions-eyebrow">

                        <BedDouble size={15} />

                        <span>
                            INPATIENT MANAGEMENT
                        </span>

                    </div>


                    <h1>
                        Admissions
                    </h1>


                    <p>
                        Monitor current admissions,
                        patient stays and discharge status.
                    </p>

                </div>


                <button
                    type="button"
                    className="admissions-refresh-button"
                    onClick={loadAdmissions}
                    disabled={loading}
                >

                    <RefreshCw
                        size={17}
                        className={
                            loading
                                ? "admissions-spin"
                                : ""
                        }
                    />

                    <span>
                        Refresh
                    </span>

                </button>

            </section>


            {/* ==================================================
                Error
                ================================================== */}

            {error && (

                <div className="admissions-error">
                    {error}
                </div>

            )}


            {/* ==================================================
                Statistics
                ================================================== */}

            <section className="admissions-stats">


                <article className="admissions-stat-card">

                    <div className="admissions-stat-icon total">

                        <BedDouble size={20} />

                    </div>

                    <span>
                        Total Admissions
                    </span>

                    <strong>
                        {loading
                            ? "..."
                            : statistics.total}
                    </strong>

                </article>


                <article className="admissions-stat-card">

                    <div className="admissions-stat-icon active">

                        <Clock3 size={20} />

                    </div>

                    <span>
                        Active
                    </span>

                    <strong>
                        {loading
                            ? "..."
                            : statistics.active}
                    </strong>

                </article>


                <article className="admissions-stat-card">

                    <div className="admissions-stat-icon pending">

                        <CalendarDays size={20} />

                    </div>

                    <span>
                        Pending
                    </span>

                    <strong>
                        {loading
                            ? "..."
                            : statistics.pending}
                    </strong>

                </article>


                <article className="admissions-stat-card">

                    <div className="admissions-stat-icon discharged">

                        <CheckCircle2 size={20} />

                    </div>

                    <span>
                        Discharged
                    </span>

                    <strong>
                        {loading
                            ? "..."
                            : statistics.discharged}
                    </strong>

                </article>

            </section>


            {/* ==================================================
                Main Admission Card
                ================================================== */}

            <section className="admissions-card">


                <div className="admissions-card-header">

                    <div>

                        <span className="admissions-card-kicker">
                            INPATIENT DIRECTORY
                        </span>

                        <h2>
                            Patient Admissions
                        </h2>

                    </div>


                    <div className="admissions-controls">

                        <div className="admissions-search">

                            <Search size={16} />

                            <input
                                type="search"
                                placeholder="Search admissions..."
                                value={search}
                                onChange={(event) =>
                                    setSearch(
                                        event.target.value
                                    )
                                }
                            />

                        </div>


                        <select
                            className="admissions-filter"
                            value={statusFilter}
                            onChange={(event) =>
                                setStatusFilter(
                                    event.target.value
                                )
                            }
                        >

                            <option value="All">
                                All Status
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Admitted">
                                Admitted
                            </option>

                            <option value="Active">
                                Active
                            </option>

                            <option value="Discharged">
                                Discharged
                            </option>

                        </select>

                    </div>

                </div>


                {/* ==================================================
                    Loading
                    ================================================== */}

                {loading && (

                    <div className="admissions-state">

                        <BedDouble size={32} />

                        <strong>
                            Loading admissions...
                        </strong>

                    </div>

                )}


                {/* ==================================================
                    Empty
                    ================================================== */}

                {!loading &&
                    !error &&
                    filteredAdmissions.length === 0 && (

                        <div className="admissions-state">

                            <BedDouble size={34} />

                            <strong>
                                No admissions found
                            </strong>

                            <span>
                                Try changing your search
                                or status filter.
                            </span>

                        </div>

                    )}


                {/* ==================================================
                    Admission List
                    ================================================== */}

                {!loading &&
                    filteredAdmissions.length > 0 && (

                        <div className="admissions-table-wrapper">

                            <table className="admissions-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Patient
                                        </th>

                                        <th>
                                            Doctor
                                        </th>

                                        <th>
                                            Room
                                        </th>

                                        <th>
                                            Admission Date
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

                                    {filteredAdmissions.map(
                                        (admission) => {

                                            const status =
                                                admission.status ||
                                                "Unknown";

                                            return (

                                                <tr
                                                    key={
                                                        admission._id
                                                    }
                                                >

                                                    <td>

                                                        <div className="admission-patient">

                                                            <div className="admission-patient-icon">

                                                                <UserRound
                                                                    size={17}
                                                                />

                                                            </div>

                                                            <div>

                                                                <strong>
                                                                    {getPatientName(
                                                                        admission
                                                                    )}
                                                                </strong>

                                                                <span>
                                                                    Patient
                                                                </span>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    <td>

                                                        <span className="admission-doctor">

                                                            {getDoctorName(
                                                                admission
                                                            )}

                                                        </span>

                                                    </td>


                                                    <td>

                                                        <div className="admission-room">

                                                            <BedDouble
                                                                size={15}
                                                            />

                                                            {getRoomName(
                                                                admission
                                                            )}

                                                        </div>

                                                    </td>


                                                    <td>

                                                        <div className="admission-date">

                                                            <CalendarDays
                                                                size={15}
                                                            />

                                                            {formatDate(
                                                                admission.admissionDate
                                                            )}

                                                        </div>

                                                    </td>


                                                    <td>

                                                        <span
                                                            className={`admission-status ${getStatusClass(
                                                                status
                                                            )}`}
                                                        >

                                                            {status}

                                                        </span>

                                                    </td>


                                                    <td>

                                                        <button
                                                            type="button"
                                                            className="admission-more"
                                                            aria-label="Admission options"
                                                        >

                                                            <MoreHorizontal
                                                                size={18}
                                                            />

                                                        </button>

                                                    </td>

                                                </tr>

                                            );

                                        }
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

            </section>

        </div>

    );

};


export default Admissions;