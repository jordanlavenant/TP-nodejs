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

// ? how to get this value?
const WIN_PROBABILITY = 0.76;

export const updateRank = (props: UpdateRankProps) => {
  const { winner, loser } = props;
  const newWinnerRank = Math.round(
    winner.rank + PONDERATION * (1 - WIN_PROBABILITY),
  );
  const newLoserRank = Math.round(
    loser.rank + PONDERATION * (0 - (1 - WIN_PROBABILITY)),
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
