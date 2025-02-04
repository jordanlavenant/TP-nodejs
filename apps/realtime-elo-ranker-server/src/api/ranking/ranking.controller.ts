import { Controller, Get, Res, Sse } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Player } from '../../entities/player.entity';
import { Response } from 'express';
import { Error } from 'src/types/types';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { interval, map, Observable } from 'rxjs';
// import { RANKING_EVENT } from '@constants/events';
import { RankingEvent } from '@rankingevents/ranking.event';
import { PlayerService } from '@player/player.service';

@Controller('api/ranking')
export class RankingController {
  constructor(
    private readonly appService: RankingService,
    private readonly playerService: PlayerService,
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

  @Sse('events')
  subscribeToEvents(): Observable<MessageEvent> {
    return interval(3000).pipe(
      map((_, index) => {
        const player = {
          id: index.toString(),
          rank: index,
        };
        this.playerService.save(player);
        return {
          data: JSON.stringify(new RankingEvent('RankingUpdate', player)),
        } as MessageEvent;
      }),
    );

    // return fromEvent(this.eventEmitter, RANKING_EVENT).pipe(
    // map((payload) => {
    // return { data: JSON.stringify(payload) } as MessageEvent;
    // }),
    // );
  }
}
