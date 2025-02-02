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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_1 = require("@nestjs/typeorm");
const match_entity_1 = require("../../entities/match.entity");
const player_entity_1 = require("../../entities/player.entity");
const typeorm_2 = require("typeorm");
const ranking_update_event_1 = require("../ranking/events/ranking-update.event");
const elo_1 = require("../../utils/elo");
let MatchService = class MatchService {
    constructor(matches, players, eventEmitter) {
        this.matches = matches;
        this.players = players;
        this.eventEmitter = eventEmitter;
    }
    findAll() {
        return this.matches.find();
    }
    create(match) {
        return this.matches.save(match);
    }
    async updateElo(winner, loser, draw) {
        const winnerDB = await this.players.findOne({ where: { id: winner } });
        const loserDB = await this.players.findOne({ where: { id: loser } });
        if (!winnerDB || !loserDB)
            return;
        const { winnerPlayer, loserPlayer } = (0, elo_1.updateRank)(winnerDB, loserDB, draw);
        await this.players.save(winnerPlayer);
        await this.players.save(loserPlayer);
        this.eventEmitter.emit('ranking.updated', new ranking_update_event_1.RankingUpdateEvent(winnerPlayer));
        this.eventEmitter.emit('ranking.updated', new ranking_update_event_1.RankingUpdateEvent(loserPlayer));
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __param(1, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], MatchService);
//# sourceMappingURL=match.service.js.map