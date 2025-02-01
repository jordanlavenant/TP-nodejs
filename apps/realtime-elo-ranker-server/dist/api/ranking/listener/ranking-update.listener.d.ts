import { RankingService } from '../ranking.service';
import { RankingUpdateEvent } from '../events/ranking-update.event';
export declare class RankingUpdateListener {
    private readonly rankingService;
    constructor(rankingService: RankingService);
    handleRankingUpdated(event: RankingUpdateEvent): void;
}
