"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRank = void 0;
const elo_1 = require("../constants/elo");
const WIN_PROBABILITY = 0.76;
const updateRank = (props) => {
    const { winner, loser } = props;
    const newWinnerRank = Math.round(winner.rank + elo_1.PONDERATION * (1 - WIN_PROBABILITY));
    const newLoserRank = Math.round(loser.rank + elo_1.PONDERATION * (0 - (1 - WIN_PROBABILITY)));
    console.log({
        winner: {
            id: winner.id,
            rank: newWinnerRank,
        },
        loser: {
            id: loser.id,
            rank: newLoserRank,
        },
    });
};
exports.updateRank = updateRank;
//# sourceMappingURL=elo.js.map