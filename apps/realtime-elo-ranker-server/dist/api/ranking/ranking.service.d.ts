import { Player } from '../../entities/player.entity';
import { Repository } from 'typeorm';
export declare class RankingService {
    private readonly players;
    constructor(players: Repository<Player>);
    findAll(): Promise<Player[]>;
}
