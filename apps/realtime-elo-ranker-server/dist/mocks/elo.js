"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRank = exports.probability = void 0;
const elo_1 = require("../constants/elo");
const probability = (rating1, rating2) => {
    const winrate = 1 / (1 + Math.pow(10, (rating2 - rating1) / 400));
    const loserate = 1 - winrate;
    return { winrate, loserate };
};
exports.probability = probability;
const updateRank = (props) => {
    console.log('Old ranks:', props);
    const { winner, loser } = props;
    const { winrate, loserate } = (0, exports.probability)(winner.rank, loser.rank);
    const newWinnerRank = Math.round(winner.rank + elo_1.PONDERATION * (1 - winrate));
    const newLoserRank = Math.round(loser.rank + elo_1.PONDERATION * (0 - (1 - loserate)));
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
exports.updateRank = updateRank;
//# sourceMappingURL=elo.js.map