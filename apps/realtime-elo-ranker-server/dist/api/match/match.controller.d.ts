import { Match } from 'src/entities/match.entity';
import { MatchService } from './match.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Response } from 'express';
import { Error } from 'src/types/type';
import { CreateMatchDto } from './dto/create-match.dto';
export declare class MatchController {
    private readonly appService;
    private readonly eventEmitter;
    constructor(appService: MatchService, eventEmitter: EventEmitter2);
    create(createMatchDto: CreateMatchDto, res: Response): Response<Match | Error>;
}
