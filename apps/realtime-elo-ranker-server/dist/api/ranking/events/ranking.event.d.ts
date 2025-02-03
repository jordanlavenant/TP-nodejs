import { Player } from '@entities/player.entity';
export declare class RankingEvent {
    readonly type: string;
    readonly player: Player;
    constructor(type: string, player: Player);
}
