import { Injectable } from '@nestjs/common';
import { Player } from '../../entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerService {

  constructor(
    @InjectRepository(Player)
    private readonly players: Repository<Player>,
  ) {}

  async findOne(id: string): Promise<Player | null> {
    return this.players.findOne({ where: { id } });
  }

  async findAll(): Promise<Player[]> {
    return this.players.find();
  }

  async create(player: Player): Promise<Player> {
    const players = await this.findAll();
    if (players.length === 0) {
      return this.players.save(player);
    } else {
      const avgRank = players.reduce((acc, player) => acc + player.rank, 0) / players.length;
      player.rank = avgRank;
      return this.players.save(player);
    }
  }
}
