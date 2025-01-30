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

  findOne(id: string): Promise<Player | null> {
    return this.players.findOne({ where: { id } });
  }

  playerExists(id: string): Promise<boolean> {
    return this.findOne(id).then((player) => !!player);
  }

  findAll(): Promise<Player[]> {
    return this.players.find();
  }

  create(player: Player): Promise<Player> {
    return this.findAll().then((players) => {
      if (players.length === 0) {
        return this.players.save(player);
      } else {
        const avgRank = players.reduce((acc, player) => acc + player.rank, 0) / players.length;
        player.rank = avgRank;
        return this.players.save(player);
      }
    });
  }
}
