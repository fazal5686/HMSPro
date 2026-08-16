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

import PatientProfile
    from "../pages/Patients/PatientProfile.jsx";

import UserManagement
    from "../pages/Users/UserManagement.jsx";

import Reports
    from "../pages/Reports/Reports.jsx";

import ProtectedRoute
    from "./ProtectedRoute.jsx";


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
                Protected Application Routes
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
                        Reports
                        ================================================== */}

                    <Route
                        path="/reports"
                        element={
                            <Reports />
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
                        Patient Profile
                        ================================================== */}

                    <Route
                        path="/patient-profile"
                        element={
                            <PatientProfile />
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