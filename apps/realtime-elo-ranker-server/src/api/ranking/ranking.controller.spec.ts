import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../../entities/player.entity';
import { Response } from 'express';
import { Repository } from 'typeorm';

describe('RankingController', () => {
  let controller: RankingController;
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

    controller = module.get<RankingController>(RankingController);
    service = module.get<RankingService>(RankingService);
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  // Response mock
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  } as unknown as Response;

  it('should return 404 if no players are registered', async () => {
    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      code: 0,
      message: "Le classement n'est pas disponible car aucun joueur n'existe",
    });
  });

  it('should return 200 if players are registered', async () => {
    const players: Player[] = [
      { id: 'jordan', rank: 1000 },
      { id: 'laurent', rank: 1000 },
    ];
    await playerRepository.save(players);

    await controller.findAll(res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(players);
  });
});
