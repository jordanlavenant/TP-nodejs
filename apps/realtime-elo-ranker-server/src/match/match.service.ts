import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/entities/match.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchService {

  constructor(
    @InjectRepository(Match)
    private readonly matches: Repository<Match>,
  ) {}

  async findAll(): Promise<Match[]> {
    return this.matches.find();
  }

  async create(match: Match): Promise<Match> {
    if (!match.winner || !match.loser) {
      return Promise.reject({ status: 400, message: "Les joueurs ne sont pas valides" });
    } else {
      this.matches.save(match);
      return Promise.resolve(match);
    }
  }
}
