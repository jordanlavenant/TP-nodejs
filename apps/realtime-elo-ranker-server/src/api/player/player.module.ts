import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/entities/player.entity';
import { PlayerListener } from 'src/api/player/listener/player-created.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [PlayerController],
  providers: [PlayerService, PlayerListener],
  exports: [PlayerService],
})
export class PlayerModule {}
