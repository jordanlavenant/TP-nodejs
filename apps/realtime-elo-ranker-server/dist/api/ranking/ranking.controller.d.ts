import { RankingService } from './ranking.service';
import { Player } from '../../entities/player.entity';
import { Response } from 'express';
import { Error } from 'src/types/types';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
import { PlayerService } from '@player/player.service';
export declare class RankingController {
    private readonly appService;
    private readonly playerService;
    private eventEmitter;
    constructor(appService: RankingService, playerService: PlayerService, eventEmitter: EventEmitter2);
    findAll(res: Response): Promise<Response<Player[] | Error>>;
    subscribeToEvents(): Observable<MessageEvent>;
}
