import { useState, useRef } from "react";
import {supabase} from "../lib/supabase.ts";
import {BodyShort, Button, Checkbox, Modal, TextField, VStack} from "@navikt/ds-react";
import { PlusMinusSlashIcon } from '@navikt/aksel-icons';

type Props = {
    strikkeprosjektId: number;
};

export function AddCounterForm({ strikkeprosjektId }: Props) {
    const [name, setName] = useState("");
    const [useSmallRounds, setUseSmallRounds] = useState(false);
    const [maxSmallRounds, setMaxSmallRounds] = useState(8);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const ref = useRef<HTMLDialogElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { error } = await supabase.from("round_counters").insert({
            name,
            strikkeprosjekt_id: strikkeprosjektId,
            big_round: 0,
            small_round: 0,
            max_small_round: useSmallRounds ? maxSmallRounds : null,
        });

        setLoading(false);

        if (error) {
            setError("Kunne ikke lagre teller");
            return;
        }

        setName("");
        setUseSmallRounds(false);
        setMaxSmallRounds(8);
    };

    return (
        <>
        <Button data-color="neutral" onClick={() => ref.current?.showModal()} className="justify-self-start self-start">
            <PlusMinusSlashIcon title="a11y-title" fontSize="1.5rem" className="inline mr-2" />
            <BodyShort size="small" className="inline">Legg til ny teller</BodyShort>
        </Button>
        <Modal ref={ref} header={{ heading: "Legg til teller" }}>
            <Modal.Body>
                <form
                    onSubmit={handleSubmit}
                >
                    <VStack gap="space-12">
                        <TextField
                            type="text"
                            label="Navn"
                            size="small"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="F.eks. Bol eller Erme 1"
                        />

                        <Checkbox
                            size="small"
                            checked={useSmallRounds}
                            onChange={(e) => setUseSmallRounds(e.target.checked)}
                        >
                        Bruk små runder
                        </Checkbox>

                        {useSmallRounds && (
                            <TextField
                                type="number"
                                label="Maks små runder per hovedrunde"
                                min={1}
                                value={maxSmallRounds}
                                size="small"
                                onChange={(e) => setMaxSmallRounds(Number(e.target.value))}
                            />
                        )}

                        {error && <BodyShort size="small" >{error}</BodyShort>}

                        <Button
                            type="submit"
                            disabled={loading}
                            data-color="neutral"
                            size="small"
                        >
                            {loading ? "Lagrer…" : "Legg til teller"}
                        </Button>
                    </VStack>
                </form>
            </Modal.Body>
        </Modal>
        </>
    );
}
