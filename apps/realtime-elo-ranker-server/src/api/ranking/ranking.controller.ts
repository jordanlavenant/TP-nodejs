import { Controller, Get, Header, Res } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Player } from '../../entities/player.entity';
import { Response } from 'express';
import { Error } from 'src/types/types';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ResponsePlayerDto } from '@player/dto/response-player.dto';
import { RankingUpdateEvent } from './events/ranking-update.event';
import { RankingErrorEvent } from './events/ranking-error.event';

@Controller('api/ranking')
export class RankingController {
  constructor(
    private readonly appService: RankingService,
    private eventEmitter: EventEmitter2,
  ) {}

  // TODO: retirer la promesse (async await)
  @Get()
  async findAll(@Res() res: Response): Promise<Response<Player[] | Error>> {
    const players = await this.appService.findAll();
    if (players.length === 0) {
      return res.status(404).send({
        code: 0,
        message: "Le classement n'est pas disponible car aucun joueur n'existe",
      }) as Response<Error>;
    }
    return res.status(200).send(players) as Response<Player[]>;
  }

  @Get('events')
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache')
  @Header('Connection', 'keep-alive')
  getEvents(@Res() res: Response) {
    console.log('Connection opened');

    const listener = (player: ResponsePlayerDto) => {
      console.log('Ranking update event received:', player);
      const event: RankingUpdateEvent = {
        type: 'RankingUpdate',
        player: player as Player,
      };
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    };

    const errorListener = () => {
      console.log('Ranking error event received');
      const event: RankingErrorEvent = {
        type: 'Error',
        code: 1,
        message: 'Erreur lors de la récupération des données',
      };
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    };

    this.eventEmitter.on('ranking.updated', listener);
    this.eventEmitter.on('ranking.error', errorListener);

    res.on('close', () => {
      console.log('Connection closed');
      this.eventEmitter.off('ranking.updated', listener);
      this.eventEmitter.off('ranking.error', errorListener);
      res.end();
    });
  }

  @OnEvent('ranking.updated')
  onRankingUpdate(event: RankingUpdateEvent) {
    console.log('Ranking update event received:', event);
  }
}
