import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from '../../entities/match.entity';
import { Player } from '../../entities/player.entity';
import { Repository } from 'typeorm';
import { updateRank } from '../../utils/elo';
import { RankingEvent } from '@rankingevents/ranking.event';

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

  create(match: Match): Promise<Match> {
    return this.matches.save(match);
  }

  async updateElo(winner: string, loser: string, draw: boolean): Promise<void> {
    const winnerDB = await this.players.findOne({ where: { id: winner } });
    const loserDB = await this.players.findOne({ where: { id: loser } });

    if (!winnerDB || !loserDB) return;

    const { winnerPlayer, loserPlayer } = updateRank(winnerDB, loserDB, draw);

    await this.players.save(winnerPlayer);
    await this.players.save(loserPlayer);

    this.eventEmitter.emit(
      'rankingEvent',
      new RankingEvent('RankingEvent', winnerPlayer),
    );
    this.eventEmitter.emit(
      'rankingEvent',
      new RankingEvent('RankingEvent', loserPlayer),
    );
  }
}
