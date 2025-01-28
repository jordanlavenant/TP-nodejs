import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
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
    return this.appService.create(match);
  }
}
