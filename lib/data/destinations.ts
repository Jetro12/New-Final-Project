import { createClient } from "@/lib/supabase/client";

export type Destination = {
    id: string;
    name: string;
    country: string;
    region: string;
    tags: string[];
    fromPrice: number;
    rating: number;
    description: string;
    highlights: string[];
    bestFor: string;
    bestTime: string;
    image: string;
};

export async function getDestinations(): Promise<Destination[]> {
    const supabase = createClient();

    const { data, error } = await supabase.from("destinations").select("*");

    if (error) {
        throw new Error(error.message);
    }

    return (data || []).map((item) => ({
        id: item.id,
        name: item.name,
        country: item.country,
        region: item.region,
        tags: item.tags,
        fromPrice: item.from_price,
        rating: Number(item.rating),
        description: item.description,
        highlights: item.highlights,
        bestFor: item.best_for,
        bestTime: item.best_time,
        image: item.image,
    }));
}

export async function getDestinationById(id: string): Promise<Destination | null> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) {
        return null;
    }

    return {
        id: data.id,
        name: data.name,
        country: data.country,
        region: data.region,
        tags: data.tags,
        fromPrice: data.from_price,
        rating: Number(data.rating),
        description: data.description,
        highlights: data.highlights,
        bestFor: data.best_for,
        bestTime: data.best_time,
        image: data.image,
    };
}