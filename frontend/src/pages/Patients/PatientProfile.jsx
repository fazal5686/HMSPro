// ============================================================
// File:
// D:\HMSPro\frontend\src\pages\Patients\PatientProfile.jsx
//
// Purpose:
// Professional HMSPro Patient Profile page.
//
// Responsibilities:
// 1. Load authenticated patient's profile.
// 2. Create a profile for a newly registered Patient.
// 3. Update an existing patient profile.
// 4. Present personal and medical information professionally.
// 5. Preserve existing patientService API integration.
// ============================================================

import {
    useEffect,
    useState,
} from "react";

import {
    CalendarDays,
    CheckCircle2,
    Droplets,
    FileText,
    HeartPulse,
    Home,
    Loader2,
    MapPin,
    Phone,
    Save,
    UserRound,
} from "lucide-react";

import {
    createPatientProfile,
    getPatientProfile,
    updatePatientProfile,
} from "../../services/patientService.js";

import "./PatientProfile.css";


// ============================================================
// Initial Form State
// ============================================================

const initialFormData = {
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    address: "",
    city: "",
    emergencyContact: "",
    medicalHistory: "",
    allergies: "",
};


// ============================================================
// Helper
// ============================================================

const normalizeProfile = (profile = {}) => ({
    dateOfBirth: profile.dateOfBirth
        ? profile.dateOfBirth.split("T")[0]
        : "",

    gender: profile.gender || "",

    bloodGroup: profile.bloodGroup || "",

    address: profile.address || "",

    city: profile.city || "",

    emergencyContact:
        profile.emergencyContact || "",

    medicalHistory:
        profile.medicalHistory || "",

    allergies:
        profile.allergies || "",
});


// ============================================================
// Patient Profile Component
// ============================================================

const PatientProfile = () => {

    const [formData, setFormData] =
        useState(initialFormData);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [profileExists, setProfileExists] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");


    // ========================================================
    // Load Profile
    // ========================================================

    useEffect(() => {

        const loadProfile = async () => {

            try {

                setLoading(true);

                setError("");

                const profile =
                    await getPatientProfile();

                setFormData(
                    normalizeProfile(profile)
                );

                setProfileExists(true);

            } catch (err) {

                if (
                    err?.response?.status === 404
                ) {

                    setProfileExists(false);

                } else {

                    console.error(
                        "Failed to load patient profile:",
                        err
                    );

                    setError(
                        err?.response?.data?.message ||
                        "Unable to load patient profile."
                    );

                }

            } finally {

                setLoading(false);

            }

        };

        loadProfile();

    }, []);


    // ========================================================
    // Handle Change
    // ========================================================

    const handleChange = (event) => {

        const {
            name,
            value,
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setMessage("");

        setError("");

    };


    // ========================================================
    // Handle Submit
    // ========================================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage("");

        setError("");

        setSaving(true);

        try {

            let profile;

            if (profileExists) {

                profile =
                    await updatePatientProfile(
                        formData
                    );

                setMessage(
                    "Patient profile updated successfully."
                );

            } else {

                profile =
                    await createPatientProfile(
                        formData
                    );

                setProfileExists(true);

                setMessage(
                    "Patient profile created successfully."
                );

            }

            if (profile) {

                setFormData(
                    normalizeProfile(profile)
                );

            }

        } catch (err) {

            console.error(
                "Failed to save patient profile:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Unable to save patient profile."
            );

        } finally {

            setSaving(false);

        }

    };


    // ========================================================
    // Loading
    // ========================================================

    if (loading) {

        return (

            <div className="patient-profile-page">

                <div className="patient-profile-loading">

                    <Loader2
                        size={30}
                        className="patient-profile-loading-icon"
                    />

                    <strong>
                        Loading patient profile...
                    </strong>

                    <span>
                        Please wait while your information is retrieved.
                    </span>

                </div>

            </div>

        );

    }


    // ========================================================
    // Render
    // ========================================================

    return (

        <div className="patient-profile-page">

            {/* ==================================================
                Page Header
                ================================================== */}

            <div className="patient-profile-header">

                <div className="patient-profile-title-row">

                    <div className="patient-profile-title-icon">

                        <UserRound
                            size={24}
                        />

                    </div>

                    <div>

                        <h1>
                            Patient Profile
                        </h1>

                        <p>
                            Manage your personal and medical information.
                        </p>

                    </div>

                </div>

                <div className="patient-profile-status">

                    <span className="patient-profile-status-dot" />

                    {profileExists
                        ? "Profile Active"
                        : "Profile Not Created"}

                </div>

            </div>


            {/* ==================================================
                Success Message
                ================================================== */}

            {message && (

                <div className="patient-profile-alert success">

                    <CheckCircle2
                        size={18}
                    />

                    <span>
                        {message}
                    </span>

                </div>

            )}


            {/* ==================================================
                Error Message
                ================================================== */}

            {error && (

                <div className="patient-profile-alert error">

                    <span>
                        {error}
                    </span>

                </div>

            )}


            {/* ==================================================
                Profile Form
                ================================================== */}

            <form
                className="patient-profile-form"
                onSubmit={handleSubmit}
            >

                {/* ==================================================
                    Personal Information
                    ================================================== */}

                <section className="patient-profile-card">

                    <div className="patient-profile-card-header">

                        <div className="patient-profile-section-icon">

                            <UserRound
                                size={19}
                            />

                        </div>

                        <div>

                            <h2>
                                Personal Information
                            </h2>

                            <p>
                                Basic information about the patient.
                            </p>

                        </div>

                    </div>


                    <div className="patient-profile-grid">

                        {/* Date of Birth */}

                        <div className="patient-form-group">

                            <label htmlFor="dateOfBirth">

                                Date of Birth

                            </label>

                            <div className="patient-input-wrapper">

                                <CalendarDays
                                    size={17}
                                />

                                <input
                                    id="dateOfBirth"
                                    type="date"
                                    name="dateOfBirth"
                                    value={
                                        formData.dateOfBirth
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                        </div>


                        {/* Gender */}

                        <div className="patient-form-group">

                            <label htmlFor="gender">

                                Gender

                            </label>

                            <div className="patient-input-wrapper">

                                <UserRound
                                    size={17}
                                />

                                <select
                                    id="gender"
                                    name="gender"
                                    value={
                                        formData.gender
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* Blood Group */}

                        <div className="patient-form-group">

                            <label htmlFor="bloodGroup">

                                Blood Group

                            </label>

                            <div className="patient-input-wrapper">

                                <Droplets
                                    size={17}
                                />

                                <select
                                    id="bloodGroup"
                                    name="bloodGroup"
                                    value={
                                        formData.bloodGroup
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="">
                                        Select Blood Group
                                    </option>

                                    <option value="A+">
                                        A+
                                    </option>

                                    <option value="A-">
                                        A-
                                    </option>

                                    <option value="B+">
                                        B+
                                    </option>

                                    <option value="B-">
                                        B-
                                    </option>

                                    <option value="AB+">
                                        AB+
                                    </option>

                                    <option value="AB-">
                                        AB-
                                    </option>

                                    <option value="O+">
                                        O+
                                    </option>

                                    <option value="O-">
                                        O-
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ==================================================
                    Contact & Location
                    ================================================== */}

                <section className="patient-profile-card">

                    <div className="patient-profile-card-header">

                        <div className="patient-profile-section-icon">

                            <Home
                                size={19}
                            />

                        </div>

                        <div>

                            <h2>
                                Contact & Location
                            </h2>

                            <p>
                                Contact and residential information.
                            </p>

                        </div>

                    </div>


                    <div className="patient-profile-grid">

                        {/* Address */}

                        <div className="patient-form-group patient-form-group-wide">

                            <label htmlFor="address">

                                Address

                            </label>

                            <div className="patient-input-wrapper">

                                <Home
                                    size={17}
                                />

                                <input
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={
                                        formData.address
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter residential address"
                                />

                            </div>

                        </div>


                        {/* City */}

                        <div className="patient-form-group">

                            <label htmlFor="city">

                                City

                            </label>

                            <div className="patient-input-wrapper">

                                <MapPin
                                    size={17}
                                />

                                <input
                                    id="city"
                                    type="text"
                                    name="city"
                                    value={
                                        formData.city
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter city"
                                />

                            </div>

                        </div>


                        {/* Emergency Contact */}

                        <div className="patient-form-group">

                            <label htmlFor="emergencyContact">

                                Emergency Contact

                            </label>

                            <div className="patient-input-wrapper">

                                <Phone
                                    size={17}
                                />

                                <input
                                    id="emergencyContact"
                                    type="text"
                                    name="emergencyContact"
                                    value={
                                        formData.emergencyContact
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter emergency contact"
                                />

                            </div>

                        </div>

                    </div>

                </section>


                {/* ==================================================
                    Medical Information
                    ================================================== */}

                <section className="patient-profile-card">

                    <div className="patient-profile-card-header">

                        <div className="patient-profile-section-icon medical">

                            <HeartPulse
                                size={19}
                            />

                        </div>

                        <div>

                            <h2>
                                Medical Information
                            </h2>

                            <p>
                                Important medical history and allergy information.
                            </p>

                        </div>

                    </div>


                    <div className="patient-profile-medical-grid">

                        {/* Medical History */}

                        <div className="patient-form-group">

                            <label htmlFor="medicalHistory">

                                Medical History

                            </label>

                            <div className="patient-textarea-wrapper">

                                <FileText
                                    size={17}
                                />

                                <textarea
                                    id="medicalHistory"
                                    name="medicalHistory"
                                    value={
                                        formData.medicalHistory
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter relevant medical history"
                                    rows={5}
                                />

                            </div>

                        </div>


                        {/* Allergies */}

                        <div className="patient-form-group">

                            <label htmlFor="allergies">

                                Allergies

                            </label>

                            <div className="patient-textarea-wrapper">

                                <HeartPulse
                                    size={17}
                                />

                                <textarea
                                    id="allergies"
                                    name="allergies"
                                    value={
                                        formData.allergies
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter known allergies"
                                    rows={5}
                                />

                            </div>

                        </div>

                    </div>

                </section>


                {/* ==================================================
                    Form Footer
                    ================================================== */}

                <div className="patient-profile-actions">

                    <div className="patient-profile-help">

                        <span className="patient-profile-help-icon">

                            <CheckCircle2
                                size={15}
                            />

                        </span>

                        <span>
                            Keep your patient information accurate and up to date.
                        </span>

                    </div>


                    <button
                        type="submit"
                        className="patient-profile-save-button"
                        disabled={saving}
                    >

                        {saving ? (

                            <>

                                <Loader2
                                    size={17}
                                    className="patient-profile-loading-icon"
                                />

                                Saving...

                            </>

                        ) : (

                            <>

                                <Save
                                    size={17}
                                />

                                {profileExists
                                    ? "Update Profile"
                                    : "Create Profile"}

                            </>

                        )}

                    </button>

                </div>

            </form>

        </div>

    );

};


export default PatientProfile;