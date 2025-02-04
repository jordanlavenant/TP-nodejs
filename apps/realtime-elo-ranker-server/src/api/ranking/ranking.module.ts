import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '@entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PlayerService } from '@playerplayer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), EventEmitter2],
  controllers: [RankingController],
  providers: [RankingService, EventEmitter2, PlayerService],
  exports: [RankingService],
})
export class RankingModule {}
