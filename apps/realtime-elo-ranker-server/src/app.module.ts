import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from 'src/api/player/player.module';
import { PlayerController } from 'src/api/player/player.controller';
import { MatchModule } from 'src/api/match/match.module';
import { RankingModule } from 'src/api/ranking/ranking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PlayerModule,
    MatchModule,
    RankingModule,
  ],
  controllers: [AppController, PlayerController],
  providers: [AppService],
})
export class AppModule {}
