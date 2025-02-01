import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/entities/player.entity';
import { EventEmitter } from 'stream';
import { Repository } from 'typeorm';
import { RankingUpdateEvent } from './events/ranking-update.event';

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

  updateRanking(event: RankingUpdateEvent): void {
    console.log(`update ranking with event: ${JSON.stringify(event)}`)
  }
}
