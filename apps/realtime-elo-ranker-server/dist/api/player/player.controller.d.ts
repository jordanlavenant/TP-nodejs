import { PlayerService } from './player.service';
import { Player } from 'src/entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Response } from 'express';
import { Error } from 'src/types/type';
import { CreatePlayerDto } from './dto/create-player.dto';
export declare class PlayerController {
    private readonly appService;
    private readonly eventEmitter;
    constructor(appService: PlayerService, eventEmitter: EventEmitter2);
    create(createPlayerDto: CreatePlayerDto, res: Response): Promise<Response<Player | Error>>;
}
