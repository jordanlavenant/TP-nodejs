import { Player } from "src/entities/player.entity";
export declare class RankingUpdateEvent {
    readonly type: string;
    readonly player: Player;
    constructor(type: string, player: Player);
}
