import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  controllers: [MatchController],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}
