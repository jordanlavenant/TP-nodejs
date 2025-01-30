import { PlayerService } from './player.service';
import { Player } from 'src/entities/player.entity';
export declare class PlayerController {
    private readonly appService;
    constructor(appService: PlayerService);
    create(player: Player): Promise<Player>;
}
