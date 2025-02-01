import { RankingEvent } from "./ranking.event";

export class RankingErrorEvent extends RankingEvent {
  constructor(
    public readonly code: number,
    public readonly message: string,
  ) {
    super('Error');
  }
}
