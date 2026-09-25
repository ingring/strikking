import {BodyShort, Box, Heading} from "@navikt/ds-react";
import {supabase} from "../lib/supabase.ts";
import {useSession} from "../context/SessionContext.tsx";
import {useEffect, useState} from "react";
import {RoundCounter} from "./RoundCounter.tsx";
import {type Reaction, type RoundCounterType} from "../types.ts";
import {TrePrikker} from "./TrePrikker.tsx";
import {Status} from "./Status.tsx";
import type { Session } from "@supabase/supabase-js";

interface Props {
    id: number;
    tittel?: string;
    img?: string;
    description?: string;
    reactions?: Reaction[];
    status: string;
}

export default function Strikkeprosjekt({id, tittel, img, description, reactions, status}: Props) {
    const session = useSession();
    const [localReactions, setLocalReactions] = useState<Reaction[]>(reactions || []);
    const [counters, setCounters] = useState<RoundCounterType[]>([]);

    useEffect(() => {
        if (!session) return;

        const fetchReactions = async () => {
            const { data, error } = await supabase
                .from("project_reactions")
                .select("*")
                .eq("project_id", id);

            if (error) console.error(error);
            else setLocalReactions(data || []);
        };

        fetchReactions();

        const fetchCounts = async () => {
            const {data, error} = await supabase
                .from("round_counters")
                .select("*")
                .eq("strikkeprosjekt_id", id);

            if (error) {
                console.error("Kunne ikke hente tellere:", error.message);
                return;
            }

            if (data) {
                setCounters(data);
            }
        }

        fetchCounts();
    }, [id, session]);



    const addReaction = async (projectId: number, emoji: string, session: Session) => {
        if (!session) return;

        const {error, data} = await supabase
            .from("project_reactions")
            .insert([{project_id: projectId, emoji, user_id: session.user.id}])
            .select();

        if (error) console.error(error);
        else if (data) setLocalReactions([...localReactions, ...data]);
    };

    return (
        <>
            <Box className="flex flex-col gap-2 bg-gray-50 border border-gray-900 rounded p-2">
                <div className="flex justify-between items-start">
                    <div>
                    {img && <img src={img} alt={tittel ?? "Strikkeprosjekt"} className="max-w-50 pb-4"/>}
                    <Heading size="small">{tittel}</Heading>
                    </div>
                <TrePrikker strikkeprosjektId={id} />
                </div>
                <BodyShort size="small">
                        {description}
                </BodyShort>
                {counters?.map(counter => (
                    <RoundCounter key={counter.id} counter={counter} />
                ))}
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Status status={status} />
                </div>
                {session && (
                <div className="flex gap-2">
                    {["🤩", "😍️", "🎉", "🫶🏻"].map(emoji => {
                        const count = localReactions.filter(r => r.emoji === emoji).length;
                        const hasReacted = localReactions.some(
                            r => r.user_id === session.user.id && r.emoji === emoji
                        );
                        return (
                            <button
                                key={emoji}
                                disabled={hasReacted}
                                onClick={() => addReaction(id, emoji, session)}
                            >
                                {emoji} {count}
                            </button>
                        );
                    })}
                </div>
                    )}
            </div>
            </Box>
        </>
    )
}



