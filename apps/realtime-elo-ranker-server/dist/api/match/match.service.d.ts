import { EventEmitter2 } from '@nestjs/event-emitter';
import { Match } from '../../entities/match.entity';
import { Player } from '../../entities/player.entity';
import { Repository } from 'typeorm';
export declare class MatchService {
    private readonly matches;
    private readonly players;
    private readonly eventEmitter;
    constructor(matches: Repository<Match>, players: Repository<Player>, eventEmitter: EventEmitter2);
    findAll(): Promise<Match[]>;
    create(match: Match): Promise<Match>;
    updateElo(winner: string, loser: string, draw: boolean): Promise<void>;
}
