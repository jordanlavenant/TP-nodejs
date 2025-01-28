import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Player } from './player.entity';

@Entity()
export class Match {
  @PrimaryColumn()
  winner: string;

  @PrimaryColumn()
  loser: string;

  @Column()
  draw: boolean;
}