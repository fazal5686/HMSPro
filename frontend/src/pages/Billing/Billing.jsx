// ============================================================
// File: pages/Billing/Billing.jsx
// Purpose: HMSPro Billing management page.
// ============================================================

import { useEffect, useState } from "react";

import {
    BadgeDollarSign,
    FileText,
    Search,
    RefreshCw,
    Eye,
    Plus,
} from "lucide-react";

import API from "../../api/axios.js";

import "./Billing.css";


// ============================================================
// Billing Component
// ============================================================

const Billing = () => {

    const [billings, setBillings] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");


    // ========================================================
    // Load Billing Records
    // ========================================================

    const loadBillings = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await API.get("/billings");


            setBillings(
                response.data?.data ?? []
            );


        } catch (error) {

            console.error(
                "Billing loading error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Unable to load billing records."
            );


        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // Initial Load
    // ========================================================

    useEffect(() => {

        loadBillings();

    }, []);


    // ========================================================
    // Search
    // ========================================================

    const filteredBillings =
        billings.filter((bill) => {

            const search =
                searchTerm
                    .toLowerCase()
                    .trim();


            if (!search) {

                return true;

            }


            return (

                bill.invoiceNumber
                    ?.toLowerCase()
                    .includes(search)

                ||

                bill.patientId?.userId?.fullName
                    ?.toLowerCase()
                    .includes(search)

                ||

                bill.paymentStatus
                    ?.toLowerCase()
                    .includes(search)

            );

        });


    // ========================================================
    // Currency Formatter
    // ========================================================

    const formatCurrency = (amount) => {

        return new Intl.NumberFormat(
            "en-PK",
            {
                style: "currency",
                currency: "PKR",
                maximumFractionDigits: 0,
            }
        ).format(
            Number(amount) || 0
        );

    };


    // ========================================================
    // Date Formatter
    // ========================================================

    const formatDate = (date) => {

        if (!date) {

            return "—";

        }


        return new Date(date)
            .toLocaleDateString(
                "en-PK",
                {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                }
            );

    };


    // ========================================================
    // Render
    // ========================================================

    return (

        <div className="billing-page">


            {/* ==================================================
                Header
                ================================================== */}

            <section className="billing-heading">

                <div>

                    <div className="billing-eyebrow">

                        <BadgeDollarSign size={16} />

                        <span>
                            FINANCE
                        </span>

                    </div>


                    <h1>
                        Billing
                    </h1>


                    <p>
                        Manage hospital invoices, payments,
                        and outstanding balances.
                    </p>

                </div>


                <button
                    type="button"
                    className="billing-primary-button"
                >

                    <Plus size={18} />

                    New Invoice

                </button>

            </section>


            {/* ==================================================
                Summary
                ================================================== */}

            <section className="billing-summary">

                <div className="billing-summary-card">

                    <span>
                        Total Bills
                    </span>

                    <strong>
                        {loading
                            ? "..."
                            : billings.length}
                    </strong>

                </div>


                <div className="billing-summary-card">

                    <span>
                        Total Amount
                    </span>

                    <strong>

                        {loading
                            ? "..."
                            : formatCurrency(
                                billings.reduce(
                                    (sum, bill) =>
                                        sum +
                                        Number(
                                            bill.totalAmount
                                        ),
                                    0
                                )
                            )}

                    </strong>

                </div>


                <div className="billing-summary-card">

                    <span>
                        Paid
                    </span>

                    <strong>

                        {loading
                            ? "..."
                            : billings.filter(
                                (bill) =>
                                    bill.paymentStatus ===
                                    "Paid"
                            ).length}

                    </strong>

                </div>


                <div className="billing-summary-card">

                    <span>
                        Outstanding
                    </span>

                    <strong>

                        {loading
                            ? "..."
                            : formatCurrency(
                                billings.reduce(
                                    (sum, bill) =>
                                        sum +
                                        Number(
                                            bill.balance
                                        ),
                                    0
                                )
                            )}

                    </strong>

                </div>

            </section>


            {/* ==================================================
                Billing Card
                ================================================== */}

            <section className="billing-card">


                <div className="billing-toolbar">


                    <div className="billing-search">

                        <Search size={18} />

                        <input
                            type="text"
                            placeholder="Search invoice, patient, or status..."
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }
                        />

                    </div>


                    <button
                        type="button"
                        className="billing-refresh-button"
                        onClick={loadBillings}
                        disabled={loading}
                    >

                        <RefreshCw
                            size={17}
                            className={
                                loading
                                    ? "billing-spin"
                                    : ""
                            }
                        />

                        Refresh

                    </button>

                </div>


                {/* ==================================================
                    Error
                    ================================================== */}

                {error && (

                    <div className="billing-error">
                        {error}
                    </div>

                )}


                {/* ==================================================
                    Table
                    ================================================== */}

                <div className="billing-table-wrapper">

                    <table className="billing-table">

                        <thead>

                            <tr>

                                <th>
                                    Invoice
                                </th>

                                <th>
                                    Patient
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Total
                                </th>

                                <th>
                                    Paid
                                </th>

                                <th>
                                    Balance
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

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="billing-empty"
                                    >
                                        Loading billing records...
                                    </td>

                                </tr>

                            ) : filteredBillings.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="billing-empty"
                                    >

                                        <FileText
                                            size={32}
                                        />

                                        <span>
                                            No billing records found.
                                        </span>

                                    </td>

                                </tr>

                            ) : (

                                filteredBillings.map(
                                    (bill) => (

                                        <tr
                                            key={bill._id}
                                        >

                                            <td>

                                                <strong>
                                                    {bill.invoiceNumber ||
                                                        "—"}
                                                </strong>

                                            </td>


                                            <td>

                                                {bill.patientId
                                                    ?.userId
                                                    ?.fullName ||
                                                    "Unknown Patient"}

                                            </td>


                                            <td>

                                                {formatDate(
                                                    bill.createdAt
                                                )}

                                            </td>


                                            <td>

                                                {formatCurrency(
                                                    bill.totalAmount
                                                )}

                                            </td>


                                            <td>

                                                {formatCurrency(
                                                    bill.amountPaid
                                                )}

                                            </td>


                                            <td>

                                                {formatCurrency(
                                                    bill.balance
                                                )}

                                            </td>


                                            <td>

                                                <span
                                                    className={`billing-status ${
                                                        bill.paymentStatus
                                                            ?.toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "-"
                                                            ) ||
                                                        "pending"
                                                    }`}
                                                >

                                                    {bill.paymentStatus ||
                                                        "Pending"}

                                                </span>

                                            </td>


                                            <td>

                                                <button
                                                    type="button"
                                                    className="billing-view-button"
                                                    aria-label={`View ${bill.invoiceNumber || "invoice"}`}
                                                >

                                                    <Eye
                                                        size={17}
                                                    />

                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </section>

        </div>

    );

};


export default Billing;