import type {RoundCounterType} from "../types.ts";
import {useRoundCounter} from "../hooks/useRoundCounter.ts";
import {BodyShort, Button} from "@navikt/ds-react";


type Props = {
    counter: RoundCounterType;
};

export function RoundCounter({ counter }: Props) {
    const { counter: state, increment, decrement, loading } = useRoundCounter(counter);

    return (
        <div>
            <div>
                <BodyShort size="small" weight="semibold">{state.name}</BodyShort>

                <BodyShort>Hovedrunde: {state.big_round}</BodyShort>

                {state.max_small_round !== null && (
                    <BodyShort>
                        Små runder: {state.small_round} / {state.max_small_round - 1}
                    </BodyShort>
                )}
            </div>

            <div className="flex gap-2">
                <Button
                    onClick={decrement}
                    disabled={loading || state.big_round <= 0}
                    data-color="neutral"
                    className="justify-self-start self-center"
                >
                    {loading ? "Lagrer…" : "-"}
                </Button>
                <Button
                    onClick={increment}
                    disabled={loading}
                    data-color="neutral"
                    className="justify-self-start self-center"
                >
                    {loading ? "Lagrer…" : "+"}
                </Button>
            </div>
        </div>
    );
}
