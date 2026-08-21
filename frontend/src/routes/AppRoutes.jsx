// ============================================================
// File: routes/AppRoutes.jsx
// Purpose: Central routing configuration for HMSPro.
// ============================================================

import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import MainLayout
    from "../components/Layout/MainLayout.jsx";

import Dashboard
    from "../pages/Dashboard/Dashboard.jsx";

import Login
    from "../pages/Authentication/Login.jsx";

import Patients
    from "../pages/Patients/Patients.jsx";

import PatientProfile
    from "../pages/Patients/PatientProfile.jsx";

import UserManagement
    from "../pages/Users/UserManagement.jsx";

import Reports
    from "../pages/Reports/Reports.jsx";

import Appointments
    from "../pages/Appointments/Appointments.jsx";

import Rooms
    from "../pages/Rooms/Rooms.jsx";

import Admissions
    from "../pages/Admissions/Admissions.jsx";

import Billing
    from "../pages/Billing/Billing.jsx";

import Pharmacy
    from "../pages/Pharmacy/Pharmacy.jsx";

import Laboratory
    from "../pages/Laboratory/Laboratory.jsx";

import Radiology
    from "../pages/Radiology/Radiology.jsx";

import Nurses
    from "../pages/Nurses/Nurses.jsx";

import Receptionists
    from "../pages/Receptionists/Receptionists.jsx";

import Discharges
    from "../pages/Discharges/Discharges.jsx";

import Profile
    from "../pages/Profile/Profile.jsx";

import Settings
    from "../pages/Settings/Settings.jsx";

import Notifications
    from "../pages/Notifications/Notifications.jsx";

import Departments
    from "../pages/Departments/Departments.jsx";

import Beds
    from "../pages/Beds/Beds.jsx";

import ProtectedRoute
    from "./ProtectedRoute.jsx";
    import Doctors
    from "../pages/Doctors/Doctors.jsx";
    import RoleProtectedRoute
    from "./RoleProtectedRoute.jsx";
// ============================================================
// HMSPro Application Routes
// ============================================================

const AppRoutes = () => {

    return (

        <Routes>


            {/* ==================================================
                Public Authentication Routes
                ================================================== */}

            <Route
                path="/login"
                element={
                    <Login />
                }
            />


            {/* ==================================================
                Protected Application
                ================================================== */}

            <Route
                element={
                    <ProtectedRoute />
                }
            >


                {/* ==================================================
                    Main Application Layout
                    ================================================== */}

                <Route
                    element={
                        <MainLayout />
                    }
                >


                    {/* ==================================================
                        Dashboard
                        ================================================== */}

                    <Route
                        path="/"
                        element={
                            <Dashboard />
                        }
                    />
                    {/* ==================================================
                        Doctor Diretory
                        ================================================== */}
                    <Route
                        path="/doctors"
                        element={
                            <Doctors />
                        }
                    />

                    {/* ==================================================
                    Patients Directory
                    ================================================== */}

                <Route
                    path="/patients"
                    element={
                        <Patients />
                    }
                />


                {/* ==================================================
                    Patient Profile
                    ================================================== */}

                <Route
                    path="/patient-profile"
                    element={
                        <PatientProfile />
                    }
                />


                {/* ==================================================
                    Users
                    ================================================== */}

                <Route
                    path="/users"
                    element={
                        <UserManagement />
                    }
                />

                    {/* ==================================================
                        Appointments
                        ================================================== */}

<Route
    path="/appointments"
    element={
        <RoleProtectedRoute
            allowedRoles={[
                "SuperAdmin",
                "Admin",
                "Doctor",
                "Nurse",
                "Receptionist",
                "Patient",
            ]}
        />
    }
>
    <Route
        index
        element={
            <Appointments />
        }
    />
</Route>


                    {/* ==================================================
                        Departments
                        ================================================== */}

                    <Route
                        path="/departments"
                        element={
                            <Departments />
                        }
                    />


                    {/* ==================================================
                        Admissions
                        ================================================== */}

                    <Route
                        path="/admissions"
                        element={
                            <Admissions />
                        }
                    />


                    {/* ==================================================
                        Rooms
                        ================================================== */}

                    <Route
                        path="/rooms"
                        element={
                            <Rooms />
                        }
                    />


                    {/* ==================================================
                        Beds
                        ================================================== */}

                    <Route
                        path="/beds"
                        element={
                            <Beds />
                        }
                    />


                    {/* ==================================================
                        Pharmacy
                        ================================================== */}

                    <Route
                        path="/pharmacy"
                        element={
                            <Pharmacy />
                        }
                    />


                    {/* ==================================================
                        Laboratory
                        ================================================== */}

                    <Route
                        path="/laboratory"
                        element={
                            <Laboratory />
                        }
                    />


                    {/* ==================================================
                        Radiology
                        ================================================== */}

                    <Route
                        path="/radiology"
                        element={
                            <Radiology />
                        }
                    />


                    {/* ==================================================
                        Nurses
                        ================================================== */}

                    <Route
                        path="/nurses"
                        element={
                            <Nurses />
                        }
                    />


                    {/* ==================================================
                        Receptionists
                        ================================================== */}

                    <Route
                        path="/receptionists"
                        element={
                            <Receptionists />
                        }
                    />


                    {/* ==================================================
                        Discharges
                        ================================================== */}

                    <Route
                        path="/discharges"
                        element={
                            <Discharges />
                        }
                    />


                    {/* ==================================================
                        Billing
                        ================================================== */}

                    <Route
                        path="/billing"
                        element={
                            <Billing />
                        }
                    />


                    {/* ==================================================
                        Reports
                        ================================================== */}

                    <Route
                        path="/reports"
                        element={
                            <Reports />
                        }
                    />


                    {/* ==================================================
                        Notifications
                        ================================================== */}

                    <Route
                        path="/notifications"
                        element={
                            <Notifications />
                        }
                    />


                    {/* ==================================================
                        Profile
                        ================================================== */}

                    <Route
                        path="/profile"
                        element={
                            <Profile />
                        }
                    />


                    {/* ==================================================
                        Settings
                        ================================================== */}

                    <Route
                        path="/settings"
                        element={
                            <Settings />
                        }
                    />

                </Route>

            </Route>


            {/* ==================================================
                Unknown Route
                ================================================== */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/"
                        replace
                    />
                }
            />

        </Routes>

    );

};


export default AppRoutes;