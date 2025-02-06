import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../../entities/player.entity';
import { Match } from '../../entities/match.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { PlayerService } from '../player/player.service';

describe('MatchService', () => {
  let matchService: MatchService;
  let matchRepository: Repository<Match>;
  let playerRepository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Player, Match],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Player, Match]),
      ],
      providers: [MatchService, EventEmitter2],
    }).compile();

    matchService = module.get<MatchService>(MatchService);
    matchRepository = module.get<Repository<Match>>(getRepositoryToken(Match));
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(matchService).toBeDefined();
  });

  // Mock match
  const match: Match = {
    winner: "jordan",
    loser: "laurent",
    draw: false,
  }

  it('should return all matches', async () => {
    await matchRepository.save(match);
    const matches = await matchService.findAll();
    expect(matches).toEqual([match]);
  });

  it('should create a match', async () => {
    const createdMatch = await matchService.create(match);
    expect(createdMatch).toEqual(match);
  });

  it('should update rank', async () => {
    const id1 = "jordan";
    const id2 = "laurent";
    const draw = false;

    const winnerPlayer = {
      id: "jordan",
      rank: 1000,
    }

    const loserPlayer = {
      id: "laurent",
      rank: 1000,
    }

    await playerRepository.save(winnerPlayer);
    await playerRepository.save(loserPlayer);

    jest.spyOn(matchService, 'updateElo').mockImplementation(async () => {
      const result = await matchService.updateElo(id1, id2, draw);
      if (result) {
        const { winner, loser } = result;
        expect(winner.rank).toEqual(1000);
        expect(loser.rank).toEqual(1000);
      }
    });
  });
});
