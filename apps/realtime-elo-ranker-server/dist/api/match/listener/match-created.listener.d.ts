import { EventEmitter2 } from "@nestjs/event-emitter";
import { MatchCreatedEvent } from "../events/match-created.event";
export declare class MatchCreatedListener {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    handleMatchCreated(event: MatchCreatedEvent): Promise<void>;
}
