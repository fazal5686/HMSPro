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
    Pencil,
    Power,
    Trash2,
    X,
    Save,
} from "lucide-react";

import API from "../../api/axios.js";

import API_ROUTES from "../../api/apiRoutes.js";

import {
    getUsers,
} from "../../services/userService.js";

import "./Doctors.css";


// ============================================================
// Doctors Component
// ============================================================

const Doctors = () => {

    // ========================================================
    // State
    // ========================================================

    const [doctors, setDoctors] =
        useState([]);

    const [doctorUsers, setDoctorUsers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [menuId, setMenuId] =
        useState(null);

    const [modal, setModal] =
        useState(null);

    const [editingDoctor, setEditingDoctor] =
        useState(null);

    const [form, setForm] =
        useState({

            userId: "",

            specialization: "",

            qualification: "",

            experience: "",

            licenseNumber: "",

            consultationFee: "",

            department: "",

            availability: true,

        });


    // ========================================================
    // Load Doctors
    // ========================================================

    const loadDoctors = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await API.get(
                    API_ROUTES.DOCTORS.BASE
                );

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
    // Load Doctor Users
    //
    // Used when creating a new Doctor profile.
    // ========================================================

    const loadDoctorUsers = async () => {

        try {

            const users =
                await getUsers({

                    role: "Doctor",

                    isActive: "true",

                });

            setDoctorUsers(
                Array.isArray(users)
                    ? users
                    : []
            );

        } catch (error) {

            console.error(
                "Doctor users loading error:",
                error
            );

        }

    };


    // ========================================================
    // Initial Load
    // ========================================================

    useEffect(() => {

        loadDoctors();

        loadDoctorUsers();

    }, []);


    // ========================================================
    // Clear Messages
    // ========================================================

    const clearMessages = () => {

        setError("");

        setSuccess("");

    };


    // ========================================================
    // Open Add Modal
    // ========================================================

    const openAddModal = async () => {

        clearMessages();

        setEditingDoctor(null);

        setForm({

            userId: "",

            specialization: "",

            qualification: "",

            experience: "",

            licenseNumber: "",

            consultationFee: "",

            department: "",

            availability: true,

        });

        await loadDoctorUsers();

        setModal("add");

    };


    // ========================================================
    // Open Edit Modal
    // ========================================================

    const openEditModal = (doctor) => {

        clearMessages();

        setEditingDoctor(doctor);

        setForm({

            userId:
                doctor.userId?._id ||
                doctor.userId ||
                "",

            specialization:
                doctor.specialization ||
                "",

            qualification:
                doctor.qualification ||
                "",

            experience:
                doctor.experience ??
                "",

            licenseNumber:
                doctor.licenseNumber ||
                "",

            consultationFee:
                doctor.consultationFee ??
                "",

            department:
                doctor.department ||
                "",

            availability:
                doctor.availability !== false,

        });

        setMenuId(null);

        setModal("edit");

    };


    // ========================================================
    // Close Modal
    // ========================================================

    const closeModal = () => {

        if (saving) {
            return;
        }

        setModal(null);

        setEditingDoctor(null);

    };


    // ========================================================
    // Form Change
    // ========================================================

    const handleFormChange = (
        event
    ) => {

        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setForm(
            (previous) => ({

                ...previous,

                [name]:
                    type === "checkbox"
                        ? checked
                        : value,

            })
        );

    };


    // ========================================================
    // Submit Doctor
    // ========================================================

    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        clearMessages();

        setSaving(true);

        try {

            const doctorData = {

                specialization:
                    form.specialization.trim(),

                qualification:
                    form.qualification.trim(),

                experience:
                    Number(form.experience || 0),

                licenseNumber:
                    form.licenseNumber.trim(),

                consultationFee:
                    form.consultationFee === ""
                        ? 0
                        : Number(
                            form.consultationFee
                        ),

                department:
                    form.department.trim(),

                availability:
                    Boolean(form.availability),

            };


            // ------------------------------------------------
            // Create
            // ------------------------------------------------

            if (modal === "add") {

                if (!form.userId) {

                    throw new Error(
                        "Please select a Doctor user."
                    );

                }

                await API.post(

                    API_ROUTES.DOCTORS.BASE,

                    {

                        userId:
                            form.userId,

                        ...doctorData,

                    }

                );

                setSuccess(
                    "Doctor profile created successfully."
                );

            }


            // ------------------------------------------------
            // Update
            // ------------------------------------------------

            else if (
                modal === "edit" &&
                editingDoctor
            ) {

                await API.put(

                    API_ROUTES.DOCTORS.BY_ID(
                        editingDoctor._id
                    ),

                    doctorData

                );

                setSuccess(
                    "Doctor profile updated successfully."
                );

            }


            closeModal();

            await loadDoctors();

            await loadDoctorUsers();

        } catch (error) {

            console.error(
                "Doctor save error:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Unable to save doctor."
            );

        } finally {

            setSaving(false);

        }

    };


    // ========================================================
    // Delete Doctor
    // ========================================================

    const handleDelete = async (
        doctor
    ) => {

        setMenuId(null);

        const name =
            getDoctorName(doctor);

        const confirmed =
            window.confirm(

                `Delete the Doctor profile for ${name}?\n\n` +
                `This removes the Doctor profile, but does not delete the User account.`

            );

        if (!confirmed) {
            return;
        }

        try {

            clearMessages();

            setSaving(true);

            await API.delete(

                API_ROUTES.DOCTORS.BY_ID(
                    doctor._id
                )

            );

            setSuccess(
                `${name} Doctor profile deleted successfully.`
            );

            await loadDoctors();

            await loadDoctorUsers();

        } catch (error) {

            console.error(
                "Doctor delete error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to delete doctor."
            );

        } finally {

            setSaving(false);

        }

    };


    // ========================================================
    // Toggle Doctor Active Status
    //
    // Doctor status is controlled through the linked User.
    // ========================================================

    const handleToggleStatus = async (
        doctor
    ) => {

        setMenuId(null);

        const userId =
            doctor.userId?._id ||
            doctor.userId;

        if (!userId) {

            setError(
                "Unable to identify the Doctor user account."
            );

            return;

        }

        const currentStatus =
            doctor.userId?.isActive !== false &&
            doctor.isActive !== false;

        const newStatus =
            !currentStatus;

        const name =
            getDoctorName(doctor);

        try {

            clearMessages();

            setSaving(true);

            await API.patch(

                API_ROUTES.USERS.STATUS(
                    userId
                ),

                {
                    isActive:
                        newStatus,
                }

            );

            setSuccess(

                newStatus
                    ? `${name} has been activated.`
                    : `${name} has been deactivated.`

            );

            await loadDoctors();

            await loadDoctorUsers();

        } catch (error) {

            console.error(
                "Doctor status error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to update Doctor status."
            );

        } finally {

            setSaving(false);

        }

    };


    // ========================================================
    // Search
    // ========================================================

    const filteredDoctors =
        doctors.filter(
            (doctor) => {

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

            }
        );


    // ========================================================
    // Doctor Name
    // ========================================================

    const getDoctorName = (
        doctor
    ) => {

        return (

            doctor.userId?.fullName ||

            doctor.fullName ||

            "Unknown Doctor"

        );

    };


    // ========================================================
    // Doctor Email
    // ========================================================

    const getDoctorEmail = (
        doctor
    ) => {

        return (

            doctor.userId?.email ||

            doctor.email ||

            "—"

        );

    };


    // ========================================================
    // Doctor Phone
    // ========================================================

    const getDoctorPhone = (
        doctor
    ) => {

        return (

            doctor.userId?.phone ||

            doctor.phone ||

            "—"

        );

    };


    // ========================================================
    // Initials
    // ========================================================

    const getInitials = (
        name
    ) => {

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

            parts[
                parts.length - 1
            ][0]

        ).toUpperCase();

    };


    // ========================================================
    // Doctor Active Status
    // ========================================================

    const isDoctorActive = (
        doctor
    ) => {

        return (

            doctor.userId?.isActive !== false &&

            doctor.isActive !== false

        );

    };


    // ========================================================
    // Render
    // ========================================================

    return (

        <div
            className="doctors-page"
            onClick={() => setMenuId(null)}
        >

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
                    onClick={(event) => {

                        event.stopPropagation();

                        openAddModal();

                    }}
                >

                    <Plus size={18} />

                    <span>
                        Add Doctor
                    </span>

                </button>

            </section>


            {/* ==================================================
                Messages
                ================================================== */}

            {error && (

                <div className="doctors-error">

                    {error}

                    <button
                        type="button"
                        onClick={() => setError("")}
                    >
                        <X size={15} />
                    </button>

                </div>

            )}


            {success && (

                <div className="doctors-success">

                    {success}

                    <button
                        type="button"
                        onClick={() => setSuccess("")}
                    >
                        <X size={15} />
                    </button>

                </div>

            )}


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
                    onClick={() => {

                        clearMessages();

                        loadDoctors();

                    }}
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
                                        isDoctorActive(
                                            doctor
                                        )
                                ).length}

                        </strong>

                    </div>

                </div>

            </section>


            {/* ==================================================
                Doctors Card
                ================================================== */}

            <section
                className="doctors-card"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >

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

                            : `${filteredDoctors.length} doctor${filteredDoctors.length === 1 ? "" : "s"}`

                        }

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
                                            isDoctorActive(
                                                doctor
                                            );

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

                                                            <small>
                                                                {getDoctorPhone(
                                                                    doctor
                                                                )}
                                                            </small>

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

                                                    <div className="doctor-actions">

                                                        <button
                                                            type="button"
                                                            className="doctor-more-button"
                                                            aria-label={`Options for ${name}`}
                                                            onClick={(
                                                                event
                                                            ) => {

                                                                event.stopPropagation();

                                                                setMenuId(
                                                                    menuId ===
                                                                    doctor._id
                                                                        ? null
                                                                        : doctor._id
                                                                );

                                                            }}
                                                        >

                                                            <MoreHorizontal
                                                                size={18}
                                                            />

                                                        </button>


                                                        {menuId ===
                                                            doctor._id && (

                                                            <div
                                                                className="doctor-action-menu"
                                                                onClick={(
                                                                    event
                                                                ) =>
                                                                    event.stopPropagation()
                                                                }
                                                            >

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        openEditModal(
                                                                            doctor
                                                                        )
                                                                    }
                                                                >

                                                                    <Pencil
                                                                        size={15}
                                                                    />

                                                                    Edit

                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleToggleStatus(
                                                                            doctor
                                                                        )
                                                                    }
                                                                >

                                                                    <Power
                                                                        size={15}
                                                                    />

                                                                    {isActive
                                                                        ? "Deactivate"
                                                                        : "Activate"}

                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    className="danger"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            doctor
                                                                        )
                                                                    }
                                                                >

                                                                    <Trash2
                                                                        size={15}
                                                                    />

                                                                    Delete Profile

                                                                </button>

                                                            </div>

                                                        )}

                                                    </div>

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


            {/* ==================================================
                Modal
                ================================================== */}

            {modal && (

                <div
                    className="doctor-modal-overlay"
                    onMouseDown={(event) => {

                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            closeModal();
                        }

                    }}
                >

                    <div className="doctor-modal">

                        <div className="doctor-modal-header">

                            <div>

                                <span>
                                    {modal === "add"
                                        ? "NEW PROFILE"
                                        : "EDIT PROFILE"}
                                </span>

                                <h2>

                                    {modal === "add"
                                        ? "Add Doctor"
                                        : "Edit Doctor"}

                                </h2>

                            </div>


                            <button
                                type="button"
                                className="doctor-modal-close"
                                onClick={
                                    closeModal
                                }
                                disabled={saving}
                            >

                                <X size={20} />

                            </button>

                        </div>


                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            {modal === "add" && (

                                <div className="doctor-form-group">

                                    <label>
                                        Doctor User
                                    </label>

                                    <select
                                        name="userId"
                                        value={
                                            form.userId
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        required
                                    >

                                        <option value="">
                                            Select Doctor User
                                        </option>

                                        {doctorUsers
                                            .filter(
                                                (user) =>
                                                    !doctors.some(
                                                        (doctor) =>
                                                            (
                                                                doctor.userId?._id ||
                                                                doctor.userId
                                                            ) ===
                                                            user._id
                                                    )
                                            )
                                            .map(
                                                (user) => (

                                                    <option
                                                        key={
                                                            user._id
                                                        }
                                                        value={
                                                            user._id
                                                        }
                                                    >
                                                        {user.fullName}
                                                        {" — "}
                                                        {user.email}
                                                    </option>

                                                )
                                            )}

                                    </select>


                                    {doctorUsers.filter(
                                        (user) =>
                                            !doctors.some(
                                                (doctor) =>
                                                    (
                                                        doctor.userId?._id ||
                                                        doctor.userId
                                                    ) ===
                                                    user._id
                                            )
                                    ).length === 0 && (

                                        <small className="doctor-form-help">
                                            No available Doctor users. Create a User with the Doctor role first.
                                        </small>

                                    )}

                                </div>

                            )}


                            <div className="doctor-form-grid">

                                <div className="doctor-form-group">

                                    <label>
                                        Specialization
                                    </label>

                                    <input
                                        name="specialization"
                                        value={
                                            form.specialization
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        placeholder="e.g. Cardiologist"
                                        required
                                    />

                                </div>


                                <div className="doctor-form-group">

                                    <label>
                                        Qualification
                                    </label>

                                    <input
                                        name="qualification"
                                        value={
                                            form.qualification
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        placeholder="e.g. MBBS, FCPS"
                                        required
                                    />

                                </div>


                                <div className="doctor-form-group">

                                    <label>
                                        Experience
                                    </label>

                                    <input
                                        type="number"
                                        name="experience"
                                        min="0"
                                        value={
                                            form.experience
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        placeholder="Years"
                                        required
                                    />

                                </div>


                                <div className="doctor-form-group">

                                    <label>
                                        License Number
                                    </label>

                                    <input
                                        name="licenseNumber"
                                        value={
                                            form.licenseNumber
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        placeholder="e.g. DOC-1004"
                                        required
                                    />

                                </div>


                                <div className="doctor-form-group">

                                    <label>
                                        Consultation Fee
                                    </label>

                                    <input
                                        type="number"
                                        name="consultationFee"
                                        min="0"
                                        value={
                                            form.consultationFee
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        placeholder="Rs."
                                    />

                                </div>


                                <div className="doctor-form-group">

                                    <label>
                                        Department
                                    </label>

                                    <input
                                        name="department"
                                        value={
                                            form.department
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        placeholder="e.g. Cardiology"
                                    />

                                </div>

                            </div>


                            <label className="doctor-availability">

                                <input
                                    type="checkbox"
                                    name="availability"
                                    checked={
                                        form.availability
                                    }
                                    onChange={
                                        handleFormChange
                                    }
                                />

                                <span>
                                    Doctor currently available for appointments
                                </span>

                            </label>


                            <div className="doctor-modal-footer">

                                <button
                                    type="button"
                                    className="doctor-cancel-button"
                                    onClick={
                                        closeModal
                                    }
                                    disabled={saving}
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="doctor-save-button"
                                    disabled={saving}
                                >

                                    {saving ? (

                                        <RefreshCw
                                            size={16}
                                            className="doctors-refresh-spin"
                                        />

                                    ) : (

                                        <Save
                                            size={16}
                                        />

                                    )}

                                    {saving
                                        ? "Saving..."
                                        : modal === "add"
                                            ? "Create Doctor"
                                            : "Save Changes"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>

    );

};


export default Doctors;