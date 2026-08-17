// ============================================================
// File: pages/Profile/Profile.jsx
// Purpose: HMSPro authenticated user profile.
// ============================================================

import {
    AtSign,
    CalendarDays,
    CheckCircle2,
    Mail,
    Phone,
    ShieldCheck,
    UserRound,
} from "lucide-react";

import useAuth from "../../hooks/useAuth.js";

import "./Profile.css";


// ============================================================
// Profile Component
// ============================================================

const Profile = () => {

    const {
        user,
    } = useAuth();


    // ========================================================
    // Safe User Values
    // ========================================================

    const fullName =
        user?.fullName ||
        "HMS User";

    const email =
        user?.email ||
        "Not available";

    const role =
        user?.role ||
        "User";

    const phone =
        user?.phone ||
        "Not provided";

    const isActive =
        user?.isActive !== false;

    const initial =
        fullName
            .trim()
            .charAt(0)
            .toUpperCase() ||
        "U";


    // ========================================================
    // Render
    // ========================================================

    return (

        <div className="profile-page">


            {/* ==================================================
                Header
                ================================================== */}

            <section className="profile-header">

                <div>

                    <div className="profile-eyebrow">

                        <UserRound size={16} />

                        <span>
                            ACCOUNT MANAGEMENT
                        </span>

                    </div>


                    <h1>
                        My Profile
                    </h1>


                    <p>
                        View your HMSPro account information
                        and access details.
                    </p>

                </div>

            </section>



            {/* ==================================================
                Profile Hero
                ================================================== */}

            <section className="profile-hero">

                <div className="profile-avatar-large">

                    {initial}

                </div>


                <div className="profile-hero-info">

                    <h2>
                        {fullName}
                    </h2>


                    <div className="profile-role">

                        <ShieldCheck size={15} />

                        <span>
                            {role}
                        </span>

                    </div>


                    <div className="profile-status">

                        <CheckCircle2 size={15} />

                        <span>
                            {isActive
                                ? "Active account"
                                : "Inactive account"
                            }
                        </span>

                    </div>

                </div>

            </section>



            {/* ==================================================
                Information Grid
                ================================================== */}

            <section className="profile-grid">


                {/* ==================================================
                    Personal Information
                    ================================================== */}

                <article className="profile-card">

                    <div className="profile-card-header">

                        <div className="profile-card-icon">

                            <UserRound size={19} />

                        </div>


                        <div>

                            <span>
                                ACCOUNT INFORMATION
                            </span>

                            <h3>
                                Personal Details
                            </h3>

                        </div>

                    </div>


                    <div className="profile-details">


                        <div className="profile-detail">

                            <div className="profile-detail-icon">

                                <UserRound size={17} />

                            </div>


                            <div>

                                <span>
                                    Full Name
                                </span>

                                <strong>
                                    {fullName}
                                </strong>

                            </div>

                        </div>



                        <div className="profile-detail">

                            <div className="profile-detail-icon">

                                <Mail size={17} />

                            </div>


                            <div>

                                <span>
                                    Email Address
                                </span>

                                <strong>
                                    {email}
                                </strong>

                            </div>

                        </div>



                        <div className="profile-detail">

                            <div className="profile-detail-icon">

                                <Phone size={17} />

                            </div>


                            <div>

                                <span>
                                    Phone
                                </span>

                                <strong>
                                    {phone}
                                </strong>

                            </div>

                        </div>



                        <div className="profile-detail">

                            <div className="profile-detail-icon">

                                <ShieldCheck size={17} />

                            </div>


                            <div>

                                <span>
                                    Role
                                </span>

                                <strong>
                                    {role}
                                </strong>

                            </div>

                        </div>

                    </div>

                </article>



                {/* ==================================================
                    Account Status
                    ================================================== */}

                <article className="profile-card">

                    <div className="profile-card-header">

                        <div className="profile-card-icon">

                            <ShieldCheck size={19} />

                        </div>


                        <div>

                            <span>
                                SECURITY
                            </span>

                            <h3>
                                Account Status
                            </h3>

                        </div>

                    </div>


                    <div className="profile-status-panel">

                        <div className="profile-status-row">

                            <div>

                                <span>
                                    Account Status
                                </span>

                                <strong>
                                    {isActive
                                        ? "Active"
                                        : "Inactive"
                                    }
                                </strong>

                            </div>


                            <div
                                className={`profile-status-badge ${
                                    isActive
                                        ? "active"
                                        : "inactive"
                                }`}
                            >

                                <CheckCircle2 size={15} />

                                {isActive
                                    ? "Active"
                                    : "Inactive"
                                }

                            </div>

                        </div>


                        <div className="profile-status-row">

                            <div>

                                <span>
                                    Access Role
                                </span>

                                <strong>
                                    {role}
                                </strong>

                            </div>


                            <div className="profile-role-badge">

                                <ShieldCheck size={15} />

                                Authorized

                            </div>

                        </div>

                    </div>

                </article>


            </section>



            {/* ==================================================
                Account Information Footer
                ================================================== */}

            <section className="profile-information">

                <div className="profile-information-icon">

                    <AtSign size={18} />

                </div>


                <div>

                    <strong>
                        HMSPro Account
                    </strong>

                    <p>
                        Your profile information is loaded from
                        the authenticated HMSPro user session.
                    </p>

                </div>

            </section>



            {/* ==================================================
                Footer
                ================================================== */}

            <section className="profile-footer">

                <div>

                    <CheckCircle2 size={16} />

                    <span>
                        Account information is securely displayed
                        from the current authenticated session.
                    </span>

                </div>


                <span>
                    HMSPro
                </span>

            </section>


        </div>

    );

};


export default Profile;