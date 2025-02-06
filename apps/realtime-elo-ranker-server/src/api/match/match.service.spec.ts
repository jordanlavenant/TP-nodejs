import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../../entities/player.entity';
import { Match } from '../../entities/match.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('MatchService', () => {
  let service: MatchService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
