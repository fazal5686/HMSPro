// ============================================================
// File: routes/RoleProtectedRoute.jsx
// Purpose: Protect HMSPro routes by authenticated user role.
// ============================================================

import {
    Navigate,
    Outlet,
} from "react-router-dom";

import useAuthContext
    from "../hooks/useAuthContext.js";


// ============================================================
// Role Protected Route
// ============================================================

const RoleProtectedRoute = ({
    allowedRoles = [],
}) => {

    const {
        user,
        loading,
        isAuthenticated,
    } = useAuthContext();


    // ========================================================
    // Authentication State Loading
    // ========================================================

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


    // ========================================================
    // Authentication Check
    // ========================================================

    if (!isAuthenticated || !user) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // ========================================================
    // Role Check
    // ========================================================

    const hasAccess =
        allowedRoles.includes(
            user.role
        );


    // ========================================================
    // Access Denied
    // ========================================================

    if (!hasAccess) {

        return (
            <Navigate
                to="/"
                replace
            />
        );

    }


    // ========================================================
    // Authorized
    // ========================================================

    return <Outlet />;

};


// ============================================================
// Export
// ============================================================

export default RoleProtectedRoute;


// ============================================================
// End of RoleProtectedRoute.jsx
// ============================================================
