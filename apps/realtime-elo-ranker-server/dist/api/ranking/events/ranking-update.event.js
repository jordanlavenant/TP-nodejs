"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingUpdateEvent = void 0;
const ranking_event_1 = require("./ranking.event");
class RankingUpdateEvent extends ranking_event_1.RankingEvent {
    constructor(player) {
        super('RankingUpdate');
        this.player = player;
    }
}
exports.RankingUpdateEvent = RankingUpdateEvent;
//# sourceMappingURL=ranking-update.event.js.map