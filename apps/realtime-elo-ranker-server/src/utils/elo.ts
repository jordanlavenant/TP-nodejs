import { PONDERATION } from '../constants/elo';
import { Player } from '../entities/player.entity';

export const probability = (rating1: number, rating2: number) => {
  const winrate = 1 / (1 + Math.pow(10, (rating2 - rating1) / 400));
  const loserate = 1 - winrate;
  return { winrate, loserate };
};

export const updateRank = (winner: Player, loser: Player, draw: boolean) => {
  const { winrate, loserate } = probability(winner.rank, loser.rank);

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
