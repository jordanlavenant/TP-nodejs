import { Controller, Post, Body, Res, Logger } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from '../../entities/player.entity';
import { Response } from 'express';
import { Error } from '../../types/types';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('api/player')
export class PlayerController {
  constructor(private readonly appService: PlayerService) {}

  @Post()
  async create(
    @Body() createPlayerDto: CreatePlayerDto,
    @Res() res: Response,
  ): Promise<Response<Player | Error>> {
    if (!createPlayerDto.id) {
      Logger.error("L'id du joueur est obligatoire");
      return res.status(400).send({
        code: 0,
        message: "L'id du joueur est obligatoire",
      });
    }

    const alreadyExist = await this.appService.playerExists(createPlayerDto.id);

    if (alreadyExist) {
      Logger.error('Le joueur existe déjà');
      return res.status(409).send({
        code: 0,
        message: 'Le joueur existe déjà',
      }) as Response<Error>;
    }

    await this.appService.create(createPlayerDto);

    Logger.log(`Joueur ${createPlayerDto.id} créé avec succès`);
    return res.status(201).send(createPlayerDto) as Response<Player>;
  }
}
