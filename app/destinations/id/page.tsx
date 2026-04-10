import Link from "next/link";
import { getDestinationById } from "@/lib/data/destinations";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function DestinationDetailPage({ params }: Props) {
    const { id } = await params;
    const destination = await getDestinationById(id);

    if (!destination) {
        return (
            <div className="destDetailPage">
                <div className="destDetailWrap">
                    <Link className="destBack" href="/destinations">
                        ← Back to destinations
                    </Link>

                    <div className="destInfoCard">
                        <h1>Destination not found</h1>
                        <p>We couldn’t find that destination. Please go back and try another one.</p>
                        <Link className="destPrimaryBtn" href="/destinations">
                            Browse destinations
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="destDetailPage">
            <div className="destDetailWrap">
                <Link className="destBack" href="/destinations">
                    ← Back to destinations
                </Link>

                <div className="destHeroCard">
                    <div className="destHeroImage">
                        <img src={destination.image} alt={`${destination.name} view`} />
                    </div>

                    <div className="destHeroContent">
                        <p className="destEyebrow">{destination.region}</p>
                        <h1>
                            {destination.name}, {destination.country}
                        </h1>
                        <p className="destHeroText">{destination.description}</p>

                        <div className="destTagRow">
                            {destination.tags.map((tag) => (
                                <span className="destPill" key={tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="destInfoGrid">
                            <div className="destInfoBox">
                                <span className="destLabel">Best for</span>
                                <strong>{destination.bestFor}</strong>
                            </div>
                            <div className="destInfoBox">
                                <span className="destLabel">Best time</span>
                                <strong>{destination.bestTime}</strong>
                            </div>
                            <div className="destInfoBox">
                                <span className="destLabel">Rating</span>
                                <strong>★ {destination.rating.toFixed(1)}</strong>
                            </div>
                            <div className="destInfoBox">
                                <span className="destLabel">From</span>
                                <strong>£{destination.fromPrice}</strong>
                            </div>
                        </div>

                        <div className="destDetailActions">
                            <Link className="destPrimaryBtn" href={`/booking/${destination.id}`}>
                                Book now
                            </Link>
                            <Link className="destSecondaryBtn" href="/destinations">
                                Explore more
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="destDetailGrid">
                    <div className="destInfoCard">
                        <h2>Top highlights</h2>
                        <ul className="destHighlightsList">
                            {destination.highlights.map((highlight) => (
                                <li key={highlight}>{highlight}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="destInfoCard">
                        <h2>Why choose {destination.name}?</h2>
                        <p>
                            {destination.name} is especially popular for {destination.bestFor.toLowerCase()}.
                            Travellers usually get the best experience during {destination.bestTime}, with
                            flexible options for hotels, flights, and curated travel plans.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}