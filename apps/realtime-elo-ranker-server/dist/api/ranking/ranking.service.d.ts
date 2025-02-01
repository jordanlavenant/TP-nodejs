import { EventEmitter2 } from '@nestjs/event-emitter';
import { Player } from 'src/entities/player.entity';
import { Repository } from 'typeorm';
import { RankingUpdateEvent } from './events/ranking-update.event';
export declare class RankingService {
    private readonly players;
    private eventEmitter;
    constructor(players: Repository<Player>, eventEmitter: EventEmitter2);
    findAll(): Promise<Player[]>;
    updateRanking(event: RankingUpdateEvent): void;
}
