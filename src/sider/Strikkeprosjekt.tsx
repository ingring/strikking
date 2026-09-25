import {useEffect, useState} from "react";
import {supabase} from "../lib/supabase.ts";
import Strikkeprosjekt from "../components/Strikkeprosjekt.tsx";
import StrikkeprosjektForm from "../components/StrikkeprosjektForm.tsx";
import {Box, Heading} from "@navikt/ds-react";
import {useSession} from "../context/SessionContext.tsx";
import {type Prosjekt} from "../types.ts";

export default function Strikkeprosjekter() {
    const session = useSession();
    const [mineProsjekter, setMineProsjekter] = useState<Prosjekt[]>([]);
    const [andreProsjekter, setAndreProsjekter] = useState<Prosjekt[]>([]);
    const userId = session?.user.id;

    useEffect(() => {
        if (!userId) return;

        const fetchProsjekter = async () => {
            const { data: mineProsjekter } = await supabase
                .from("strikkeprosjekt")
                .select("*")
                .eq("user_id", userId);

            const { data: andreProsjekter } = await supabase
                .from("strikkeprosjekt")
                .select("*")
                .neq("user_id", userId);

            setMineProsjekter(mineProsjekter ?? []);
            setAndreProsjekter(andreProsjekter ?? []);
        };

        fetchProsjekter();
    }, [userId]);

    if (!session) return null; // do nothing if session is null

    return (
        <div className="max-w-2xl mx-auto">
            <Box className="py-10">
                <Heading level="2" size="medium">Mine prosjekter</Heading>
                <div className="flex flex-col gap-4">
                    {mineProsjekter.map(prosjekt => (
                        <Strikkeprosjekt key={prosjekt.id} id={prosjekt.id} tittel={prosjekt.tittel} img={prosjekt.bilde} reactions={prosjekt.reactions} description={prosjekt.beskrivelse} status={prosjekt.status}/>
                    ))}
                </div>
            </Box>
            <StrikkeprosjektForm />
            <Box className="py-10">
                <Heading level="2" size="medium">Bli inspirert av andre</Heading>
                <div className="flex flex-col gap-4">
                    {andreProsjekter.map(prosjekt => (
                        <Strikkeprosjekt key={prosjekt.id} id={prosjekt.id} tittel={prosjekt.tittel}
                                         img={prosjekt.bilde} reactions={prosjekt.reactions} description={prosjekt.beskrivelse} status={prosjekt.status}/>
                    ))}
                </div>
            </Box>
        </div>
);
}