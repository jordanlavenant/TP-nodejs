import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from 'src/entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PlayerCreatedEvent } from 'src/events/player.event';
import { Request, Response } from 'express';
import { Error } from 'src/types/type';

@Controller('api')
export class PlayerController {
  constructor(
    private readonly appService: PlayerService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  // TODO: retirer la promesse (async await)
  // TODO: utiliser le Request
  @Post('player')
  async create(@Body() player: Player, @Req() req: Request, @Res() res: Response): Promise<Response<Player | Error>> {
    if (!player.id) {
      return res.status(400).send({
        code: 0,
        message: "L'id du joueur est obligatoire"
      });
    }
    const alreadyExist = await this.appService.playerExists(player.id)
    if (alreadyExist) {
      return res.status(409).send({
        code: 0,
        message: "Le joueur existe déjà"
      });
    }
    this.eventEmitter.emit(
      'player.create',
      new PlayerCreatedEvent(player.id, player.rank)
    );
    this.appService.create(player);
    return res.status(201).send(player);
  }
}
