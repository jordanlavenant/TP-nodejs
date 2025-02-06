import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from '../../entities/match.entity';
import { Player } from '../../entities/player.entity';
import { Repository } from 'typeorm';
import { updateRank } from '../../utils/elo';
import { RankingEvent } from '../ranking/events/ranking.event';
import { RANKING_EVENT } from '../../constants/events';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matches: Repository<Match>,

    @InjectRepository(Player)
    private readonly players: Repository<Player>,

    private eventEmitter: EventEmitter2,
  ) {}

  findAll(): Promise<Match[]> {
    return this.matches.find();
  }

  create(match: Match): Promise<Match> {
    return this.save(match);
  }

  async updateElo(winner: string, loser: string, draw: boolean): Promise<void> {
    const winnerDB = await this.players.findOne({ where: { id: winner } });
    const loserDB = await this.players.findOne({ where: { id: loser } });

    if (!winnerDB || !loserDB) return;

    const { winnerPlayer, loserPlayer } = updateRank(winnerDB, loserDB, draw);

    await this.players.save(winnerPlayer).then(() => {
      this.emitPlayerUpdate(winnerPlayer);
    });
    await this.players.save(loserPlayer).then(() => {
      this.emitPlayerUpdate(loserPlayer);
    });
  }

  emitPlayerUpdate(player: Player): void {
    this.eventEmitter.emit(
      RANKING_EVENT,
      new RankingEvent('RankingUpdate', player),
    );
  }

  save(match: Match): Promise<Match> {
    return this.matches.save(match);
  }
}
