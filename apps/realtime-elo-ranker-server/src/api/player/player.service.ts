import { Injectable } from '@nestjs/common';
import { Player } from 'src/entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RankingEvent } from '@ranking/events/ranking.event';
import { RANKING_EVENT } from '@constants/events';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly players: Repository<Player>,
    private eventEmitter: EventEmitter2,
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
        this.emitPlayerUpdate(player);

        return this.save(player);
      } else {
        const avgRank =
          players.reduce((acc, player) => acc + player.rank, 0) /
          players.length;
        player.rank = Math.round(avgRank);

        this.emitPlayerUpdate(player);

        return this.save(player);
      }
    });
  }

  emitPlayerUpdate(player: Player): void {
    this.eventEmitter.emit(
      RANKING_EVENT,
      new RankingEvent('RankingUpdate', player),
    );
  }

  save(player: Player): Promise<Player> {
    return this.players.save(player);
  }
}
