import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PlayerCreatedEvent } from 'src/api/player/events/player-created.event';
import { RankingService } from '../ranking.service';
import { RankingUpdateEvent } from '../events/ranking-update.event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MatchCreatedEvent } from 'src/api/match/events/match-created.event';

@Injectable()
export class RankingUpdateListener {
  constructor(
    private readonly rankingService: RankingService,
  ) {}

  @OnEvent('ranking.updated')
  handleRankingUpdated(event: RankingUpdateEvent) {
    this.rankingService.updateRanking(event)
  }
  
}
