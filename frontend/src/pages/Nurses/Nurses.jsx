// ============================================================
// File: pages/Nurses/Nurses.jsx
// Purpose: HMSPro Nurses Center.
// Connected to live Nurse backend API.
// Includes functional Add Nurse form.
// ============================================================

import {
    Activity,
    CheckCircle2,
    Clock3,
    Plus,
    Search,
    ShieldCheck,
    UserRound,
    Users,
    RefreshCw,
    X,
} from "lucide-react";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import api from "../../api/axios.js";

import "./Nurses.css";


// ============================================================
// Nurses Component
// ============================================================

const Nurses = () => {

    // ========================================================
    // Nurse Directory State
    // ========================================================

    const [nurses, setNurses] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("all");

    const [shiftFilter, setShiftFilter] =
        useState("all");


    // ========================================================
    // Add Nurse Modal State
    // ========================================================

    const [showAddForm, setShowAddForm] =
        useState(false);

    const [users, setUsers] = useState([]);

    const [usersLoading, setUsersLoading] =
        useState(false);

    const [creating, setCreating] =
        useState(false);

    const [formError, setFormError] =
        useState("");

    const [formSuccess, setFormSuccess] =
        useState("");


    // ========================================================
    // Add Nurse Form
    // ========================================================

    const [formData, setFormData] = useState({

        userId: "",

        qualification: "",

        experience: "",

        licenseNumber: "",

        department: "",

        shift: "Morning",

        profileImage: null,

    });


    // ========================================================
    // Fetch Nurses
    // ========================================================

    const fetchNurses = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await api.get(
                "/api/nurses"
            );

            setNurses(
                response.data?.data || []
            );

        } catch (err) {

            console.error(
                "Failed to load nurses:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to load nurses."
            );

            setNurses([]);

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // Fetch Nurse Users
    //
    // Only users with role Nurse are displayed.
    // ========================================================

    const fetchNurseUsers = async () => {

        try {

            setUsersLoading(true);

            setFormError("");

            const response = await api.get(
                "/api/users",
                {
                    params: {
                        role: "Nurse",
                        isActive: "true",
                    },
                }
            );

            setUsers(
                response.data?.data || []
            );

        } catch (err) {

            console.error(
                "Failed to load nurse users:",
                err
            );

            setFormError(
                err.response?.data?.message ||
                "Unable to load Nurse users."
            );

            setUsers([]);

        } finally {

            setUsersLoading(false);

        }

    };


    // ========================================================
    // Initial Load
    // ========================================================

    useEffect(() => {

        fetchNurses();

    }, []);


    // ========================================================
    // Open Add Nurse Form
    // ========================================================

    const handleAddNurse = async () => {

        setFormError("");

        setFormSuccess("");

        setShowAddForm(true);

        await fetchNurseUsers();

    };


    // ========================================================
    // Close Add Nurse Form
    // ========================================================

    const handleCloseAddForm = () => {

        if (creating) {
            return;
        }

        setShowAddForm(false);

        setFormError("");

        setFormSuccess("");

        setFormData({

            userId: "",

            qualification: "",

            experience: "",

            licenseNumber: "",

            department: "",

            shift: "Morning",

            profileImage: null,

        });

    };


    // ========================================================
    // Handle Form Input
    // ========================================================

    const handleFormChange = (event) => {

        const {
            name,
            value,
            files,
        } = event.target;


        if (name === "profileImage") {

            setFormData(
                (previous) => ({
                    ...previous,
                    profileImage:
                        files?.[0] || null,
                })
            );

            return;

        }


        setFormData(
            (previous) => ({
                ...previous,
                [name]: value,
            })
        );

    };


    // ========================================================
    // Create Nurse
    // ========================================================

    const handleCreateNurse = async (event) => {

        event.preventDefault();

        setFormError("");

        setFormSuccess("");


        // ----------------------------------------------------
        // Basic Frontend Validation
        // ----------------------------------------------------

        if (!formData.userId) {

            setFormError(
                "Please select a Nurse user."
            );

            return;

        }


        if (!formData.qualification.trim()) {

            setFormError(
                "Qualification is required."
            );

            return;

        }


        if (
            formData.experience === "" ||
            Number(formData.experience) < 0
        ) {

            setFormError(
                "Experience must be zero or greater."
            );

            return;

        }


        if (!formData.licenseNumber.trim()) {

            setFormError(
                "License number is required."
            );

            return;

        }


        try {

            setCreating(true);


            // ------------------------------------------------
            // FormData is required because profileImage
            // uses upload.single("profileImage") on backend.
            // ------------------------------------------------

            const data = new FormData();


            data.append(
                "userId",
                formData.userId
            );


            data.append(
                "qualification",
                formData.qualification.trim()
            );


            data.append(
                "experience",
                String(formData.experience)
            );


            data.append(
                "licenseNumber",
                formData.licenseNumber.trim()
            );


            if (formData.department.trim()) {

                data.append(
                    "department",
                    formData.department.trim()
                );

            }


            data.append(
                "shift",
                formData.shift
            );


            if (formData.profileImage) {

                data.append(
                    "profileImage",
                    formData.profileImage
                );

            }


            // ------------------------------------------------
            // POST Nurse
            // ------------------------------------------------

            const response = await api.post(
                "/api/nurses",
                data
            );


            console.log(
                "Nurse created:",
                response.data
            );


            setFormSuccess(
                "Nurse profile created successfully."
            );


            // ------------------------------------------------
            // Refresh directory
            // ------------------------------------------------

            await fetchNurses();


            // ------------------------------------------------
            // Close form after successful creation
            // ------------------------------------------------

            setTimeout(() => {

                setShowAddForm(false);

                setFormSuccess("");

                setFormData({

                    userId: "",

                    qualification: "",

                    experience: "",

                    licenseNumber: "",

                    department: "",

                    shift: "Morning",

                    profileImage: null,

                });

            }, 700);


        } catch (err) {

            console.error(
                "Failed to create nurse:",
                err
            );


            setFormError(
                err.response?.data?.message ||
                "Unable to create nurse profile."
            );

        } finally {

            setCreating(false);

        }

    };


    // ========================================================
    // Filter Nurses
    // ========================================================

    const filteredNurses = useMemo(() => {

        return nurses.filter(
            (nurse) => {

                const user =
                    nurse.userId || {};


                const searchableText = [

                    user.fullName,

                    user.email,

                    user.phone,

                    nurse.qualification,

                    nurse.licenseNumber,

                    nurse.department,

                    nurse.shift,

                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                const matchesSearch =
                    searchableText.includes(
                        searchTerm
                            .trim()
                            .toLowerCase()
                    );


                const matchesStatus =
                    statusFilter === "all" ||
                    (
                        statusFilter === "active" &&
                        nurse.isActive !== false
                    ) ||
                    (
                        statusFilter === "inactive" &&
                        nurse.isActive === false
                    );


                const matchesShift =
                    shiftFilter === "all" ||
                    nurse.shift?.toLowerCase() ===
                    shiftFilter;


                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesShift
                );

            }
        );

    }, [
        nurses,
        searchTerm,
        statusFilter,
        shiftFilter,
    ]);


    // ========================================================
    // Summary Statistics
    // ========================================================

    const totalNurses =
        nurses.length;


    const activeNurses =
        nurses.filter(
            (nurse) =>
                nurse.isActive !== false
        ).length;


    const onDutyNurses =
        nurses.filter(
            (nurse) =>
                nurse.isActive !== false &&
                nurse.availability !== false
        ).length;


    const assignmentCount = 0;


    // ========================================================
    // Render
    // ========================================================

    return (

        <div className="nurses-page">


            {/* ==================================================
                Header
                ================================================== */}

            <section className="nurses-header">

                <div>

                    <div className="nurses-eyebrow">

                        <Users size={16} />

                        <span>
                            NURSING SERVICES
                        </span>

                    </div>

                    <h1>
                        Nurses
                    </h1>

                    <p>
                        Manage nursing staff, availability and
                        clinical nursing assignments.
                    </p>

                </div>


                <button
                    type="button"
                    className="nurses-primary-button"
                    onClick={handleAddNurse}
                >

                    <Plus size={17} />

                    Add Nurse

                </button>

            </section>


            {/* ==================================================
                Summary Cards
                ================================================== */}

            <section className="nurses-summary-grid">

                <article className="nurses-summary-card">

                    <div className="nurses-summary-icon blue">

                        <Users size={21} />

                    </div>

                    <div>

                        <span>
                            Total Nurses
                        </span>

                        <strong>
                            {totalNurses}
                        </strong>

                        <small>
                            Registered nursing staff
                        </small>

                    </div>

                </article>


                <article className="nurses-summary-card">

                    <div className="nurses-summary-icon green">

                        <CheckCircle2 size={21} />

                    </div>

                    <div>

                        <span>
                            Active Nurses
                        </span>

                        <strong>
                            {activeNurses}
                        </strong>

                        <small>
                            Currently active staff
                        </small>

                    </div>

                </article>


                <article className="nurses-summary-card">

                    <div className="nurses-summary-icon orange">

                        <Clock3 size={21} />

                    </div>

                    <div>

                        <span>
                            On Duty
                        </span>

                        <strong>
                            {onDutyNurses}
                        </strong>

                        <small>
                            Nurses currently available
                        </small>

                    </div>

                </article>


                <article className="nurses-summary-card">

                    <div className="nurses-summary-icon purple">

                        <ShieldCheck size={21} />

                    </div>

                    <div>

                        <span>
                            Assignments
                        </span>

                        <strong>
                            {assignmentCount}
                        </strong>

                        <small>
                            Active nursing assignments
                        </small>

                    </div>

                </article>

            </section>


            {/* ==================================================
                Main Nurses Card
                ================================================== */}

            <section className="nurses-card">

                <div className="nurses-card-header">

                    <div>

                        <span className="nurses-card-kicker">
                            NURSING STAFF
                        </span>

                        <h2>
                            Nurse Directory
                        </h2>

                    </div>


                    <button
                        type="button"
                        onClick={fetchNurses}
                        title="Refresh nurses"
                        style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            padding: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >

                        <RefreshCw
                            size={18}
                            className={
                                loading
                                    ? "nurse-refresh-spinning"
                                    : ""
                            }
                        />

                    </button>

                </div>


                {/* ==================================================
                    Toolbar
                    ================================================== */}

                <div className="nurses-toolbar">

                    <div className="nurses-search">

                        <Search size={17} />

                        <input
                            type="search"
                            placeholder="Search nurse..."
                            aria-label="Search nurses"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }
                        />

                    </div>


                    <select
                        className="nurses-filter"
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(
                                event.target.value
                            )
                        }
                    >

                        <option value="all">
                            All Status
                        </option>

                        <option value="active">
                            Active
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>

                    </select>


                    <select
                        className="nurses-filter"
                        value={shiftFilter}
                        onChange={(event) =>
                            setShiftFilter(
                                event.target.value
                            )
                        }
                    >

                        <option value="all">
                            All Shifts
                        </option>

                        <option value="morning">
                            Morning
                        </option>

                        <option value="evening">
                            Evening
                        </option>

                        <option value="night">
                            Night
                        </option>

                        <option value="rotating">
                            Rotating
                        </option>

                    </select>

                </div>


                {/* ==================================================
                    Error
                    ================================================== */}

                {error && (

                    <div
                        style={{
                            padding: "12px 16px",
                            marginBottom: "16px",
                            borderRadius: "10px",
                            background: "#fff1f2",
                            color: "#be123c",
                            border: "1px solid #fecdd3",
                            fontSize: "13px",
                        }}
                    >

                        {error}

                    </div>

                )}


                {/* ==================================================
                    Directory Table
                    ================================================== */}

                <div className="nurses-table-wrapper">

                    <table className="nurses-table">

                        <thead>

                            <tr>

                                <th>Nurse</th>

                                <th>License</th>

                                <th>Department</th>

                                <th>Shift</th>

                                <th>Status</th>

                                <th>Availability</th>

                            </tr>

                        </thead>


                        <tbody>

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        style={{
                                            textAlign: "center",
                                            padding: "40px",
                                        }}
                                    >
                                        Loading nurses...
                                    </td>

                                </tr>

                            ) : filteredNurses.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        style={{
                                            textAlign: "center",
                                            padding: "40px",
                                        }}
                                    >

                                        <div className="nurse-placeholder">

                                            <div className="nurse-avatar">

                                                <UserRound size={16} />

                                            </div>

                                            <div>

                                                <strong>
                                                    {
                                                        nurses.length === 0
                                                            ? "No nurses registered"
                                                            : "No matching nurses"
                                                    }
                                                </strong>

                                                <span>
                                                    {
                                                        nurses.length === 0
                                                            ? "Nurse records will appear here"
                                                            : "Try changing your search or filters"
                                                    }
                                                </span>

                                            </div>

                                        </div>

                                    </td>

                                </tr>

                            ) : (

                                filteredNurses.map(
                                    (nurse) => {

                                        const user =
                                            nurse.userId || {};


                                        return (

                                            <tr
                                                key={nurse._id}
                                            >

                                                <td>

                                                    <div className="nurse-placeholder">

                                                        <div className="nurse-avatar">

                                                            {nurse.profileImage ? (

                                                                <img
                                                                    src={
                                                                        nurse.profileImage
                                                                    }
                                                                    alt={
                                                                        user.fullName ||
                                                                        "Nurse"
                                                                    }
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        objectFit: "cover",
                                                                        borderRadius: "50%",
                                                                    }}
                                                                />

                                                            ) : (

                                                                <UserRound
                                                                    size={16}
                                                                />

                                                            )}

                                                        </div>


                                                        <div>

                                                            <strong>
                                                                {
                                                                    user.fullName ||
                                                                    "N/A"
                                                                }
                                                            </strong>

                                                            <span>
                                                                {
                                                                    nurse.qualification ||
                                                                    "Qualification not provided"
                                                                }
                                                            </span>

                                                        </div>

                                                    </div>

                                                </td>


                                                <td>
                                                    {
                                                        nurse.licenseNumber ||
                                                        "—"
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        nurse.department ||
                                                        "—"
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        nurse.shift ||
                                                        "Morning"
                                                    }
                                                </td>


                                                <td>

                                                    <span
                                                        className="nurse-status"
                                                        style={{
                                                            background:
                                                                nurse.isActive !== false
                                                                    ? "#ecfdf5"
                                                                    : "#fff1f2",

                                                            color:
                                                                nurse.isActive !== false
                                                                    ? "#047857"
                                                                    : "#be123c",
                                                        }}
                                                    >

                                                        {
                                                            nurse.isActive !== false
                                                                ? "Active"
                                                                : "Inactive"
                                                        }

                                                    </span>

                                                </td>


                                                <td>

                                                    <span
                                                        className="nurse-status"
                                                        style={{
                                                            background:
                                                                nurse.availability !== false
                                                                    ? "#eff6ff"
                                                                    : "#f3f4f6",

                                                            color:
                                                                nurse.availability !== false
                                                                    ? "#2563eb"
                                                                    : "#6b7280",
                                                        }}
                                                    >

                                                        {
                                                            nurse.availability !== false
                                                                ? "Available"
                                                                : "Unavailable"
                                                        }

                                                    </span>

                                                </td>

                                            </tr>

                                        );

                                    }
                                )

                            )}

                        </tbody>

                    </table>

                </div>


                {!loading && nurses.length === 0 && (

                    <div className="nurses-empty">

                        <div className="nurses-empty-icon">

                            <Activity size={30} />

                        </div>

                        <h3>
                            Nursing module ready
                        </h3>

                        <p>
                            The Nurses backend is connected.
                            Nurse records will appear here
                            once they are registered.
                        </p>

                    </div>

                )}

            </section>


            {/* ==================================================
                Footer
                ================================================== */}

            <section className="nurses-footer">

                <div>

                    <CheckCircle2 size={17} />

                    <span>
                        HMSPro Nursing Center
                    </span>

                </div>

                <span>
                    Nursing staff management
                </span>

            </section>


            {/* ==================================================
                ADD NURSE MODAL
                ================================================== */}

            {showAddForm && (

                <div className="nurses-modal-overlay">

                    <div className="nurses-modal">

                        <div className="nurses-modal-header">

                            <div>

                                <span className="nurses-card-kicker">
                                    NURSING SERVICES
                                </span>

                                <h2>
                                    Create Nurse Profile
                                </h2>

                            </div>


                            <button
                                type="button"
                                className="nurses-modal-close"
                                onClick={handleCloseAddForm}
                                disabled={creating}
                                title="Close"
                            >

                                <X size={19} />

                            </button>

                        </div>


                        {/* ==================================================
                            Form
                            ================================================== */}

                        <form
                            onSubmit={handleCreateNurse}
                            className="nurses-form"
                        >


                            {/* User */}

                            <div className="nurses-form-group nurses-form-full">

                                <label>
                                    Select Nurse
                                    <span>*</span>
                                </label>

                                <select
                                    name="userId"
                                    value={formData.userId}
                                    onChange={handleFormChange}
                                    disabled={
                                        usersLoading ||
                                        creating
                                    }
                                    required
                                >

                                    <option value="">
                                        {
                                            usersLoading
                                                ? "Loading Nurse users..."
                                                : "Select Nurse user"
                                        }
                                    </option>


                                    {users.map(
                                        (user) => (

                                            <option
                                                key={user._id}
                                                value={user._id}
                                            >

                                                {
                                                    user.fullName
                                                }
                                                {" — "}
                                                {
                                                    user.email
                                                }

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            {/* Qualification */}

                            <div className="nurses-form-group">

                                <label>
                                    Qualification
                                    <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="qualification"
                                    placeholder="e.g. BS Nursing"
                                    value={
                                        formData.qualification
                                    }
                                    onChange={
                                        handleFormChange
                                    }
                                    disabled={creating}
                                    required
                                />

                            </div>


                            {/* Experience */}

                            <div className="nurses-form-group">

                                <label>
                                    Experience (Years)
                                    <span>*</span>
                                </label>

                                <input
                                    type="number"
                                    name="experience"
                                    min="0"
                                    placeholder="e.g. 5"
                                    value={
                                        formData.experience
                                    }
                                    onChange={
                                        handleFormChange
                                    }
                                    disabled={creating}
                                    required
                                />

                            </div>


                            {/* License */}

                            <div className="nurses-form-group">

                                <label>
                                    License Number
                                    <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="licenseNumber"
                                    placeholder="e.g. NUR-1001"
                                    value={
                                        formData.licenseNumber
                                    }
                                    onChange={
                                        handleFormChange
                                    }
                                    disabled={creating}
                                    required
                                />

                            </div>


                            {/* Department */}

                            <div className="nurses-form-group">

                                <label>
                                    Department
                                </label>

                                <input
                                    type="text"
                                    name="department"
                                    placeholder="e.g. Emergency"
                                    value={
                                        formData.department
                                    }
                                    onChange={
                                        handleFormChange
                                    }
                                    disabled={creating}
                                />

                            </div>


                            {/* Shift */}

                            <div className="nurses-form-group">

                                <label>
                                    Shift
                                </label>

                                <select
                                    name="shift"
                                    value={
                                        formData.shift
                                    }
                                    onChange={
                                        handleFormChange
                                    }
                                    disabled={creating}
                                >

                                    <option value="Morning">
                                        Morning
                                    </option>

                                    <option value="Evening">
                                        Evening
                                    </option>

                                    <option value="Night">
                                        Night
                                    </option>

                                    <option value="Rotating">
                                        Rotating
                                    </option>

                                </select>

                            </div>


                            {/* Profile Image */}

                            <div className="nurses-form-group nurses-form-full">

                                <label>
                                    Profile Image
                                </label>

                                <input
                                    type="file"
                                    name="profileImage"
                                    accept="image/*"
                                    onChange={
                                        handleFormChange
                                    }
                                    disabled={creating}
                                />

                            </div>


                            {/* Form Error */}

                            {formError && (

                                <div className="nurses-form-error">

                                    {formError}

                                </div>

                            )}


                            {/* Form Success */}

                            {formSuccess && (

                                <div className="nurses-form-success">

                                    {formSuccess}

                                </div>

                            )}


                            {/* ==================================================
                                ACTION BUTTONS
                                ================================================== */}

                            <div className="nurses-form-actions">

                                <button
                                    type="button"
                                    className="nurses-cancel-button"
                                    onClick={
                                        handleCloseAddForm
                                    }
                                    disabled={creating}
                                >

                                    Cancel

                                </button>


                                <button
                                    type="submit"
                                    className="nurses-create-button"
                                    disabled={creating}
                                >

                                    {creating ? (

                                        <>
                                            <RefreshCw
                                                size={16}
                                                className="nurse-refresh-spinning"
                                            />

                                            Creating...

                                        </>

                                    ) : (

                                        <>
                                            <Plus size={16} />

                                            Create Nurse

                                        </>

                                    )}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>

    );

};


export default Nurses;