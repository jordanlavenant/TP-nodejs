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
exports.PlayerController = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("./player.service");
const player_entity_1 = require("../../entities/player.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
const player_event_1 = require("../../events/player.event");
let PlayerController = class PlayerController {
    constructor(appService, eventEmitter) {
        this.appService = appService;
        this.eventEmitter = eventEmitter;
    }
    async create(player, req, res) {
        if (!player.id) {
            return res.status(400).send({
                code: 0,
                message: "L'id du joueur est obligatoire"
            });
        }
        const findPlayer = await this.appService.findOne(player.id);
        if (findPlayer) {
            return res.status(409).send({
                code: 0,
                message: "Le joueur existe déjà"
            });
        }
        this.eventEmitter.emit('player.create', new player_event_1.PlayerCreatedEvent(player.id, player.rank));
        this.appService.create(player);
        return res.status(201).send(player);
    }
};
exports.PlayerController = PlayerController;
__decorate([
    (0, common_1.Post)('player'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [player_entity_1.Player, Object, Object]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "create", null);
exports.PlayerController = PlayerController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [player_service_1.PlayerService,
        event_emitter_1.EventEmitter2])
], PlayerController);
//# sourceMappingURL=player.controller.js.map