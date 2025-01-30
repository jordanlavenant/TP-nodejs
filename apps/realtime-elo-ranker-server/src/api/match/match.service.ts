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
    return this.matches.save(match);
  }
}
