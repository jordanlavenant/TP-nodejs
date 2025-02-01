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
exports.PlayerCreatedListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const player_created_event_1 = require("../events/player-created.event");
const ranking_update_event_1 = require("../../ranking/events/ranking-update.event");
let PlayerCreatedListener = class PlayerCreatedListener {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    handlePlayerCreated(event) {
        console.log(`Nouveau joueur créé : ID=${event.id}, Rank=${event.rank}`);
        this.eventEmitter.emit('ranking.updated', new ranking_update_event_1.RankingUpdateEvent('update', event));
    }
};
exports.PlayerCreatedListener = PlayerCreatedListener;
__decorate([
    (0, event_emitter_1.OnEvent)('player.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [player_created_event_1.PlayerCreatedEvent]),
    __metadata("design:returntype", void 0)
], PlayerCreatedListener.prototype, "handlePlayerCreated", null);
exports.PlayerCreatedListener = PlayerCreatedListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], PlayerCreatedListener);
//# sourceMappingURL=player-created.listener.js.map