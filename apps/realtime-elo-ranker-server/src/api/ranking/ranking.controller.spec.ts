import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../../entities/player.entity';

describe('RankingController', () => {
  let controller: RankingController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
