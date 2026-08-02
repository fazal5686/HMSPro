// ============================================================
// File: context/AuthContext.jsx
// Purpose: Provides global authentication state for HMSPro.
//
// Responsibilities:
//          1. Stores current logged-in user.
//          2. Handles login and logout.
//          3. Restores user session after browser refresh.
//          4. Provides authentication status globally.
// ============================================================


import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";


import {
    loginUser,
    logoutUser,
    getCurrentUser,
} from "../services/authService.js";


import {
    getToken,
} from "../utils/storage.js";



// Create Authentication Context

const AuthContext = createContext();



// ============================================================
// Auth Provider
// ============================================================

export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);


    const [loading, setLoading] = useState(true);




    // ========================================================
    // Restore User Session
    // ========================================================

    useEffect(() => {


        const restoreUser = async () => {


            const token = getToken();



            if (token) {


                try {


                    const currentUser =
                        await getCurrentUser();



                    setUser(currentUser);



                } catch (error) {


                    console.log(
                        "Session expired."
                    );


                }


            }



            setLoading(false);


        };



        restoreUser();



    }, []);




    // ========================================================
    // Login Function
    // ========================================================

    const login = async (credentials) => {


        const loggedInUser =
            await loginUser(credentials);



        setUser(loggedInUser);



        return loggedInUser;


    };




    // ========================================================
    // Logout Function
    // ========================================================

    const logout = () => {


        logoutUser();


        setUser(null);


    };




    return (

        <AuthContext.Provider

            value={{

                user,

                login,

                logout,

                loading,

                isAuthenticated:
                    Boolean(user),

            }}

        >

            {children}


        </AuthContext.Provider>

    );


};




// ============================================================
// Custom Context Hook
// ============================================================

export const useAuthContext = () => {


    return useContext(AuthContext);


};