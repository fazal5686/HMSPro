// ============================================================
// File: pages/Reports/Reports.jsx
// Purpose: HMSPro Reports Center.
// Connects to the real Reports APIs.
// ============================================================

import { useEffect, useState } from "react";

import {
    Activity,
    AlertTriangle,
    BarChart3,
    BedDouble,
    CheckCircle2,
    Clock3,
    DollarSign,
    FileBarChart2,
    Package,
    Pill,
    RefreshCw,
    Stethoscope,
    TrendingUp,
    Users,
    XCircle,
} from "lucide-react";

import API from "../../api/axios.js";

import "./Reports.css";


// ============================================================
// Reports Component
// ============================================================

const Reports = () => {

    // ========================================================
    // State
    // ========================================================

    const [dashboard, setDashboard] = useState(null);

    const [appointments, setAppointments] = useState(null);

    const [admissions, setAdmissions] = useState(null);

    const [billing, setBilling] = useState(null);

    const [inventory, setInventory] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [refreshing, setRefreshing] = useState(false);


    // ========================================================
    // Load Reports
    // ========================================================

    const loadReports = async () => {

        try {

            setError("");

            setRefreshing(true);

            const [

                dashboardResponse,

                appointmentsResponse,

                admissionsResponse,

                billingResponse,

                inventoryResponse,

            ] = await Promise.all([

                API.get("/reports/dashboard"),

                API.get("/reports/appointments"),

                API.get("/reports/admissions"),

                API.get("/reports/billing"),

                API.get("/reports/medicines"),

            ]);


            setDashboard(
                dashboardResponse.data?.data
            );


            setAppointments(
                appointmentsResponse.data?.data
            );


            setAdmissions(
                admissionsResponse.data?.data
            );


            setBilling(
                billingResponse.data?.data
            );


            setInventory(
                inventoryResponse.data?.data
            );

        } catch (err) {

            console.error(
                "Reports loading error:",
                err
            );


            setError(
                err.response?.data?.message ||
                "Unable to load reports."
            );

        } finally {

            setLoading(false);

            setRefreshing(false);

        }

    };


    // ========================================================
    // Initial Load
    // ========================================================

    useEffect(() => {

        loadReports();

    }, []);


    // ========================================================
    // Loading State
    // ========================================================

    if (loading) {

        return (

            <div className="reports-loading">

                <RefreshCw
                    size={28}
                    className="reports-loading-icon"
                />

                <strong>
                    Loading reports...
                </strong>

                <span>
                    Gathering the latest hospital statistics.
                </span>

            </div>

        );

    }


    // ========================================================
    // Error State
    // ========================================================

    if (error) {

        return (

            <div className="reports-error">

                <div className="reports-error-icon">

                    <AlertTriangle
                        size={28}
                    />

                </div>


                <div>

                    <strong>
                        Unable to load reports
                    </strong>

                    <p>
                        {error}
                    </p>

                </div>


                <button
                    type="button"
                    onClick={loadReports}
                >

                    <RefreshCw
                        size={16}
                    />

                    Retry

                </button>

            </div>

        );

    }


    // ========================================================
    // Safe Values
    // ========================================================

    const totalPatients =
        dashboard?.totalPatients ?? 0;

    const totalDoctors =
        dashboard?.totalDoctors ?? 0;

    const activeDoctors =
        dashboard?.activeDoctors ?? 0;

    const totalAppointments =
        dashboard?.totalAppointments ?? 0;

    const totalAdmissions =
        dashboard?.totalAdmissions ?? 0;

    const activeAdmissions =
        dashboard?.activeAdmissions ?? 0;

    const totalMedicines =
        dashboard?.totalMedicines ?? 0;

    const activeMedicines =
        dashboard?.activeMedicines ?? 0;


    const totalBilling =
        billing?.totalAmount ?? 0;


    const totalBills =
        billing?.totalBills ?? 0;


    const weeklyData =
        appointments?.weeklyAppointmentData || [];


    // ========================================================
    // Format Currency
    // ========================================================

    const formatCurrency = (value) => {

        return new Intl.NumberFormat(
            "en-PK",
            {
                style: "currency",
                currency: "PKR",
                maximumFractionDigits: 0,
            }
        ).format(value || 0);

    };


    // ========================================================
    // Find maximum chart value
    // ========================================================

    const chartMaximum =
        Math.max(

            1,

            ...weeklyData.flatMap(
                (item) => [
                    item.scheduled || 0,
                    item.completed || 0,
                ]
            )

        );


    // ========================================================
    // Summary Cards
    // ========================================================

    const summaryCards = [

        {
            title: "Patients",
            value: totalPatients,
            note: "Registered patients",
            icon: Users,
            tone: "teal",
        },

        {
            title: "Doctors",
            value: totalDoctors,
            note: `${activeDoctors} active doctors`,
            icon: Stethoscope,
            tone: "blue",
        },

        {
            title: "Appointments",
            value: totalAppointments,
            note: "Total appointments",
            icon: Clock3,
            tone: "purple",
        },

        {
            title: "Admissions",
            value: totalAdmissions,
            note: `${activeAdmissions} currently active`,
            icon: BedDouble,
            tone: "orange",
        },

        {
            title: "Medicines",
            value: totalMedicines,
            note: `${activeMedicines} active medicines`,
            icon: Pill,
            tone: "green",
        },

        {
            title: "Billing",
            value: formatCurrency(totalBilling),
            note: `${totalBills} total bills`,
            icon: DollarSign,
            tone: "rose",
        },

    ];


    // ========================================================
    // Render
    // ========================================================

    return (

        <div className="reports-page">


            {/* ==================================================
                Header
                ================================================== */}

            <section className="reports-header">

                <div>

                    <div className="reports-eyebrow">

                        <FileBarChart2
                            size={16}
                        />

                        <span>
                            REPORTING CENTER
                        </span>

                    </div>


                    <h1>
                        Hospital Reports
                    </h1>


                    <p>
                        Monitor hospital activity, appointments,
                        admissions, billing and inventory.
                    </p>

                </div>


                <button
                    type="button"
                    className="reports-refresh-button"
                    onClick={loadReports}
                    disabled={refreshing}
                >

                    <RefreshCw
                        size={17}
                        className={
                            refreshing
                                ? "reports-spin"
                                : ""
                        }
                    />

                    <span>
                        Refresh
                    </span>

                </button>

            </section>



            {/* ==================================================
                Summary Cards
                ================================================== */}

            <section className="reports-summary-grid">

                {summaryCards.map((card) => {

                    const Icon = card.icon;

                    return (

                        <article
                            className="report-summary-card"
                            key={card.title}
                        >

                            <div
                                className={`report-summary-icon ${card.tone}`}
                            >

                                <Icon
                                    size={21}
                                />

                            </div>


                            <div className="report-summary-content">

                                <span>
                                    {card.title}
                                </span>

                                <strong>
                                    {card.value}
                                </strong>

                                <small>
                                    {card.note}
                                </small>

                            </div>

                        </article>

                    );

                })}

            </section>



            {/* ==================================================
                Main Reports Grid
                ================================================== */}

            <section className="reports-main-grid">


                {/* ==================================================
                    Appointment Report
                    ================================================== */}

                <article className="reports-card appointment-report-card">

                    <div className="reports-card-header">

                        <div>

                            <span className="reports-card-kicker">
                                APPOINTMENTS
                            </span>

                            <h2>
                                Appointment Overview
                            </h2>

                        </div>


                        <div className="reports-card-header-icon">

                            <BarChart3
                                size={20}
                            />

                        </div>

                    </div>


                    <div className="appointment-status-grid">

                        <div className="appointment-status">

                            <span>
                                Total
                            </span>

                            <strong>
                                {appointments?.totalAppointments ?? 0}
                            </strong>

                        </div>


                        <div className="appointment-status pending">

                            <span>
                                Pending
                            </span>

                            <strong>
                                {appointments?.pendingAppointments ?? 0}
                            </strong>

                        </div>


                        <div className="appointment-status confirmed">

                            <span>
                                Confirmed
                            </span>

                            <strong>
                                {appointments?.confirmedAppointments ?? 0}
                            </strong>

                        </div>


                        <div className="appointment-status completed">

                            <span>
                                Completed
                            </span>

                            <strong>
                                {appointments?.completedAppointments ?? 0}
                            </strong>

                        </div>


                        <div className="appointment-status cancelled">

                            <span>
                                Cancelled
                            </span>

                            <strong>
                                {appointments?.cancelledAppointments ?? 0}
                            </strong>

                        </div>


                        <div className="appointment-status no-show">

                            <span>
                                No Show
                            </span>

                            <strong>
                                {appointments?.noShowAppointments ?? 0}
                            </strong>

                        </div>

                    </div>


                    {/* Weekly Chart */}

                    <div className="weekly-report">

                        <div className="weekly-report-heading">

                            <div>

                                <strong>
                                    Weekly Appointments
                                </strong>

                                <span>
                                    Monday to Sunday
                                </span>

                            </div>


                            <div className="weekly-legend">

                                <span>
                                    <i className="legend scheduled"></i>
                                    Scheduled
                                </span>

                                <span>
                                    <i className="legend completed"></i>
                                    Completed
                                </span>

                            </div>

                        </div>


                        <div className="weekly-chart">

                            {weeklyData.map((item) => {

                                const scheduled =
                                    item.scheduled || 0;

                                const completed =
                                    item.completed || 0;


                                const scheduledHeight =
                                    `${Math.max(
                                        scheduled === 0
                                            ? 0
                                            : 6,
                                        (scheduled / chartMaximum) * 100
                                    )}%`;


                                const completedHeight =
                                    `${Math.max(
                                        completed === 0
                                            ? 0
                                            : 6,
                                        (completed / chartMaximum) * 100
                                    )}%`;


                                return (

                                    <div
                                        className="weekly-column"
                                        key={item.day}
                                    >

                                        <div className="weekly-bars">

                                            <div
                                                className="weekly-bar scheduled"
                                                style={{
                                                    height:
                                                        scheduledHeight,
                                                }}
                                                title={`Scheduled: ${scheduled}`}
                                            >
                                            </div>


                                            <div
                                                className="weekly-bar completed"
                                                style={{
                                                    height:
                                                        completedHeight,
                                                }}
                                                title={`Completed: ${completed}`}
                                            >
                                            </div>

                                        </div>


                                        <span>
                                            {item.day}
                                        </span>

                                    </div>

                                );

                            })}

                        </div>

                    </div>

                </article>



                {/* ==================================================
                    Admission Report
                    ================================================== */}

                <article className="reports-card admission-report-card">

                    <div className="reports-card-header">

                        <div>

                            <span className="reports-card-kicker">
                                ADMISSIONS
                            </span>

                            <h2>
                                Admission Summary
                            </h2>

                        </div>


                        <div className="reports-card-header-icon purple">

                            <BedDouble
                                size={20}
                            />

                        </div>

                    </div>


                    <div className="admission-total">

                        <span>
                            Total Admissions
                        </span>

                        <strong>
                            {admissions?.totalAdmissions ?? 0}
                        </strong>

                    </div>


                    <div className="admission-stat-row">

                        <div>

                            <div className="admission-stat-icon active">

                                <Activity
                                    size={17}
                                />

                            </div>

                            <span>
                                Active
                            </span>

                        </div>


                        <strong>
                            {admissions?.activeAdmissions ?? 0}
                        </strong>

                    </div>


                    <div className="admission-stat-row">

                        <div>

                            <div className="admission-stat-icon discharged">

                                <CheckCircle2
                                    size={17}
                                />

                            </div>

                            <span>
                                Discharged
                            </span>

                        </div>


                        <strong>
                            {admissions?.dischargedAdmissions ?? 0}
                        </strong>

                    </div>


                    <div className="admission-progress">

                        <div>

                            <span>
                                Active admission rate
                            </span>

                            <strong>
                                {
                                    totalAdmissions > 0
                                        ? Math.round(
                                            (
                                                (admissions?.activeAdmissions || 0)
                                                /
                                                totalAdmissions
                                            ) * 100
                                        )
                                        : 0
                                }%
                            </strong>

                        </div>


                        <div className="admission-progress-track">

                            <div
                                style={{
                                    width:
                                        totalAdmissions > 0
                                            ? `${(
                                                (
                                                    admissions?.activeAdmissions || 0
                                                )
                                                /
                                                totalAdmissions
                                            ) * 100}%`
                                            : "0%",
                                }}
                            >
                            </div>

                        </div>

                    </div>

                </article>



                {/* ==================================================
                    Billing Report
                    ================================================== */}

                <article className="reports-card billing-report-card">

                    <div className="reports-card-header">

                        <div>

                            <span className="reports-card-kicker">
                                BILLING
                            </span>

                            <h2>
                                Financial Summary
                            </h2>

                        </div>


                        <div className="reports-card-header-icon orange">

                            <DollarSign
                                size={20}
                            />

                        </div>

                    </div>


                    <div className="billing-total">

                        <span>
                            Total Billing Amount
                        </span>

                        <strong>
                            {formatCurrency(totalBilling)}
                        </strong>

                    </div>


                    <div className="billing-details">

                        <div>

                            <span>
                                Total Bills
                            </span>

                            <strong>
                                {totalBills}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Average Bill
                            </span>

                            <strong>

                                {
                                    totalBills > 0
                                        ? formatCurrency(
                                            totalBilling / totalBills
                                        )
                                        : formatCurrency(0)
                                }

                            </strong>

                        </div>

                    </div>


                    <div className="billing-highlight">

                        <TrendingUp
                            size={18}
                        />

                        <span>
                            Billing data is synchronized with
                            the HMSPro database.
                        </span>

                    </div>

                </article>



                {/* ==================================================
                    Medicine Inventory
                    ================================================== */}

                <article className="reports-card inventory-report-card">

                    <div className="reports-card-header">

                        <div>

                            <span className="reports-card-kicker">
                                PHARMACY
                            </span>

                            <h2>
                                Medicine Inventory
                            </h2>

                        </div>


                        <div className="reports-card-header-icon green">

                            <Package
                                size={20}
                            />

                        </div>

                    </div>


                    <div className="inventory-value">

                        <span>
                            Total Inventory Value
                        </span>

                        <strong>
                            {formatCurrency(
                                inventory?.totalInventoryValue ?? 0
                            )}
                        </strong>

                    </div>


                    <div className="inventory-grid">

                        <div>

                            <CheckCircle2
                                size={17}
                            />

                            <span>
                                Active
                            </span>

                            <strong>
                                {inventory?.activeMedicines ?? 0}
                            </strong>

                        </div>


                        <div>

                            <XCircle
                                size={17}
                            />

                            <span>
                                Inactive
                            </span>

                            <strong>
                                {inventory?.inactiveMedicines ?? 0}
                            </strong>

                        </div>


                        <div>

                            <AlertTriangle
                                size={17}
                            />

                            <span>
                                Low Stock
                            </span>

                            <strong>
                                {inventory?.lowStockMedicines ?? 0}
                            </strong>

                        </div>


                        <div>

                            <AlertTriangle
                                size={17}
                            />

                            <span>
                                Out of Stock
                            </span>

                            <strong>
                                {inventory?.outOfStockMedicines ?? 0}
                            </strong>

                        </div>

                    </div>

                </article>

            </section>



            {/* ==================================================
                Report Footer
                ================================================== */}

            <section className="reports-footer">

                <div>

                    <CheckCircle2
                        size={17}
                    />

                    <span>
                        Reports are connected to live HMSPro data.
                    </span>

                </div>


                <span>
                    Last refreshed automatically on page load
                </span>

            </section>

        </div>

    );

};


export default Reports;