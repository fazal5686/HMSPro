// ============================================================
// File: pages/Rooms/Rooms.jsx
// Purpose: HMSPro Rooms management page.
// Displays live room data from the backend.
// ============================================================

import { useEffect, useMemo, useState } from "react";

import {
    BedDouble,
    CheckCircle2,
    Clock3,
    Home,
    MoreHorizontal,
    RefreshCw,
    Wrench,
} from "lucide-react";

import API from "../../api/axios.js";

import "./Rooms.css";


// ============================================================
// Rooms Component
// ============================================================

const Rooms = () => {

    const [rooms, setRooms] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");


    // ========================================================
    // Load Rooms
    // ========================================================

    const loadRooms = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await API.get("/rooms");

            const roomData =
                response.data?.data ?? [];

            setRooms(
                Array.isArray(roomData)
                    ? roomData
                    : []
            );

        } catch (error) {

            console.error(
                "Rooms loading error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load room data."
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // Initial Load
    // ========================================================

    useEffect(() => {

        loadRooms();

    }, []);


    // ========================================================
    // Room Statistics
    // ========================================================

    const statistics = useMemo(() => {

        return {

            total:
                rooms.length,

            occupied:
                rooms.filter(
                    (room) =>
                        room.status === "Occupied"
                ).length,

            available:
                rooms.filter(
                    (room) =>
                        room.status === "Available"
                ).length,

            reserved:
                rooms.filter(
                    (room) =>
                        room.status === "Reserved"
                ).length,

            maintenance:
                rooms.filter(
                    (room) =>
                        room.status === "Maintenance"
                ).length,

        };

    }, [rooms]);


    // ========================================================
    // Filter Rooms
    // ========================================================

    const filteredRooms = useMemo(() => {

        const searchValue =
            search.trim().toLowerCase();

        return rooms.filter((room) => {

            const roomNumber =
                String(
                    room.roomNumber ??
                    room.number ??
                    ""
                ).toLowerCase();

            const roomType =
                String(
                    room.roomType ??
                    room.type ??
                    ""
                ).toLowerCase();

            const status =
                String(
                    room.status ??
                    ""
                ).toLowerCase();


            const matchesSearch =
                !searchValue ||
                roomNumber.includes(searchValue) ||
                roomType.includes(searchValue) ||
                status.includes(searchValue);


            const matchesStatus =
                statusFilter === "All" ||
                room.status === statusFilter;


            return (
                matchesSearch &&
                matchesStatus
            );

        });

    }, [
        rooms,
        search,
        statusFilter,
    ]);


    // ========================================================
    // Status Icon
    // ========================================================

    const getStatusIcon = (status) => {

        if (status === "Occupied") {
            return <BedDouble size={16} />;
        }

        if (status === "Available") {
            return <CheckCircle2 size={16} />;
        }

        if (status === "Reserved") {
            return <Clock3 size={16} />;
        }

        if (status === "Maintenance") {
            return <Wrench size={16} />;
        }

        return <Home size={16} />;

    };


    // ========================================================
    // Render
    // ========================================================

    return (

        <div className="rooms-page">


            {/* ==================================================
                Page Header
                ================================================== */}

            <section className="rooms-heading">

                <div>

                    <div className="rooms-eyebrow">

                        <Home size={15} />

                        <span>
                            HOSPITAL CAPACITY
                        </span>

                    </div>


                    <h1>
                        Rooms
                    </h1>


                    <p>
                        Monitor room availability,
                        occupancy and maintenance status.
                    </p>

                </div>


                <button
                    type="button"
                    className="rooms-refresh-button"
                    onClick={loadRooms}
                    disabled={loading}
                >

                    <RefreshCw
                        size={17}
                        className={
                            loading
                                ? "rooms-spin"
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

                <div className="rooms-error">
                    {error}
                </div>

            )}


            {/* ==================================================
                Statistics
                ================================================== */}

            <section className="rooms-stats">

                <article className="rooms-stat-card">

                    <div className="rooms-stat-icon total">
                        <Home size={20} />
                    </div>

                    <span>
                        Total Rooms
                    </span>

                    <strong>
                        {loading
                            ? "..."
                            : statistics.total}
                    </strong>

                </article>


                <article className="rooms-stat-card">

                    <div className="rooms-stat-icon occupied">
                        <BedDouble size={20} />
                    </div>

                    <span>
                        Occupied
                    </span>

                    <strong>
                        {loading
                            ? "..."
                            : statistics.occupied}
                    </strong>

                </article>


                <article className="rooms-stat-card">

                    <div className="rooms-stat-icon available">
                        <CheckCircle2 size={20} />
                    </div>

                    <span>
                        Available
                    </span>

                    <strong>
                        {loading
                            ? "..."
                            : statistics.available}
                    </strong>

                </article>


                <article className="rooms-stat-card">

                    <div className="rooms-stat-icon reserved">
                        <Clock3 size={20} />
                    </div>

                    <span>
                        Reserved
                    </span>

                    <strong>
                        {loading
                            ? "..."
                            : statistics.reserved}
                    </strong>

                </article>


                <article className="rooms-stat-card">

                    <div className="rooms-stat-icon maintenance">
                        <Wrench size={20} />
                    </div>

                    <span>
                        Maintenance
                    </span>

                    <strong>
                        {loading
                            ? "..."
                            : statistics.maintenance}
                    </strong>

                </article>

            </section>


            {/* ==================================================
                Room List
                ================================================== */}

            <section className="rooms-card">

                <div className="rooms-card-header">

                    <div>

                        <span className="rooms-card-kicker">
                            ROOM DIRECTORY
                        </span>

                        <h2>
                            Hospital Rooms
                        </h2>

                    </div>


                    <div className="rooms-controls">

                        <input
                            type="search"
                            placeholder="Search rooms..."
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            className="rooms-search"
                        />


                        <select
                            value={statusFilter}
                            onChange={(event) =>
                                setStatusFilter(
                                    event.target.value
                                )
                            }
                            className="rooms-filter"
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
                    Loading
                    ================================================== */}

                {loading && (

                    <div className="rooms-state">
                        Loading rooms...
                    </div>

                )}


                {/* ==================================================
                    Empty State
                    ================================================== */}

                {!loading &&
                    !error &&
                    filteredRooms.length === 0 && (

                        <div className="rooms-state">

                            <Home size={32} />

                            <strong>
                                No rooms found
                            </strong>

                            <span>
                                Try changing your search
                                or status filter.
                            </span>

                        </div>

                    )}


                {/* ==================================================
                    Room Grid
                    ================================================== */}

                {!loading &&
                    filteredRooms.length > 0 && (

                        <div className="rooms-grid">

                            {filteredRooms.map(
                                (room, index) => {

                                    const roomNumber =
                                        room.roomNumber ??
                                        room.number ??
                                        `Room ${index + 1}`;

                                    const roomType =
                                        room.roomType ??
                                        room.type ??
                                        "Standard Room";

                                    const status =
                                        room.status ??
                                        "Unknown";


                                    return (

                                        <article
                                            className="room-item"
                                            key={
                                                room._id ??
                                                room.id ??
                                                roomNumber
                                            }
                                        >

                                            <div className="room-item-top">

                                                <div className="room-number-icon">

                                                    <BedDouble
                                                        size={20}
                                                    />

                                                </div>


                                                <button
                                                    type="button"
                                                    className="room-more"
                                                    aria-label={`Options for ${roomNumber}`}
                                                >

                                                    <MoreHorizontal
                                                        size={18}
                                                    />

                                                </button>

                                            </div>


                                            <div className="room-number">

                                                {roomNumber}

                                            </div>


                                            <div className="room-type">

                                                {roomType}

                                            </div>


                                            <div
                                                className={`room-status ${status.toLowerCase().replace(/\s+/g, "-")}`}
                                            >

                                                {getStatusIcon(
                                                    status
                                                )}

                                                <span>
                                                    {status}
                                                </span>

                                            </div>

                                        </article>

                                    );

                                }
                            )}

                        </div>

                    )}

            </section>

        </div>

    );

};


export default Rooms;