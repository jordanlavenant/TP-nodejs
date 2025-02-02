import { EventEmitter2 } from '@nestjs/event-emitter';
import { Player } from '../../entities/player.entity';
import { Repository } from 'typeorm';
export declare class RankingService {
    private readonly players;
    private eventEmitter;
    constructor(players: Repository<Player>, eventEmitter: EventEmitter2);
    findAll(): Promise<Player[]>;
}
