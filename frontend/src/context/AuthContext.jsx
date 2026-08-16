// ============================================================
// File: context/AuthContext.jsx
// Purpose: Global authentication state for HMSPro.
// ============================================================

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    loginUser,
    logoutUser,
    getCurrentUser,
} from "../services/authService.js";

import {
    getToken,
} from "../utils/storage.js";


const AuthContext = createContext(null);


// ============================================================
// Auth Provider
// ============================================================

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    // ========================================================
    // Restore Existing Session
    // ========================================================

    useEffect(() => {

        let mounted = true;


        const restoreSession = async () => {

            const token = getToken();


            if (!token) {

                if (mounted) {
                    setLoading(false);
                }

                return;
            }


            try {

                const currentUser =
                    await getCurrentUser();


                if (mounted) {

                    setUser(currentUser);

                }

            } catch (error) {

                console.warn(
                    "HMSPro session could not be restored."
                );

                logoutUser();

                if (mounted) {

                    setUser(null);

                }

            } finally {

                if (mounted) {

                    setLoading(false);

                }

            }

        };


        restoreSession();


        return () => {

            mounted = false;

        };

    }, []);


    // ========================================================
    // Login
    // ========================================================

    const login = async (credentials) => {

        const loggedInUser =
            await loginUser(credentials);

        setUser(loggedInUser);

        return loggedInUser;

    };


    // ========================================================
    // Logout
    // ========================================================

    const logout = () => {

        logoutUser();

        setUser(null);

    };


    // ========================================================
    // Context Value
    // ========================================================

    const value = {

        user,

        login,

        logout,

        loading,

        isAuthenticated:
            Boolean(user),

    };


    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

};


// ============================================================
// Custom Hook
// ============================================================

export const useAuthContext = () => {

    const context =
        useContext(AuthContext);


    if (!context) {

        throw new Error(
            "useAuthContext must be used inside AuthProvider."
        );

    }


    return context;

};