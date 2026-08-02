// ============================================================
// File: pages/Login.jsx
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
//          Backend JWT Authentication
// ============================================================


import { useState } from "react";

import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";



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



            // Redirect after successful login.

            navigate("/dashboard");



        } catch (error) {


            setError(

                error.response?.data?.message ||

                "Login failed. Please try again."

            );


        } finally {


            setLoading(false);


        }


    };



    // ========================================================
    // JSX UI
    // ========================================================

    return (

        <div className="login-container">


            <div className="login-card">


                <h2>

                    HMSPro Login

                </h2>



                {error && (

                    <p className="error-message">

                        {error}

                    </p>

                )}



                <form onSubmit={handleSubmit}>


                    <div className="form-group">


                        <label>

                            Email

                        </label>


                        <input

                            type="email"

                            name="email"

                            value={formData.email}

                            onChange={handleChange}

                            placeholder="Enter email"

                            required

                        />


                    </div>




                    <div className="form-group">


                        <label>

                            Password

                        </label>



                        <input

                            type={
                                showPassword
                                ? "text"
                                : "password"
                            }

                            name="password"

                            value={formData.password}

                            onChange={handleChange}

                            placeholder="Enter password"

                            required

                        />



                    </div>



                    <div className="password-toggle">


                        <label>


                            <input

                                type="checkbox"

                                checked={showPassword}

                                onChange={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }

                            />


                            Show Password


                        </label>


                    </div>




                    <button

                        type="submit"

                        disabled={loading}

                    >

                        {
                            loading
                            ? "Logging in..."
                            : "Login"
                        }


                    </button>



                </form>


            </div>


        </div>

    );


};


export default Login;