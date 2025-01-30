import { RankingService } from './ranking.service';
import { Player } from 'src/entities/player.entity';
import { Response } from 'express';
import { Error } from 'src/types/type';
export declare class RankingController {
    private readonly appService;
    constructor(appService: RankingService);
    findAll(res: Response): Promise<Response<Player[] | Error>>;
    findAllEvents(): Promise<void>;
}
