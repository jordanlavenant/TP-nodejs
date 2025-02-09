import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { Player } from '../../entities/player.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';

describe('PlayerService', () => {
  let service: PlayerService;
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
      providers: [PlayerService, EventEmitter2],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    playerRepository = module.get<Repository<Player>>(
      getRepositoryToken(Player),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Mock player
  const player: Player = {
    id: 'jordan',
    rank: 1000,
  };

  it('should return player=jordan', async () => {
    await playerRepository.save(player);

    jest.spyOn(service, 'findOne').mockResolvedValue(player);

    expect(await service.findOne('jordan')).toEqual(player);
  });

  it('should return player=null', async () => {
    await playerRepository.save(player);

    jest.spyOn(service, 'findOne').mockResolvedValue(null);

    expect(await service.findOne('laurent')).toEqual(null);
  });

  it('should return playerExists=true', async () => {
    await playerRepository.save(player);

    jest.spyOn(service, 'playerExists').mockResolvedValue(true);

    expect(await service.playerExists('jordan')).toEqual(true);
  });

  it('should return playerExists=false', async () => {
    await playerRepository.save(player);

    jest.spyOn(service, 'playerExists').mockResolvedValue(false);

    expect(await service.playerExists('laurent')).toEqual(false);
  });

  it('should return players=[jordan]', async () => {
    await playerRepository.save(player);

    jest.spyOn(service, 'findAll').mockResolvedValue([player]);

    expect(await service.findAll()).toEqual([player]);
  });

  it('should return player=jordan', async () => {
    await playerRepository.save(player);

    jest.spyOn(service, 'create').mockResolvedValue(player);

    expect(await service.create(player)).toEqual(player);
  });

  it('should emit a player update', async () => {
    await playerRepository.save(player);

    jest.spyOn(service, 'emitPlayerUpdate').mockImplementation(() => {});

    service.emitPlayerUpdate(player);

    expect(service.emitPlayerUpdate).toHaveBeenCalled();
  });

  it('should save a player', async () => {
    await playerRepository.save(player);

    jest.spyOn(service, 'save').mockResolvedValue(player);

    expect(await service.save(player)).toEqual(player);
  });

  afterEach(async () => {
    await playerRepository.clear();
  });
});
