import { useState } from "react";
import { supabase } from "../lib/supabase";
import {Box, Button, Heading, TextField} from "@navikt/ds-react";

export default function StrikkeprosjektForm() {
    const [tittel, setTittel] = useState("");
    const [bilde, setBilde] = useState("");
    const [beskrivelse, setBeskrivelse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase
            .from("strikkeprosjekt")
            .insert([
                {
                    tittel,
                    bilde: bilde || null,
                    beskrivelse
                },
            ]);

        if (error) {
            setError(error.message);
        } else {
            setTittel("");
            setBilde("");
            setBeskrivelse("");
        }

        setLoading(false);
    };

    return (
        <Box>
        <form
            onSubmit={handleSubmit}
        >
            <Heading level="2" size="medium" className="text-xl font-bold">Nytt prosjekt</Heading>
            <div className="space-y-2">
            <TextField
                label="Tittel"
                type="text"
                value={tittel}
                onChange={(e) => setTittel(e.target.value)}
                required
            />
            <TextField
                label="Beskrivelse"
                type="text"
                value={beskrivelse}
                onChange={(e) => setBeskrivelse(e.target.value)}
                required
            />
            <TextField type="text" label="Bilde (URL)" value={bilde} onChange={(e) => setBilde(e.target.value)} />

            {error && (
                <p className="text-red-600 text-sm">{error}</p>
            )}

            <Button
                type="submit"
                disabled={loading}
                data-color="neutral"
                className="text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? "Lagrer..." : "Opprett prosjekt"}
            </Button>
            </div>
        </form>
        </Box>
    );
}
