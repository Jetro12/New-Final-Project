import { createClient } from "@/lib/supabase/client";

export type ProfileRecord = {
    email: string;
    fullName: string | null;
    image: string | null;
};

export type BookingStatus = "Upcoming" | "Completed" | "Cancelled";

export type Booking = {
    id: string;
    destination: string;
    country: string;
    dates: string;
    travellers: number;
    status: BookingStatus;
    total: number;
};

export type SavedPlace = {
    id: string;
    name: string;
    country: string;
    tag: "Beach" | "City" | "Nature" | "Food";
};

export type TravelPreferences = {
    defaultTravellers: number;
    favouriteStyle: string;
    alertType: string;
    budgetRange: string;
};

export async function ensureUserProfile(user: {
    email: string;
    name?: string | null;
    image?: string | null;
}) {
    const supabase = createClient();

    const { data: existing, error: selectError } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", user.email)
        .maybeSingle();

    if (selectError) {
        throw new Error(selectError.message);
    }

    if (!existing) {
        const { error: insertError } = await supabase.from("profiles").insert({
            email: user.email,
            full_name: user.name ?? null,
            image: user.image ?? null,
        });

        if (insertError) {
            throw new Error(insertError.message);
        }
    }

    const { data: existingPrefs, error: prefsError } = await supabase
        .from("travel_preferences")
        .select("*")
        .eq("user_email", user.email)
        .maybeSingle();

    if (prefsError) {
        throw new Error(prefsError.message);
    }

    if (!existingPrefs) {
        const { error: insertPrefsError } = await supabase.from("travel_preferences").insert({
            user_email: user.email,
            default_travellers: 2,
            favourite_style: "City breaks",
            alert_type: "Price drops",
            budget_range: "££",
        });

        if (insertPrefsError) {
            throw new Error(insertPrefsError.message);
        }
    }
}

export async function getProfileBookings(userEmail: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_email", userEmail)
        .order("start_date", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    const bookings: Booking[] = (data || []).map((item) => ({
        id: item.id,
        destination: item.destination_name,
        country: item.country,
        dates: `${item.start_date} → ${item.end_date}`,
        travellers: item.travellers,
        status: item.status as BookingStatus,
        total: item.total,
    }));

    return {
        upcoming: bookings.filter((b) => b.status === "Upcoming"),
        past: bookings.filter((b) => b.status !== "Upcoming"),
    };
}

export async function getSavedPlaces(userEmail: string): Promise<SavedPlace[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("saved_places")
        .select("*")
        .eq("user_email", userEmail)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return (data || []).map((item) => ({
        id: item.id,
        name: item.name,
        country: item.country,
        tag: item.tag as "Beach" | "City" | "Nature" | "Food",
    }));
}

export async function getTravelPreferences(userEmail: string): Promise<TravelPreferences> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("travel_preferences")
        .select("*")
        .eq("user_email", userEmail)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    if (!data) {
        return {
            defaultTravellers: 2,
            favouriteStyle: "City breaks",
            alertType: "Price drops",
            budgetRange: "££",
        };
    }

    return {
        defaultTravellers: data.default_travellers,
        favouriteStyle: data.favourite_style,
        alertType: data.alert_type,
        budgetRange: data.budget_range,
    };
}