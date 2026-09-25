export type Reaction = {
    emoji: string;
    user_id: string;
};

export type Prosjekt = {
    id: number;
    user_id?: string;
    tittel?: string;
    bilde?: string;
    reactions?: Reaction[];
    beskrivelse?: string;
    status: Status;
};

export const ProsjektStatus = {
    IKKE_STARTET: "Ikke startet",
    PAAGAAENDE: "Pågående",
    FERDIG: "Ferdig",
} as const;

export type ProsjektStatusKey = keyof typeof ProsjektStatus;
export type ProsjektStatusValue = (typeof ProsjektStatus)[ProsjektStatusKey];
export type Status = ProsjektStatusKey | ProsjektStatusValue;

export type RoundCounterType = {
    id: number;
    strikkeprosjekt_id: number;
    name: string;

    big_round: number;

    small_round: number;
    max_small_round: number | null;

    updated_at: string;
};