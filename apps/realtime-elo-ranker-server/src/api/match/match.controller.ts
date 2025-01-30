import { Body, Controller, Post, Res } from '@nestjs/common';
import { Match } from 'src/entities/match.entity';
import { MatchService } from './match.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RankingUpdateEvent } from 'src/events/ranking.event';
import { Response } from 'express';
import { Error } from 'src/types/type';
import { CreateMatchDto } from './dto/create-match.dto';

@Controller('api')
export class MatchController {
  constructor(
    private readonly appService: MatchService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post('match')
  create(
    @Body() createMatchDto: CreateMatchDto,
    @Res() res: Response,
  ): Response<Match | Error> {
    if (!createMatchDto.winner || !createMatchDto.loser) {
      return res.status(422).send({
        code: 0,
        message: "Soit le gagnant, soit le perdant indiqué n'existe pas",
      }) as Response<Error>;
    }
    this.eventEmitter.emit(
      'ranking.update',
      new RankingUpdateEvent(createMatchDto.winner, createMatchDto.loser),
    );
    void this.appService.create(createMatchDto);
    return res.status(200).send(createMatchDto) as Response<Match>;
  }
}
