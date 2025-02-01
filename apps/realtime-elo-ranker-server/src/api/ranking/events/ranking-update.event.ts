export class RankingUpdateEvent {
  constructor(
    public readonly winnerId: string,
    public readonly loserId: string,
  ) {}
}
