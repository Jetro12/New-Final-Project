"use client";

import { useState } from "react";

type Props = {
    params: {
        id: string;
    };
};

type BookingForm = {
    start: string;
    end: string;
    travellers: number;
};

export default function BookingPage({ params }: Props) {
    const { id } = params;

    const [form, setForm] = useState<BookingForm>({
        start: "",
        end: "",
        travellers: 1,
    });

    function update<K extends keyof BookingForm>(key: K, value: BookingForm[K]) {
        setForm((p) => ({ ...p, [key]: value }));
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert(
            `Booked ${id} from ${form.start} to ${form.end} for ${form.travellers} traveller(s).`
        );
    }

    return (
        <div className="page">
            <section className="section">
                <h2>Booking: {id}</h2>

                <form className="form" onSubmit={submit}>
                    <label>
                        Start date
                        <input
                            className="input"
                            type="date"
                            value={form.start}
                            onChange={(e) => update("start", e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        End date
                        <input
                            className="input"
                            type="date"
                            value={form.end}
                            onChange={(e) => update("end", e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Travellers
                        <input
                            className="input"
                            type="number"
                            min={1}
                            value={form.travellers}
                            onChange={(e) => update("travellers", Number(e.target.value))}
                        />
                    </label>

                    <button className="btn" type="submit">
                        Confirm booking
                    </button>
                </form>
            </section>
        </div>
    );
}
