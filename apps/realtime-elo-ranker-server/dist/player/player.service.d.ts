import { Player } from '../entities/player.entity';
import { Repository } from 'typeorm';
export declare class PlayerService {
    private readonly players;
    constructor(players: Repository<Player>);
    findAll(): Promise<Player[]>;
    create(player: Player): Promise<Player>;
}
