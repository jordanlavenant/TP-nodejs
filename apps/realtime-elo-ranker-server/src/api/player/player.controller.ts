import { Controller, Post, Body, Res } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from '../../entities/player.entity';
import { Response } from 'express';
import { Error } from '../../types/types';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('api/player')
export class PlayerController {
  constructor(private readonly appService: PlayerService) {}

  // TODO: retirer la promesse (async await)
  @Post()
  async create(
    @Body() createPlayerDto: CreatePlayerDto,
    @Res() res: Response,
  ): Promise<Response<Player | Error>> {
    if (!createPlayerDto.id) {
      return res.status(400).send({
        code: 0,
        message: "L'id du joueur est obligatoire",
      });
    }

    const alreadyExist = await this.appService.playerExists(createPlayerDto.id);

    if (alreadyExist) {
      return res.status(409).send({
        code: 0,
        message: 'Le joueur existe déjà',
      }) as Response<Error>;
    }

    await this.appService.create(createPlayerDto);

    return res.status(201).send(createPlayerDto) as Response<Player>;
  }
}
