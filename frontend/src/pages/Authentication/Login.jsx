// ============================================================
// File: D:\HMSPro\frontend\src\pages\Authentication\Login.jsx
// Purpose: HMSPro user login page.
//
// Responsibilities:
//          1. Collect user email and password.
//          2. Send credentials to authentication service.
//          3. Store authentication state through AuthContext.
//          4. Redirect authenticated users to dashboard.
//
// Authentication Flow:
//          Login.jsx
//              ↓
//          useAuth()
//              ↓
//          AuthContext
//              ↓
//          authService.js
//              ↓
//          Axios
//              ↓
//          Backend JWT Authentication
// ============================================================


import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    Hospital,
    Mail,
    LockKeyhole,
    Eye,
    EyeOff,
    LogIn,
} from "lucide-react";

import useAuth from "../../hooks/useAuth.js";

import "./Login.css";



// ============================================================
// Login Component
// ============================================================

const Login = () => {


    const navigate = useNavigate();


    const { login } = useAuth();



    // ========================================================
    // Form State
    // ========================================================

    const [formData, setFormData] = useState({

        email: "",

        password: "",

    });


    const [showPassword, setShowPassword] = useState(false);


    const [loading, setLoading] = useState(false);


    const [error, setError] = useState("");



    // ========================================================
    // Handle Input Change
    // ========================================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

        // Clear previous error when user starts correcting input.

        if (error) {

            setError("");

        }

    };



    // ========================================================
    // Handle Login Submit
    // ========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        setError("");

        setLoading(true);


        try {

            await login(formData);


            // Redirect authenticated user to dashboard.

            navigate("/", {
                replace: true,
            });


        } catch (error) {

            setError(

                error.response?.data?.message ||

                "Invalid email or password."

            );


        } finally {

            setLoading(false);

        }

    };



    // ========================================================
    // JSX UI
    // ========================================================

    return (

        <div className="login-page">


            {/* ==================================================
                Left Branding Panel
                ================================================== */}

            <div className="login-brand-panel">


                <div className="login-brand-content">


                    {/* HT Monogram */}

                    <div className="ht-monogram">

                        <span>
                            H
                        </span>

                        <span>
                            T
                        </span>

                    </div>



                    {/* HMSPro */}

                    <h1>

                        HMSPro

                    </h1>



                    <p className="login-brand-title">

                        Hospital Management System

                    </p>



                    <div className="brand-divider"></div>



                    <p className="powered-by">

                        Powered by

                    </p>



                    <p className="hayyar-tech">

                        Hayyar Tech

                    </p>



                    <p className="login-brand-description">

                        Smart, secure and efficient
                        hospital management.

                    </p>


                </div>


            </div>



            {/* ==================================================
                Right Login Panel
                ================================================== */}

            <div className="login-form-panel">


                <div className="login-card">


                    {/* Hospital Icon */}

                    <div className="login-icon">

                        <Hospital size={30} />

                    </div>



                    {/* Heading */}

                    <h2>

                        Welcome Back

                    </h2>



                    <p className="login-subtitle">

                        Sign in to your HMSPro account

                    </p>



                    {/* Error */}

                    {error && (

                        <div className="login-error">

                            {error}

                        </div>

                    )}



                    {/* ==================================================
                        Login Form
                        ================================================== */}

                    <form
                        onSubmit={handleSubmit}
                        className="login-form"
                    >


                        {/* Email */}

                        <div className="form-group">


                            <label htmlFor="email">

                                Email Address

                            </label>


                            <div className="input-wrapper">


                                <Mail
                                    size={19}
                                    className="input-icon"
                                />


                                <input

                                    id="email"

                                    type="email"

                                    name="email"

                                    value={formData.email}

                                    onChange={handleChange}

                                    placeholder="Enter your email"

                                    autoComplete="email"

                                    required

                                />


                            </div>


                        </div>



                        {/* Password */}

                        <div className="form-group">


                            <label htmlFor="password">

                                Password

                            </label>


                            <div className="input-wrapper">


                                <LockKeyhole
                                    size={19}
                                    className="input-icon"
                                />


                                <input

                                    id="password"

                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }

                                    name="password"

                                    value={formData.password}

                                    onChange={handleChange}

                                    placeholder="Enter your password"

                                    autoComplete="current-password"

                                    required

                                />


                                <button

                                    type="button"

                                    className="password-toggle-button"

                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }

                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }

                                >

                                    {
                                        showPassword
                                            ? <EyeOff size={19} />
                                            : <Eye size={19} />
                                    }

                                </button>


                            </div>


                        </div>



                        {/* ==================================================
                            Login Button
                            ================================================== */}

                        <button

                            type="submit"

                            className="login-submit-button"

                            disabled={loading}

                        >


                            {
                                loading ? (

                                    <>

                                        <span className="login-spinner"></span>

                                        Signing in...

                                    </>

                                ) : (

                                    <>

                                        <LogIn size={19} />

                                        Login

                                    </>

                                )
                            }


                        </button>


                    </form>



                    {/* Footer */}

                    <div className="login-footer">


                        <span>

                            HMSPro

                        </span>


                        <span>
                            •
                        </span>


                        <span>

                            Hayyar Tech

                        </span>


                    </div>


                </div>


            </div>


        </div>

    );

};


export default Login;