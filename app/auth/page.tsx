"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthPage() {
    const { data: session, status } = useSession();
    const user = session?.user;

    return (
        <div className="page">
            <section className="section authCard">
                <h2 style={{ marginTop: 0 }}>Sign in to Roamer</h2>
                <p className="muted" style={{ marginTop: 6 }}>
                    Roamer uses secure Google or Microsoft authentication only. Connect your account
                    once to unlock bookings, saved trips, and personalized recommendations.
                </p>

                <div className="authProviders">
                    <button
                        type="button"
                        className="authProviderBtn"
                        onClick={() => signIn("google", { callbackUrl: "/destinations" })}
                    >
                        Continue with Google
                    </button>

                    <button
                        type="button"
                        className="authProviderBtn"
                        onClick={() => signIn("azure-ad", { callbackUrl: "/destinations" })}
                    >
                        Continue with Microsoft
                    </button>
                </div>

                <div className="authPerks">
                    <div>
                        <h4>Why sign in?</h4>
                        <ul>
                            <li>Store traveler details to speed up checkout.</li>
                            <li>Manage bookings and payment schedules in one place.</li>
                            <li>Get destination alerts when prices drop.</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Security</h4>
                        <p className="muted">
                            We do not collect passwords. Authentication happens through your Google or Microsoft account.
                        </p>
                    </div>
                </div>

                {status === "loading" ? (
                    <div className="authHint">Checking session…</div>
                ) : user ? (
                    <div className="authStatus">
                        <div>
                            <strong>Signed in:</strong> {user.name} · {user.email}
                        </div>
                        <div className="authActions">
                            <button className="btn ghost" type="button" onClick={() => signOut({ callbackUrl: "/" })}>
                                Sign out
                            </button>
                            <Link className="btn" href="/destinations">
                                Explore destinations
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="authHint">Already have a booking in mind? Sign in above to continue.</div>
                )}
            </section>
        </div>
    );
}
