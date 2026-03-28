import { useState } from "react";
import type {RoundCounterType} from "../types.ts";
import {supabase} from "../lib/supabase.ts";

export function useRoundCounter(initial: RoundCounterType) {
    const [counter, setCounter] = useState(initial);
    const [loading, setLoading] = useState(false);

    const increment = async () => {
        setLoading(true);

        const { error } = await supabase.rpc("increment_round", {
            counter_id: counter.id,
        });

        if (!error) {
            const { data } = await supabase
                .from("round_counters")
                .select("*")
                .eq("id", counter.id)
                .single();
            if (data) setCounter(data);
        }

        setLoading(false);
    };

    const decrement = async () => {
        setLoading(true);

        const { error } = await supabase.rpc("decrement_round", {
            counter_id: counter.id,
        });

        if (!error) {
            const { data } = await supabase
                .from("round_counters")
                .select("*")
                .eq("id", counter.id)
                .single();
            if (data) setCounter(data);
        }

        setLoading(false);
    };

    return { counter, increment, decrement, loading };
}

