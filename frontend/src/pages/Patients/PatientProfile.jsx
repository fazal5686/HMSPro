// ============================================================
// File: D:\HMSPro\frontend\src\pages\Patients\PatientProfile.jsx
// Purpose: Patient profile management page.
// Allows an authenticated Patient to create, view, and update
// their own patient profile.
// ============================================================

import { useEffect, useState } from "react";

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
// Patient Profile Component
// ============================================================

const PatientProfile = () => {


    const [formData, setFormData] = useState(
        initialFormData
    );


    const [loading, setLoading] = useState(true);


    const [saving, setSaving] = useState(false);


    const [profileExists, setProfileExists] = useState(false);


    const [message, setMessage] = useState("");


    const [error, setError] = useState("");



    // ========================================================
    // Load Patient Profile
    // ========================================================

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const profile =
                    await getPatientProfile();


                setFormData({

                    dateOfBirth:
                        profile.dateOfBirth
                            ? profile.dateOfBirth
                                .split("T")[0]
                            : "",

                    gender:
                        profile.gender || "",

                    bloodGroup:
                        profile.bloodGroup || "",

                    address:
                        profile.address || "",

                    city:
                        profile.city || "",

                    emergencyContact:
                        profile.emergencyContact || "",

                    medicalHistory:
                        profile.medicalHistory || "",

                    allergies:
                        profile.allergies || "",

                });


                setProfileExists(true);


            } catch (err) {

                // A missing profile is expected for a
                // newly registered Patient.

                if (
                    err.response?.status === 404
                ) {

                    setProfileExists(false);

                } else {

                    setError(
                        err.response?.data?.message ||
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
    // Handle Input Changes
    // ========================================================

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setFormData((previousData) => ({

            ...previousData,

            [name]: value,

        }));

    };



    // ========================================================
    // Handle Submit
    // ========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


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

                setFormData({

                    dateOfBirth:
                        profile.dateOfBirth
                            ? profile.dateOfBirth
                                .split("T")[0]
                            : "",

                    gender:
                        profile.gender || "",

                    bloodGroup:
                        profile.bloodGroup || "",

                    address:
                        profile.address || "",

                    city:
                        profile.city || "",

                    emergencyContact:
                        profile.emergencyContact || "",

                    medicalHistory:
                        profile.medicalHistory || "",

                    allergies:
                        profile.allergies || "",

                });

            }


        } catch (err) {

            setError(

                err.response?.data?.message ||

                "Unable to save patient profile."

            );

        } finally {

            setSaving(false);

        }

    };



    // ========================================================
    // Loading State
    // ========================================================

    if (loading) {

        return (

            <div>

                <h2>
                    Patient Profile
                </h2>

                <p>
                    Loading profile...
                </p>

            </div>

        );

    }



    // ========================================================
    // Page UI
    // ========================================================

    return (

        <div className="patient-profile-page">


            <h2>
                Patient Profile
            </h2>


            <p>
                Manage your personal and medical information.
            </p>



            {message && (

                <p className="success-message">

                    {message}

                </p>

            )}



            {error && (

                <p className="error-message">

                    {error}

                </p>

            )}



            <form onSubmit={handleSubmit}>


                {/* Date of Birth */}

                <div className="form-group">

                    <label>
                        Date of Birth
                    </label>

                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />

                </div>



                {/* Gender */}

                <div className="form-group">

                    <label>
                        Gender
                    </label>

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
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



                {/* Blood Group */}

                <div className="form-group">

                    <label>
                        Blood Group
                    </label>

                    <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
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



                {/* Address */}

                <div className="form-group">

                    <label>
                        Address
                    </label>

                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                    />

                </div>



                {/* City */}

                <div className="form-group">

                    <label>
                        City
                    </label>

                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                    />

                </div>



                {/* Emergency Contact */}

                <div className="form-group">

                    <label>
                        Emergency Contact
                    </label>

                    <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        placeholder="Enter emergency contact"
                    />

                </div>



                {/* Medical History */}

                <div className="form-group">

                    <label>
                        Medical History
                    </label>

                    <textarea
                        name="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={handleChange}
                        placeholder="Enter medical history"
                        rows="4"
                    />

                </div>



                {/* Allergies */}

                <div className="form-group">

                    <label>
                        Allergies
                    </label>

                    <textarea
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        placeholder="Enter allergies"
                        rows="4"
                    />

                </div>



                {/* Submit */}

                <button
                    type="submit"
                    disabled={saving}
                >

                    {saving
                        ? "Saving..."
                        : profileExists
                            ? "Update Profile"
                            : "Create Profile"
                    }

                </button>


            </form>


        </div>

    );

};


export default PatientProfile;