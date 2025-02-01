import { Player } from "src/entities/player.entity";
export declare class MatchCreatedEvent {
    readonly winner: Player;
    readonly loser: Player;
    readonly draw: boolean;
    constructor(winner: Player, loser: Player, draw: boolean);
}
