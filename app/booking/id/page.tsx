"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getDestinationById } from "@/app/destinations/data";
import { AuthProvider, clearAuthProvider, getStoredAuthProvider, storeAuthProvider } from "@/lib/auth";

type Props = {
    params: {
        id: string;
    };
};

type BookingForm = {
    start: string;
    end: string;
    travellers: number;
    roomType: string;
    cabin: string;
    fullName: string;
    email: string;
    phone: string;
    requests: string;
};

type FormErrors = Partial<Record<keyof BookingForm, string>>;

export default function BookingPage({ params }: Props) {
    const destination = getDestinationById(params.id);
    const [provider, setProvider] = useState<AuthProvider | null>(() => getStoredAuthProvider());
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState<BookingForm>({
        start: "",
        end: "",
        travellers: 2,
        roomType: "Deluxe king",
        cabin: "Economy",
        fullName: "",
        email: "",
        phone: "",
        requests: "",
    });

    const estimatedTotal = useMemo(() => {
        if (!destination) return 0;
        const travellerCount = Number.isFinite(form.travellers) ? form.travellers : 1;
        return destination.fromPrice * travellerCount;
    }, [destination, form.travellers]);

    if (!destination) {
        return (
            <div className="page">
                <section className="section">
                    <h2>Booking unavailable</h2>
                    <p className="muted">We couldn’t find that destination. Choose another trip.</p>
                    <Link className="btn" href="/destinations">
                        Browse destinations
                    </Link>
                </section>
            </div>
        );
    }

    function handleAuth(providerChoice: AuthProvider) {
        storeAuthProvider(providerChoice);
        setProvider(providerChoice);
    }

    function handleSignOut() {
        clearAuthProvider();
        setProvider(null);
        setSubmitted(false);
    }

    function updateField<K extends keyof BookingForm>(key: K, value: BookingForm[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: "" }));
    }

    function validateForm() {
        const nextErrors: FormErrors = {};

        if (!form.start) nextErrors.start = "Select a start date.";
        if (!form.end) nextErrors.end = "Select an end date.";
        if (form.start && form.end && form.end < form.start) {
            nextErrors.end = "End date must be after the start date.";
        }
        if (!form.fullName.trim()) nextErrors.fullName = "Enter the lead traveller name.";
        if (!form.email.trim()) {
            nextErrors.email = "Enter a contact email.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            nextErrors.email = "Enter a valid email address.";
        }
        if (!form.phone.trim()) nextErrors.phone = "Enter a contact number.";

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }

    function submitBooking(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validateForm()) return;
        setSubmitted(true);
    }

    return (
        <div className="page">
            <section className="section bookingLayout">
                <div className="bookingMain">
                    <div className="bookingHeader">
                        <p className="bookingOverline">Booking</p>
                        <h2>
                            {destination.name}, {destination.country}
                        </h2>
                        <p className="muted">{destination.description}</p>
                    </div>

                    {!provider ? (
                        <div className="bookingAuth">
                            <h3>Sign in to continue</h3>
                            <p className="muted">
                                Booking is available after secure sign-in. Choose Google or
                                Microsoft to continue.
                            </p>
                            <div className="authButtons">
                                <button className="btn" type="button" onClick={() => handleAuth("google")}>
                                    Continue with Google
                                </button>
                                <button className="btn ghost" type="button" onClick={() => handleAuth("microsoft")}>
                                    Continue with Microsoft
                                </button>
                            </div>
                            <p className="authNote">
                                We only support Google or Microsoft sign-in for account security.
                            </p>
                        </div>
                    ) : (
                        <div className="bookingFormCard">
                            <div className="bookingSignedIn">
                                Signed in with{" "}
                                <strong>{provider === "google" ? "Google" : "Microsoft"}</strong>
                                .
                                <button className="linkBtn" type="button" onClick={handleSignOut}>
                                    Sign out
                                </button>
                            </div>

                            {submitted ? (
                                <div className="bookingSuccess">
                                    <h3>Booking request received ✅</h3>
                                    <p className="muted">
                                        We sent a confirmation email to {form.email}. Our team will
                                        follow up with curated options and next steps.
                                    </p>
                                    <div className="bookingActions">
                                        <Link className="btn" href="/destinations">
                                            Explore more trips
                                        </Link>
                                        <button className="btn ghost" type="button" onClick={() => setSubmitted(false)}>
                                            Edit booking
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form className="bookingForm" onSubmit={submitBooking}>
                                    <div className="bookingGrid">
                                        <label>
                                            Start date
                                            <input
                                                className="input"
                                                type="date"
                                                value={form.start}
                                                onChange={(e) => updateField("start", e.target.value)}
                                            />
                                            {errors.start && <small className="err">{errors.start}</small>}
                                        </label>

                                        <label>
                                            End date
                                            <input
                                                className="input"
                                                type="date"
                                                value={form.end}
                                                onChange={(e) => updateField("end", e.target.value)}
                                            />
                                            {errors.end && <small className="err">{errors.end}</small>}
                                        </label>
                                    </div>

                                    <div className="bookingGrid">
                                        <label>
                                            Travellers
                                            <input
                                                className="input"
                                                type="number"
                                                min={1}
                                                max={12}
                                                value={form.travellers}
                                                onChange={(e) => updateField("travellers", Number(e.target.value))}
                                            />
                                        </label>

                                        <label>
                                            Room type
                                            <select
                                                className="input"
                                                value={form.roomType}
                                                onChange={(e) => updateField("roomType", e.target.value)}
                                            >
                                                <option>Deluxe king</option>
                                                <option>Ocean view suite</option>
                                                <option>Family room</option>
                                                <option>City view double</option>
                                            </select>
                                        </label>
                                    </div>

                                    <label>
                                        Cabin preference
                                        <select
                                            className="input"
                                            value={form.cabin}
                                            onChange={(e) => updateField("cabin", e.target.value)}
                                        >
                                            <option>Economy</option>
                                            <option>Premium economy</option>
                                            <option>Business</option>
                                            <option>First</option>
                                        </select>
                                    </label>

                                    <div className="bookingGrid">
                                        <label>
                                            Lead traveller name
                                            <input
                                                className="input"
                                                value={form.fullName}
                                                onChange={(e) => updateField("fullName", e.target.value)}
                                            />
                                            {errors.fullName && (
                                                <small className="err">{errors.fullName}</small>
                                            )}
                                        </label>

                                        <label>
                                            Contact email
                                            <input
                                                className="input"
                                                type="email"
                                                value={form.email}
                                                onChange={(e) => updateField("email", e.target.value)}
                                            />
                                            {errors.email && <small className="err">{errors.email}</small>}
                                        </label>
                                    </div>

                                    <label>
                                        Contact number
                                        <input
                                            className="input"
                                            value={form.phone}
                                            onChange={(e) => updateField("phone", e.target.value)}
                                        />
                                        {errors.phone && <small className="err">{errors.phone}</small>}
                                    </label>

                                    <label>
                                        Special requests (optional)
                                        <textarea
                                            className="input"
                                            rows={3}
                                            value={form.requests}
                                            onChange={(e) => updateField("requests", e.target.value)}
                                            placeholder="Airport pickup, accessibility needs, honeymoon setup, etc."
                                        />
                                    </label>

                                    <button className="btn" type="submit">
                                        Confirm booking request
                                    </button>
                                </form>
                            )}
                        </div>
                    )}
                </div>

                <aside className="bookingAside">
                    <div className="bookingSummary">
                        <img src={destination.image} alt={`${destination.name} view`} />
                        <div>
                            <h3>Trip summary</h3>
                            <p>{destination.bestFor}</p>
                            <div className="summaryRow">
                                <span>Base price</span>
                                <strong>£{destination.fromPrice}</strong>
                            </div>
                            <div className="summaryRow">
                                <span>Travellers</span>
                                <strong>{form.travellers}</strong>
                            </div>
                            <div className="summaryRow total">
                                <span>Estimated total</span>
                                <strong>£{estimatedTotal}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="bookingHighlights">
                        <h4>What’s included</h4>
                        <ul>
                            <li>Flexible hotel options and verified reviews</li>
                            <li>24/7 travel support once booked</li>
                            <li>Optional add-ons for tours and transfers</li>
                            <li>Secure payments with deposits available</li>
                        </ul>
                    </div>
                </aside>
            </section>
        </div>
    );
}