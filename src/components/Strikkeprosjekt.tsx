import {BodyShort, Box, Heading, Tag} from "@navikt/ds-react";
import {supabase} from "../lib/supabase.ts";
import {useSession} from "../context/SessionContext.tsx";
import {useEffect, useState} from "react";

type Reaction = {
    emoji: string;
    user_id: string;
};

interface Props {
    id: number;
    tittel?: string;
    img?: string;
    description?: string;
    reactions?: Reaction[];
}

export default function Strikkeprosjekt({id, tittel, img, description, reactions}: Props) {
    const session = useSession();
    const [localReactions, setLocalReactions] = useState<Reaction[]>(reactions || []);

    if (!session) return; // do nothing if session is null

    useEffect(() => {
        const fetchReactions = async () => {
            const { data, error } = await supabase
                .from("project_reactions")
                .select("*")
                .eq("project_id", id);

            if (error) console.error(error);
            else setLocalReactions(data || []);
        };

        fetchReactions();
    }, [id]);


    const addReaction = async (projectId: number, emoji: string, session: any) => {
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
                {img && <img src={img} className="max-w-[200px]"/>}
                <Heading size="small">{tittel}</Heading>
                <BodyShort size="small">
                        {description}
                </BodyShort>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Tag size="small" variant="outline">
                        Ferdig
                    </Tag>
                </div>
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
            </div>
            </Box>
        </>
    )
}



