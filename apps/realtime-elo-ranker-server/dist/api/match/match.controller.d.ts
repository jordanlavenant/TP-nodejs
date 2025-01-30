import { Match } from 'src/entities/match.entity';
import { MatchService } from './match.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class MatchController {
    private readonly appService;
    private readonly eventEmitter;
    constructor(appService: MatchService, eventEmitter: EventEmitter2);
    create(match: Match): void;
}
