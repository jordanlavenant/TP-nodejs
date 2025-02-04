import { Player } from 'src/entities/player.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class PlayerService {
    private readonly players;
    private eventEmitter;
    constructor(players: Repository<Player>, eventEmitter: EventEmitter2);
    findOne(id: string): Promise<Player | null>;
    playerExists(id: string): Promise<boolean>;
    findAll(): Promise<Player[]>;
    create(player: Player): Promise<Player>;
    emitPlayerUpdate(player: Player): void;
    save(player: Player): Promise<Player>;
}
