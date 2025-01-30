import { Controller, Get, Res } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Player } from 'src/entities/player.entity';
import { Response } from 'express';
import { Error } from 'src/types/type';

@Controller('api')
export class RankingController {
  constructor(private readonly appService: RankingService) {}

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
  async findAllEvents(): Promise<void> {
    // TODO
  }
}
