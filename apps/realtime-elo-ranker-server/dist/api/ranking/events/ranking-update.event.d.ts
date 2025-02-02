import { Player } from '@entities/player.entity';
import { RankingEvent } from './ranking.event';
export declare class RankingUpdateEvent extends RankingEvent {
    readonly player: Player;
    constructor(player: Player);
}
