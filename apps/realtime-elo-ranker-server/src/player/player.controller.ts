import { Controller, Get, HttpCode, Post } from '@nestjs/common';

@Controller('player')
export class PlayerController {

  @Get()
  @HttpCode(200)
  findAll(): string {
    return 'This action returns all players';
  }

  @Post()
  @HttpCode(204)
  create(): string {
    return 'This action adds a new player';
  }
}
