import { Player } from "src/entities/player.entity";

export class RankingUpdateEvent {
  constructor(
    public readonly type: string,
    public readonly player: Player,
  ) {}
}
