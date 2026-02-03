"use client";

import RequireAuth from "@/components/RequireAuth";
import Link from "next/link";

export default function TripsPage() {
    return (
        <RequireAuth>
            <div className="page">
                <section className="section" style={{ maxWidth: 900, margin: "0 auto" }}>
                    <h1>Trips</h1>
                    <p className="muted">Your saved and booked trips will appear here.</p>

                    <div className="card" style={{ padding: 16, marginTop: 16 }}>
                        <p style={{ margin: 0 }}>
                            No trips yet. Explore destinations and book your first trip.
                        </p>
                        <div style={{ marginTop: 12 }}>
                            <Link className="btn" href="/destinations">Explore destinations</Link>
                        </div>
                    </div>
                </section>
            </div>
        </RequireAuth>
    );
}
