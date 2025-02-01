import { Body, Controller, Post, Res } from '@nestjs/common';
import { Match } from 'src/entities/match.entity';
import { MatchService } from './match.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RankingUpdateEvent } from 'src/api/ranking/events/ranking-update.event';
import { Response } from 'express';
import { Error } from 'src/types/type';
import { CreateMatchDto } from './dto/create-match.dto';
import { MatchCreatedEvent } from './events/match-created.event';
import { Player } from 'src/entities/player.entity';

@Controller('api')
export class MatchController {
  constructor(
    private readonly appService: MatchService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Post('match')
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
      'match.created',
      new MatchCreatedEvent(
        winnerPlayer,
        loserPlayer,
        draw
      ),
    );
    return res.status(200).send(createMatchDto) as Response<Match>;
  }
}
