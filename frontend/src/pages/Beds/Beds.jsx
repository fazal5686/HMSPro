
// ============================================================
// File: pages/Beds/Beds.jsx
// Purpose: HMSPro Beds management and capacity overview page.
// Note: Dedicated Bed API is not available yet.
// ============================================================

import { useMemo, useState } from "react";

import {
    BedDouble,
    CheckCircle2,
    Clock3,
    Home,
    RefreshCw,
    Search,
    Wrench,
} from "lucide-react";

import "./Beds.css";


// ============================================================
// Beds Component
// ============================================================

const Beds = () => {

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [refreshing, setRefreshing] =
        useState(false);


    // ========================================================
    // Temporary presentation data
    // Will be replaced by dedicated Bed API later.
    // ========================================================

    const beds = [
        {
            id: "BED-101-A",
            bedNumber: "Bed 101-A",
            roomNumber: "Room 101",
            department: "General Ward",
            status: "Available",
        },
        {
            id: "BED-101-B",
            bedNumber: "Bed 101-B",
            roomNumber: "Room 101",
            department: "General Ward",
            status: "Occupied",
        },
        {
            id: "BED-102-A",
            bedNumber: "Bed 102-A",
            roomNumber: "Room 102",
            department: "General Ward",
            status: "Available",
        },
        {
            id: "BED-102-B",
            bedNumber: "Bed 102-B",
            roomNumber: "Room 102",
            department: "General Ward",
            status: "Maintenance",
        },
        {
            id: "BED-201-A",
            bedNumber: "Bed 201-A",
            roomNumber: "Room 201",
            department: "Private Ward",
            status: "Occupied",
        },
        {
            id: "BED-201-B",
            bedNumber: "Bed 201-B",
            roomNumber: "Room 201",
            department: "Private Ward",
            status: "Reserved",
        },
    ];


    // ========================================================
    // Statistics
    // ========================================================

    const statistics = useMemo(() => {

        return {

            total: beds.length,

            occupied:
                beds.filter(
                    (bed) =>
                        bed.status === "Occupied"
                ).length,

            available:
                beds.filter(
                    (bed) =>
                        bed.status === "Available"
                ).length,

            reserved:
                beds.filter(
                    (bed) =>
                        bed.status === "Reserved"
                ).length,

            maintenance:
                beds.filter(
                    (bed) =>
                        bed.status === "Maintenance"
                ).length,

        };

    }, [beds]);


    // ========================================================
    // Filter Beds
    // ========================================================

    const filteredBeds = useMemo(() => {

        const searchValue =
            search.trim().toLowerCase();

        return beds.filter((bed) => {

            const matchesSearch =
                !searchValue ||
                bed.bedNumber
                    .toLowerCase()
                    .includes(searchValue) ||
                bed.roomNumber
                    .toLowerCase()
                    .includes(searchValue) ||
                bed.department
                    .toLowerCase()
                    .includes(searchValue);

            const matchesStatus =
                statusFilter === "All" ||
                bed.status === statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );

        });

    }, [
        beds,
        search,
        statusFilter,
    ]);


    // ========================================================
    // Refresh
    // ========================================================

    const handleRefresh = () => {

        setRefreshing(true);

        window.setTimeout(() => {

            setRefreshing(false);

        }, 600);

    };


    // ========================================================
    // Status Icon
    // ========================================================

    const getStatusIcon = (status) => {

        switch (status) {

            case "Occupied":
                return <BedDouble size={16} />;

            case "Available":
                return <CheckCircle2 size={16} />;

            case "Reserved":
                return <Clock3 size={16} />;

            case "Maintenance":
                return <Wrench size={16} />;

            default:
                return <Home size={16} />;

        }

    };


    // ========================================================
    // Render
    // ========================================================

    return (

        <div className="beds-page">


            {/* ==================================================
                Header
                ================================================== */}

            <section className="beds-heading">

                <div>

                    <div className="beds-eyebrow">

                        <BedDouble size={15} />

                        <span>
                            HOSPITAL CAPACITY
                        </span>

                    </div>


                    <h1>
                        Beds
                    </h1>


                    <p>
                        Monitor bed availability,
                        occupancy and ward capacity.
                    </p>

                </div>


                <button
                    type="button"
                    className="beds-refresh-button"
                    onClick={handleRefresh}
                    disabled={refreshing}
                >

                    <RefreshCw
                        size={17}
                        className={
                            refreshing
                                ? "beds-spin"
                                : ""
                        }
                    />

                    <span>
                        Refresh
                    </span>

                </button>

            </section>



            {/* ==================================================
                Information Notice
                ================================================== */}

            <div className="beds-notice">

                <div className="beds-notice-icon">

                    <BedDouble size={18} />

                </div>

                <div>

                    <strong>
                        Bed management overview
                    </strong>

                    <span>
                        Dedicated bed records and API integration
                        can be connected when the backend Bed module
                        is introduced.
                    </span>

                </div>

            </div>



            {/* ==================================================
                Statistics
                ================================================== */}

            <section className="beds-stats">

                <article className="beds-stat-card">

                    <div className="beds-stat-icon total">

                        <Home size={20} />

                    </div>

                    <span>
                        Total Beds
                    </span>

                    <strong>
                        {statistics.total}
                    </strong>

                </article>


                <article className="beds-stat-card">

                    <div className="beds-stat-icon occupied">

                        <BedDouble size={20} />

                    </div>

                    <span>
                        Occupied
                    </span>

                    <strong>
                        {statistics.occupied}
                    </strong>

                </article>


                <article className="beds-stat-card">

                    <div className="beds-stat-icon available">

                        <CheckCircle2 size={20} />

                    </div>

                    <span>
                        Available
                    </span>

                    <strong>
                        {statistics.available}
                    </strong>

                </article>


                <article className="beds-stat-card">

                    <div className="beds-stat-icon reserved">

                        <Clock3 size={20} />

                    </div>

                    <span>
                        Reserved
                    </span>

                    <strong>
                        {statistics.reserved}
                    </strong>

                </article>


                <article className="beds-stat-card">

                    <div className="beds-stat-icon maintenance">

                        <Wrench size={20} />

                    </div>

                    <span>
                        Maintenance
                    </span>

                    <strong>
                        {statistics.maintenance}
                    </strong>

                </article>

            </section>



            {/* ==================================================
                Bed Directory
                ================================================== */}

            <section className="beds-card">

                <div className="beds-card-header">

                    <div>

                        <span className="beds-card-kicker">
                            BED DIRECTORY
                        </span>

                        <h2>
                            Hospital Beds
                        </h2>

                    </div>


                    <div className="beds-controls">

                        <div className="beds-search-wrapper">

                            <Search size={17} />

                            <input
                                type="search"
                                placeholder="Search beds..."
                                value={search}
                                onChange={(event) =>
                                    setSearch(
                                        event.target.value
                                    )
                                }
                                className="beds-search"
                            />

                        </div>


                        <select
                            value={statusFilter}
                            onChange={(event) =>
                                setStatusFilter(
                                    event.target.value
                                )
                            }
                            className="beds-filter"
                        >

                            <option value="All">
                                All Status
                            </option>

                            <option value="Available">
                                Available
                            </option>

                            <option value="Occupied">
                                Occupied
                            </option>

                            <option value="Reserved">
                                Reserved
                            </option>

                            <option value="Maintenance">
                                Maintenance
                            </option>

                        </select>

                    </div>

                </div>



                {/* ==================================================
                    Empty State
                    ================================================== */}

                {filteredBeds.length === 0 && (

                    <div className="beds-state">

                        <BedDouble size={34} />

                        <strong>
                            No beds found
                        </strong>

                        <span>
                            Try changing your search
                            or status filter.
                        </span>

                    </div>

                )}



                {/* ==================================================
                    Bed Grid
                    ================================================== */}

                {filteredBeds.length > 0 && (

                    <div className="beds-grid">

                        {filteredBeds.map((bed) => (

                            <article
                                className="bed-item"
                                key={bed.id}
                            >

                                <div className="bed-item-top">

                                    <div className="bed-icon">

                                        <BedDouble size={20} />

                                    </div>


                                    <span className="bed-id">

                                        {bed.id}

                                    </span>

                                </div>


                                <h3>
                                    {bed.bedNumber}
                                </h3>


                                <div className="bed-details">

                                    <span>
                                        {bed.roomNumber}
                                    </span>

                                    <span>
                                        {bed.department}
                                    </span>

                                </div>


                                <div
                                    className={`bed-status ${bed.status
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}`}
                                >

                                    {getStatusIcon(
                                        bed.status
                                    )}

                                    <span>
                                        {bed.status}
                                    </span>

                                </div>

                            </article>

                        ))}

                    </div>

                )}

            </section>



            {/* ==================================================
                Footer
                ================================================== */}

            <section className="beds-footer">

                <div>

                    <CheckCircle2 size={17} />

                    <span>
                        Bed capacity overview is ready
                        for future backend integration.
                    </span>

                </div>

            </section>

        </div>

    );

};


export default Beds;
