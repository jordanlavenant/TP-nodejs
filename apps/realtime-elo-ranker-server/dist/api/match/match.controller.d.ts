import { Match } from 'src/entities/match.entity';
import { MatchService } from './match.service';
import { Response } from 'express';
import { Error } from 'src/types/type';
import { CreateMatchDto } from './dto/create-match.dto';
export declare class MatchController {
    private readonly appService;
    constructor(appService: MatchService);
    create(createMatchDto: CreateMatchDto, res: Response): Response<Match | Error>;
}
