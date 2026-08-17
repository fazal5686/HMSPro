
// ============================================================
// File: pages/Settings/Settings.jsx
// Purpose: HMSPro application settings center.
// ============================================================

import {
    Bell,
    CheckCircle2,
    Globe,
    LockKeyhole,
    Palette,
    Save,
    Settings as SettingsIcon,
    ShieldCheck,
    SlidersHorizontal,
} from "lucide-react";

import { useState } from "react";

import "./Settings.css";


// ============================================================
// Settings Component
// ============================================================

const Settings = () => {

    const [settings, setSettings] = useState({
        hospitalName: "HMSPro Hospital",
        timezone: "Asia/Karachi",
        language: "English",
        emailNotifications: true,
        appointmentNotifications: true,
        systemNotifications: true,
        compactMode: false,
    });

    const [saved, setSaved] = useState(false);


    // ========================================================
    // Handle Input Changes
    // ========================================================

    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked,
        } = event.target;


        setSettings((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));


        setSaved(false);

    };


    // ========================================================
    // Save Settings
    // ========================================================

    const handleSave = (event) => {

        event.preventDefault();

        // Frontend settings checkpoint.
        // Backend persistence can be connected later.

        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 3000);

    };


    return (

        <div className="settings-page">


            {/* ==================================================
                Page Header
                ================================================== */}

            <section className="settings-header">

                <div>

                    <div className="settings-eyebrow">

                        <SettingsIcon size={16} />

                        <span>
                            SYSTEM CONFIGURATION
                        </span>

                    </div>


                    <h1>
                        Settings
                    </h1>


                    <p>
                        Configure HMSPro hospital preferences,
                        notifications and application behavior.
                    </p>

                </div>


                <div className="settings-header-icon">

                    <SlidersHorizontal size={24} />

                </div>

            </section>



            {/* ==================================================
                Save Confirmation
                ================================================== */}

            {saved && (

                <div className="settings-success">

                    <CheckCircle2 size={18} />

                    <span>
                        Settings saved successfully.
                    </span>

                </div>

            )}



            {/* ==================================================
                Settings Form
                ================================================== */}

            <form
                className="settings-layout"
                onSubmit={handleSave}
            >


                {/* ==================================================
                    Hospital Information
                    ================================================== */}

                <section className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-card-icon blue">

                            <Globe size={20} />

                        </div>


                        <div>

                            <span className="settings-card-kicker">
                                GENERAL
                            </span>

                            <h2>
                                Hospital Information
                            </h2>

                            <p>
                                Basic information used throughout
                                the HMSPro application.
                            </p>

                        </div>

                    </div>


                    <div className="settings-form-grid">

                        <label className="settings-field">

                            <span>
                                Hospital Name
                            </span>

                            <input
                                type="text"
                                name="hospitalName"
                                value={settings.hospitalName}
                                onChange={handleChange}
                            />

                        </label>


                        <label className="settings-field">

                            <span>
                                Language
                            </span>

                            <select
                                name="language"
                                value={settings.language}
                                onChange={handleChange}
                            >

                                <option value="English">
                                    English
                                </option>

                                <option value="Urdu">
                                    Urdu
                                </option>

                            </select>

                        </label>


                        <label className="settings-field">

                            <span>
                                Time Zone
                            </span>

                            <select
                                name="timezone"
                                value={settings.timezone}
                                onChange={handleChange}
                            >

                                <option value="Asia/Karachi">
                                    Pakistan Standard Time
                                </option>

                                <option value="UTC">
                                    UTC
                                </option>

                                <option value="Asia/Dubai">
                                    Gulf Standard Time
                                </option>

                            </select>

                        </label>

                    </div>

                </section>



                {/* ==================================================
                    Notifications
                    ================================================== */}

                <section className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-card-icon orange">

                            <Bell size={20} />

                        </div>


                        <div>

                            <span className="settings-card-kicker">
                                NOTIFICATIONS
                            </span>

                            <h2>
                                Notification Preferences
                            </h2>

                            <p>
                                Choose which hospital events should
                                generate notifications.
                            </p>

                        </div>

                    </div>


                    <div className="settings-options">

                        <label className="settings-toggle">

                            <div>

                                <strong>
                                    Appointment Notifications
                                </strong>

                                <span>
                                    Receive alerts about appointments
                                    and scheduling changes.
                                </span>

                            </div>


                            <input
                                type="checkbox"
                                name="appointmentNotifications"
                                checked={
                                    settings.appointmentNotifications
                                }
                                onChange={handleChange}
                            />

                        </label>


                        <label className="settings-toggle">

                            <div>

                                <strong>
                                    Email Notifications
                                </strong>

                                <span>
                                    Enable important notifications
                                    through email.
                                </span>

                            </div>


                            <input
                                type="checkbox"
                                name="emailNotifications"
                                checked={
                                    settings.emailNotifications
                                }
                                onChange={handleChange}
                            />

                        </label>


                        <label className="settings-toggle">

                            <div>

                                <strong>
                                    System Notifications
                                </strong>

                                <span>
                                    Receive important system and
                                    administrative alerts.
                                </span>

                            </div>


                            <input
                                type="checkbox"
                                name="systemNotifications"
                                checked={
                                    settings.systemNotifications
                                }
                                onChange={handleChange}
                            />

                        </label>

                    </div>

                </section>



                {/* ==================================================
                    Appearance
                    ================================================== */}

                <section className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-card-icon purple">

                            <Palette size={20} />

                        </div>


                        <div>

                            <span className="settings-card-kicker">
                                APPEARANCE
                            </span>

                            <h2>
                                Application Display
                            </h2>

                            <p>
                                Control how information is displayed
                                inside HMSPro.
                            </p>

                        </div>

                    </div>


                    <div className="settings-options">

                        <label className="settings-toggle">

                            <div>

                                <strong>
                                    Compact Mode
                                </strong>

                                <span>
                                    Use a more compact layout for
                                    application content.
                                </span>

                            </div>


                            <input
                                type="checkbox"
                                name="compactMode"
                                checked={settings.compactMode}
                                onChange={handleChange}
                            />

                        </label>

                    </div>

                </section>



                {/* ==================================================
                    Security
                    ================================================== */}

                <section className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-card-icon green">

                            <ShieldCheck size={20} />

                        </div>


                        <div>

                            <span className="settings-card-kicker">
                                SECURITY
                            </span>

                            <h2>
                                Security & Access
                            </h2>

                            <p>
                                HMSPro authentication and access
                                controls are enforced by the backend.
                            </p>

                        </div>

                    </div>


                    <div className="security-status">

                        <div className="security-status-icon">

                            <LockKeyhole size={18} />

                        </div>


                        <div>

                            <strong>
                                Authentication Protected
                            </strong>

                            <span>
                                JWT authentication is active for
                                protected HMSPro requests.
                            </span>

                        </div>

                    </div>

                </section>



                {/* ==================================================
                    Form Footer
                    ================================================== */}

                <div className="settings-actions">

                    <span>
                        Changes are applied to this session.
                    </span>


                    <button
                        type="submit"
                        className="settings-save-button"
                    >

                        <Save size={17} />

                        <span>
                            Save Settings
                        </span>

                    </button>

                </div>


            </form>

        </div>

    );

};


export default Settings;

