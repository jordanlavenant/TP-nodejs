export class PlayerCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly rank: number,
  ) {}
}
