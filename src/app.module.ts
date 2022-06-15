import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import RefreshToken from './auth/entities/refresh-token.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, RefreshToken, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
