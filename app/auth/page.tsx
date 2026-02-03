"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function GoogleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.1-.1-2.3-.4-3.5z"
            />
            <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
            />
            <path
                fill="#4CAF50"
                d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.3 35 26.8 36 24 36c-5.3 0-9.8-3.4-11.4-8.1l-6.6 5.1C9.3 39.7 16.1 44 24 44z"
            />
            <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.4 4.4-4.4 5.8l6.3 5.2C39 36.7 44 32 44 24c0-1.1-.1-2.3-.4-3.5z"
            />
        </svg>
    );
}

function MicrosoftIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#F25022" d="M6 6h17v17H6z" />
            <path fill="#7FBA00" d="M25 6h17v17H25z" />
            <path fill="#00A4EF" d="M6 25h17v17H6z" />
            <path fill="#FFB900" d="M25 25h17v17H25z" />
        </svg>
    );
}

export default function AuthPage() {
    const { data: session, status } = useSession();
    const user = session?.user;

    return (
        <div className="authSplitPage">
            <div className="authSplitShell">
                {/* LEFT */}
                <div className="authLeft">
                    <div className="authBrandRow">
                        <Link className="authBrand" href="/">
                            Roamer
                        </Link>
                        <Link className="authClose" href="/" aria-label="Close">
                            ✕
                        </Link>
                    </div>

                    <h1 className="authTitle">Sign in to Roamer</h1>
                    <p className="authSubtitle">
                        Roamer uses secure Google or Microsoft authentication only. Connect your account once
                        to unlock bookings, saved trips, and personalized recommendations.
                    </p>

                    <div className="authSocialRow">
                        <button
                            type="button"
                            className="authIconBtn"
                            onClick={() => signIn("google", { callbackUrl: "/destinations" })}
                            aria-label="Continue with Google"
                            title="Continue with Google"
                        >
                            <GoogleIcon />
                        </button>

                        <button
                            type="button"
                            className="authIconBtn"
                            onClick={() => signIn("azure-ad", { callbackUrl: "/destinations" })}
                            aria-label="Continue with Microsoft"
                            title="Continue with Microsoft"
                        >
                            <MicrosoftIcon />
                        </button>
                    </div>

                    <div className="authOrRow">
                        <span />
                        <small>OR</small>
                        <span />
                    </div>

                    <div className="authProvidersStack">
                        <button
                            type="button"
                            className="authProviderBtnWide"
                            onClick={() => signIn("google", { callbackUrl: "/destinations" })}
                        >
              <span className="authIconInline">
                <GoogleIcon />
              </span>
                            Continue with Google
                        </button>

                        <button
                            type="button"
                            className="authProviderBtnWide"
                            onClick={() => signIn("azure-ad", { callbackUrl: "/destinations" })}
                        >
              <span className="authIconInline">
                <MicrosoftIcon />
              </span>
                            Continue with Microsoft
                        </button>
                    </div>

                    <div className="authMiniInfo">
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
                            <p>
                                We do not collect passwords. Authentication happens through your Google or Microsoft
                                account.
                            </p>
                        </div>
                    </div>

                    {status === "loading" ? (
                        <div className="authStatusBox">Checking session…</div>
                    ) : user ? (
                        <div className="authStatusBox">
                            <div className="authStatusTop">
                                <div>
                                    <strong>Signed in:</strong> {user.name} · {user.email}
                                </div>
                                <button
                                    className="authLinkBtn"
                                    type="button"
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                >
                                    Sign out
                                </button>
                            </div>

                            <div className="authStatusActions">
                                <Link className="authPrimaryCta" href="/destinations">
                                    Explore destinations
                                </Link>
                                <Link className="authGhostCta" href="/">
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="authHintBox">Already have a booking in mind? Sign in above to continue.</div>
                    )}
                </div>

                {/* RIGHT */}
                <aside className="authRight">
                    <div className="authRightInner">
                        <h2>New here?</h2>
                        <p>
                            Sign in to save trips, track bookings, and get personalized destination picks built
                            around your travel style.
                        </p>

                        <Link className="authRightCta" href="/destinations">
                            Explore destinations
                        </Link>

                        <div className="authRightFoot">
                            <span>Want to browse first?</span>
                            <Link href="/">Back to Home</Link>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
