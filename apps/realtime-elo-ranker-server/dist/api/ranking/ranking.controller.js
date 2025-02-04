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
exports.RankingController = void 0;
const common_1 = require("@nestjs/common");
const ranking_service_1 = require("./ranking.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const rxjs_1 = require("rxjs");
const events_1 = require("../../constants/events");
<<<<<<< Updated upstream
const player_service_1 = require("../player/player.service");
=======
>>>>>>> Stashed changes
let RankingController = class RankingController {
    constructor(appService, eventEmitter) {
        this.appService = appService;
        this.eventEmitter = eventEmitter;
    }
    async findAll(res) {
        const players = await this.appService.findAll();
        if (players.length === 0) {
            return res.status(404).send({
                code: 0,
                message: "Le classement n'est pas disponible car aucun joueur n'existe",
            });
        }
        return res.status(200).send(players);
    }
<<<<<<< Updated upstream
    sse() {
        const heartbeat = (0, rxjs_1.interval)(25000).pipe((0, rxjs_1.map)(() => ({ data: { type: 'ping' } })));
        const rankingEvents = (0, rxjs_1.fromEvent)(this.eventEmitter, events_1.RANKING_EVENT).pipe((0, rxjs_1.map)((event) => ({
            data: { type: 'RankingUpdate', player: event.player },
        })));
        return (0, rxjs_1.merge)(heartbeat, rankingEvents);
=======
    subscribeToEvents() {
        return (0, rxjs_1.fromEvent)(this.eventEmitter, events_1.RANKING_EVENT).pipe((0, rxjs_1.map)((payload) => {
            console.log('Event emitted:', payload);
            return {
                data: JSON.stringify(payload),
            };
        }));
>>>>>>> Stashed changes
    }
};
exports.RankingController = RankingController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RankingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Sse)('events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], RankingController.prototype, "sse", null);
exports.RankingController = RankingController = __decorate([
    (0, common_1.Controller)('api/ranking'),
    __metadata("design:paramtypes", [ranking_service_1.RankingService,
        event_emitter_1.EventEmitter2])
], RankingController);
//# sourceMappingURL=ranking.controller.js.map