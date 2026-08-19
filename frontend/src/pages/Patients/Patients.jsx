// ============================================================
// File:
// D:\HMSPro\frontend\src\pages\Patients\Patients.jsx
//
// Purpose:
// Administrative Patient Directory for HMSPro.
//
// Responsibilities:
// 1. Load patients from the backend.
// 2. Search and filter patient records.
// 3. Display patient statistics.
// 4. Display patient directory.
// 5. Navigate to Patient Profile.
// 6. Provide refresh and error recovery.
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
    Eye,
    ChevronRight,
} from "lucide-react";


import {
    useNavigate,
} from "react-router-dom";


import {
    getAllPatients,
} from "../../services/patientService.js";


import "./Patients.css";



// ============================================================
// Constants
// ============================================================

const EMPTY_VALUE = "—";



// ============================================================
// Patients Page
// ============================================================

const Patients = () => {


    const navigate = useNavigate();


    // ========================================================
    // State
    // ========================================================

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

                    ||

                    patient._id
                        ?.toLowerCase()
                        .includes(term)

                );

            }

        );

    }, [

        patients,

        searchTerm,

    ]);



    // ========================================================
    // Format Date
    // ========================================================

    const formatDate = (date) => {

        if (!date) {

            return EMPTY_VALUE;

        }


        const parsedDate =
            new Date(date);


        if (Number.isNaN(parsedDate.getTime())) {

            return EMPTY_VALUE;

        }


        return parsedDate.toLocaleDateString(

            "en-GB",

            {

                day: "2-digit",

                month: "short",

                year: "numeric",

            }

        );

    };



    // ========================================================
    // Open Patient Profile
    // ========================================================

    const openPatientProfile = (
        patientId
    ) => {

        if (!patientId) {

            return;

        }


        navigate(
            `/patients/${patientId}`
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
                    aria-label="Refresh patient list"
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

                            Showing{" "}

                            {filteredPatients.length}

                            {" "}

                            {filteredPatients.length === 1
                                ? "patient"
                                : "patients"}

                            {searchTerm
                                ? ` matching "${searchTerm}"`
                                : ""}

                        </p>

                    </div>



                    <div className="patients-search">


                        <Search
                            size={18}
                            aria-hidden="true"
                        />


                        <input
                            type="search"
                            placeholder="Search patients..."
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }
                            aria-label="Search patients"
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

                                    : "There are currently no patient records."

                                }

                            </p>


                            {searchTerm && (

                                <button
                                    type="button"
                                    onClick={() =>
                                        setSearchTerm("")
                                    }
                                >
                                    Clear Search
                                </button>

                            )}

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


                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>



                                <tbody>


                                    {filteredPatients.map(

                                        (patient) => {


                                            const user =
                                                patient.userId || {};


                                            const patientName =
                                                user.fullName ||
                                                "Unknown Patient";


                                            const initials =
                                                patientName
                                                    .trim()
                                                    .charAt(0)
                                                    .toUpperCase() ||
                                                "P";


                                            const isActive =
                                                user.isActive !== false;



                                            return (

                                                <tr
                                                    key={
                                                        patient._id
                                                    }
                                                    className="patient-row"
                                                    onDoubleClick={() =>
                                                        openPatientProfile(
                                                            patient._id
                                                        )
                                                    }
                                                >


                                                    {/* ==========================================
                                                        Patient
                                                        ========================================== */}

                                                    <td>

                                                        <div className="patient-name-cell">


                                                            <div className="patient-avatar">

                                                                {initials}

                                                            </div>


                                                            <div>

                                                                <strong>

                                                                    {patientName}

                                                                </strong>


                                                                <span>

                                                                    ID:{" "}

                                                                    {patient._id ||
                                                                        EMPTY_VALUE}

                                                                </span>

                                                            </div>


                                                        </div>

                                                    </td>



                                                    {/* ==========================================
                                                        Contact
                                                        ========================================== */}

                                                    <td>

                                                        <div className="patient-contact-cell">


                                                            <span>

                                                                <Phone
                                                                    size={14}
                                                                />


                                                                {user.phone ||
                                                                    EMPTY_VALUE}

                                                            </span>


                                                            <span>

                                                                {user.email ||
                                                                    EMPTY_VALUE}

                                                            </span>


                                                        </div>

                                                    </td>



                                                    {/* ==========================================
                                                        DOB
                                                        ========================================== */}

                                                    <td>

                                                        {formatDate(
                                                            patient.dateOfBirth
                                                        )}

                                                    </td>



                                                    {/* ==========================================
                                                        Gender
                                                        ========================================== */}

                                                    <td>

                                                        {patient.gender ||
                                                            EMPTY_VALUE}

                                                    </td>



                                                    {/* ==========================================
                                                        Blood Group
                                                        ========================================== */}

                                                    <td>

                                                        {patient.bloodGroup ? (

                                                            <span className="blood-group">


                                                                <Droplets
                                                                    size={14}
                                                                />


                                                                {patient.bloodGroup}


                                                            </span>

                                                        ) : (

                                                            EMPTY_VALUE

                                                        )}

                                                    </td>



                                                    {/* ==========================================
                                                        Location
                                                        ========================================== */}

                                                    <td>

                                                        <span className="patient-location">


                                                            <MapPin
                                                                size={14}
                                                            />


                                                            {patient.city ||
                                                                EMPTY_VALUE}


                                                        </span>

                                                    </td>



                                                    {/* ==========================================
                                                        Status
                                                        ========================================== */}

                                                    <td>

                                                        <span

                                                            className={

                                                                isActive

                                                                    ? "patient-status active"

                                                                    : "patient-status inactive"

                                                            }

                                                        >

                                                            {isActive
                                                                ? "Active"
                                                                : "Inactive"}

                                                        </span>

                                                    </td>



                                                    {/* ==========================================
                                                        Action
                                                        ========================================== */}

                                                    <td>


                                                        <button
                                                            type="button"
                                                            className="patient-view-button"
                                                            onClick={() =>
                                                                openPatientProfile(
                                                                    patient._id
                                                                )
                                                            }
                                                            aria-label={`View ${patientName}`}
                                                            title="View patient profile"
                                                        >

                                                            <Eye
                                                                size={16}
                                                            />


                                                            <span>
                                                                View
                                                            </span>


                                                            <ChevronRight
                                                                size={15}
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


            </div>


        </div>

    );

};


export default Patients;