"use client";

import RequireAuth from "@/components/RequireAuth";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
    ensureUserProfile,
    getProfileBookings,
    getSavedPlaces,
    getTravelPreferences,
    type Booking,
    type BookingStatus,
    type SavedPlace,
    type TravelPreferences,
} from "@/lib/data/profile";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const user = session?.user;

    const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
    const [pastBookings, setPastBookings] = useState<Booking[]>([]);
    const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>([]);
    const [preferences, setPreferences] = useState<TravelPreferences>({
        defaultTravellers: 2,
        favouriteStyle: "City breaks",
        alertType: "Price drops",
        budgetRange: "££",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProfileData = async () => {
            if (!user?.email) return;

            try {
                await ensureUserProfile({
                    email: user.email,
                    name: user.name,
                    image: user.image,
                });

                const bookings = await getProfileBookings(user.email);
                const saved = await getSavedPlaces(user.email);
                const prefs = await getTravelPreferences(user.email);

                setUpcomingBookings(bookings.upcoming);
                setPastBookings(bookings.past);
                setSavedPlaces(saved);
                setPreferences(prefs);
            } catch (err) {
                console.error(err);
                setError("Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        };

        if (status === "authenticated") {
            loadProfileData();
        }
    }, [status, user?.email, user?.name, user?.image]);

    const stats = useMemo(() => {
        const totalTrips = upcomingBookings.length + pastBookings.length;
        const totalSpend = [...upcomingBookings, ...pastBookings].reduce(
            (sum, booking) => sum + booking.total,
            0
        );
        const countriesVisited = new Set(pastBookings.map((booking) => booking.country)).size;

        return { totalTrips, totalSpend, countriesVisited };
    }, [upcomingBookings, pastBookings]);

    if (status === "loading" || loading) {
        return (
            <RequireAuth>
                <div className="page">
                    <section className="section profileWrap">
                        <p>Loading profile...</p>
                    </section>
                </div>
            </RequireAuth>
        );
    }

    return (
        <RequireAuth>
            <div className="page">
                <section className="section profileWrap">
                    <div className="profileHeader">
                        <div className="profileAvatar">
                            {user?.image ? (
                                <img
                                    src={user.image}
                                    alt="Profile"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="profileAvatarFallback">
                                    {(user?.name?.[0] ?? "R").toUpperCase()}
                                </div>
                            )}
                        </div>

                        <div className="profileHeadText">
                            <p className="profileEyebrow">Account</p>
                            <h1>Profile</h1>
                            <p className="muted">
                                Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}. Here’s your travel overview.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="appSignOutBtn"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            Sign out
                        </button>
                    </div>

                    {error && <div className="profileEmpty">{error}</div>}

                    <div className="profileStats">
                        <div className="profileStat">
                            <span className="profileStatLabel">Trips</span>
                            <strong className="profileStatValue">{stats.totalTrips}</strong>
                        </div>

                        <div className="profileStat">
                            <span className="profileStatLabel">Countries visited</span>
                            <strong className="profileStatValue">{stats.countriesVisited}</strong>
                        </div>

                        <div className="profileStat">
                            <span className="profileStatLabel">Total spend</span>
                            <strong className="profileStatValue">£{stats.totalSpend}</strong>
                        </div>
                    </div>

                    <div className="profileCard">
                        <div className="profileCardHead">
                            <h2>Account details</h2>
                        </div>

                        <div className="profileRow">
                            <span>Name</span>
                            <strong>{user?.name ?? "—"}</strong>
                        </div>
                        <div className="profileRow">
                            <span>Email</span>
                            <strong>{user?.email ?? "—"}</strong>
                        </div>
                    </div>

                    <div className="profileSection">
                        <div className="profileSectionHead">
                            <h2>Upcoming bookings</h2>
                            <Link className="profileLink" href="/destinations">
                                Browse destinations →
                            </Link>
                        </div>

                        <div className="profileList">
                            {upcomingBookings.length > 0 ? (
                                upcomingBookings.map((booking) => (
                                    <div className="profileBooking" key={booking.id}>
                                        <div>
                                            <div className="profileBookingTitle">
                                                {booking.destination}, {booking.country}
                                            </div>
                                            <div className="profileBookingMeta">
                                                {booking.dates} • {booking.travellers} traveller
                                                {booking.travellers > 1 ? "s" : ""}
                                            </div>
                                        </div>

                                        <div className="profileBookingRight">
                                            <span className={`profilePill ${pillClass(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                            <strong>£{booking.total}</strong>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="profileEmpty">
                                    No upcoming bookings yet. Your next trip will appear here.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="profileSection">
                        <div className="profileSectionHead">
                            <h2>Past bookings</h2>
                            <Link className="profileLink" href="/trips">
                                View trips →
                            </Link>
                        </div>

                        <div className="profileList">
                            {pastBookings.length > 0 ? (
                                pastBookings.map((booking) => (
                                    <div className="profileBooking" key={booking.id}>
                                        <div>
                                            <div className="profileBookingTitle">
                                                {booking.destination}, {booking.country}
                                            </div>
                                            <div className="profileBookingMeta">
                                                {booking.dates} • {booking.travellers} traveller
                                                {booking.travellers > 1 ? "s" : ""}
                                            </div>
                                        </div>

                                        <div className="profileBookingRight">
                                            <span className={`profilePill ${pillClass(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                            <strong>£{booking.total}</strong>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="profileEmpty">
                                    No past bookings yet.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="profileGrid2">
                        <div className="profilePanel">
                            <div className="profileSectionHead">
                                <h2>Saved places</h2>
                                <Link className="profileLink" href="/destinations">
                                    Explore →
                                </Link>
                            </div>

                            {savedPlaces.length > 0 ? (
                                <div className="savedGrid">
                                    {savedPlaces.map((place) => (
                                        <div key={place.id} className="savedCard">
                                            <div className="savedTop">
                                                <strong>{place.name}</strong>
                                                <span className="savedTag">{place.tag}</span>
                                            </div>
                                            <div className="savedMeta">{place.country}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="profileEmpty">No saved places yet.</div>
                            )}
                        </div>

                        <div className="profilePanel">
                            <div className="profileCardHead">
                                <h2>Travel preferences</h2>
                            </div>

                            <div className="prefs">
                                <div className="prefRow">
                                    <span>Default travellers</span>
                                    <strong>{preferences.defaultTravellers}</strong>
                                </div>
                                <div className="prefRow">
                                    <span>Favourite style</span>
                                    <strong>{preferences.favouriteStyle}</strong>
                                </div>
                                <div className="prefRow">
                                    <span>Alert type</span>
                                    <strong>{preferences.alertType}</strong>
                                </div>
                                <div className="prefRow">
                                    <span>Budget range</span>
                                    <strong>{preferences.budgetRange}</strong>
                                </div>
                            </div>

                            <div className="profileMiniActions">
                                <Link className="profileBtn" href="/destinations">
                                    Plan a new trip
                                </Link>
                                <Link className="profileBtn ghost" href="/trips">
                                    View all trips
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </RequireAuth>
    );
}

function pillClass(status: BookingStatus) {
    if (status === "Upcoming") return "pillUpcoming";
    if (status === "Completed") return "pillCompleted";
    return "pillCancelled";
}