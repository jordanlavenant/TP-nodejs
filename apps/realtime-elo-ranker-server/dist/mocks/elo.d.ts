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
