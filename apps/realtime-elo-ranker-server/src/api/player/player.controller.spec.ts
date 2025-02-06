import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../../entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Response } from 'express';

describe('PlayerController', () => {
  let controller: PlayerController;
  let service: PlayerService;

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
      controllers: [PlayerController],
      providers: [PlayerService, EventEmitter2],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
    service = module.get<PlayerService>(PlayerService);
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

  it('should return 400 if player id is missing', async () => {
    const createPlayerDto: CreatePlayerDto = { id: '', rank: 1000 };

    await controller.create(createPlayerDto, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      code: 0,
      message: "L'id du joueur est obligatoire",
    });
  });

  it('should return 409 if player already exists', async () => {
    const createPlayerDto: CreatePlayerDto = { id: 'jordan', rank: 1000 };

    jest.spyOn(service, 'playerExists').mockResolvedValue(true);

    await controller.create(createPlayerDto, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.send).toHaveBeenCalledWith({
      code: 0,
      message: 'Le joueur existe déjà',
    });
  });

  it('should return 201 if player is created', async () => {
    const createPlayerDto: CreatePlayerDto = { id: 'jordan', rank: 1000 };

    jest.spyOn(service, 'playerExists').mockResolvedValue(false);
    jest.spyOn(service, 'create').mockResolvedValue(createPlayerDto);

    await controller.create(createPlayerDto, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(createPlayerDto);
  });
});
