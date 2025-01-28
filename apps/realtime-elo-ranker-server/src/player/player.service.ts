import { Injectable } from '@nestjs/common';
import { Player } from '../entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerService {

  constructor(
    @InjectRepository(Player)
    private readonly players: Repository<Player>,
  ) {}

  async findAll(): Promise<Player[]> {
    return this.players.find();
  }

  async create(player: Player): Promise<Player> {
    if (!player.id) {
      return Promise.reject({ status: 400, message: "	L'identifiant du joueur n'est pas valide" });
    } else if (await this.players.findOne({ where: { id: player.id } })) {
      return Promise.reject({ status: 409, message: "Le joueur existe déjà" });
    } else {
      this.players.save(player);
      return Promise.resolve(player);
    }
  }
}
