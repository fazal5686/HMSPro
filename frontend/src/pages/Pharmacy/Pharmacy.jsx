// ============================================================
// File: pages/Pharmacy/Pharmacy.jsx
// Purpose: HMSPro Pharmacy / Medicine Inventory page.
// ============================================================

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    AlertTriangle,
    CheckCircle2,
    Package,
    Pill,
    RefreshCw,
    Search,
    XCircle,
} from "lucide-react";

import API from "../../api/axios.js";

import "./Pharmacy.css";


// ============================================================
// Pharmacy Component
// ============================================================

const Pharmacy = () => {

    // ========================================================
    // State
    // ========================================================

    const [medicines, setMedicines] = useState([]);

    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("all");


    // ========================================================
    // Load Medicines
    // ========================================================

    const loadMedicines = useCallback(
        async (isRefresh = false) => {

            try {

                setError("");

                if (isRefresh) {

                    setRefreshing(true);

                } else {

                    setLoading(true);

                }


                const response =
                    await API.get("/medicines");


                const data =
                    response.data?.data;


                if (Array.isArray(data)) {

                    setMedicines(data);

                } else if (
                    Array.isArray(data?.medicines)
                ) {

                    setMedicines(data.medicines);

                } else {

                    setMedicines([]);

                }

            } catch (err) {

                console.error(
                    "Pharmacy loading error:",
                    err
                );


                setError(
                    err.response?.data?.message ||
                    "Unable to load medicines."
                );

            } finally {

                setLoading(false);

                setRefreshing(false);

            }

        },
        []
    );


    // ========================================================
    // Initial Load
    // ========================================================

    useEffect(() => {

        loadMedicines();

    }, [loadMedicines]);


    // ========================================================
    // Safe Numeric Value
    // ========================================================

    const getQuantity = (medicine) => {

        return Number(
            medicine?.quantity ??
            medicine?.stock ??
            medicine?.stockQuantity ??
            0
        );

    };


    // ========================================================
    // Medicine Name
    // ========================================================

    const getMedicineName = (medicine) => {

        return (
            medicine?.name ||
            medicine?.medicineName ||
            "Unnamed Medicine"
        );

    };


    // ========================================================
    // Medicine Category
    // ========================================================

    const getCategory = (medicine) => {

        return (
            medicine?.category ||
            medicine?.type ||
            "General"
        );

    };


    // ========================================================
    // Active Status
    // ========================================================

    const isActive = (medicine) => {

        return medicine?.isActive !== false;

    };


    // ========================================================
    // Low Stock
    // ========================================================

    const isLowStock = (medicine) => {

        const quantity =
            getQuantity(medicine);


        const threshold =
            Number(
                medicine?.lowStockThreshold ??
                medicine?.minimumStock ??
                10
            );


        return (
            quantity > 0 &&
            quantity <= threshold
        );

    };


    // ========================================================
    // Out Of Stock
    // ========================================================

    const isOutOfStock = (medicine) => {

        return getQuantity(medicine) <= 0;

    };


    // ========================================================
    // Filtered Medicines
    // ========================================================

    const filteredMedicines = useMemo(() => {

        const search =
            searchTerm
                .trim()
                .toLowerCase();


        return medicines.filter(
            (medicine) => {

                const name =
                    getMedicineName(
                        medicine
                    ).toLowerCase();


                const category =
                    getCategory(
                        medicine
                    ).toLowerCase();


                const matchesSearch =
                    !search ||
                    name.includes(search) ||
                    category.includes(search);


                let matchesStatus = true;


                if (
                    statusFilter === "active"
                ) {

                    matchesStatus =
                        isActive(medicine);

                }


                if (
                    statusFilter === "inactive"
                ) {

                    matchesStatus =
                        !isActive(medicine);

                }


                if (
                    statusFilter === "low"
                ) {

                    matchesStatus =
                        isLowStock(medicine);

                }


                if (
                    statusFilter === "out"
                ) {

                    matchesStatus =
                        isOutOfStock(medicine);

                }


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );

    }, [
        medicines,
        searchTerm,
        statusFilter,
    ]);


    // ========================================================
    // Statistics
    // ========================================================

    const totalMedicines =
        medicines.length;


    const activeMedicines =
        medicines.filter(
            (medicine) =>
                isActive(medicine)
        ).length;


    const inactiveMedicines =
        medicines.filter(
            (medicine) =>
                !isActive(medicine)
        ).length;


    const lowStockMedicines =
        medicines.filter(
            (medicine) =>
                isLowStock(medicine)
        ).length;


    const outOfStockMedicines =
        medicines.filter(
            (medicine) =>
                isOutOfStock(medicine)
        ).length;


    // ========================================================
    // Currency Formatter
    // ========================================================

    const formatCurrency = (value) => {

        return new Intl.NumberFormat(
            "en-PK",
            {
                style: "currency",
                currency: "PKR",
                maximumFractionDigits: 0,
            }
        ).format(
            Number(value) || 0
        );

    };


    // ========================================================
    // Loading State
    // ========================================================

    if (loading) {

        return (

            <div className="pharmacy-loading">

                <RefreshCw
                    size={28}
                    className="pharmacy-loading-icon"
                />

                <strong>
                    Loading pharmacy...
                </strong>

                <span>
                    Gathering medicine inventory.
                </span>

            </div>

        );

    }


    // ========================================================
    // Render
    // ========================================================

    return (

        <div className="pharmacy-page">


            {/* ==================================================
                Page Header
                ================================================== */}

            <section className="pharmacy-header">

                <div>

                    <div className="pharmacy-eyebrow">

                        <Pill size={16} />

                        <span>
                            PHARMACY
                        </span>

                    </div>


                    <h1>
                        Medicine Inventory
                    </h1>


                    <p>
                        Manage medicines, stock levels and
                        pharmacy inventory.
                    </p>

                </div>


                <button
                    type="button"
                    className="pharmacy-refresh-button"
                    onClick={() =>
                        loadMedicines(true)
                    }
                    disabled={refreshing}
                >

                    <RefreshCw
                        size={17}
                        className={
                            refreshing
                                ? "pharmacy-spin"
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

                <div className="pharmacy-error">

                    <div className="pharmacy-error-icon">

                        <AlertTriangle
                            size={20}
                        />

                    </div>


                    <div>

                        <strong>
                            Unable to load medicines
                        </strong>

                        <span>
                            {error}
                        </span>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            loadMedicines()
                        }
                    >
                        Retry
                    </button>

                </div>

            )}



            {/* ==================================================
                Statistics
                ================================================== */}

            <section className="pharmacy-stats-grid">


                <article className="pharmacy-stat-card">

                    <div className="pharmacy-stat-icon blue">

                        <Package size={21} />

                    </div>

                    <div>

                        <span>
                            Total Medicines
                        </span>

                        <strong>
                            {totalMedicines}
                        </strong>

                    </div>

                </article>


                <article className="pharmacy-stat-card">

                    <div className="pharmacy-stat-icon green">

                        <CheckCircle2 size={21} />

                    </div>

                    <div>

                        <span>
                            Active
                        </span>

                        <strong>
                            {activeMedicines}
                        </strong>

                    </div>

                </article>


                <article className="pharmacy-stat-card">

                    <div className="pharmacy-stat-icon orange">

                        <AlertTriangle size={21} />

                    </div>

                    <div>

                        <span>
                            Low Stock
                        </span>

                        <strong>
                            {lowStockMedicines}
                        </strong>

                    </div>

                </article>


                <article className="pharmacy-stat-card">

                    <div className="pharmacy-stat-icon red">

                        <XCircle size={21} />

                    </div>

                    <div>

                        <span>
                            Out of Stock
                        </span>

                        <strong>
                            {outOfStockMedicines}
                        </strong>

                    </div>

                </article>

            </section>



            {/* ==================================================
                Inventory Card
                ================================================== */}

            <section className="pharmacy-card">


                {/* ==================================================
                    Toolbar
                    ================================================== */}

                <div className="pharmacy-toolbar">


                    <div className="pharmacy-search">

                        <Search size={18} />

                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }
                            placeholder="Search medicines..."
                        />

                    </div>


                    <div className="pharmacy-filters">

                        <button
                            type="button"
                            className={
                                statusFilter === "all"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setStatusFilter("all")
                            }
                        >
                            All
                        </button>


                        <button
                            type="button"
                            className={
                                statusFilter === "active"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setStatusFilter("active")
                            }
                        >
                            Active
                        </button>


                        <button
                            type="button"
                            className={
                                statusFilter === "low"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setStatusFilter("low")
                            }
                        >
                            Low Stock
                        </button>


                        <button
                            type="button"
                            className={
                                statusFilter === "out"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setStatusFilter("out")
                            }
                        >
                            Out of Stock
                        </button>


                        <button
                            type="button"
                            className={
                                statusFilter === "inactive"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setStatusFilter("inactive")
                            }
                        >
                            Inactive
                        </button>

                    </div>

                </div>



                {/* ==================================================
                    Table
                    ================================================== */}

                <div className="pharmacy-table-wrapper">

                    <table className="pharmacy-table">

                        <thead>

                            <tr>

                                <th>
                                    Medicine
                                </th>

                                <th>
                                    Category
                                </th>

                                <th>
                                    Stock
                                </th>

                                <th>
                                    Price
                                </th>

                                <th>
                                    Status
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredMedicines.map(
                                (medicine, index) => {

                                    const quantity =
                                        getQuantity(
                                            medicine
                                        );


                                    const medicinePrice =
                                        medicine?.price ??
                                        medicine?.unitPrice ??
                                        medicine?.sellingPrice ??
                                        0;


                                    const medicineActive =
                                        isActive(
                                            medicine
                                        );


                                    const lowStock =
                                        isLowStock(
                                            medicine
                                        );


                                    const outOfStock =
                                        isOutOfStock(
                                            medicine
                                        );


                                    return (

                                        <tr
                                            key={
                                                medicine?._id ||
                                                medicine?.id ||
                                                index
                                            }
                                        >

                                            <td>

                                                <div className="medicine-name-cell">

                                                    <div className="medicine-icon">

                                                        <Pill
                                                            size={18}
                                                        />

                                                    </div>


                                                    <div>

                                                        <strong>
                                                            {
                                                                getMedicineName(
                                                                    medicine
                                                                )
                                                            }
                                                        </strong>

                                                        <small>
                                                            {
                                                                medicine?.genericName ||
                                                                medicine?.description ||
                                                                "Medicine"
                                                            }
                                                        </small>

                                                    </div>

                                                </div>

                                            </td>


                                            <td>

                                                <span className="medicine-category">

                                                    {
                                                        getCategory(
                                                            medicine
                                                        )
                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                <div
                                                    className={
                                                        `medicine-stock ${
                                                            outOfStock
                                                                ? "out"
                                                                : lowStock
                                                                    ? "low"
                                                                    : ""
                                                        }`
                                                    }
                                                >

                                                    <strong>
                                                        {quantity}
                                                    </strong>

                                                    <span>
                                                        units
                                                    </span>

                                                </div>

                                            </td>


                                            <td>

                                                <strong className="medicine-price">

                                                    {
                                                        formatCurrency(
                                                            medicinePrice
                                                        )
                                                    }

                                                </strong>

                                            </td>


                                            <td>

                                                {outOfStock ? (

                                                    <span className="medicine-status out">

                                                        <XCircle
                                                            size={14}
                                                        />

                                                        Out of Stock

                                                    </span>

                                                ) : lowStock ? (

                                                    <span className="medicine-status low">

                                                        <AlertTriangle
                                                            size={14}
                                                        />

                                                        Low Stock

                                                    </span>

                                                ) : medicineActive ? (

                                                    <span className="medicine-status active">

                                                        <CheckCircle2
                                                            size={14}
                                                        />

                                                        Active

                                                    </span>

                                                ) : (

                                                    <span className="medicine-status inactive">

                                                        <XCircle
                                                            size={14}
                                                        />

                                                        Inactive

                                                    </span>

                                                )}

                                            </td>

                                        </tr>

                                    );

                                }
                            )}


                            {filteredMedicines.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="pharmacy-empty"
                                    >

                                        <Package
                                            size={34}
                                        />

                                        <strong>
                                            No medicines found
                                        </strong>

                                        <span>
                                            Try changing your search
                                            or filter.
                                        </span>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>



                {/* ==================================================
                    Footer
                    ================================================== */}

                <div className="pharmacy-table-footer">

                    <span>

                        Showing{" "}
                        <strong>
                            {filteredMedicines.length}
                        </strong>{" "}
                        of{" "}
                        <strong>
                            {totalMedicines}
                        </strong>{" "}
                        medicines

                    </span>


                    <span>

                        {inactiveMedicines} inactive

                    </span>

                </div>

            </section>

        </div>

    );

};


export default Pharmacy;