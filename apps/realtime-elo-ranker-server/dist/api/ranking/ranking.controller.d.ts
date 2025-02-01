import { RankingService } from './ranking.service';
import { Player } from 'src/entities/player.entity';
import { Response } from 'express';
import { Error } from 'src/types/type';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class RankingController {
    private readonly appService;
    private eventEmitter;
    constructor(appService: RankingService, eventEmitter: EventEmitter2);
    findAll(res: Response): Promise<Response<Player[] | Error>>;
    subscribeToRankingUpdates(res: Response): Promise<void>;
}
