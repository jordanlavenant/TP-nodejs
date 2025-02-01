import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { MatchCreatedEvent } from "../events/match-created.event";
import { RankingUpdateEvent } from "src/api/ranking/events/ranking-update.event";

export class MatchCreatedListener {

  constructor(
    private readonly eventEmitter: EventEmitter2
  ) {}

  @OnEvent('match.created')
  async handleMatchCreated(event: MatchCreatedEvent) {
    console.log(`Nouveau match créé : winner=${event.winner}, loser=${event.loser}, draw=${event.draw}`)

    // Si draw, on ne met à jour aucun joueur
    if (event.draw) return

    // ! Event de mise à jour du classement

    // Joueur 1
    this.eventEmitter.emit('ranking.updated', new RankingUpdateEvent(
      'update',
      event.winner
    ));

    // Joueur 2
    this.eventEmitter.emit('ranking.updated', new RankingUpdateEvent(
      'update',
      event.loser
    ));
  }
}