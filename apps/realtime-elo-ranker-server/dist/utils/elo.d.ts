import { Player } from "src/entities/player.entity";
export declare const probability: (rating1: number, rating2: number) => {
    winrate: number;
    loserate: number;
};
export declare const updateRank: (winner: Player, loser: Player, draw: boolean) => {
    winnerPlayer: {
        id: string;
        rank: number;
    };
    loserPlayer: {
        id: string;
        rank: number;
    };
};
