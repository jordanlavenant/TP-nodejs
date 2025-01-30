import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { RankingUpdateEvent } from "src/events/ranking.event";

@Injectable()
export class RankingListener {
  @OnEvent('ranking.update')
  handleRankingUpdateEvent(payload: RankingUpdateEvent) {
    const { winnerId, loserId } = payload;
    console.log(`Winner: ${winnerId}, Loser: ${loserId}`);
  }
}