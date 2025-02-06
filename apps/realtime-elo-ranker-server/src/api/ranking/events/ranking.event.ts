import { Player } from '../../../entities/player.entity';

export class RankingEvent {
  constructor(
    public readonly type: string,
    public readonly player: Player,
  ) {}
}
