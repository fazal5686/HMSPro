// ============================================================
// File:
// D:\HMSPro\frontend\src\pages\Patients\Patients.jsx
//
// Purpose:
// Administrative Patient Directory for HMSPro.
// ============================================================

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Search,
    RefreshCw,
    Users,
    UserRound,
    Phone,
    MapPin,
    Droplets,
} from "lucide-react";

import {
    getAllPatients,
} from "../../services/patientService.js";

import "./Patients.css";


// ============================================================
// Patients Page
// ============================================================

const Patients = () => {

    const [patients, setPatients] = useState([]);

    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");


    // ========================================================
    // Load Patients
    // ========================================================

    const loadPatients = async (
        isRefresh = false
    ) => {

        try {

            if (isRefresh) {

                setRefreshing(true);

            } else {

                setLoading(true);

            }


            setError("");


            const data =
                await getAllPatients();


            setPatients(

                Array.isArray(data)
                    ? data
                    : []

            );


        } catch (err) {

            console.error(
                "Failed to load patients:",
                err
            );


            setError(

                err?.response?.data?.message ||

                "Unable to load patients. Please try again."

            );


        } finally {

            setLoading(false);

            setRefreshing(false);

        }

    };


    // ========================================================
    // Initial Load
    // ========================================================

    useEffect(() => {

        loadPatients();

    }, []);


    // ========================================================
    // Filter Patients
    // ========================================================

    const filteredPatients = useMemo(() => {

        const term =
            searchTerm
                .trim()
                .toLowerCase();


        if (!term) {

            return patients;

        }


        return patients.filter(

            (patient) => {

                const user =
                    patient.userId || {};


                return (

                    user.fullName
                        ?.toLowerCase()
                        .includes(term)

                    ||

                    user.email
                        ?.toLowerCase()
                        .includes(term)

                    ||

                    user.phone
                        ?.toLowerCase()
                        .includes(term)

                    ||

                    patient.city
                        ?.toLowerCase()
                        .includes(term)

                    ||

                    patient.bloodGroup
                        ?.toLowerCase()
                        .includes(term)

                    ||

                    patient.gender
                        ?.toLowerCase()
                        .includes(term)

                );

            }

        );

    }, [

        patients,

        searchTerm

    ]);


    // ========================================================
    // Format Date
    // ========================================================

    const formatDate = (date) => {

        if (!date) {

            return "—";

        }


        return new Date(date).toLocaleDateString(

            "en-GB",

            {

                day: "2-digit",

                month: "short",

                year: "numeric",

            }

        );

    };


    // ========================================================
    // Render
    // ========================================================

    return (

        <div className="patients-page">


            {/* ==================================================
                Page Header
                ================================================== */}

            <div className="patients-header">

                <div>

                    <div className="patients-title-row">

                        <div className="patients-title-icon">

                            <Users
                                size={24}
                            />

                        </div>

                        <div>

                            <h1>
                                Patients
                            </h1>

                            <p>
                                Patient Directory
                            </p>

                        </div>

                    </div>

                </div>


                <button
                    type="button"
                    className="patients-refresh-button"
                    onClick={() =>
                        loadPatients(true)
                    }
                    disabled={

                        loading ||
                        refreshing

                    }
                >

                    <RefreshCw
                        size={17}
                        className={
                            refreshing
                                ? "patients-spin"
                                : ""
                        }
                    />

                    {refreshing
                        ? "Refreshing..."
                        : "Refresh"}

                </button>

            </div>


            {/* ==================================================
                Statistics
                ================================================== */}

            <div className="patients-stat-card">

                <div className="patients-stat-icon">

                    <UserRound
                        size={22}
                    />

                </div>

                <div>

                    <span>
                        Total Patients
                    </span>

                    <strong>
                        {patients.length}
                    </strong>

                </div>

            </div>


            {/* ==================================================
                Main Card
                ================================================== */}

            <div className="patients-card">


                {/* ==================================================
                    Toolbar
                    ================================================== */}

                <div className="patients-toolbar">

                    <div>

                        <h2>
                            Patient Directory
                        </h2>

                        <p>

                            {filteredPatients.length}

                            {" "}

                            {filteredPatients.length === 1
                                ? "patient"
                                : "patients"}

                        </p>

                    </div>


                    <div className="patients-search">

                        <Search
                            size={18}
                        />

                        <input
                            type="text"
                            placeholder="Search patients..."
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }
                        />

                    </div>

                </div>


                {/* ==================================================
                    Error
                    ================================================== */}

                {error && (

                    <div className="patients-error">

                        <strong>
                            Unable to load patients
                        </strong>

                        <span>
                            {error}
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                loadPatients()
                            }
                        >
                            Try Again
                        </button>

                    </div>

                )}


                {/* ==================================================
                    Loading
                    ================================================== */}

                {loading && (

                    <div className="patients-loading">

                        <div className="patients-loader" />

                        <span>
                            Loading patients...
                        </span>

                    </div>

                )}


                {/* ==================================================
                    Empty State
                    ================================================== */}

                {!loading &&
                    !error &&
                    filteredPatients.length === 0 && (

                        <div className="patients-empty">

                            <Users
                                size={42}
                            />

                            <h3>
                                No patients found
                            </h3>

                            <p>

                                {searchTerm

                                    ? "Try changing your search."

                                    : "There are currently no patient records."}

                            </p>

                        </div>

                    )}


                {/* ==================================================
                    Patient Table
                    ================================================== */}

                {!loading &&
                    !error &&
                    filteredPatients.length > 0 && (

                        <div className="patients-table-wrapper">

                            <table className="patients-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Patient
                                        </th>

                                        <th>
                                            Contact
                                        </th>

                                        <th>
                                            Date of Birth
                                        </th>

                                        <th>
                                            Gender
                                        </th>

                                        <th>
                                            Blood Group
                                        </th>

                                        <th>
                                            Location
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredPatients.map(

                                        (patient) => {

                                            const user =
                                                patient.userId || {};


                                            return (

                                                <tr
                                                    key={
                                                        patient._id
                                                    }
                                                >

                                                    {/* Patient */}

                                                    <td>

                                                        <div className="patient-name-cell">

                                                            <div className="patient-avatar">

                                                                {(user.fullName || "P")
                                                                    .charAt(0)
                                                                    .toUpperCase()}

                                                            </div>

                                                            <div>

                                                                <strong>

                                                                    {user.fullName ||
                                                                        "Unknown Patient"}

                                                                </strong>

                                                                <span>

                                                                    ID:{" "}

                                                                    {patient._id}

                                                                </span>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* Contact */}

                                                    <td>

                                                        <div className="patient-contact-cell">

                                                            <span>

                                                                <Phone
                                                                    size={14}
                                                                />

                                                                {user.phone ||
                                                                    "—"}

                                                            </span>

                                                            <span>

                                                                {user.email ||
                                                                    "—"}

                                                            </span>

                                                        </div>

                                                    </td>


                                                    {/* DOB */}

                                                    <td>

                                                        {formatDate(

                                                            patient.dateOfBirth

                                                        )}

                                                    </td>


                                                    {/* Gender */}

                                                    <td>

                                                        {patient.gender ||
                                                            "—"}

                                                    </td>


                                                    {/* Blood Group */}

                                                    <td>

                                                        {patient.bloodGroup ? (

                                                            <span className="blood-group">

                                                                <Droplets
                                                                    size={14}
                                                                />

                                                                {patient.bloodGroup}

                                                            </span>

                                                        ) : (

                                                            "—"

                                                        )}

                                                    </td>


                                                    {/* Location */}

                                                    <td>

                                                        <span className="patient-location">

                                                            <MapPin
                                                                size={14}
                                                            />

                                                            {patient.city ||
                                                                "—"}

                                                        </span>

                                                    </td>


                                                    {/* Status */}

                                                    <td>

                                                        <span

                                                            className={

                                                                user.isActive

                                                                    ? "patient-status active"

                                                                    : "patient-status inactive"

                                                            }

                                                        >

                                                            {user.isActive
                                                                ? "Active"
                                                                : "Inactive"}

                                                        </span>

                                                    </td>

                                                </tr>

                                            );

                                        }

                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

            </div>

        </div>

    );

};


export default Patients;