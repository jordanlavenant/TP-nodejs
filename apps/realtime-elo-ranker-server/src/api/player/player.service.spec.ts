import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { Player } from '../../entities/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('PlayerService', () => {
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
      providers: [PlayerService, EventEmitter2],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
