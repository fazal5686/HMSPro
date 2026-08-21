import {
    useEffect,
    useState,
} from "react";

import {
    X,
    Plus,
} from "lucide-react";

import {
    getAllPatients,
} from "../../services/patientService.js";

import {
    getAllDoctors,
} from "../../services/doctorService.js";

import {
    createAppointment,
} from "../../services/appointmentService.js";

import "./NewAppointmentModal.css";


const NewAppointmentModal = ({
    isOpen,
    onClose,
    onCreated,
}) => {

    const [
        patients,
        setPatients,
    ] = useState([]);

    const [
        doctors,
        setDoctors,
    ] = useState([]);

    const [
        loadingOptions,
        setLoadingOptions,
    ] = useState(false);

    const [
        saving,
        setSaving,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");

    const [
        form,
        setForm,
    ] = useState({
        patientId: "",
        doctorId: "",
        appointmentDate: "",
        reason: "",
        notes: "",
    });


    useEffect(() => {

        if (!isOpen) {

            return;

        }


        const loadOptions = async () => {

            try {

                setLoadingOptions(true);

                setError("");


                const [
                    patientData,
                    doctorData,
                ] = await Promise.all([
                    getAllPatients(),
                    getAllDoctors(),
                ]);


                setPatients(
                    Array.isArray(patientData)
                        ? patientData
                        : []
                );


                setDoctors(
                    Array.isArray(doctorData)
                        ? doctorData
                        : []
                );

            } catch (requestError) {

                console.error(
                    "Failed to load appointment options:",
                    requestError
                );


                setError(
                    requestError?.response?.data?.message ||
                    "Unable to load patients and doctors."
                );

            } finally {

                setLoadingOptions(false);

            }

        };


        loadOptions();

    }, [isOpen]);


    const handleChange = (event) => {

        const {
            name,
            value,
        } = event.target;


        setForm(
            (current) => ({
                ...current,
                [name]: value,
            })
        );

    };


    const handleClose = () => {

        if (saving) {

            return;

        }


        setError("");


        setForm({
            patientId: "",
            doctorId: "",
            appointmentDate: "",
            reason: "",
            notes: "",
        });


        onClose();

    };


    const handleSubmit = async (event) => {

        event.preventDefault();


        try {

            setSaving(true);

            setError("");


            const payload = {
                patientId:
                    form.patientId,

                doctorId:
                    form.doctorId,

                appointmentDate:
                    form.appointmentDate,

                reason:
                    form.reason.trim(),

                notes:
                    form.notes.trim(),
            };


            await createAppointment(
                payload
            );


            setForm({
                patientId: "",
                doctorId: "",
                appointmentDate: "",
                reason: "",
                notes: "",
            });


            onCreated();

        } catch (requestError) {

            console.error(
                "Failed to create appointment:",
                requestError
            );


            setError(
                requestError?.response?.data?.message ||
                "Unable to create appointment."
            );

        } finally {

            setSaving(false);

        }

    };


    if (!isOpen) {

        return null;

    }


    return (

        <div
            className="new-appointment-overlay"
            role="presentation"
            onMouseDown={(event) => {

                if (
                    event.target ===
                    event.currentTarget
                ) {

                    handleClose();

                }

            }}
        >

            <div
                className="new-appointment-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="new-appointment-title"
            >

                <div className="new-appointment-header">

                    <div>

                        <span className="new-appointment-kicker">
                            APPOINTMENT
                        </span>

                        <h2 id="new-appointment-title">
                            New Appointment
                        </h2>

                        <p>
                            Create a new patient appointment.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="new-appointment-close"
                        onClick={handleClose}
                        disabled={saving}
                        aria-label="Close"
                    >

                        <X size={19} />

                    </button>

                </div>


                {error && (

                    <div className="new-appointment-error">
                        {error}
                    </div>

                )}


                <form
                    className="new-appointment-form"
                    onSubmit={handleSubmit}
                >

                    <div className="new-appointment-grid">


                        <label>

                            <span>
                                Patient
                            </span>

                            <select
                                name="patientId"
                                value={form.patientId}
                                onChange={handleChange}
                                required
                                disabled={
                                    loadingOptions ||
                                    saving
                                }
                            >

                                <option value="">
                                    {loadingOptions
                                        ? "Loading patients..."
                                        : "Select patient"}
                                </option>


                                {patients.map(
                                    (patient) => {

                                        const name =
                                            patient?.userId?.fullName ||
                                            "Unknown Patient";

                                        const id =
                                            patient?._id;

                                        return (

                                            <option
                                                key={id}
                                                value={id}
                                            >
                                                {name}
                                            </option>

                                        );

                                    }
                                )}

                            </select>

                        </label>



                        <label>

                            <span>
                                Doctor
                            </span>

                            <select
                                name="doctorId"
                                value={form.doctorId}
                                onChange={handleChange}
                                required
                                disabled={
                                    loadingOptions ||
                                    saving
                                }
                            >

                                <option value="">
                                    {loadingOptions
                                        ? "Loading doctors..."
                                        : "Select doctor"}
                                </option>


                                {doctors.map(
                                    (doctor) => {

                                        const name =
                                            doctor?.userId?.fullName ||
                                            "Unknown Doctor";

                                        const id =
                                            doctor?._id;

                                        return (

                                            <option
                                                key={id}
                                                value={id}
                                            >
                                                {name}
                                            </option>

                                        );

                                    }
                                )}

                            </select>

                        </label>



                        <label>

                            <span>
                                Appointment Date &amp; Time
                            </span>

                            <input
                                type="datetime-local"
                                name="appointmentDate"
                                value={form.appointmentDate}
                                onChange={handleChange}
                                required
                                disabled={saving}
                            />

                        </label>



                        <label>

                            <span>
                                Reason
                            </span>

                            <input
                                type="text"
                                name="reason"
                                value={form.reason}
                                onChange={handleChange}
                                placeholder="Routine consultation"
                                minLength={2}
                                maxLength={500}
                                required
                                disabled={saving}
                            />

                        </label>


                    </div>


                    <label>

                        <span>
                            Notes
                        </span>

                        <textarea
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            placeholder="Optional notes..."
                            maxLength={1000}
                            rows={4}
                            disabled={saving}
                        />

                    </label>


                    <div className="new-appointment-footer">

                        <button
                            type="button"
                            className="new-appointment-cancel"
                            onClick={handleClose}
                            disabled={saving}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="new-appointment-submit"
                            disabled={
                                saving ||
                                loadingOptions
                            }
                        >

                            {saving ? (
                                "Creating..."
                            ) : (
                                <>
                                    <Plus size={17} />
                                    Create Appointment
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};


export default NewAppointmentModal;
