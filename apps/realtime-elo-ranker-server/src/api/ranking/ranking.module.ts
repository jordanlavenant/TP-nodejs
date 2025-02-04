import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '@entitiesplayer.entity';
import { PlayerService } from '@playerplayer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), EventEmitterModule.forRoot()],
  providers: [RankingService, PlayerService],
  exports: [RankingService],
  controllers: [RankingController],
})
export class RankingModule {}
