import { PONDERATION } from 'src/constants/elo';

type UpdateRankProps = {
  winner: {
    id: number;
    rank: number;
  };
  loser: {
    id: number;
    rank: number;
  };
};

export const probability = (rating1: number, rating2: number) => {
  const winrate =  1 / (1 + Math.pow(10, (rating2 - rating1) / 400));
  const loserate = 1 - winrate;
  return { winrate, loserate };
};

export const updateRank = (props: UpdateRankProps) => {
  console.log('Old ranks:', props);
  const { winner, loser } = props;
  
  const { winrate, loserate } = probability(winner.rank, loser.rank);

  const newWinnerRank = Math.round(
    winner.rank + PONDERATION * (1 - winrate),
  );
  const newLoserRank = Math.round(
    loser.rank + PONDERATION * (0 - (1 - loserate)),
  );
  const result = {
    winner: {
      id: winner.id,
      rank: newWinnerRank,
    },
    loser: {
      id: loser.id,
      rank: newLoserRank,
    },
  };
  console.log('New ranks:', result);
  return result;
};
