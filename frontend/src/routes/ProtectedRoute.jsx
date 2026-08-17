// ============================================================
// File: routes/ProtectedRoute.jsx
// Purpose: Protect authenticated HMSPro routes.
// ============================================================

import { Navigate, Outlet } from "react-router-dom";

import useAuthContext from "../hooks/useAuthContext.js";


// ============================================================
// Protected Route
// ============================================================

const ProtectedRoute = () => {

    const {
        isAuthenticated,
        loading,
    } = useAuthContext();


    // --------------------------------------------------------
    // Restore authentication state
    // --------------------------------------------------------

    if (loading) {

        return (

            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >

                <p>
                    Loading HMSPro...
                </p>

            </div>

        );

    }


    // --------------------------------------------------------
    // User not authenticated
    // --------------------------------------------------------

    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // --------------------------------------------------------
    // Authenticated
    // --------------------------------------------------------

    return <Outlet />;

};


export default ProtectedRoute;