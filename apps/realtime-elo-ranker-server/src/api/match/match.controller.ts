import { Body, Controller, Post, Res } from '@nestjs/common';
import { Match } from 'src/entities/match.entity';
import { MatchService } from './match.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Response } from 'express';
import { Error } from 'src/types/type';
import { CreateMatchDto } from './dto/create-match.dto';
import { Player } from 'src/entities/player.entity';
import { RankingUpdateEvent } from '../ranking/events/ranking-update.event';

@Controller('api/match')
export class MatchController {
  constructor(
    private readonly appService: MatchService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Post()
  create(
    @Body() createMatchDto: CreateMatchDto,
    @Res() res: Response,
  ): Response<Match | Error> {

    const { winner, loser, draw } = createMatchDto

    if (!winner || !loser) {
      return res.status(422).send({
        code: 0,
        message: "Soit le gagnant, soit le perdant indiqué n'existe pas",
      }) as Response<Error>;
    }

    void this.appService.create(createMatchDto);

    // ! temp
    const winnerPlayer: Player = new Player()
    const loserPlayer: Player = new Player()

    this.eventEmitter.emit(
      'ranking.updated',
      new RankingUpdateEvent(
        winnerPlayer,
      )
    );
    this.eventEmitter.emit(
      'ranking.updated',
      new RankingUpdateEvent(
        loserPlayer,
      )
    );

    return res.status(200).send(createMatchDto) as Response<Match>;
  }
}
