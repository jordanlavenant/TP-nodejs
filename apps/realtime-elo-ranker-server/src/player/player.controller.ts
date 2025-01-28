import { Controller, Get, HttpCode, Post, Body } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from '../entities/player.entity';


@Controller('api')
export class PlayerController {
  constructor(private readonly appService: PlayerService) {}

  // TODO: delete this useless endpoint
  @Get('players')
  @HttpCode(200)
  async findAll(): Promise<Player[]> {
    return this.appService.findAll();
  }

  @Post('player')
  @HttpCode(200)
  async create(@Body() player: Player): Promise<Player> {
    return this.appService.create(player);
  }
}
