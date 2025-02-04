import { Injectable } from '@nestjs/common';
import { Player } from 'src/entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RankingEvent } from '@rankingevents/ranking.event';
import { RANKING_EVENT } from '@constantsevents';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly players: Repository<Player>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  findOne(id: string): Promise<Player | null> {
    return this.players.findOne({ where: { id } });
  }

  playerExists(id: string): Promise<boolean> {
    return this.findOne(id).then((player) => !!player);
  }

  findAll(): Promise<Player[]> {
    return this.players.find();
  }

  create(player: Player): Promise<Player> {
    return this.findAll().then((players) => {
      if (players.length === 0) {
        this.eventEmitter.emit(
          RANKING_EVENT,
          new RankingEvent('RankingUpdate', player),
        );
        return this.save(player);
      } else {
        const avgRank =
          players.reduce((acc, player) => acc + player.rank, 0) /
          players.length;
        player.rank = avgRank;

        this.eventEmitter.emit(
          RANKING_EVENT,
          new RankingEvent('RankingUpdate', player),
        );
        return this.save(player);
      }
    });
  }

  save(player: Player): Promise<Player> {
    return this.players.save(player);
  }
}
