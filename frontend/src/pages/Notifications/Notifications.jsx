
// ============================================================
// File: pages/Notifications/Notifications.jsx
// Purpose: HMSPro notification center.
// Frontend notification experience for the current phase.
// ============================================================

import { useMemo, useState } from "react";

import {
    AlertCircle,
    Bell,
    CalendarDays,
    CheckCircle2,
    CheckCheck,
    Clock3,
    Info,
    Pill,
    Search,
    Trash2,
    UserRound,
} from "lucide-react";

import "./Notifications.css";


// ============================================================
// Initial Notifications
// ============================================================

const initialNotifications = [
    {
        id: 1,
        type: "appointment",
        title: "Appointment scheduled",
        message: "A new patient appointment has been scheduled.",
        time: "10 minutes ago",
        unread: true,
        icon: CalendarDays,
    },
    {
        id: 2,
        type: "patient",
        title: "New patient registered",
        message: "A new patient profile has been added to HMSPro.",
        time: "35 minutes ago",
        unread: true,
        icon: UserRound,
    },
    {
        id: 3,
        type: "medicine",
        title: "Medicine inventory update",
        message: "Medicine inventory information has been updated.",
        time: "1 hour ago",
        unread: true,
        icon: Pill,
    },
    {
        id: 4,
        type: "system",
        title: "System information",
        message: "HMSPro system services are operating normally.",
        time: "2 hours ago",
        unread: false,
        icon: Info,
    },
    {
        id: 5,
        type: "appointment",
        title: "Appointment completed",
        message: "An appointment has been marked as completed.",
        time: "3 hours ago",
        unread: false,
        icon: CheckCircle2,
    },
    {
        id: 6,
        type: "warning",
        title: "Low medicine stock",
        message: "One or more medicines require stock attention.",
        time: "Yesterday",
        unread: false,
        icon: AlertCircle,
    },
];


// ============================================================
// Filter Options
// ============================================================

const filterOptions = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Unread",
        value: "unread",
    },
    {
        label: "Appointments",
        value: "appointment",
    },
    {
        label: "Patients",
        value: "patient",
    },
    {
        label: "System",
        value: "system",
    },
];


// ============================================================
// Notifications Component
// ============================================================

const Notifications = () => {

    const [notifications, setNotifications] =
        useState(initialNotifications);

    const [activeFilter, setActiveFilter] =
        useState("all");

    const [searchTerm, setSearchTerm] =
        useState("");


    // ========================================================
    // Unread Count
    // ========================================================

    const unreadCount =
        notifications.filter(
            (notification) =>
                notification.unread
        ).length;


    // ========================================================
    // Filter Notifications
    // ========================================================

    const filteredNotifications =
        useMemo(() => {

            return notifications.filter(
                (notification) => {

                    const matchesFilter =
                        activeFilter === "all"
                            ? true
                            : activeFilter === "unread"
                                ? notification.unread
                                : notification.type === activeFilter;


                    const search =
                        searchTerm
                            .trim()
                            .toLowerCase();


                    const matchesSearch =
                        !search ||
                        notification.title
                            .toLowerCase()
                            .includes(search) ||
                        notification.message
                            .toLowerCase()
                            .includes(search);


                    return (
                        matchesFilter &&
                        matchesSearch
                    );

                }
            );

        }, [
            notifications,
            activeFilter,
            searchTerm,
        ]);


    // ========================================================
    // Mark Notification As Read
    // ========================================================

    const markAsRead = (id) => {

        setNotifications(
            (previous) =>
                previous.map(
                    (notification) =>
                        notification.id === id
                            ? {
                                ...notification,
                                unread: false,
                            }
                            : notification
                )
        );

    };


    // ========================================================
    // Mark All As Read
    // ========================================================

    const markAllAsRead = () => {

        setNotifications(
            (previous) =>
                previous.map(
                    (notification) => ({
                        ...notification,
                        unread: false,
                    })
                )
        );

    };


    // ========================================================
    // Delete Notification
    // ========================================================

    const deleteNotification = (id) => {

        setNotifications(
            (previous) =>
                previous.filter(
                    (notification) =>
                        notification.id !== id
                )
        );

    };


    // ========================================================
    // Clear All
    // ========================================================

    const clearAll = () => {

        setNotifications([]);

    };


    // ========================================================
    // Render
    // ========================================================

    return (

        <div className="notifications-page">


            {/* ==================================================
                Header
                ================================================== */}

            <section className="notifications-header">

                <div>

                    <div className="notifications-eyebrow">

                        <Bell size={16} />

                        <span>
                            NOTIFICATION CENTER
                        </span>

                    </div>


                    <h1>
                        Notifications
                    </h1>


                    <p>
                        Stay informed about appointments,
                        patients, medicines and system activity.
                    </p>

                </div>


                <div className="notifications-header-summary">

                    <div className="notifications-count-icon">

                        <Bell size={21} />

                    </div>


                    <div>

                        <strong>
                            {unreadCount}
                        </strong>

                        <span>
                            Unread
                        </span>

                    </div>

                </div>

            </section>



            {/* ==================================================
                Toolbar
                ================================================== */}

            <section className="notifications-toolbar">

                <div className="notifications-filters">

                    {filterOptions.map(
                        (filter) => (

                            <button
                                key={filter.value}
                                type="button"
                                className={
                                    activeFilter === filter.value
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setActiveFilter(
                                        filter.value
                                    )
                                }
                            >

                                {filter.label}

                                {filter.value === "unread" && (
                                    <span>
                                        {unreadCount}
                                    </span>
                                )}

                            </button>

                        )
                    )}

                </div>


                <div className="notifications-actions">

                    <label className="notifications-search">

                        <Search size={17} />

                        <input
                            type="search"
                            placeholder="Search notifications..."
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }
                        />

                    </label>


                    <button
                        type="button"
                        className="notifications-action-button"
                        onClick={markAllAsRead}
                        disabled={!unreadCount}
                    >

                        <CheckCheck size={16} />

                        Mark all read

                    </button>


                    <button
                        type="button"
                        className="notifications-clear-button"
                        onClick={clearAll}
                        disabled={!notifications.length}
                    >

                        <Trash2 size={16} />

                        Clear all

                    </button>

                </div>

            </section>



            {/* ==================================================
                Notification List
                ================================================== */}

            <section className="notifications-card">

                <div className="notifications-card-header">

                    <div>

                        <span className="notifications-card-kicker">
                            RECENT ACTIVITY
                        </span>

                        <h2>
                            Your Notifications
                        </h2>

                    </div>


                    <span className="notifications-card-total">

                        {filteredNotifications.length}
                        {" "}
                        {filteredNotifications.length === 1
                            ? "notification"
                            : "notifications"}

                    </span>

                </div>



                {filteredNotifications.length > 0 ? (

                    <div className="notification-list">

                        {filteredNotifications.map(
                            (notification) => {

                                const Icon =
                                    notification.icon;


                                return (

                                    <article
                                        className={
                                            `notification-item ${
                                                notification.unread
                                                    ? "unread"
                                                    : ""
                                            }`
                                        }
                                        key={notification.id}
                                    >

                                        <div
                                            className={
                                                `notification-icon ${
                                                    notification.type
                                                }`
                                            }
                                        >

                                            <Icon size={19} />

                                        </div>


                                        <div className="notification-content">

                                            <div className="notification-title-row">

                                                <h3>
                                                    {notification.title}
                                                </h3>


                                                {notification.unread && (

                                                    <span className="notification-unread">
                                                        New
                                                    </span>

                                                )}

                                            </div>


                                            <p>
                                                {notification.message}
                                            </p>


                                            <div className="notification-meta">

                                                <span>

                                                    <Clock3
                                                        size={13}
                                                    />

                                                    {notification.time}

                                                </span>

                                            </div>

                                        </div>


                                        <div className="notification-item-actions">

                                            {notification.unread && (

                                                <button
                                                    type="button"
                                                    title="Mark as read"
                                                    aria-label="Mark notification as read"
                                                    onClick={() =>
                                                        markAsRead(
                                                            notification.id
                                                        )
                                                    }
                                                >

                                                    <CheckCircle2
                                                        size={17}
                                                    />

                                                </button>

                                            )}


                                            <button
                                                type="button"
                                                title="Delete notification"
                                                aria-label="Delete notification"
                                                onClick={() =>
                                                    deleteNotification(
                                                        notification.id
                                                    )
                                                }
                                            >

                                                <Trash2
                                                    size={17}
                                                />

                                            </button>

                                        </div>

                                    </article>

                                );

                            }
                        )}

                    </div>

                ) : (

                    <div className="notifications-empty">

                        <div className="notifications-empty-icon">

                            <Bell size={28} />

                        </div>


                        <strong>
                            No notifications found
                        </strong>


                        <span>
                            There are no notifications matching
                            your current filter or search.
                        </span>

                    </div>

                )}

            </section>



            {/* ==================================================
                Footer
                ================================================== */}

            <section className="notifications-footer">

                <div>

                    <CheckCircle2 size={16} />

                    <span>
                        Notification center is ready for
                        HMSPro notification service integration.
                    </span>

                </div>

            </section>


        </div>

    );

};


export default Notifications;
