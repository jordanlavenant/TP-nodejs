import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PlayerCreatedEvent } from 'src/api/player/events/player-created.event';

@Injectable()
export class PlayerCreatedListener {
  @OnEvent('player.create')
  handlePlayerCreatedEvent(payload: PlayerCreatedEvent) {
    const { id, rank } = payload;
    console.log(`Player created: ${id}, Rank: ${rank}`);
  }
}
