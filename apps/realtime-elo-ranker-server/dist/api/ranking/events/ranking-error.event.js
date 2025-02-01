"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingErrorEvent = void 0;
const ranking_event_1 = require("./ranking.event");
class RankingErrorEvent extends ranking_event_1.RankingEvent {
    constructor(code, message) {
        super('Error');
        this.code = code;
        this.message = message;
    }
}
exports.RankingErrorEvent = RankingErrorEvent;
//# sourceMappingURL=ranking-error.event.js.map