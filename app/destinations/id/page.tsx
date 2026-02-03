"use client";

import Link from "next/link";
import { getDestinationById } from "../data";

type Props = {
    params: {
        id: string;
    };
};

export default function DestinationDetailPage({ params }: Props) {
    const destination = getDestinationById(params.id);

    if (!destination) {
        return (
            <div className="page">
                <section className="section">
                    <h2>Destination not found</h2>
                    <p className="muted">Try browsing the full catalogue of destinations.</p>
                    <Link className="btn" href="/destinations">
                        Back to destinations
                    </Link>
                </section>
            </div>
        );
    }

    return (
        <div className="page">
            <section className="section destDetail">
                <div className="destDetailHero">
                    <img src={destination.image} alt={`${destination.name} skyline`} />
                    <div className="destDetailHeroContent">
                        <p className="destDetailOverline">{destination.region}</p>
                        <h2>
                            {destination.name}, {destination.country}
                        </h2>
                        <p className="muted">{destination.description}</p>
                        <div className="destDetailHighlights">
                            {destination.highlights.map((highlight) => (
                                <span key={highlight}>{highlight}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="destDetailBody">
                    <div>
                        <h3>Why travellers love it</h3>
                        <p>
                            Best for {destination.bestFor.toLowerCase()}, with ideal travel windows
                            in {destination.bestTime}. Expect curated stays, flexible itineraries,
                            and support from our travel team.
                        </p>
                        <ul>
                            <li>Average rating: {destination.rating.toFixed(1)} / 5</li>
                            <li>Popular inclusions: {destination.tags.join(", ")}</li>
                            <li>Guided add-ons curated by local experts</li>
                        </ul>
                    </div>

                    <div className="destDetailCard">
                        <div>
                            <div className="destDetailPrice">From £{destination.fromPrice}</div>
                            <div className="destDetailMeta">
                                Flexible dates • Secure deposits • 24/7 support
                            </div>
                        </div>
                        <Link className="btn" href={`/booking/${destination.id}`}>
                            Start booking
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}