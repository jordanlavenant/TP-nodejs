import { Player } from "@entities/player.entity";
import { RankingEvent } from "./ranking.event";

export class RankingUpdateEvent extends RankingEvent {
  constructor(
    public readonly player: Player,
  ) {
    super('RankingUpdate');
  }
}
