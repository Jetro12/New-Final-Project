"use client";

import { useCallback, useEffect, useState } from "react";

export type AuthProvider = "google" | "microsoft";

export type AuthUser = {
    provider: AuthProvider;
    name: string;
    email: string;
    signedInAt: string;
};

const STORAGE_KEY = "roamer_auth_user";

const PROVIDER_LABELS: Record<AuthProvider, string> = {
    google: "Google",
    microsoft: "Microsoft",
};

const PROVIDER_USERS: Record<AuthProvider, Pick<AuthUser, "name" | "email">> = {
    google: { name: "Ava Google", email: "ava.google@roamer.travel" },
    microsoft: { name: "Noah Microsoft", email: "noah.microsoft@roamer.travel" },
};

function readStoredUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
        const parsed = JSON.parse(raw) as AuthUser;
        if (!parsed?.provider) return null;
        return parsed;
    } catch {
        return null;
    }
}

export function useAuth() {
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        setUser(readStoredUser());
    }, []);

    const signIn = useCallback((provider: AuthProvider) => {
        if (typeof window === "undefined") return null;
        const base = PROVIDER_USERS[provider];
        const nextUser: AuthUser = {
            provider,
            name: base.name,
            email: base.email,
            signedInAt: new Date().toISOString(),
        };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
        setUser(nextUser);
        return nextUser;
    }, []);

    const signOut = useCallback(() => {
        if (typeof window === "undefined") return;
        window.localStorage.removeItem(STORAGE_KEY);
        setUser(null);
    }, []);

    return {
        user,
        signIn,
        signOut,
        providerLabels: PROVIDER_LABELS,
    };
}