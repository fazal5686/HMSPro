// ============================================================
// File: pages/Dashboard/Dashboard.jsx
// Purpose: HMSPro command-center dashboard.
// ============================================================

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

import "./Dashboard.css";


// ============================================================
// Dashboard Data
// ============================================================

const stats = [
    {
        title: "Total Patients",
        value: "2,846",
        change: "+12.4%",
        note: "vs. last month",
        icon: Users,
        tone: "teal",
    },
    {
        title: "Appointments",
        value: "186",
        change: "+8.2%",
        note: "vs. last week",
        icon: CalendarCheck2,
        tone: "blue",
    },
    {
        title: "Admissions",
        value: "74",
        change: "+4.5%",
        note: "this month",
        icon: BedDouble,
        tone: "purple",
    },
    {
        title: "Revenue",
        value: "Rs 4.82M",
        change: "+15.7%",
        note: "vs. last month",
        icon: DollarSign,
        tone: "orange",
    },
];


const appointments = [
    {
        patient: "Ahmad Khan",
        doctor: "Dr. Sarah Ahmed",
        department: "Cardiology",
        time: "10:30 AM",
        status: "Confirmed",
        initials: "AK",
    },
    {
        patient: "Maria John",
        doctor: "Dr. Hamza Ali",
        department: "Neurology",
        time: "11:15 AM",
        status: "Waiting",
        initials: "MJ",
    },
    {
        patient: "Usman Shah",
        doctor: "Dr. Ayesha Noor",
        department: "Pediatrics",
        time: "12:00 PM",
        status: "Confirmed",
        initials: "US",
    },
    {
        patient: "Fatima Khan",
        doctor: "Dr. Bilal Ahmad",
        department: "Orthopedics",
        time: "01:30 PM",
        status: "Pending",
        initials: "FK",
    },
];


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
// Dashboard Component
// ============================================================

const Dashboard = () => {

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
                        Good afternoon, HMS Admin
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

                                <div className={`stat-icon ${stat.tone}`}>

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
                                {stat.value}
                            </div>


                            <div className="stat-footer">

                                <span className="stat-change">

                                    <ArrowUpRight size={14} />

                                    {stat.change}

                                </span>


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


                {/* Appointment Overview */}

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
                                186
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


                    <div className="bar-chart">

                        {[
                            ["Mon", 58, 40],
                            ["Tue", 72, 51],
                            ["Wed", 64, 45],
                            ["Thu", 88, 59],
                            ["Fri", 76, 52],
                            ["Sat", 48, 32],
                            ["Sun", 31, 20],
                        ].map(([day, scheduled, completed]) => (

                            <div
                                className="chart-column"
                                key={day}
                            >

                                <div className="chart-bars">

                                    <div
                                        className="bar scheduled"
                                        style={{
                                            height: `${scheduled}%`,
                                        }}
                                    ></div>

                                    <div
                                        className="bar completed"
                                        style={{
                                            height: `${completed}%`,
                                        }}
                                    ></div>

                                </div>


                                <span>
                                    {day}
                                </span>

                            </div>

                        ))}

                    </div>

                </article>


                {/* Room Occupancy */}

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

                        <div className="occupancy-ring">

                            <div className="occupancy-ring-inner">

                                <strong>
                                    72%
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
                                    86
                                </strong>

                            </div>


                            <div>

                                <span className="occupancy-label">

                                    <i className="occupancy-dot available"></i>

                                    Available

                                </span>

                                <strong>
                                    34
                                </strong>

                            </div>


                            <div>

                                <span className="occupancy-label">

                                    <i className="occupancy-dot maintenance"></i>

                                    Maintenance

                                </span>

                                <strong>
                                    8
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


                {/* Today's Appointments */}

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

                        {appointments.map((appointment) => (

                            <div
                                className="appointment-row"
                                key={`${appointment.patient}-${appointment.time}`}
                            >

                                <div className="patient-avatar">
                                    {appointment.initials}
                                </div>


                                <div className="appointment-patient">

                                    <strong>
                                        {appointment.patient}
                                    </strong>

                                    <span>
                                        {appointment.doctor}
                                    </span>

                                </div>


                                <div className="appointment-department">
                                    {appointment.department}
                                </div>


                                <div className="appointment-time">

                                    <Clock3 size={15} />

                                    {appointment.time}

                                </div>


                                <span
                                    className={`status-badge ${appointment.status.toLowerCase()}`}
                                >
                                    {appointment.status}
                                </span>

                            </div>

                        ))}

                    </div>

                </article>


                {/* Recent Activity */}

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