"use client";

import Link from "next/link";
import { useAuth } from "@/components/useAuth";

export default function AuthPage() {
    const { user, signIn, signOut, providerLabels } = useAuth();

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
                        onClick={() => signIn("google")}
                    >
                        Continue with Google
                    </button>
                    <button
                        type="button"
                        className="authProviderBtn"
                        onClick={() => signIn("microsoft")}
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
                            We do not collect passwords. Authentication happens through your Google
                            or Microsoft account.
                        </p>
                    </div>
                </div>

                {user ? (
                    <div className="authStatus">
                        <div>
                            <strong>Signed in:</strong> {user.name} · {user.email} ·{" "}
                            {providerLabels[user.provider]}
                        </div>
                        <div className="authActions">
                            <button className="btn ghost" type="button" onClick={signOut}>
                                Sign out
                            </button>
                            <Link className="btn" href="/destinations">
                                Explore destinations
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="authHint">
                        Already have a booking in mind? Sign in above to continue.
                    </div>
                )}
            </section>
        </div>
    );
}