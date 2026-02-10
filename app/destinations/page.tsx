"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import { DESTINATIONS } from "./data";

export default function DestinationsPage() {
    const q = useSearchParams();

    const query = (q.get("q") || "").trim().toLowerCase();
    const type = (q.get("type") || "hotels").trim().toLowerCase();
    const start = q.get("start") || "";
    const end = q.get("end") || "";
    const adults = q.get("adults") || "2";

    const filtered = DESTINATIONS.filter((d) => {
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
                    <div>
                        <h1>Destinations</h1>
                        <div className="destSub">
                            {query ? (
                                <>
                                    Showing results for <strong>{query}</strong> • {type}
                                    {start && end ? ` • ${start} → ${end}` : ""} • {adults} adults
                                </>
                            ) : (
                                "Browse destinations and start planning."
                            )}
                        </div>
                    </div>

                    <Link className="destCta" href="/">
                        ← Back home
                    </Link>
                </div>

                <div className="destSearch">
                    <SearchBar
                        key={`${query}-${type}-${start}-${end}-${adults}`}
                        initialWhere={query}
                        initialStart={start}
                        initialEnd={end}
                        initialAdults={Number(adults) > 0 ? Number(adults) : 2}
                        initialTab={type === "cars" || type === "flights" ? (type as any) : "hotels"}
                        variant="inline"
                    />
                </div>

                <div className="destGrid">
                    {filtered.map((d) => (
                        <div className="destCard" key={d.id}>
                            <div className="destCardImage">
                                <img src={d.image} alt={`${d.name} view`} loading="lazy" />
                                <div className="destRating">★ {d.rating.toFixed(1)}</div>
                            </div>

                            {/* ✅ IMPORTANT: put the content inside destCardBody (your CSS expects that) */}
                            <div className="destCardBody">
                                <div className="destCardTop">
                                    <div>
                                        <div className="destName">{d.name}</div>
                                        <div className="destCountry">
                                            {d.country} • {d.region}
                                        </div>
                                    </div>
                                    <div className="destPrice">From £{d.fromPrice}</div>
                                </div>

                                {/* ✅ Simplified: keep it clean */}
                                <p className="destDesc">{d.description}</p>

                                <div className="destTags">
                                    {d.tags.map((t) => (
                                        <span className="tag" key={t}>
                      {t}
                    </span>
                                    ))}
                                </div>

                                {/* ✅ Mini meta box to keep it tidy */}
                                <div className="destMiniMeta">
                                    <div>
                                        <span className="destLabel">Best for</span>
                                        <strong>{d.bestFor}</strong>
                                    </div>
                                    <div>
                                        <span className="destLabel">Best time</span>
                                        <strong>{d.bestTime}</strong>
                                    </div>
                                </div>

                                <ul className="destMiniHighlights">
                                    {d.highlights.slice(0, 3).map((h) => (
                                        <li key={h}>{h}</li>
                                    ))}
                                </ul>

                                <div className="destActions">
                                    <Link className="destGhost" href={`/destinations/${d.id}`}>
                                        Details →
                                    </Link>
                                    <Link className="destBtn" href={`/booking/${d.id}`}>
                                        Book →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="destEmpty">
                        No matches found. Try another search or remove filters.
                    </div>
                )}
            </div>
        </div>
    );
}
