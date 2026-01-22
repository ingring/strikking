import {useEffect, useState} from "react";
import {supabase} from "../lib/supabase.ts";
import Strikkeprosjekt from "../components/Strikkeprosjekt.tsx";
import StrikkeprosjektForm from "../components/StrikkeprosjektForm.tsx";
import {Box, Heading} from "@navikt/ds-react";

export type Prosjekt = {
    id: number;
    tittel?: string;
    bilde?: string;
};

export default function Strikkeprosjekter() {
    const [prosjekter, setProsjekter] = useState<Prosjekt[]>([]);

    useEffect(() => {
        const fetchProsjekter = async () => {
            const { data, error } = await supabase
                .from("strikkeprosjekt")
                .select("*");

            console.log("DATA:", data);
            console.log("ERROR:", error);

            if (error) {
                console.error(error);
            } else {
                setProsjekter(data ?? []);
            }
        };

        fetchProsjekter();
    }, []);

    return (
        <div className="max-w-2xl mx-auto">
            <Box className="p-4">
                <Heading level="2" size="medium">Strikkeprosjekter</Heading>
                    {prosjekter.map(prosjekt => (
                        <Strikkeprosjekt key={prosjekt.id} tittel={prosjekt.tittel} img={prosjekt.bilde} />
                    ))}
            </Box>
            <StrikkeprosjektForm />
        </div>
    );
}