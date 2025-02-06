import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from '../../entities/match.entity';
import { Player } from '../../entities/player.entity';
import { MatchService } from './match.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PlayerService } from '../player/player.service';

describe('MatchController', () => {
  let controller: MatchController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
