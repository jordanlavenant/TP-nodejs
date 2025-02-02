import { RankingService } from './ranking.service';
import { Player } from '../../entities/player.entity';
import { Response } from 'express';
import { Error } from 'src/types/types';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RankingUpdateEvent } from './events/ranking-update.event';
export declare class RankingController {
    private readonly appService;
    private eventEmitter;
    constructor(appService: RankingService, eventEmitter: EventEmitter2);
    findAll(res: Response): Promise<Response<Player[] | Error>>;
    getEvents(res: Response): void;
    onRankingUpdate(event: RankingUpdateEvent): void;
}
