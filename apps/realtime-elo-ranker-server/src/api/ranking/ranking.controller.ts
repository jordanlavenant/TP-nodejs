import { Controller, Get, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Player } from 'src/entities/player.entity';

@Controller('api')
export class RankingController {
  constructor(private readonly appService: RankingService) {}
  
  @Get('ranking')
  @HttpCode(200)
  async findAll(): Promise<Player[]> {
    const players = await this.appService.findAll();
    if (players.length === 0) {
      throw new HttpException(
        {
          code: 0,
          message: "Le classement n'est pas disponible car aucun joueur n'existe"
        },
        HttpStatus.NOT_FOUND
      )
    }
    return players;
  }

  @Get('ranking/events')
  @HttpCode(200)
  async findAllEvents(): Promise<void> {
    console.log('findAllEvents');
  }
}
