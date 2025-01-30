import { Player } from '../../entities/player.entity';
import { Repository } from 'typeorm';
export declare class PlayerService {
    private readonly players;
    constructor(players: Repository<Player>);
    findOne(id: string): Promise<Player | null>;
    playerExists(id: string): Promise<boolean>;
    findAll(): Promise<Player[]>;
    create(player: Player): Promise<Player>;
}
