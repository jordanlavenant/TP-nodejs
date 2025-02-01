import { Player } from "src/entities/player.entity";

export class MatchCreatedEvent {
  constructor(
    public readonly winner: Player,
    public readonly loser: Player,
    public readonly draw: boolean,
  ) {}
}