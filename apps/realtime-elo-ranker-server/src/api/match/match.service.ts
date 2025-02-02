import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from '../../entities/match.entity';
import { Player } from '../../entities/player.entity';
import { Repository } from 'typeorm';
import { RankingUpdateEvent } from '../ranking/events/ranking-update.event';
import { updateRank } from '../../utils/elo';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matches: Repository<Match>,

    @InjectRepository(Player)
    private readonly players: Repository<Player>,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  findAll(): Promise<Match[]> {
    return this.matches.find();
  }

  findOnePlayer(id: string): Promise<Player | null> {
    return this.players.findOne({ where: { id } });
  }

  create(match: Match): Promise<Match> {
    return this.matches.save(match);
  }

  async updateElo(winner: string, loser: string, draw: boolean): Promise<void> {
    const winnerDB = await this.players.findOne({ where: { id: winner } });
    const loserDB = await this.players.findOne({ where: { id: loser } });

    if (!winnerDB || !loserDB) return;

    const { winnerPlayer, loserPlayer } = updateRank(winnerDB, loserDB, draw);

    this.eventEmitter.emit(
      'ranking.updated',
      new RankingUpdateEvent(winnerPlayer),
    );
    this.eventEmitter.emit(
      'ranking.updated',
      new RankingUpdateEvent(loserPlayer),
    );
  }
}
