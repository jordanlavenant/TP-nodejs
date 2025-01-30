import { PlayerService } from './player.service';
import { Player } from 'src/entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Request, Response } from 'express';
type Error = {
    code: number;
    message: string;
};
export declare class PlayerController {
    private readonly appService;
    private readonly eventEmitter;
    constructor(appService: PlayerService, eventEmitter: EventEmitter2);
    create(player: Player, req: Request, res: Response): Promise<Response<Player | Error>>;
}
export {};
