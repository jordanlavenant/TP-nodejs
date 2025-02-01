type UpdateRankProps = {
    winner: {
        id: number;
        rank: number;
    };
    loser: {
        id: number;
        rank: number;
    };
};
export declare const probability: (rating1: number, rating2: number) => {
    winrate: number;
    loserate: number;
};
export declare const updateRank: (props: UpdateRankProps) => {
    winner: {
        id: number;
        rank: number;
    };
    loser: {
        id: number;
        rank: number;
    };
};
export {};
