
// ============================================================
// File: context/AuthContext.jsx
// Purpose: Global authentication state for HMSPro.
// ============================================================

import {
    createContext,
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


// ============================================================
// Authentication Context
// ============================================================

export const AuthContext =
    createContext(null);


// ============================================================
// Auth Provider
// ============================================================

export const AuthProvider = ({ children }) => {

    const [user, setUser] =
        useState(null);

    const [loading, setLoading] =
        useState(true);


    // ========================================================
    // Restore Existing Session
    // ========================================================

    useEffect(() => {

        let mounted = true;


        const restoreSession = async () => {

            const token =
                getToken();


            // ------------------------------------------------
            // No Token
            // ------------------------------------------------

            if (!token) {

                if (mounted) {

                    setLoading(false);

                }

                return;

            }


            // ------------------------------------------------
            // Restore User Session
            // ------------------------------------------------

            try {

                const currentUser =
                    await getCurrentUser();


                if (mounted) {

                    setUser(
                        currentUser
                    );

                }

            }

            catch (error) {

                console.warn(
                    "HMSPro session could not be restored."
                );


                logoutUser();


                if (mounted) {

                    setUser(null);

                }

            }

            finally {

                if (mounted) {

                    setLoading(false);

                }

            }

        };


        restoreSession();


        // ----------------------------------------------------
        // Cleanup
        // ----------------------------------------------------

        return () => {

            mounted = false;

        };

    }, []);


    // ========================================================
    // Login
    // ========================================================

    const login = async (
        credentials
    ) => {

        const loggedInUser =
            await loginUser(
                credentials
            );


        setUser(
            loggedInUser
        );


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


    // ========================================================
    // Provider
    // ========================================================

    return (

        <AuthContext.Provider
            value={value}
        >

            {children}

        </AuthContext.Provider>

    );

};


// ============================================================
// End of AuthContext.jsx
// ============================================================
