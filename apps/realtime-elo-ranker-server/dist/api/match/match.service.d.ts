import { Match } from 'src/entities/match.entity';
import { Repository } from 'typeorm';
export declare class MatchService {
    private readonly matches;
    constructor(matches: Repository<Match>);
    findAll(): Promise<Match[]>;
    create(match: Match): Promise<Match>;
}
