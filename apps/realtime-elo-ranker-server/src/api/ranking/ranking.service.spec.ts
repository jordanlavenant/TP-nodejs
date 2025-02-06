import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../../entities/player.entity';
import { Repository } from 'typeorm';

describe('RankingService', () => {
  let service: RankingService;
  let playerRepository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Player],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Player]),
      ],
      controllers: [RankingController],
      providers: [RankingService, EventEmitter2],
    }).compile();

    service = module.get<RankingService>(RankingService);
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Mock player
  const player: Player = {
    id: "jordan",
    rank: 1000,
  }

  it('should return players=null', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([]);

    expect(await service.findAll()).toEqual([]);
  });

  it('should return player=jordan', async () => {
    await playerRepository.save(player);

    jest.spyOn(service, 'findAll').mockResolvedValue([player]);

    expect(await service.findAll()).toEqual([player]);
  });
});