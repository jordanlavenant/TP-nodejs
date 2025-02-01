import { EventEmitter2 } from '@nestjs/event-emitter';
import { PlayerCreatedEvent } from 'src/api/player/events/player-created.event';
export declare class PlayerCreatedListener {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    handlePlayerCreated(event: PlayerCreatedEvent): void;
}
