// ============================================================
// File:
// D:\HMSPro\frontend\src\components\Layout\MainLayout.jsx
//
// Purpose:
// Main HMSPro application shell.
//
// Responsibilities:
// 1. Displays HMSPro sidebar navigation.
// 2. Displays authenticated user's information.
// 3. Provides Admin/SuperAdmin Users navigation.
// 4. Provides Sign Out functionality.
// 5. Provides application header.
// 6. Renders child pages through Outlet.
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
//
// Navigation is organized according to the natural HMSPro
// hospital workflow rather than simply listing modules.
// ============================================================

const navigationGroups = [

    // ========================================================
    // MAIN
    // ========================================================

    {
        title: "MAIN",

        items: [

            {
                label: "Dashboard",
                path: "/",
                icon: LayoutDashboard,
            },

        ],
    },


    // ========================================================
    // PATIENT CARE
    // ========================================================

    {
        title: "PATIENT CARE",

        items: [

            {
                label: "Patients",
                path: "/patients",
                icon: Users,
            },

            {
                label: "Doctors",
                path: "/doctors",
                icon: Stethoscope,
            },

            {
                label: "Nurses",
                path: "/nurses",
                icon: HeartPulse,
            },

            {
                label: "Receptionists",
                path: "/receptionists",
                icon: Users,
            },

            {
                label: "Departments",
                path: "/departments",
                icon: Hospital,
            },

            {
                label: "Appointments",
                path: "/appointments",
                icon: CalendarDays,
            },

            {
                label: "Admissions",
                path: "/admissions",
                icon: ClipboardList,
            },

            {
                label: "Discharges",
                path: "/discharges",
                icon: ClipboardList,
            },

        ],
    },


    // ========================================================
    // HOSPITAL OPERATIONS
    // ========================================================

    {
        title: "HOSPITAL OPERATIONS",

        items: [

            {
                label: "Rooms & Beds",
                path: "/rooms",
                icon: BedDouble,
            },

            {
                label: "Pharmacy",
                path: "/pharmacy",
                icon: Pill,
            },

            {
                label: "Laboratory",
                path: "/laboratory",
                icon: FlaskConical,
            },

            {
                label: "Radiology",
                path: "/radiology",
                icon: ScanLine,
            },

        ],
    },


    // ========================================================
    // FINANCE & ANALYTICS
    // ========================================================

    {
        title: "FINANCE & ANALYTICS",

        items: [

            {
                label: "Billing",
                path: "/billing",
                icon: ReceiptText,
            },

            {
                label: "Reports",
                path: "/reports",
                icon: BarChart3,
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
    //
    // These roles can access the Users administration section.
    //
    // NOTE:
    // Actual authorization MUST also be enforced by the backend.
    // ========================================================

    const canManageUsers =
        user?.role === "Admin" ||
        user?.role === "SuperAdmin";



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
    // Navigation Link Renderer
    //
    // Keeps all navigation items visually consistent.
    // ========================================================

    const renderNavigationItem = (item) => {

        const Icon = item.icon;


        return (

            <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
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


                    {/* HT Monogram */}

                    <div className="hms-brand-icon">

                        <span className="hms-brand-monogram">
                            HT
                        </span>

                    </div>


                    {/* Brand Text */}

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
                        Navigation Groups
                        ================================================== */}

                    {navigationGroups.map(
                        (group) => (

                            <div
                                key={group.title}
                                className="hms-navigation-group"
                            >


                                <p className="hms-nav-title">
                                    {group.title}
                                </p>


                                {group.items.map(
                                    renderNavigationItem
                                )}


                            </div>

                        )
                    )}



                    {/* ==================================================
                        Administration Section
                        ================================================== */}

                    {canManageUsers && (

                        <div className="hms-navigation-group">


                            <p className="hms-nav-title">
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

                                <Users
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
                        System Section
                        ================================================== */}

                    <div className="hms-navigation-group">


                        <p className="hms-nav-title">
                            SYSTEM
                        </p>


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


                            <span className="hms-notification-dot">
                            </span>

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


                            {/* Avatar */}

                            <div className="hms-avatar">

                                {userInitial}

                            </div>



                            {/* User Information */}

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