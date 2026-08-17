
// ============================================================
// File: pages/Appointments/Appointments.jsx
// Purpose: HMSPro Appointment management page.
// Phase 1: Appointment list and backend integration.
// ============================================================

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    CalendarCheck2,
    Clock3,
    MoreHorizontal,
    RefreshCw,
    Search,
    Stethoscope,
    UserRound,
} from "lucide-react";

import {
    getAllAppointments,
} from "../../services/appointmentService.js";

import "./Appointments.css";


// ============================================================
// Helper: Format Appointment Date
// ============================================================

const formatAppointmentDate = (dateValue) => {

    if (!dateValue) {

        return "—";

    }


    const date =
        new Date(dateValue);


    if (Number.isNaN(date.getTime())) {

        return "—";

    }


    return date.toLocaleDateString(
        "en-PK",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );

};


// ============================================================
// Helper: Format Appointment Time
// ============================================================

const formatAppointmentTime = (dateValue) => {

    if (!dateValue) {

        return "—";

    }


    const date =
        new Date(dateValue);


    if (Number.isNaN(date.getTime())) {

        return "—";

    }


    return date.toLocaleTimeString(
        "en-PK",
        {
            hour: "2-digit",
            minute: "2-digit",
        }
    );

};


// ============================================================
// Helper: Get Patient Name
// ============================================================

const getPatientName = (appointment) => {

    return (
        appointment?.patientId?.userId?.fullName ||
        appointment?.patientId?.fullName ||
        "Unknown Patient"
    );

};


// ============================================================
// Helper: Get Doctor Name
// ============================================================

const getDoctorName = (appointment) => {

    return (
        appointment?.doctorId?.userId?.fullName ||
        appointment?.doctorId?.fullName ||
        "Unknown Doctor"
    );

};


// ============================================================
// Helper: Get Patient Initials
// ============================================================

const getPatientInitials = (name) => {

    if (!name) {

        return "PT";

    }


    const words =
        name
            .trim()
            .split(/\s+/)
            .filter(Boolean);


    if (words.length === 1) {

        return words[0]
            .slice(0, 2)
            .toUpperCase();

    }


    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();

};


// ============================================================
// Appointment Component
// ============================================================

const Appointments = () => {

    // ========================================================
    // State
    // ========================================================

    const [
        appointments,
        setAppointments,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState("");

    const [
        searchTerm,
        setSearchTerm,
    ] = useState("");


    // ========================================================
    // Load Appointments
    // ========================================================

    const loadAppointments = useCallback(
        async () => {

            try {

                setLoading(true);

                setError("");


                const data =
                    await getAllAppointments();


                setAppointments(
                    Array.isArray(data)
                        ? data
                        : []
                );

            }

            catch (requestError) {

                console.error(
                    "Appointment loading error:",
                    requestError
                );


                setError(
                    requestError.response?.data?.message ||
                    "Unable to load appointments."
                );

            }

            finally {

                setLoading(false);

            }

        },
        []
    );


    // ========================================================
    // Initial Load
    // ========================================================

    useEffect(() => {

        loadAppointments();

    }, [loadAppointments]);


    // ========================================================
    // Search
    // ========================================================

    const filteredAppointments =
        appointments.filter(
            (appointment) => {

                const patientName =
                    getPatientName(
                        appointment
                    );

                const doctorName =
                    getDoctorName(
                        appointment
                    );

                const reason =
                    appointment?.reason ||
                    "";

                const status =
                    appointment?.status ||
                    "";


                const searchableText = [

                    patientName,

                    doctorName,

                    reason,

                    status,

                ]
                    .join(" ")
                    .toLowerCase();


                return searchableText.includes(
                    searchTerm
                        .trim()
                        .toLowerCase()
                );

            }
        );


    // ========================================================
    // Render
    // ========================================================

    return (

        <div className="appointments-page">


            {/* ==================================================
                Page Header
                ================================================== */}

            <section className="appointments-heading">

                <div>

                    <div className="appointments-eyebrow">

                        <CalendarCheck2 size={16} />

                        <span>
                            APPOINTMENT MANAGEMENT
                        </span>

                    </div>


                    <h1>
                        Appointments
                    </h1>


                    <p>
                        Manage patient appointments,
                        schedules, doctors, and status.
                    </p>

                </div>


                <button
                    type="button"
                    className="appointments-refresh-button"
                    onClick={loadAppointments}
                    disabled={loading}
                >

                    <RefreshCw
                        size={17}
                        className={
                            loading
                                ? "appointments-spin"
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

                <div className="appointments-error">

                    {error}

                </div>

            )}


            {/* ==================================================
                Summary Cards
                ================================================== */}

            <section className="appointments-summary">

                <article className="appointments-summary-card">

                    <div className="appointments-summary-icon teal">

                        <CalendarCheck2 size={20} />

                    </div>


                    <div>

                        <span>
                            Total Appointments
                        </span>

                        <strong>
                            {loading
                                ? "..."
                                : appointments.length}
                        </strong>

                    </div>

                </article>


                <article className="appointments-summary-card">

                    <div className="appointments-summary-icon blue">

                        <Clock3 size={20} />

                    </div>


                    <div>

                        <span>
                            Confirmed
                        </span>

                        <strong>
                            {loading
                                ? "..."
                                : appointments.filter(
                                    (appointment) =>
                                        appointment.status ===
                                        "Confirmed"
                                ).length}
                        </strong>

                    </div>

                </article>


                <article className="appointments-summary-card">

                    <div className="appointments-summary-icon purple">

                        <UserRound size={20} />

                    </div>


                    <div>

                        <span>
                            Pending
                        </span>

                        <strong>
                            {loading
                                ? "..."
                                : appointments.filter(
                                    (appointment) =>
                                        appointment.status ===
                                        "Pending"
                                ).length}
                        </strong>

                    </div>

                </article>


                <article className="appointments-summary-card">

                    <div className="appointments-summary-icon orange">

                        <Stethoscope size={20} />

                    </div>


                    <div>

                        <span>
                            Completed
                        </span>

                        <strong>
                            {loading
                                ? "..."
                                : appointments.filter(
                                    (appointment) =>
                                        appointment.status ===
                                        "Completed"
                                ).length}
                        </strong>

                    </div>

                </article>

            </section>


            {/* ==================================================
                Appointment List Card
                ================================================== */}

            <section className="appointments-card">


                {/* ==================================================
                    Card Header
                    ================================================== */}

                <div className="appointments-card-header">

                    <div>

                        <span className="appointments-card-kicker">
                            SCHEDULE
                        </span>

                        <h2>
                            Appointment List
                        </h2>

                    </div>


                    <div className="appointments-search">

                        <Search size={17} />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }
                            placeholder="Search appointments..."
                            aria-label="Search appointments"
                        />

                    </div>

                </div>


                {/* ==================================================
                    Loading
                    ================================================== */}

                {loading && (

                    <div className="appointments-state">

                        <RefreshCw
                            size={22}
                            className="appointments-spin"
                        />

                        <span>
                            Loading appointments...
                        </span>

                    </div>

                )}


                {/* ==================================================
                    Empty State
                    ================================================== */}

                {!loading &&
                    filteredAppointments.length === 0 && (

                        <div className="appointments-state">

                            <CalendarCheck2 size={28} />

                            <strong>
                                No appointments found
                            </strong>

                            <span>
                                {searchTerm
                                    ? "Try a different search term."
                                    : "There are no appointments available yet."}
                            </span>

                        </div>

                    )}


                {/* ==================================================
                    Desktop Table
                    ================================================== */}

                {!loading &&
                    filteredAppointments.length > 0 && (

                        <div className="appointments-table-wrapper">

                            <table className="appointments-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Patient
                                        </th>

                                        <th>
                                            Doctor
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Time
                                        </th>

                                        <th>
                                            Reason
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredAppointments.map(
                                        (appointment) => {

                                            const patientName =
                                                getPatientName(
                                                    appointment
                                                );

                                            const doctorName =
                                                getDoctorName(
                                                    appointment
                                                );


                                            return (

                                                <tr
                                                    key={
                                                        appointment._id
                                                    }
                                                >


                                                    {/* Patient */}

                                                    <td>

                                                        <div className="appointment-patient-cell">

                                                            <div className="appointment-avatar">

                                                                {
                                                                    getPatientInitials(
                                                                        patientName
                                                                    )
                                                                }

                                                            </div>


                                                            <div>

                                                                <strong>
                                                                    {
                                                                        patientName
                                                                    }
                                                                </strong>

                                                                <span>
                                                                    Patient
                                                                </span>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* Doctor */}

                                                    <td>

                                                        <div className="appointment-doctor-cell">

                                                            <Stethoscope
                                                                size={16}
                                                            />

                                                            <span>
                                                                {
                                                                    doctorName
                                                                }
                                                            </span>

                                                        </div>

                                                    </td>


                                                    {/* Date */}

                                                    <td>

                                                        <span className="appointment-date">

                                                            {
                                                                formatAppointmentDate(
                                                                    appointment.appointmentDate
                                                                )
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* Time */}

                                                    <td>

                                                        <span className="appointment-time">

                                                            <Clock3
                                                                size={15}
                                                            />

                                                            {
                                                                formatAppointmentTime(
                                                                    appointment.appointmentDate
                                                                )
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* Reason */}

                                                    <td>

                                                        <span className="appointment-reason">

                                                            {
                                                                appointment.reason ||
                                                                "—"
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* Status */}

                                                    <td>

                                                        <span
                                                            className={
                                                                `appointment-status ${(
                                                                    appointment.status ||
                                                                    "Pending"
                                                                )
                                                                    .toLowerCase()
                                                                    .replace(
                                                                        /\s+/g,
                                                                        "-"
                                                                    )}`
                                                            }
                                                        >

                                                            {
                                                                appointment.status ||
                                                                "Pending"
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* Action */}

                                                    <td>

                                                        <button
                                                            type="button"
                                                            className="appointment-action-button"
                                                            aria-label="Appointment options"
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


// ============================================================
// Export
// ============================================================

export default Appointments;


// ============================================================
// End of Appointments.jsx
// ============================================================

