import { RankingService } from './ranking.service';
import { Player } from '../../entities/player.entity';
import { Response } from 'express';
import { Error } from 'src/types/types';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
export declare class RankingController {
    private readonly appService;
    private eventEmitter;
    constructor(appService: RankingService, eventEmitter: EventEmitter2);
    findAll(res: Response): Promise<Response<Player[] | Error>>;
    sse(): Observable<MessageEvent>;
}
