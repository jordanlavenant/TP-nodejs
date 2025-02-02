import { Match } from 'src/entities/match.entity';
import { MatchService } from './match.service';
import { Response } from 'express';
import { Error } from 'src/types/types';
import { CreateMatchDto } from './dto/create-match.dto';
import { PlayerService } from 'src/api/player/player.service';
export declare class MatchController {
    private readonly appService;
    private readonly playerService;
    constructor(appService: MatchService, playerService: PlayerService);
    create(createMatchDto: CreateMatchDto, res: Response): Promise<Response<Match | Error>>;
}
