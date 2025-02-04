import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from '@entities/match.entity';
import { Player } from '@entitiesplayer.entity';
import { PlayerService } from '@playerplayer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Player])],
  controllers: [MatchController],
  providers: [MatchService, PlayerService],
  exports: [MatchService],
})
export class MatchModule {}
