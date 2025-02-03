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
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const player_entity_1 = require("../../entities/player.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const ranking_event_1 = require("../ranking/events/ranking.event");
let PlayerService = class PlayerService {
    constructor(players, eventEmitter) {
        this.players = players;
        this.eventEmitter = eventEmitter;
    }
    findOne(id) {
        return this.players.findOne({ where: { id } });
    }
    playerExists(id) {
        return this.findOne(id).then((player) => !!player);
    }
    findAll() {
        return this.players.find();
    }
    create(player) {
        return this.findAll().then((players) => {
            if (players.length === 0) {
                this.eventEmitter.emit('rankingEvent', new ranking_event_1.RankingEvent('RankingEvent', player));
                return this.players.save(player);
            }
            else {
                const avgRank = players.reduce((acc, player) => acc + player.rank, 0) /
                    players.length;
                player.rank = avgRank;
                this.eventEmitter.emit('rankingEvent', new ranking_event_1.RankingEvent('RankingEvent', player));
                return this.players.save(player);
            }
        });
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], PlayerService);
//# sourceMappingURL=player.service.js.map