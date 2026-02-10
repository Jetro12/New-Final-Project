"use client";

import RequireAuth from "@/components/RequireAuth";
import Link from "next/link";
import { useMemo } from "react";
import { useSession } from "next-auth/react";

type BookingStatus = "Upcoming" | "Completed" | "Cancelled";

type Booking = {
    id: string;
    destination: string;
    country: string;
    dates: string;
    travellers: number;
    status: BookingStatus;
    total: number;
};

type SavedPlace = {
    id: string;
    name: string;
    country: string;
    tag: "Beach" | "City" | "Nature" | "Food";
};

export default function ProfilePage() {
    const { data: session } = useSession();
    const user = session?.user;

    // Mock data (swap for DB later)
    const upcomingBookings: Booking[] = [
        {
            id: "BK-2041",
            destination: "Barcelona",
            country: "Spain",
            dates: "2026-03-18 → 2026-03-23",
            travellers: 2,
            status: "Upcoming",
            total: 780,
        },
        {
            id: "BK-2097",
            destination: "Marrakech",
            country: "Morocco",
            dates: "2026-05-06 → 2026-05-10",
            travellers: 1,
            status: "Upcoming",
            total: 420,
        },
    ];

    const pastBookings: Booking[] = [
        {
            id: "BK-1880",
            destination: "Paris",
            country: "France",
            dates: "2025-12-02 → 2025-12-06",
            travellers: 2,
            status: "Completed",
            total: 690,
        },
        {
            id: "BK-1764",
            destination: "Amsterdam",
            country: "Netherlands",
            dates: "2025-08-11 → 2025-08-14",
            travellers: 1,
            status: "Completed",
            total: 310,
        },
    ];

    const savedPlaces: SavedPlace[] = [
        { id: "SV-1", name: "Tokyo", country: "Japan", tag: "Food" },
        { id: "SV-2", name: "Santorini", country: "Greece", tag: "Beach" },
        { id: "SV-3", name: "Reykjavík", country: "Iceland", tag: "Nature" },
    ];

    const stats = useMemo(() => {
        const totalTrips = upcomingBookings.length + pastBookings.length;
        const totalSpend = [...upcomingBookings, ...pastBookings].reduce((sum, b) => sum + b.total, 0);
        const countriesVisited = new Set(pastBookings.map((b) => b.country)).size;
        return { totalTrips, totalSpend, countriesVisited };
    }, [upcomingBookings, pastBookings]);

    return (
        <RequireAuth>
            <div className="page">
                <section className="section profileWrap">
                    {/* Header */}
                    <div className="profileHeader">
                        <div className="profileAvatar">
                            {user?.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={user.image} alt="Profile" referrerPolicy="no-referrer" />
                            ) : (
                                <div className="profileAvatarFallback">
                                    {(user?.name?.[0] ?? "R").toUpperCase()}
                                </div>
                            )}
                        </div>

                        <div className="profileHeadText">
                            <h1>Profile</h1>
                            <p className="muted">Your Roamer account details and travel overview.</p>
                        </div>
                    </div>

                    {/* Quick stats */}
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

                    {/* Account details */}
                    <div className="profileCard">
                        <div className="profileRow">
                            <span>Name</span>
                            <strong>{user?.name ?? "—"}</strong>
                        </div>
                        <div className="profileRow">
                            <span>Email</span>
                            <strong>{user?.email ?? "—"}</strong>
                        </div>
                    </div>

                    {/* Upcoming */}
                    <div className="profileSection">
                        <div className="profileSectionHead">
                            <h2>Upcoming bookings</h2>
                            <Link className="profileLink" href="/destinations">
                                Browse destinations →
                            </Link>
                        </div>

                        <div className="profileList">
                            {upcomingBookings.map((b) => (
                                <div className="profileBooking" key={b.id}>
                                    <div className="profileBookingLeft">
                                        <div className="profileBookingTitle">
                                            {b.destination}, {b.country}
                                        </div>
                                        <div className="profileBookingMeta">
                                            {b.dates} • {b.travellers} traveller{b.travellers > 1 ? "s" : ""}
                                        </div>
                                    </div>

                                    <div className="profileBookingRight">
                                        <span className={`profilePill ${pillClass(b.status)}`}>{b.status}</span>
                                        <strong>£{b.total}</strong>
                                    </div>
                                </div>
                            ))}

                            {upcomingBookings.length === 0 && (
                                <div className="profileEmpty">No upcoming bookings yet.</div>
                            )}
                        </div>
                    </div>

                    {/* Past */}
                    <div className="profileSection">
                        <div className="profileSectionHead">
                            <h2>Past bookings</h2>
                            <Link className="profileLink" href="/trips">
                                View trips →
                            </Link>
                        </div>

                        <div className="profileList">
                            {pastBookings.map((b) => (
                                <div className="profileBooking" key={b.id}>
                                    <div className="profileBookingLeft">
                                        <div className="profileBookingTitle">
                                            {b.destination}, {b.country}
                                        </div>
                                        <div className="profileBookingMeta">
                                            {b.dates} • {b.travellers} traveller{b.travellers > 1 ? "s" : ""}
                                        </div>
                                    </div>

                                    <div className="profileBookingRight">
                                        <span className={`profilePill ${pillClass(b.status)}`}>{b.status}</span>
                                        <strong>£{b.total}</strong>
                                    </div>
                                </div>
                            ))}

                            {pastBookings.length === 0 && (
                                <div className="profileEmpty">No past bookings yet.</div>
                            )}
                        </div>
                    </div>

                    {/* Saved places + Travel preferences */}
                    <div className="profileGrid2">
                        <div className="profilePanel">
                            <div className="profileSectionHead" style={{ marginBottom: 10 }}>
                                <h2>Saved places</h2>
                                <Link className="profileLink" href="/destinations">
                                    Explore →
                                </Link>
                            </div>

                            <div className="savedGrid">
                                {savedPlaces.map((s) => (
                                    <div key={s.id} className="savedCard">
                                        <div className="savedTop">
                                            <strong>{s.name}</strong>
                                            <span className="savedTag">{s.tag}</span>
                                        </div>
                                        <div className="savedMeta">{s.country}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="profilePanel">
                            <h2 style={{ marginTop: 0 }}>Travel preferences</h2>
                            <div className="prefs">
                                <div className="prefRow">
                                    <span>Default travellers</span>
                                    <strong>2</strong>
                                </div>
                                <div className="prefRow">
                                    <span>Favourite style</span>
                                    <strong>City breaks</strong>
                                </div>
                                <div className="prefRow">
                                    <span>Alert type</span>
                                    <strong>Price drops</strong>
                                </div>
                                <div className="prefRow">
                                    <span>Budget range</span>
                                    <strong>££</strong>
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
