import { PlayerService } from './player.service';
import { Player } from 'src/entities/player.entity';
import { Response } from 'express';
import { Error } from 'src/types/types';
import { CreatePlayerDto } from './dto/create-player.dto';
export declare class PlayerController {
    private readonly appService;
    constructor(appService: PlayerService);
    create(createPlayerDto: CreatePlayerDto, res: Response): Promise<Response<Player | Error>>;
}
