
// ============================================================
// File: hooks/useAuthContext.js
// Purpose: Custom hook for accessing HMSPro authentication
//          context.
// ============================================================

import {
    useContext,
} from "react";

import {
    AuthContext,
} from "../context/AuthContext.jsx";


// ============================================================
// useAuthContext Hook
// ============================================================

const useAuthContext = () => {

    const context =
        useContext(AuthContext);


    if (!context) {

        throw new Error(
            "useAuthContext must be used inside AuthProvider."
        );

    }


    return context;

};


// ============================================================
// Export
// ============================================================

export default useAuthContext;


// ============================================================
// End of useAuthContext.js
// ============================================================
