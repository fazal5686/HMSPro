// ============================================================
// File: pages/Dashboard/Dashboard.jsx
// Purpose: HMSPro command-center dashboard.
// ============================================================

import { useEffect, useState } from "react";

import useAuthContext from "../../hooks/useAuthContext.js";

import {
    Activity,
    ArrowUpRight,
    BedDouble,
    CalendarCheck2,
    ChevronRight,
    Clock3,
    DollarSign,
    MoreHorizontal,
    Plus,
    Stethoscope,
    Users,
} from "lucide-react";

import API from "../../api/axios.js";

import "./Dashboard.css";


// ============================================================
// Static Dashboard Data
// ============================================================




const activities = [
    {
        title: "New patient registered",
        description: "Ahmad Khan was added to the system",
        time: "8 min ago",
        icon: Users,
        tone: "teal",
    },
    {
        title: "Admission completed",
        description: "Room 102 assigned successfully",
        time: "24 min ago",
        icon: BedDouble,
        tone: "purple",
    },
    {
        title: "Appointment confirmed",
        description: "Cardiology appointment confirmed",
        time: "41 min ago",
        icon: CalendarCheck2,
        tone: "blue",
    },
    {
        title: "Payment received",
        description: "Invoice #INV-2048 marked paid",
        time: "1 hr ago",
        icon: DollarSign,
        tone: "orange",
    },
];


const quickActions = [
    {
        label: "New Patient",
        icon: Users,
    },
    {
        label: "Book Appointment",
        icon: CalendarCheck2,
    },
    {
        label: "New Admission",
        icon: BedDouble,
    },
    {
        label: "Create Invoice",
        icon: DollarSign,
    },
];


// ============================================================
// Default Weekly Chart Data
// Used before API data arrives.
// ============================================================

const defaultWeeklyData = [
    {
        day: "Mon",
        scheduled: 0,
        completed: 0,
    },
    {
        day: "Tue",
        scheduled: 0,
        completed: 0,
    },
    {
        day: "Wed",
        scheduled: 0,
        completed: 0,
    },
    {
        day: "Thu",
        scheduled: 0,
        completed: 0,
    },
    {
        day: "Fri",
        scheduled: 0,
        completed: 0,
    },
    {
        day: "Sat",
        scheduled: 0,
        completed: 0,
    },
    {
        day: "Sun",
        scheduled: 0,
        completed: 0,
    },
];


// ============================================================
// Dashboard Component
// ============================================================

const Dashboard = () => {
    // ========================================================
    // Authenticated User
    // ========================================================

    const { user } = useAuthContext();


    // ========================================================
    // Dynamic Dashboard Greeting
    // ========================================================

    const currentHour =
        new Date().getHours();

    const greeting =
        currentHour < 12
            ? "Good morning"
            : currentHour < 18
                ? "Good afternoon"
                : "Good evening";


    const userName =
        user?.fullName ||
        "HMS Admin";
    // ========================================================
    // Dashboard Report State
    // ========================================================

    const [dashboardData, setDashboardData] =
        useState(null);

    const [dashboardLoading, setDashboardLoading] =
        useState(true);

    const [dashboardError, setDashboardError] =
        useState("");


    // ========================================================
    // Appointment Report State
    // ========================================================

    const [appointmentData, setAppointmentData] =
        useState(null);

    const [appointmentLoading, setAppointmentLoading] =
        useState(true);

    const [appointmentError, setAppointmentError] =
        useState("");
        // ========================================================
// Today's Appointments State
// ========================================================

const [todayAppointments, setTodayAppointments] =
useState([]);

const [todayAppointmentsLoading, setTodayAppointmentsLoading] =
useState(true);

const [todayAppointmentsError, setTodayAppointmentsError] =
useState("");
// ========================================================
// Room Report State
// ========================================================

const [roomData, setRoomData] =
    useState(null);

const [roomLoading, setRoomLoading] =
    useState(true);

const [roomError, setRoomError] =
    useState("");

    // ========================================================
    // Dashboard Statistics
    // ========================================================

    const stats = [
        {
            title: "Total Patients",

            value:
                dashboardData?.totalPatients ?? "—",

            change: "",

            note: "registered patients",

            icon: Users,

            tone: "teal",
        },

        {
            title: "Appointments",

            value:
                dashboardData?.totalAppointments ?? "—",

            change: "",

            note: "total appointments",

            icon: CalendarCheck2,

            tone: "blue",
        },

        {
            title: "Admissions",

            value:
                dashboardData?.totalAdmissions ?? "—",

            change: "",

            note: "total admissions",

            icon: BedDouble,

            tone: "purple",
        },

        {
            title: "Doctors",

            value:
                dashboardData?.totalDoctors ?? "—",

            change: "",

            note: "total doctors",

            icon: Stethoscope,

            tone: "orange",
        },
    ];


    // ========================================================
    // Load Dashboard Reports
    // ========================================================

    useEffect(() => {

        let mounted = true;


        const loadReports = async () => {

            try {
                setRoomLoading(true);

                setRoomError("");
                setDashboardLoading(true);

                setAppointmentLoading(true);

                setDashboardError("");

                setAppointmentError("");


                // ------------------------------------------------
                // Dashboard Report
                // ------------------------------------------------

                const dashboardResponse =
                    await API.get(
                        "/reports/dashboard"
                    );


                if (mounted) {

                    setDashboardData(
                        dashboardResponse.data?.data ?? null
                    );

                }


                // ------------------------------------------------
                // Appointment Report
                // ------------------------------------------------

                const appointmentResponse =
                    await API.get(
                        "/reports/appointments"
                    );


                if (mounted) {

                    setAppointmentData(
                        appointmentResponse.data?.data ?? null
                    );

                }
// ------------------------------------------------
// Room Data
// ------------------------------------------------

const roomResponse =
    await API.get(
        "/rooms"
    );

// ------------------------------------------------
// Today's Appointments
// ------------------------------------------------

const appointmentsResponse =
    await API.get(
        "/appointments"
    );

const allAppointments =
    appointmentsResponse.data?.data ?? [];

const todaysAppointments =
    allAppointments
        .filter(
            (appointment) =>
                isToday(
                    appointment.appointmentDate
                )
        )
        .sort(
            (a, b) =>
                new Date(a.appointmentDate) -
                new Date(b.appointmentDate)
        );

if (mounted) {

    setTodayAppointments(
        todaysAppointments
    );

}
if (mounted) {

    setRoomData(
        roomResponse.data?.data ?? []
    );

}
            } catch (error) {

                console.error(
                    "Dashboard reports error:",
                    error
                );


                const message =
                    error.response?.data?.message ||
                    "Unable to load dashboard data.";


                if (mounted) {

                    setDashboardError(message);

setAppointmentError(message);

setRoomError(message);
setTodayAppointmentsError(message);
                }

            } finally {

                if (mounted) {

                    setDashboardLoading(false);

setAppointmentLoading(false);

setRoomLoading(false);
setTodayAppointmentsLoading(false);
                }

            }

        };


        loadReports();


        return () => {

            mounted = false;

        };

    }, []);
// ============================================================
// Helper: Get Initials
// ============================================================

const getInitials = (name = "") => {

    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(
            (part) =>
                part.charAt(0).toUpperCase()
        )
        .join("");

};


// ============================================================
// Helper: Format Appointment Time
// ============================================================

const formatAppointmentTime = (date) => {

    if (!date) {
        return "—";
    }

    const appointmentDate =
        new Date(date);

    if (
        Number.isNaN(
            appointmentDate.getTime()
        )
    ) {
        return "—";
    }

    return appointmentDate.toLocaleTimeString(
        "en-US",
        {
            hour: "numeric",
            minute: "2-digit",
        }
    );

};


// ============================================================
// Helper: Check Appointment Is Today
// ============================================================

const isToday = (date) => {

    if (!date) {
        return false;
    }

    const appointmentDate =
        new Date(date);

    const today =
        new Date();

    return (
        appointmentDate.getFullYear() ===
            today.getFullYear() &&

        appointmentDate.getMonth() ===
            today.getMonth() &&

        appointmentDate.getDate() ===
            today.getDate()
    );

};

    // ========================================================
    // Weekly Appointment Data
    // ========================================================

    const weeklyAppointmentData =
        appointmentData?.weeklyAppointmentData?.length
            ? appointmentData.weeklyAppointmentData
            : defaultWeeklyData;
// ========================================================
// Room Occupancy Calculations
// ========================================================

const rooms = Array.isArray(roomData)
    ? roomData
    : [];

const totalRooms =
    rooms.length;

const occupiedRooms =
    rooms.filter(
        (room) =>
            room.status === "Occupied"
    ).length;

const availableRooms =
    rooms.filter(
        (room) =>
            room.status === "Available"
    ).length;

const reservedRooms =
    rooms.filter(
        (room) =>
            room.status === "Reserved"
    ).length;

const maintenanceRooms =
    rooms.filter(
        (room) =>
            room.status === "Maintenance"
    ).length;

const occupancyPercentage =
    totalRooms > 0
        ? Math.round(
            (occupiedRooms / totalRooms) * 100
        )
        : 0;

    // ========================================================
    // Find maximum chart value.
    //
    // This allows the bars to scale according to actual
    // appointment numbers from the backend.
    // ========================================================

    const chartMaximum =
        Math.max(

            ...weeklyAppointmentData.map(
                (item) =>
                    Math.max(
                        Number(item.scheduled) || 0,
                        Number(item.completed) || 0
                    )
            ),

            1

        );


    // ========================================================
    // Render
    // ========================================================

    return (

        <div className="dashboard-page">


            {/* ==================================================
                Page Header
                ================================================== */}

            <section className="dashboard-heading">

                <div>

                    <div className="dashboard-eyebrow">

                        <Activity size={15} />

                        <span>
                            Hospital Command Center
                        </span>

                    </div>


                    <h1>
                    {greeting}, {userName}
                    </h1>


                    <p>
                        Here's what's happening across your hospital today.
                    </p>

                </div>


                <button
                    type="button"
                    className="dashboard-primary-button"
                >

                    <Plus size={18} />

                    <span>
                        Quick Action
                    </span>

                </button>

            </section>


            {/* ==================================================
                Dashboard Error
                ================================================== */}

            {dashboardError && (

                <div className="dashboard-error">
                    {dashboardError}
                </div>

            )}


            {/* ==================================================
                Statistics
                ================================================== */}

            <section className="dashboard-stats">

                {stats.map((stat) => {

                    const Icon = stat.icon;


                    return (

                        <article
                            className="stat-card"
                            key={stat.title}
                        >

                            <div className="stat-card-top">

                                <div
                                    className={`stat-icon ${stat.tone}`}
                                >

                                    <Icon size={21} />

                                </div>


                                <button
                                    type="button"
                                    className="stat-more"
                                    aria-label={`${stat.title} options`}
                                >

                                    <MoreHorizontal size={18} />

                                </button>

                            </div>


                            <div className="stat-title">
                                {stat.title}
                            </div>


                            <div className="stat-value">

                                {dashboardLoading
                                    ? "..."
                                    : stat.value}

                            </div>


                            <div className="stat-footer">

                                {stat.change && (

                                    <span className="stat-change">

                                        <ArrowUpRight size={14} />

                                        {stat.change}

                                    </span>

                                )}


                                <span className="stat-note">
                                    {stat.note}
                                </span>

                            </div>

                        </article>

                    );

                })}

            </section>


            {/* ==================================================
                Main Analytics Row
                ================================================== */}

            <section className="dashboard-grid analytics-grid">


                {/* ==================================================
                    Appointment Overview
                    ================================================== */}

                <article className="dashboard-card appointment-chart-card">

                    <div className="card-header">

                        <div>

                            <span className="card-kicker">
                                APPOINTMENTS
                            </span>

                            <h2>
                                Appointment Overview
                            </h2>

                        </div>


                        <button
                            type="button"
                            className="card-period"
                        >

                            This week

                            <ChevronRight size={15} />

                        </button>

                    </div>


                    <div className="chart-summary">

                        <div>

                            <strong>

                                {appointmentLoading
                                    ? "..."
                                    : appointmentData?.totalAppointments ?? "—"}

                            </strong>

                            <span>
                                total appointments
                            </span>

                        </div>


                        <div className="chart-legend">

                            <span>

                                <i className="legend-dot scheduled"></i>

                                Scheduled

                            </span>


                            <span>

                                <i className="legend-dot completed"></i>

                                Completed

                            </span>

                        </div>

                    </div>


                    {appointmentError && (

                        <div className="dashboard-error">
                            {appointmentError}
                        </div>

                    )}


                    <div className="bar-chart">

                        {weeklyAppointmentData.map(
                            (item) => {

                                const scheduled =
                                    Number(item.scheduled) || 0;

                                const completed =
                                    Number(item.completed) || 0;


                                const scheduledHeight =
                                    scheduled > 0
                                        ? Math.max(
                                            (
                                                scheduled /
                                                chartMaximum
                                            ) * 100,
                                            8
                                        )
                                        : 0;


                                const completedHeight =
                                    completed > 0
                                        ? Math.max(
                                            (
                                                completed /
                                                chartMaximum
                                            ) * 100,
                                            8
                                        )
                                        : 0;


                                return (

                                    <div
                                        className="chart-column"
                                        key={item.day}
                                    >

                                        <div className="chart-bars">

                                            <div
                                                className="bar scheduled"
                                                style={{
                                                    height:
                                                        `${scheduledHeight}%`,
                                                }}
                                                title={
                                                    `Scheduled: ${scheduled}`
                                                }
                                            ></div>


                                            <div
                                                className="bar completed"
                                                style={{
                                                    height:
                                                        `${completedHeight}%`,
                                                }}
                                                title={
                                                    `Completed: ${completed}`
                                                }
                                            ></div>

                                        </div>


                                        <span>
                                            {item.day}
                                        </span>

                                    </div>

                                );

                            }
                        )}

                    </div>

                </article>


                {/* ==================================================
                    Room Occupancy
                    ================================================== */}

                <article className="dashboard-card occupancy-card">

                    <div className="card-header">

                        <div>

                            <span className="card-kicker">
                                CAPACITY
                            </span>

                            <h2>
                                Room Occupancy
                            </h2>

                        </div>


                        <button
                            type="button"
                            className="icon-card-button"
                            aria-label="Room details"
                        >

                            <MoreHorizontal size={18} />

                        </button>

                    </div>


                    <div className="occupancy-content">

                    <div
    className="occupancy-ring"
    style={{
        "--occupancy-angle":
            `${(occupancyPercentage / 100) * 360}deg`,
    }}
>

                            <div className="occupancy-ring-inner">

                            <strong>
    {roomLoading
        ? "..."
        : `${occupancyPercentage}%`}
</strong>

                                <span>
                                    Occupied
                                </span>

                            </div>

                        </div>


                        <div className="occupancy-details">

                            <div>

                                <span className="occupancy-label">

                                    <i className="occupancy-dot occupied"></i>

                                    Occupied

                                </span>

                                <strong>
    {roomLoading
        ? "..."
        : occupiedRooms}
</strong>

                            </div>


                            <div>

                                <span className="occupancy-label">

                                    <i className="occupancy-dot available"></i>

                                    Available

                                </span>

                                <strong>
    {roomLoading
        ? "..."
        : availableRooms}
</strong>

                            </div>


                            <div>

                                <span className="occupancy-label">

                                    <i className="occupancy-dot maintenance"></i>

                                    Maintenance

                                </span>

                                <strong>
    {roomLoading
        ? "..."
        : maintenanceRooms}
</strong>

                            </div>

                        </div>

                    </div>


                    <div className="occupancy-progress">

                        <div
                            className="occupancy-progress-value"
                            style={{
                                width: "72%",
                            }}
                        ></div>

                    </div>


                    <div className="occupancy-footer">

                        <span>
                            128 total beds
                        </span>

                        <span>
                            34 available
                        </span>

                    </div>

                </article>

            </section>


            {/* ==================================================
                Lower Dashboard
                ================================================== */}

            <section className="dashboard-grid lower-grid">


                {/* ==================================================
                    Today's Appointments
                    ================================================== */}

                <article className="dashboard-card appointments-card">

                    <div className="card-header">

                        <div>

                            <span className="card-kicker">
                                TODAY
                            </span>

                            <h2>
                                Today's Appointments
                            </h2>

                        </div>


                        <button
                            type="button"
                            className="view-all-button"
                        >

                            View all

                            <ChevronRight size={16} />

                        </button>

                    </div>


                    <div className="appointments-list">

    {todayAppointmentsLoading ? (

        <div className="appointments-empty">

            Loading today's appointments...

        </div>

    ) : todayAppointmentsError ? (

        <div className="appointments-empty">

            {todayAppointmentsError}

        </div>

    ) : todayAppointments.length === 0 ? (

        <div className="appointments-empty">

            No appointments scheduled for today.

        </div>

    ) : (

        todayAppointments
            .slice(0, 5)
            .map((appointment) => {

                const patientName =
                    appointment.patientId?.userId?.fullName ||
                    appointment.patientId?.fullName ||
                    "Unknown Patient";

                const doctorName =
                    appointment.doctorId?.userId?.fullName ||
                    appointment.doctorId?.fullName ||
                    "Unknown Doctor";

                const department =
                    appointment.doctorId?.department ||
                    "—";

                const initials =
                    getInitials(
                        patientName
                    );

                const status =
                    appointment.status ||
                    "Pending";

                return (

                    <div
                        className="appointment-row"
                        key={appointment._id}
                    >

                        <div className="patient-avatar">

                            {initials}

                        </div>


                        <div className="appointment-patient">

                            <strong>
                                {patientName}
                            </strong>

                            <span>
                                {doctorName}
                            </span>

                        </div>


                        <div className="appointment-department">

                            {department}

                        </div>


                        <div className="appointment-time">

                            <Clock3 size={15} />

                            {formatAppointmentTime(
                                appointment.appointmentDate
                            )}

                        </div>


                        <span
                            className={
                                `status-badge ${status
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`
                            }
                        >

                            {status}

                        </span>

                    </div>

                );

            })

    )}

</div>
                </article>


                {/* ==================================================
                    Recent Activity
                    ================================================== */}

                <article className="dashboard-card activity-card">

                    <div className="card-header">

                        <div>

                            <span className="card-kicker">
                                ACTIVITY
                            </span>

                            <h2>
                                Recent Activity
                            </h2>

                        </div>


                        <button
                            type="button"
                            className="icon-card-button"
                            aria-label="Activity options"
                        >

                            <MoreHorizontal size={18} />

                        </button>

                    </div>


                    <div className="activity-list">

                        {activities.map((activity) => {

                            const Icon = activity.icon;


                            return (

                                <div
                                    className="activity-row"
                                    key={activity.title}
                                >

                                    <div
                                        className={`activity-icon ${activity.tone}`}
                                    >

                                        <Icon size={16} />

                                    </div>


                                    <div className="activity-info">

                                        <strong>
                                            {activity.title}
                                        </strong>

                                        <span>
                                            {activity.description}
                                        </span>

                                    </div>


                                    <time>
                                        {activity.time}
                                    </time>

                                </div>

                            );

                        })}

                    </div>

                </article>

            </section>


            {/* ==================================================
                Quick Actions
                ================================================== */}

            <section className="quick-actions-section">

                <div className="quick-actions-heading">

                    <div>

                        <span className="card-kicker">
                            SHORTCUTS
                        </span>

                        <h2>
                            Quick Actions
                        </h2>

                    </div>


                    <Stethoscope size={22} />

                </div>


                <div className="quick-actions">

                    {quickActions.map((action) => {

                        const Icon = action.icon;


                        return (

                            <button
                                type="button"
                                className="quick-action"
                                key={action.label}
                            >

                                <span className="quick-action-icon">

                                    <Icon size={20} />

                                </span>


                                <span>
                                    {action.label}
                                </span>


                                <ChevronRight
                                    size={17}
                                    className="quick-action-arrow"
                                />

                            </button>

                        );

                    })}

                </div>

            </section>

        </div>

    );

};


export default Dashboard;