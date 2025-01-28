import { RankingService } from './ranking.service';
import { Player } from 'src/entities/player.entity';
export declare class RankingController {
    private readonly appService;
    constructor(appService: RankingService);
    findAll(): Promise<Player[]>;
}
