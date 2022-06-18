import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { StreamerModule } from './streamer/streamer.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot(), StreamerModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
