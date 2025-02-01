import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '@entities/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Player)
    private readonly players: Repository<Player>,
    private eventEmitter: EventEmitter2
  ) {}

  findAll(): Promise<Player[]> {
    return this.players.find({
      order: {
        rank: 'DESC',
      },
    });
  }
}
