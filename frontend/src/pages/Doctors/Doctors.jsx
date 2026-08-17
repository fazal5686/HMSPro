
// ============================================================
// File: pages/Doctors/Doctors.jsx
// Purpose: HMSPro Doctors management page.
// ============================================================

import {
    useEffect,
    useState,
} from "react";

import {
    Search,
    Plus,
    Stethoscope,
    MoreHorizontal,
    RefreshCw,
    UserRound,
} from "lucide-react";

import API from "../../api/axios.js";

import "./Doctors.css";


// ============================================================
// Doctors Component
// ============================================================

const Doctors = () => {

    // ========================================================
    // State
    // ========================================================

    const [doctors, setDoctors] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [search, setSearch] =
        useState("");


    // ========================================================
    // Load Doctors
    // ========================================================

    const loadDoctors = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await API.get("/doctors");


            const data =
                response.data?.data;


            setDoctors(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Doctors loading error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Unable to load doctors."
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // Initial Load
    // ========================================================

    useEffect(() => {

        loadDoctors();

    }, []);


    // ========================================================
    // Search
    // ========================================================

    const filteredDoctors =
        doctors.filter((doctor) => {

            const searchValue =
                search
                    .trim()
                    .toLowerCase();


            if (!searchValue) {
                return true;
            }


            const fullName =
                doctor.userId?.fullName ||
                doctor.fullName ||
                "";


            const email =
                doctor.userId?.email ||
                doctor.email ||
                "";


            const specialization =
                doctor.specialization ||
                "";


            const department =
                doctor.department ||
                "";


            const licenseNumber =
                doctor.licenseNumber ||
                "";


            return (

                fullName
                    .toLowerCase()
                    .includes(searchValue)

                ||

                email
                    .toLowerCase()
                    .includes(searchValue)

                ||

                specialization
                    .toLowerCase()
                    .includes(searchValue)

                ||

                department
                    .toLowerCase()
                    .includes(searchValue)

                ||

                licenseNumber
                    .toLowerCase()
                    .includes(searchValue)

            );

        });


    // ========================================================
    // Doctor Name
    // ========================================================

    const getDoctorName = (doctor) => {

        return (

            doctor.userId?.fullName ||

            doctor.fullName ||

            "Unknown Doctor"

        );

    };


    // ========================================================
    // Doctor Email
    // ========================================================

    const getDoctorEmail = (doctor) => {

        return (

            doctor.userId?.email ||

            doctor.email ||

            "—"

        );

    };


    // ========================================================
    // Initials
    // ========================================================

    const getInitials = (name) => {

        const parts =
            name
                .trim()
                .split(/\s+/)
                .filter(Boolean);


        if (!parts.length) {
            return "DR";
        }


        if (parts.length === 1) {

            return parts[0]
                .substring(0, 2)
                .toUpperCase();

        }


        return (

            parts[0][0] +
            parts[parts.length - 1][0]

        ).toUpperCase();

    };


    // ========================================================
    // Render
    // ========================================================

    return (

        <div className="doctors-page">


            {/* ==================================================
                Page Header
                ================================================== */}

            <section className="doctors-heading">

                <div>

                    <div className="doctors-eyebrow">

                        <Stethoscope size={16} />

                        <span>
                            Medical Staff
                        </span>

                    </div>


                    <h1>
                        Doctors
                    </h1>


                    <p>
                        Manage doctors, specializations,
                        departments and consultation details.
                    </p>

                </div>


                <button
                    type="button"
                    className="doctors-primary-button"
                >

                    <Plus size={18} />

                    <span>
                        Add Doctor
                    </span>

                </button>

            </section>


            {/* ==================================================
                Toolbar
                ================================================== */}

            <section className="doctors-toolbar">

                <div className="doctors-search">

                    <Search size={18} />

                    <input
                        type="search"
                        placeholder="Search doctors..."
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                    />

                </div>


                <button
                    type="button"
                    className="doctors-refresh-button"
                    onClick={loadDoctors}
                    disabled={loading}
                >

                    <RefreshCw
                        size={17}
                        className={
                            loading
                                ? "doctors-refresh-spin"
                                : ""
                        }
                    />

                    <span>
                        Refresh
                    </span>

                </button>

            </section>


            {/* ==================================================
                Error
                ================================================== */}

            {error && (

                <div className="doctors-error">
                    {error}
                </div>

            )}


            {/* ==================================================
                Summary
                ================================================== */}

            <section className="doctors-summary">

                <div className="doctors-summary-card">

                    <div className="doctors-summary-icon">
                        <Stethoscope size={20} />
                    </div>


                    <div>

                        <span>
                            Total Doctors
                        </span>

                        <strong>
                            {loading
                                ? "..."
                                : doctors.length}
                        </strong>

                    </div>

                </div>


                <div className="doctors-summary-card">

                    <div className="doctors-summary-icon">
                        <UserRound size={20} />
                    </div>


                    <div>

                        <span>
                            Active Doctors
                        </span>

                        <strong>
                            {loading
                                ? "..."
                                : doctors.filter(
                                    (doctor) =>
                                        doctor.isActive !== false
                                ).length}
                        </strong>

                    </div>

                </div>

            </section>


            {/* ==================================================
                Doctors Table
                ================================================== */}

            <section className="doctors-card">

                <div className="doctors-card-header">

                    <div>

                        <span className="doctors-card-kicker">
                            DIRECTORY
                        </span>

                        <h2>
                            Medical Staff
                        </h2>

                    </div>


                    <span className="doctors-count">

                        {loading
                            ? "Loading..."
                            : `${filteredDoctors.length} doctor${filteredDoctors.length === 1 ? "" : "s"}`}

                    </span>

                </div>


                {loading ? (

                    <div className="doctors-empty">

                        <RefreshCw
                            size={24}
                            className="doctors-refresh-spin"
                        />

                        <p>
                            Loading doctors...
                        </p>

                    </div>

                ) : filteredDoctors.length === 0 ? (

                    <div className="doctors-empty">

                        <Stethoscope size={32} />

                        <h3>
                            No doctors found
                        </h3>

                        <p>
                            {search
                                ? "Try a different search term."
                                : "No doctor profiles are available yet."}
                        </p>

                    </div>

                ) : (

                    <div className="doctors-table-wrapper">

                        <table className="doctors-table">

                            <thead>

                                <tr>

                                    <th>
                                        Doctor
                                    </th>

                                    <th>
                                        Specialization
                                    </th>

                                    <th>
                                        Department
                                    </th>

                                    <th>
                                        Experience
                                    </th>

                                    <th>
                                        Consultation Fee
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredDoctors.map(
                                    (doctor) => {

                                        const name =
                                            getDoctorName(
                                                doctor
                                            );


                                        const isActive =
                                            doctor.isActive !== false;


                                        return (

                                            <tr
                                                key={
                                                    doctor._id
                                                }
                                            >

                                                <td>

                                                    <div className="doctor-identity">

                                                        <div className="doctor-avatar">

                                                            {doctor.profileImage ? (

                                                                <img
                                                                    src={
                                                                        doctor.profileImage
                                                                    }
                                                                    alt={
                                                                        name
                                                                    }
                                                                />

                                                            ) : (

                                                                getInitials(
                                                                    name
                                                                )

                                                            )}

                                                        </div>


                                                        <div>

                                                            <strong>
                                                                {name}
                                                            </strong>

                                                            <span>
                                                                {getDoctorEmail(
                                                                    doctor
                                                                )}
                                                            </span>

                                                        </div>

                                                    </div>

                                                </td>


                                                <td>
                                                    {doctor.specialization ||
                                                        "—"}
                                                </td>


                                                <td>
                                                    {doctor.department ||
                                                        "—"}
                                                </td>


                                                <td>

                                                    {doctor.experience !==
                                                    undefined
                                                        ? `${doctor.experience} years`
                                                        : "—"}

                                                </td>


                                                <td>

                                                    {doctor.consultationFee !==
                                                    undefined
                                                        ? `Rs. ${Number(
                                                            doctor.consultationFee
                                                        ).toLocaleString()}`
                                                        : "—"}

                                                </td>


                                                <td>

                                                    <span
                                                        className={
                                                            `doctor-status ${
                                                                isActive
                                                                    ? "active"
                                                                    : "inactive"
                                                            }`
                                                        }
                                                    >

                                                        <i></i>

                                                        {isActive
                                                            ? "Active"
                                                            : "Inactive"}

                                                    </span>

                                                </td>


                                                <td>

                                                    <button
                                                        type="button"
                                                        className="doctor-more-button"
                                                        aria-label={`Options for ${name}`}
                                                    >

                                                        <MoreHorizontal
                                                            size={18}
                                                        />

                                                    </button>

                                                </td>

                                            </tr>

                                        );

                                    }
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </section>

        </div>

    );

};


export default Doctors;
