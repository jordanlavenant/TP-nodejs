import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Match } from 'src/entities/match.entity';
import { MatchService } from './match.service';

@Controller('api')
export class MatchController {  
  constructor(private readonly appService: MatchService) {}

  // TODO: delete this useless endpoint
  @Get('matches')
  @HttpCode(200)
  async findAll(): Promise<Match[]> {
    return this.appService.findAll();
  }

  @Post('match')
  @HttpCode(200)
  async create(@Body() match: Match): Promise<Match> {
    if (!match.winner || !match.loser) {
      throw new HttpException(
        {
          code: 0,
          message: "Soit le gagnant, soit le perdant indiqué n'existe pas"
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }
    return this.appService.create(match);
  }
}
