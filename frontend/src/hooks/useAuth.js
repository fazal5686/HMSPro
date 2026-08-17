// ============================================================
// File: hooks/useAuth.js
// Purpose: Custom hook for accessing HMSPro authentication.
// Provides easy access to login, logout, user information,
// and authentication status throughout the application.
// ============================================================


import useAuthContext from "./useAuthContext.js";



// ============================================================
// useAuth Hook
// ============================================================

const useAuth = () => {


    return useAuthContext();


};


export default useAuth;