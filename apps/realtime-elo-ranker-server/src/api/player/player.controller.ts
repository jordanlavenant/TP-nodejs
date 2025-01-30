import { Controller, HttpCode, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from 'src/entities/player.entity';


@Controller('api')
export class PlayerController {
  constructor(private readonly appService: PlayerService) {}

  @Post('player')
  @HttpCode(200)
  async create(@Body() player: Player): Promise<Player> {
    if (!player.id) {
      throw new HttpException(
        {
          code: 0,
          message : "L'identifiant du joueur n'est pas valide"
        },
        HttpStatus.BAD_REQUEST
      )
    }
    const findPlayer = await this.appService.findOne(player.id)
    if (findPlayer) {
      throw new HttpException(
        {
          code: 0,
          message: "Le joueur existe déjà"
        },
        HttpStatus.CONFLICT
      )
    }
    return this.appService.create(player);
  }
}
