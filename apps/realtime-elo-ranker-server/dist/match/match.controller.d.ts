import { Match } from 'src/entities/match.entity';
import { MatchService } from './match.service';
export declare class MatchController {
    private readonly appService;
    constructor(appService: MatchService);
    findAll(): Promise<Match[]>;
    create(match: Match): Promise<Match>;
}
