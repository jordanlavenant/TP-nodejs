import { Controller, Get, Res } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Player } from 'src/entities/player.entity';
import { Response } from 'express';
import { Error } from 'src/types/type';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('api')
export class RankingController {
  constructor(
    private readonly appService: RankingService,
    private eventEmitter: EventEmitter2
  ) {}

  // TODO: retirer la promesse (async await)
  @Get('ranking')
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
  
  @Get('ranking/events')
  async subscribeToRankingUpdates(@Res() res: Response) {
    console.log('ranking/events')
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const onRankingUpdate = (data: any) => { // ! temp
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    this.eventEmitter.on('ranking.updated', onRankingUpdate);

    res.on('close', () => {
      this.eventEmitter.off('ranking.updated', onRankingUpdate);
      res.end();
    });
  }
}
