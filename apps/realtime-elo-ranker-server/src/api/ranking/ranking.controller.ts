import { Controller, Get, HttpCode } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Player } from 'src/entities/player.entity';

@Controller('api')
export class RankingController {
  constructor(private readonly appService: RankingService) {}
  
  @Get('ranking')
  @HttpCode(200)
  async findAll(): Promise<Player[]> {
    return this.appService.findAll();
  }
}
