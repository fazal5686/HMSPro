
// ============================================================
// File: pages/Laboratory/Laboratory.jsx
// Purpose: HMSPro Laboratory dashboard.
// ============================================================

import {
    Activity,
    AlertTriangle,
    CheckCircle2,
    Clock3,
    FlaskConical,
    FileText,
    Plus,
    RefreshCw,
    Search,
    TestTube2,
    UserRound,
    XCircle,
} from "lucide-react";

import "./Laboratory.css";


// ============================================================
// Laboratory Component
// ============================================================

const Laboratory = () => {

    const statistics = [
        {
            title: "Total Tests",
            value: "0",
            note: "All laboratory tests",
            icon: FlaskConical,
            tone: "blue",
        },
        {
            title: "Pending Tests",
            value: "0",
            note: "Awaiting processing",
            icon: Clock3,
            tone: "orange",
        },
        {
            title: "Completed",
            value: "0",
            note: "Completed test reports",
            icon: CheckCircle2,
            tone: "green",
        },
        {
            title: "Critical Results",
            value: "0",
            note: "Requires attention",
            icon: AlertTriangle,
            tone: "red",
        },
    ];


    return (

        <div className="laboratory-page">

            {/* ==================================================
                Page Header
                ================================================== */}

            <section className="laboratory-header">

                <div>

                    <div className="laboratory-eyebrow">

                        <FlaskConical size={16} />

                        <span>
                            LABORATORY
                        </span>

                    </div>

                    <h1>
                        Laboratory
                    </h1>

                    <p>
                        Manage laboratory tests, results and
                        diagnostic reports from one place.
                    </p>

                </div>


                <div className="laboratory-header-actions">

                    <button
                        type="button"
                        className="laboratory-button secondary"
                    >
                        <RefreshCw size={17} />
                        Refresh
                    </button>

                    <button
                        type="button"
                        className="laboratory-button primary"
                    >
                        <Plus size={17} />
                        New Test
                    </button>

                </div>

            </section>


            {/* ==================================================
                Statistics
                ================================================== */}

            <section className="laboratory-stat-grid">

                {statistics.map((item) => {

                    const Icon = item.icon;

                    return (

                        <article
                            className="laboratory-stat-card"
                            key={item.title}
                        >

                            <div
                                className={`laboratory-stat-icon ${item.tone}`}
                            >
                                <Icon size={21} />
                            </div>

                            <div className="laboratory-stat-content">

                                <span>
                                    {item.title}
                                </span>

                                <strong>
                                    {item.value}
                                </strong>

                                <small>
                                    {item.note}
                                </small>

                            </div>

                        </article>

                    );

                })}

            </section>


            {/* ==================================================
                Main Laboratory Workspace
                ================================================== */}

            <section className="laboratory-card">

                <div className="laboratory-card-header">

                    <div>

                        <span className="laboratory-card-kicker">
                            TEST MANAGEMENT
                        </span>

                        <h2>
                            Laboratory Tests
                        </h2>

                    </div>

                    <div className="laboratory-card-icon">
                        <TestTube2 size={20} />
                    </div>

                </div>


                {/* ==================================================
                    Search / Filter Bar
                    ================================================== */}

                <div className="laboratory-toolbar">

                    <div className="laboratory-search">

                        <Search size={18} />

                        <input
                            type="search"
                            placeholder="Search patient or test..."
                            aria-label="Search laboratory tests"
                        />

                    </div>


                    <select
                        className="laboratory-filter"
                        defaultValue="all"
                    >
                        <option value="all">
                            All Status
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="completed">
                            Completed
                        </option>

                        <option value="critical">
                            Critical
                        </option>
                    </select>

                </div>


                {/* ==================================================
                    Empty State
                    ================================================== */}

                <div className="laboratory-empty">

                    <div className="laboratory-empty-icon">

                        <FileText size={28} />

                    </div>

                    <h3>
                        No laboratory tests yet
                    </h3>

                    <p>
                        Laboratory test records will appear here
                        when tests are created.
                    </p>

                    <button
                        type="button"
                        className="laboratory-empty-button"
                    >
                        <Plus size={16} />
                        Create First Test
                    </button>

                </div>

            </section>


            {/* ==================================================
                Quick Information
                ================================================== */}

            <section className="laboratory-info-grid">

                <article className="laboratory-info-card">

                    <div className="laboratory-info-icon">

                        <UserRound size={20} />

                    </div>

                    <div>

                        <strong>
                            Patient Testing
                        </strong>

                        <span>
                            Tests can be associated with registered
                            HMSPro patients.
                        </span>

                    </div>

                </article>


                <article className="laboratory-info-card">

                    <div className="laboratory-info-icon">

                        <Activity size={20} />

                    </div>

                    <div>

                        <strong>
                            Result Monitoring
                        </strong>

                        <span>
                            Track pending, completed and critical
                            laboratory results.
                        </span>

                    </div>

                </article>


                <article className="laboratory-info-card">

                    <div className="laboratory-info-icon">

                        <XCircle size={20} />

                    </div>

                    <div>

                        <strong>
                            Data Status
                        </strong>

                        <span>
                            Laboratory API integration will be added
                            when the backend module is finalized.
                        </span>

                    </div>

                </article>

            </section>

        </div>

    );

};


export default Laboratory;
