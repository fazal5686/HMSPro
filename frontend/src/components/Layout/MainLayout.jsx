// ============================================================
// File:
// D:\HMSPro\frontend\src\components\Layout\MainLayout.jsx
//
// Purpose:
// Main HMSPro application shell.
//
// Responsibilities:
// 1. Displays HMSPro sidebar navigation.
// 2. Provides professional role-based navigation.
// 3. Displays authenticated user's information.
// 4. Provides Admin/SuperAdmin Users navigation.
// 5. Provides Notifications and Profile access.
// 6. Provides Sign Out functionality.
// 7. Renders child pages through Outlet.
//
// Important:
// Frontend navigation is for user experience only.
// Backend authorization remains the final security layer.
// ============================================================

import {
    LayoutDashboard,
    Users,
    Stethoscope,
    CalendarDays,
    ClipboardList,
    BedDouble,
    Pill,
    FlaskConical,
    ReceiptText,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    Bell,
    Search,
    ChevronDown,
    Hospital,
    ScanLine,
    HeartPulse,
    UserRound,
    UserCog,
    DoorOpen,
    FileBarChart,
} from "lucide-react";

import {
    NavLink,
    Outlet,
    useNavigate,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth.js";

import "./MainLayout.css";


// ============================================================
// Navigation Configuration
// ============================================================
//
// Each item contains an allowedRoles array.
//
// Backend authorization MUST still protect every API endpoint.
// These rules only control what appears in the sidebar.
// ============================================================

const navigationSections = [

    // ========================================================
    // Clinical
    // ========================================================

    {
        title: "CLINICAL",

        items: [

            {
                label: "Patients",
                path: "/patients",
                icon: Users,

                allowedRoles: [
                    "SuperAdmin",
                    "Admin",
                    "Doctor",
                    "Nurse",
                    "Receptionist",
                    "LabTechnician",
                    "Pharmacist",
                    "Accountant",
                ],
            },

            {
                label: "Doctors",
                path: "/doctors",
                icon: Stethoscope,

                allowedRoles: [
                    "SuperAdmin",
                    "Admin",
                    "Doctor",
                    "Nurse",
                    "Receptionist",
                ],
            },

            {
                label: "Departments",
                path: "/departments",
                icon: Hospital,

                allowedRoles: [
                    "SuperAdmin",
                    "Admin",
                    "Doctor",
                    "Nurse",
                    "Receptionist",
                ],
            },

            {
                label: "Nurses",
                path: "/nurses",
                icon: HeartPulse,

                allowedRoles: [
                    "SuperAdmin",
                    "Admin",
                    "Doctor",
                    "Nurse",
                ],
            },

        ],
    },


    // ========================================================
    // Operations
    // ========================================================

    {
        title: "OPERATIONS",

        items: [

            {
                label: "Appointments",
                path: "/appointments",
                icon: CalendarDays,

                allowedRoles: [
                    "SuperAdmin",
                    "Admin",
                    "Doctor",
                    "Nurse",
                    "Receptionist",
                    "Patient",
                ],
            },

            {
                label: "Admissions",
                path: "/admissions",
                icon: ClipboardList,

                allowedRoles: [
                    "SuperAdmin",
                    "Admin",
                    "Doctor",
                    "Nurse",
                    "Receptionist",
                ],
            },

            {
                label: "Discharges",
                path: "/discharges",
                icon: FileBarChart,

                allowedRoles: [
                    "SuperAdmin",
                    "Admin",
                    "Doctor",
                    "Nurse",
                    "Receptionist",
                ],
            },

            {
                label: "Rooms & Beds",
                path: "/rooms",
                icon: BedDouble,

                allowedRoles: [
                    "SuperAdmin",
                    "Admin",
                    "Doctor",
                    "Nurse",
                    "Receptionist",
                ],
            },

        ],
    },


    // ========================================================
    // Services
    // ========================================================

    {
        title: "SERVICES",

        items: [

            {
                label: "Pharmacy",
                path: "/pharmacy",
                icon: Pill,

                allowedRoles: [
                    "SuperAdmin",
                    "Admin",
                    "Doctor",
                    "Nurse",
                    "Pharmacist",
                ],
            },

            {
                label: "Laboratory",
                path: "/laboratory",
                icon: FlaskConical,

                allowedRoles: [
                    "SuperAdmin",
                    "Admin",
                    "Doctor",
                    "Nurse",
                    "LabTechnician",
                ],
            },

            {
                label: "Radiology",
                path: "/radiology",
                icon: ScanLine,

                allowedRoles: [
                    "SuperAdmin",
                    "Admin",
                    "Doctor",
                    "Nurse",
                ],
            },

        ],
    },


    // ========================================================
    // Finance & Analytics
    // ========================================================

    {
        title: "FINANCE & ANALYTICS",

        items: [

            {
                label: "Billing",
                path: "/billing",
                icon: ReceiptText,

                allowedRoles: [
                    "SuperAdmin",
                    "Admin",
                    "Receptionist",
                    "Accountant",
                ],
            },

            {
                label: "Reports",
                path: "/reports",
                icon: BarChart3,

                allowedRoles: [
                    "SuperAdmin",
                    "Admin",
                    "Doctor",
                    "Accountant",
                ],
            },

        ],
    },

];


// ============================================================
// Main Layout Component
// ============================================================

const MainLayout = () => {

    const navigate = useNavigate();

    const {
        user,
        logout,
    } = useAuth();


    // ========================================================
    // User Information
    // ========================================================

    const userName =
        user?.fullName ||
        "HMS User";


    const userRole =
        user?.role ||
        "User";


    const userInitial =
        userName
            .trim()
            .charAt(0)
            .toUpperCase() ||
        "U";


    // ========================================================
    // Administrative Roles
    // ========================================================

    const canManageUsers =
        userRole === "Admin" ||
        userRole === "SuperAdmin";


    // ========================================================
    // Dashboard Access
    //
    // All authenticated roles can access their dashboard.
    // ========================================================

    const dashboardRoles = [
        "SuperAdmin",
        "Admin",
        "Doctor",
        "Receptionist",
        "Nurse",
        "LabTechnician",
        "Pharmacist",
        "Accountant",
        "Patient",
    ];


    const canAccessDashboard =
        dashboardRoles.includes(userRole);


    // ========================================================
    // Profile Access
    //
    // Profile is intentionally available to every authenticated
    // user. The page itself determines what profile information
    // is appropriate for the current account.
    // ========================================================

    const canAccessProfile = true;


    // ========================================================
    // Notification Access
    // ========================================================

    const canAccessNotifications = true;


    // ========================================================
    // Settings Access
    // ========================================================

    const canAccessSettings = true;


    // ========================================================
    // Filter Navigation
    // ========================================================

    const visibleSections =
        navigationSections
            .map((section) => ({

                ...section,

                items:
                    section.items.filter(
                        (item) =>
                            item.allowedRoles.includes(
                                userRole
                            )
                    ),

            }))
            .filter(
                (section) =>
                    section.items.length > 0
            );


    // ========================================================
    // Handle Logout
    // ========================================================

    const handleLogout = () => {

        logout();

        navigate(
            "/login",
            {
                replace: true,
            }
        );

    };


    // ========================================================
    // Render Navigation Item
    // ========================================================

    const renderNavItem = (item) => {

        const Icon = item.icon;

        return (

            <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                    `hms-nav-item ${
                        isActive
                            ? "active"
                            : ""
                    }`
                }
            >

                <Icon
                    size={19}
                    strokeWidth={2}
                />

                <span>
                    {item.label}
                </span>

            </NavLink>

        );

    };


    // ========================================================
    // JSX
    // ========================================================

    return (

        <div className="hms-layout">


            {/* ==================================================
                SIDEBAR
                ================================================== */}

            <aside className="hms-sidebar">


                {/* ==================================================
                    Brand
                    ================================================== */}

                <div className="hms-brand">

                    <div className="hms-brand-icon">

                        <span className="hms-brand-monogram">
                            HT
                        </span>

                    </div>


                    <div className="hms-brand-text">

                        <strong>
                            HMSPro
                        </strong>

                        <span>
                            Hospital Management System
                        </span>

                    </div>

                </div>


                {/* ==================================================
                    Navigation
                    ================================================== */}

                <nav className="hms-navigation">


                    {/* ==================================================
                        Main Menu
                        ================================================== */}

                    <p className="hms-nav-title">
                        MAIN MENU
                    </p>


                    {canAccessDashboard && (

                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `hms-nav-item ${
                                    isActive
                                        ? "active"
                                        : ""
                                }`
                            }
                        >

                            <LayoutDashboard
                                size={19}
                                strokeWidth={2}
                            />

                            <span>
                                Dashboard
                            </span>

                        </NavLink>

                    )}


                    {/* ==================================================
                        Patient Personal Area
                        ================================================== */}

                    {userRole === "Patient" && (

                        <>

                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    `hms-nav-item ${
                                        isActive
                                            ? "active"
                                            : ""
                                    }`
                                }
                            >

                                <UserRound
                                    size={19}
                                    strokeWidth={2}
                                />

                                <span>
                                    My Profile
                                </span>

                            </NavLink>

                        </>

                    )}


                    {/* ==================================================
                        Role-Based Sections
                        ================================================== */}

                    {visibleSections.map(
                        (section) => (

                            <div
                                key={section.title}
                                className="hms-nav-section"
                            >

                                <p className="hms-nav-title hms-nav-section-title">

                                    {section.title}

                                </p>


                                {section.items.map(
                                    renderNavItem
                                )}

                            </div>

                        )
                    )}


                    {/* ==================================================
                        Administration
                        ================================================== */}

                    {canManageUsers && (

                        <div className="hms-nav-section">

                            <p className="hms-nav-title hms-nav-section-title">

                                ADMINISTRATION

                            </p>


                            <NavLink
                                to="/users"
                                className={({ isActive }) =>
                                    `hms-nav-item ${
                                        isActive
                                            ? "active"
                                            : ""
                                    }`
                                }
                            >

                                <UserCog
                                    size={19}
                                    strokeWidth={2}
                                />

                                <span>
                                    Users
                                </span>

                            </NavLink>

                        </div>

                    )}


                    {/* ==================================================
                        System
                        ================================================== */}

                    <div className="hms-nav-section">

                        <p className="hms-nav-title hms-nav-section-title">

                            SYSTEM

                        </p>


                        {canAccessNotifications && (

                            <NavLink
                                to="/notifications"
                                className={({ isActive }) =>
                                    `hms-nav-item ${
                                        isActive
                                            ? "active"
                                            : ""
                                    }`
                                }
                            >

                                <Bell
                                    size={19}
                                    strokeWidth={2}
                                />

                                <span>
                                    Notifications
                                </span>

                            </NavLink>

                        )}


                        {canAccessSettings && (

                            <NavLink
                                to="/settings"
                                className={({ isActive }) =>
                                    `hms-nav-item ${
                                        isActive
                                            ? "active"
                                            : ""
                                    }`
                                }
                            >

                                <Settings
                                    size={19}
                                    strokeWidth={2}
                                />

                                <span>
                                    Settings
                                </span>

                            </NavLink>

                        )}

                    </div>

                </nav>


                {/* ==================================================
                    Sidebar Footer
                    ================================================== */}

                <div className="hms-sidebar-footer">

                    <button
                        type="button"
                        className="hms-logout-button"
                        onClick={handleLogout}
                    >

                        <LogOut
                            size={18}
                        />

                        <span>
                            Sign Out
                        </span>

                    </button>


                    <div className="hms-powered-by">

                        <span>
                            Powered by
                        </span>

                        <strong>
                            Hayyar Tech
                        </strong>

                    </div>

                </div>

            </aside>


            {/* ==================================================
                MAIN APPLICATION AREA
                ================================================== */}

            <div className="hms-main">


                {/* ==================================================
                    Header
                    ================================================== */}

                <header className="hms-header">


                    {/* ==================================================
                        Header Left
                        ================================================== */}

                    <div className="hms-header-left">

                        <button
                            type="button"
                            className="hms-menu-button"
                            aria-label="Open navigation"
                        >

                            <Menu
                                size={21}
                            />

                        </button>


                        <div className="hms-search">

                            <Search
                                size={18}
                            />

                            <input
                                type="search"
                                placeholder="Search HMSPro..."
                                aria-label="Search HMSPro"
                            />

                        </div>

                    </div>


                    {/* ==================================================
                        Header Right
                        ================================================== */}

                    <div className="hms-header-right">


                        {/* ==================================================
                            Notifications
                            ================================================== */}

                        <button
                            type="button"
                            className="hms-icon-button"
                            onClick={() =>
                                navigate(
                                    "/notifications"
                                )
                            }
                            aria-label="Open notifications"
                        >

                            <Bell
                                size={20}
                            />

                            <span className="hms-notification-dot" />

                        </button>


                        {/* ==================================================
                            User Profile
                            ================================================== */}

                        <button
                            type="button"
                            className="hms-profile"
                            onClick={() =>
                                navigate(
                                    "/profile"
                                )
                            }
                            aria-label="Open user profile"
                        >

                            <div className="hms-avatar">

                                {userInitial}

                            </div>


                            <div className="hms-profile-info">

                                <strong>
                                    {userName}
                                </strong>

                                <span>
                                    {userRole}
                                </span>

                            </div>


                            <ChevronDown
                                size={17}
                                className="hms-profile-chevron"
                            />

                        </button>

                    </div>

                </header>


                {/* ==================================================
                    Page Content
                    ================================================== */}

                <main className="hms-content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

};


export default MainLayout;