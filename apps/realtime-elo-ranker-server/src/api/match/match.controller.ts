import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Match } from 'src/entities/match.entity';
import { MatchService } from './match.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RankingUpdateEvent } from 'src/events/ranking.event';
import { Request, Response } from 'express';
import { Error } from 'src/types/type';

@Controller('api')
export class MatchController {  
  constructor(
    private readonly appService: MatchService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  // TODO: utiliser le Request
  @Post('match')
  @HttpCode(200)
  create(@Body() match: Match, @Req() req: Request, @Res() res: Response): Response<Match | Error> {
    if (!match.winner || !match.loser) {
      return res.status(422).send({
        code: 0,
        message: "Soit le gagnant, soit le perdant indiqué n'existe pas"
      });
    }
    this.eventEmitter.emit(
      'ranking.update',
      new RankingUpdateEvent(match.winner, match.loser)
    );
    this.appService.create(match);
    return res.status(200).send(match);
  }
}
