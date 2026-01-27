import Link from "next/link";

export type Destination = {
    id: string | number;
    name: string;
    country: string;
    region: string;
    fromPrice: number;
    image: string;
};

type Props = {
    destination: Destination;
};

export default function DestinationCard({ destination }: Props) {
    return (
        <div className="card">
            <div className="cardMedia">
                <img src={destination.image} alt={`${destination.name}`} />
            </div>

            <div className="cardBody">
                <div className="cardTitle">
                    {destination.name}{" "}
                    <span className="muted" style={{ fontWeight: 700 }}>
            · {destination.country}
          </span>
                </div>

                <div className="pillRow">
                    <span className="pill">{destination.region}</span>
                    <span className="pill">From £{destination.fromPrice}</span>
                </div>

                <Link className="btn" href={`/booking/${destination.id}`}>
                    Book
                </Link>
            </div>
        </div>
    );
}
