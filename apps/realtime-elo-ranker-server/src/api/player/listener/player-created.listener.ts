import { Injectable, Sse } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { PlayerCreatedEvent } from 'src/api/player/events/player-created.event';
import { RankingUpdateEvent } from 'src/api/ranking/events/ranking-update.event';

@Injectable()
export class PlayerCreatedListener {

  constructor(
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('player.created')
  handlePlayerCreated(event: PlayerCreatedEvent) {
    console.log(`Nouveau joueur créé : ID=${event.id}, Rank=${event.rank}`);

    // ! Event de mise à jour du classement
    this.eventEmitter.emit('ranking.updated', new RankingUpdateEvent(
      'update',
      event
    ));
  }
}
