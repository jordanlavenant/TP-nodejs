"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchCreatedListener = void 0;
const event_emitter_1 = require("@nestjs/event-emitter");
const match_created_event_1 = require("../events/match-created.event");
const ranking_update_event_1 = require("../../ranking/events/ranking-update.event");
class MatchCreatedListener {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    async handleMatchCreated(event) {
        console.log(`Nouveau match créé : winner=${event.winner}, loser=${event.loser}, draw=${event.draw}`);
        if (event.draw)
            return;
        this.eventEmitter.emit('ranking.updated', new ranking_update_event_1.RankingUpdateEvent('update', event.winner));
        this.eventEmitter.emit('ranking.updated', new ranking_update_event_1.RankingUpdateEvent('update', event.loser));
    }
}
exports.MatchCreatedListener = MatchCreatedListener;
__decorate([
    (0, event_emitter_1.OnEvent)('match.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [match_created_event_1.MatchCreatedEvent]),
    __metadata("design:returntype", Promise)
], MatchCreatedListener.prototype, "handleMatchCreated", null);
//# sourceMappingURL=match-created.listener.js.map