import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Match } from '../../entities/match.entity';
import { Player } from '../../entities/player.entity';
import { MatchService } from './match.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PlayerService } from '../player/player.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { Response } from 'express';
import { Repository } from 'typeorm';

describe('MatchController', () => {
  let controller: MatchController;
  let service: MatchService;
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
      controllers: [MatchController],
      providers: [MatchService, PlayerService, EventEmitter2],
    }).compile();

    controller = module.get<MatchController>(MatchController);
    service = module.get<MatchService>(MatchService);
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

  it('should return 422 if the winner is also the loser', async () => {
    const createMatchDto: CreateMatchDto = {
      winner: 'jordan',
      loser: 'jordan',
      draw: false,
    };

    await controller.create(createMatchDto, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledWith({
      code: 0,
      message: "Le gagnant et le perdant ne peuvent pas être la même personne",
    });
  });

  it("should return 422 if the winner or the loser isn't provided", async () => {
    const createMatchDto1: CreateMatchDto = {
      winner: '',
      loser: 'jordan',
      draw: false,
    };

    const createMatchDto2: CreateMatchDto = {
      winner: 'jordan',
      loser: '',
      draw: false,
    };

    await controller.create(createMatchDto1, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledWith({
      code: 0,
      message: "Soit le gagnant, soit le perdant indiqué n'existe pas",
    });

    await controller.create(createMatchDto2, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledWith({
      code: 0,
      message: "Soit le gagnant, soit le perdant indiqué n'existe pas",
    });
  });

  it('should return 201 if match is created', async () => {
    const createMatchDto: CreateMatchDto = {
      winner: 'michael',
      loser: 'laurent',
      draw: false,
    };

    // Setup players
    await playerRepository.save([
      { id: 'michael', rank: 1000 },
      { id: 'laurent', rank: 1000 },
    ]);

    await controller.create(createMatchDto, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(createMatchDto);

  });
});
