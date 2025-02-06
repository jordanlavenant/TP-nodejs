import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../../entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('PlayerController', () => {
  let controller: PlayerController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
