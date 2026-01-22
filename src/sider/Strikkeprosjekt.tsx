import {useEffect, useState} from "react";
import {supabase} from "../lib/supabase.ts";
import Strikkeprosjekt from "../components/Strikkeprosjekt.tsx";
import StrikkeprosjektForm from "../components/StrikkeprosjektForm.tsx";
import {Box, Heading} from "@navikt/ds-react";
import {useSession} from "../context/SessionContext.tsx";

type Reaction = {
    emoji: string;
    user_id: string;
};

type Prosjekt = {
    id: number;
    user_id?: string;
    tittel?: string;
    bilde?: string;
    reactions?: Reaction[]; // <-- reactions is optional array of Reaction
};

export default function Strikkeprosjekter() {
    const session = useSession();
    const [mineProsjekter, setMineProsjekter] = useState<Prosjekt[]>([]);
    const [andreProsjekter, setAndreProsjekter] = useState<Prosjekt[]>([]);

    if (!session) return; // do nothing if session is null
    const userId = session.user.id;

    useEffect(() => {
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
    }, [session]);

    return (
        <div className="max-w-2xl mx-auto">
            <Box className="py-6">
                <Heading level="2" size="medium">Mine prosjekter</Heading>
                <div className="flex flex-col gap-4">
                    {mineProsjekter.map(prosjekt => (
                        <Strikkeprosjekt key={prosjekt.id} id={prosjekt.id} tittel={prosjekt.tittel} img={prosjekt.bilde} reactions={prosjekt.reactions} />
                    ))}
                </div>
            </Box>
            <StrikkeprosjektForm />
            <Box className="py-6">
                <Heading level="2" size="medium">Bli inspirert av andre</Heading>
                <div className="flex flex-col gap-4">
                    {andreProsjekter.map(prosjekt => (
                        <Strikkeprosjekt key={prosjekt.id} id={prosjekt.id} tittel={prosjekt.tittel}
                                         img={prosjekt.bilde} reactions={prosjekt.reactions}/>
                    ))}
                </div>
            </Box>
        </div>
);
}