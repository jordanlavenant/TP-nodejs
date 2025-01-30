import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/entities/player.entity';
import { PlayerListener } from 'src/listeners/player.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [RankingController],
  providers: [RankingService, PlayerListener],
  exports: [RankingService],
})
export class RankingModule {}
