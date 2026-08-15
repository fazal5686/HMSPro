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

const navigationItems = [

    {
        label: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
    },

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
        label: "Billing",
        path: "/billing",
        icon: ReceiptText,
    },

    {
        label: "Reports",
        path: "/reports",
        icon: BarChart3,
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
    // Actual security MUST also be enforced by the backend.
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


                    <p className="hms-nav-title">
                        MAIN MENU
                    </p>



                    {/* ==================================================
                        Main Navigation Items
                        ================================================== */}

                    {navigationItems.map(
                        (item) => {

                            const Icon =
                                item.icon;


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

                        }
                    )}



                    {/* ==================================================
                        Administration Section
                        ================================================== */}

                    {canManageUsers && (

                        <>

                            <p className="hms-nav-title hms-nav-title-settings">
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

                        </>

                    )}



                    {/* ==================================================
                        System Section
                        ================================================== */}

                    <p className="hms-nav-title hms-nav-title-settings">
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


                        {/* Notifications */}

                        <button
                            type="button"
                            className="hms-icon-button"
                            aria-label="Notifications"
                        >

                            <Bell
                                size={20}
                            />


                            <span className="hms-notification-dot">
                            </span>


                        </button>



                        {/* User Profile */}

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