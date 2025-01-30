import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PlayerCreatedEvent } from 'src/events/player.event';
@Injectable()
export class PlayerListener {
  @OnEvent('player.create')
  handlePlayerUpdateEvent(payload: PlayerCreatedEvent) {
    const { id, rank } = payload;
    console.log(`Player created: ${id}, Rank: ${rank}`);
  }
}
