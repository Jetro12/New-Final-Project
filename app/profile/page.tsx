"use client";

import RequireAuth from "@/components/RequireAuth";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <RequireAuth>
            <div className="page">
                <section className="section" style={{ maxWidth: 900, margin: "0 auto" }}>
                    <h1>Profile</h1>
                    <p className="muted">Your Roamer account details.</p>

                    <div className="card" style={{ padding: 16, marginTop: 16 }}>
                        <div><strong>Name:</strong> {user?.name ?? "—"}</div>
                        <div><strong>Email:</strong> {user?.email ?? "—"}</div>
                    </div>
                </section>
            </div>
        </RequireAuth>
    );
}
