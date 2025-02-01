import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RankingUpdateEvent } from 'src/api/ranking/events/ranking-update.event';

@Injectable()
export class RankingUpdateListener {
  @OnEvent('ranking.update')
  handleRankingUpdateEvent(payload: RankingUpdateEvent) {
    const { winnerId, loserId } = payload;
    console.log(`Winner: ${winnerId}, Loser: ${loserId}`);
  }
}
