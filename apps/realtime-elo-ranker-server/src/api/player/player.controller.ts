import { Controller, Post, Body, Res, Sse } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from 'src/entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PlayerCreatedEvent } from 'src/api/player/events/player-created.event';
import { Response } from 'express';
import { Error } from 'src/types/type';
import { CreatePlayerDto } from './dto/create-player.dto';
import { interval, map, Observable } from 'rxjs';

@Controller('api')
export class PlayerController {
  constructor(
    private readonly appService: PlayerService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  // TODO: retirer la promesse (async await)
  @Post('player')
  async create(
    @Body() createPlayerDto: CreatePlayerDto,
    @Res() res: Response,
  ): Promise<Response<Player | Error>> {
    if (!createPlayerDto.id) {
      return res.status(400).send({
        code: 0,
        message: "L'id du joueur est obligatoire",
      });
    }
    const alreadyExist = await this.appService.playerExists(createPlayerDto.id);
    if (alreadyExist) {
      return res.status(409).send({
        code: 0,
        message: 'Le joueur existe déjà',
      }) as Response<Error>;
    }
    this.eventEmitter.emit(
      'player.create',
      new PlayerCreatedEvent(createPlayerDto.id, createPlayerDto.rank),
    );
    await this.appService.create(createPlayerDto);
    return res.status(201).send(createPlayerDto) as Response<Player>;
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: { hello: 'world' } }) as MessageEvent),
    );
  }
}
