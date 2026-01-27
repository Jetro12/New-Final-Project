"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Dest = {
    id: string;
    name: string;
    country: string;
    tags: string[];
};

const DESTS: Dest[] = [
    { id: "dubai", name: "Dubai", country: "UAE", tags: ["hotels", "flights", "cars"] },
    { id: "paris", name: "Paris", country: "France", tags: ["hotels", "flights", "cars"] },
    { id: "tokyo", name: "Tokyo", country: "Japan", tags: ["hotels", "flights"] },
    { id: "bali", name: "Bali", country: "Indonesia", tags: ["hotels", "flights"] },
    { id: "bangkok", name: "Bangkok", country: "Thailand", tags: ["hotels", "flights"] },
    { id: "london", name: "London", country: "UK", tags: ["hotels", "flights", "cars"] },
];

export default function DestinationsPage() {
    const q = useSearchParams();

    const query = (q.get("q") || "").trim().toLowerCase();
    const type = (q.get("type") || "hotels").trim().toLowerCase();
    const start = q.get("start") || "";
    const end = q.get("end") || "";
    const adults = q.get("adults") || "2";

    const filtered = DESTS.filter((d) => {
        const matchText =
            !query ||
            d.name.toLowerCase().includes(query) ||
            d.country.toLowerCase().includes(query);

        const matchType = !type || d.tags.includes(type);

        return matchText && matchType;
    });

    return (
        <div className="destPage">
            <div className="destWrap">
                <div className="destHeader">
                    <h1>Destinations</h1>
                    <div className="destSub">
                        {query ? (
                            <>
                                Showing results for <strong>{query}</strong> • {type}{" "}
                                {start && end ? `• ${start} → ${end}` : ""} • {adults} adults
                            </>
                        ) : (
                            "Browse destinations and start planning."
                        )}
                    </div>
                </div>

                <div className="destGrid">
                    {filtered.map((d) => (
                        <div className="destCard" key={d.id}>
                            <div className="destCardTop">
                                <div className="destName">{d.name}</div>
                                <div className="destCountry">{d.country}</div>
                            </div>

                            <div className="destTags">
                                {d.tags.map((t) => (
                                    <span className="tag" key={t}>
                    {t}
                  </span>
                                ))}
                            </div>

                            <Link className="destBtn" href={`/booking/${d.id}`}>
                                Book this trip →
                            </Link>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="destEmpty">No matches. Try a different destination name.</div>
                )}
            </div>
        </div>
    );
}
