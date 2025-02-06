import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../../entities/player.entity';
import { Match } from '../../entities/match.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';

describe('MatchService', () => {
  let service: MatchService;
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

    service = module.get<MatchService>(MatchService);
    matchRepository = module.get<Repository<Match>>(getRepositoryToken(Match));
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Mock match
  const match: Match = {
    winner: "jordan",
    loser: "laurent",
    draw: false,
  }

  it('should return all matches', async () => {
    await matchRepository.save(match);
    const matches = await service.findAll();
    expect(matches).toEqual([match]);
  });

  it('should create a match', async () => {
    const createdMatch = await service.create(match);
    expect(createdMatch).toEqual(match);
  });

  it('should update rank (regular)', async () => {
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

    const result = await service.updateElo(id1, id2, draw);
    if (result) {
      expect(result.winner.rank).toEqual(1016);
      expect(result.loser.rank).toEqual(984);
    }
  });

  it('should update rank (draw)', async () => {
    const id1 = "jordan";
    const id2 = "laurent";
    const draw = true;

    const winnerPlayer = {
      id: "jordan",
      rank: 1200,
    }

    const loserPlayer = {
      id: "laurent",
      rank: 800,
    }

    await playerRepository.save(winnerPlayer);
    await playerRepository.save(loserPlayer);

    const result = await service.updateElo(id1, id2, draw);
    if (result) {
      expect(result.winner.rank).toEqual(1187);
      expect(result.loser.rank).toEqual(813);
    }
  });

  it('should emit a match update', async () => {
    const player = {
      id: 'jordan',
      rank: 1000,
    }

    jest.spyOn(service, 'emitPlayerUpdate').mockImplementation(() => {});

    service.emitPlayerUpdate(player);

    expect(service.emitPlayerUpdate).toHaveBeenCalled();
  });

  it('should save a player', async () => {
    await matchRepository.save(match);

    jest.spyOn(service, 'save').mockResolvedValue(match);

    expect(await service.save(match)).toEqual(match);
  });

  afterEach(async () => {
    await matchRepository.clear();
  });
});
