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

                <div className="destSearch">
                    <SearchBar
                        key={`${query}-${type}-${start}-${end}-${adults}`}
                        initialWhere={query}
                        initialStart={start}
                        initialEnd={end}
                        initialAdults={Number(adults) > 0 ? Number(adults) : 2}
                        initialTab={type === "cars" || type === "flights" ? type : "hotels"}
                        variant="inline"
                    />
                </div>

                <div className="destGrid">
                    {filtered.map((d) => (
                        <div className="destCard" key={d.id}>
                            <div className="destCardImage">
                                <img src={d.image} alt={`${d.name} skyline`} />
                                <div className="destRating">★ {d.rating.toFixed(1)}</div>
                            </div>

                            <div className="destCardTop">
                                <div>
                                    <div className="destName">{d.name}</div>
                                    <div className="destCountry">
                                        {d.country} • {d.region}
                                    </div>
                                </div>
                                <div className="destPrice">From £{d.fromPrice}</div>
                            </div>

                            <div className="destBody">
                                <p className="destDesc">{d.description}</p>

                                <div className="destTags">
                                    {d.tags.map((t) => (
                                        <span className="tag" key={t}>
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="destHighlights">
                                    <div className="destLabel">Highlights</div>
                                    <ul>
                                        {d.highlights.map((h) => (
                                            <li key={h}>{h}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="destMetaRow">
                                    <div>
                                        <span className="destLabel">Best for</span>
                                        <div>{d.bestFor}</div>
                                    </div>
                                    <div>
                                        <span className="destLabel">Best time</span>
                                        <div>{d.bestTime}</div>
                                    </div>
                                </div>
                            </div>

                            <Link className="destBtn" href={`/booking/${d.id}`}>
                                Book this trip →
                            </Link>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="destEmpty">
                        No matches found. Try another search or remove filters to see more options.
                    </div>
                )}
            </div>
        </div>
    );
}