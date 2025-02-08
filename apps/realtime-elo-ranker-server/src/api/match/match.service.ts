import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from '../../entities/match.entity';
import { Player } from '../../entities/player.entity';
import { Repository } from 'typeorm';
import { RankingEvent } from '../ranking/events/ranking.event';
import { RANKING_EVENT } from '../../constants/events';
import { PONDERATION } from '../../constants/elo';

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

  computeProbability = (rating1: number, rating2: number) => {
    const winrate = 1 / (1 + Math.pow(10, (rating2 - rating1) / 400));
    const loserate = 1 - winrate;
    return { winrate, loserate };
  };
  
  computeRank = (winner: Player, loser: Player, draw: boolean) => {
    const { winrate, loserate } = this.computeProbability(winner.rank, loser.rank);
  
    const newWinnerRank = winner.rank + PONDERATION * ((draw ? 0.5 : 1) - winrate);
    const newLoserRank = loser.rank + PONDERATION * ((draw ? 0.5 : 0) - loserate);
  
    return {
      winnerPlayer: {
        id: winner.id,
        rank: Math.round(newWinnerRank),
      },
      loserPlayer: {
        id: loser.id,
        rank: Math.round(newLoserRank),
      },
    };
  };
  

  async updateRank(winner: string, loser: string, draw: boolean): Promise<{winner: Player, loser: Player} | void> {
    const winnerDB = await this.players.findOne({ where: { id: winner } });
    const loserDB = await this.players.findOne({ where: { id: loser } });

    if (!winnerDB || !loserDB) return;

    const { winnerPlayer, loserPlayer } = this.computeRank(winnerDB, loserDB, draw);

    await this.players.save(winnerPlayer).then(() => {
      this.emitPlayerUpdate(winnerPlayer);
    });
    await this.players.save(loserPlayer).then(() => {
      this.emitPlayerUpdate(loserPlayer);
    });

    return { winner: winnerPlayer, loser: loserPlayer };
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
