export type Strikkeprosjekt = {
    id: number;
    name: string;
    created_at: string;
};

export type RoundCounterType = {
    id: number;
    strikkeprosjekt_id: number;
    name: string;

    big_round: number;

    small_round: number;
    max_small_round: number | null;

    updated_at: string;
};