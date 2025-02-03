import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { RankingUpdateEvent } from "@rankingevents/ranking-update.event";

@Injectable()
export class RankingUpdateListener {
  @OnEvent('ranking.updated')
  handleRankingUpdateEvent(event: RankingUpdateEvent) {
    console.log(`RankingUpdateListener: ${event.player.id} has been updated`);
  }
}