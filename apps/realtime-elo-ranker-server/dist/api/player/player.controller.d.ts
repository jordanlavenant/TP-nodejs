import { PlayerService } from './player.service';
import { Player } from '../../entities/player.entity';
export declare class PlayerController {
    private readonly appService;
    constructor(appService: PlayerService);
    findAll(): Promise<Player[]>;
    create(player: Player): Promise<Player>;
}
