import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { StreamerModule } from 'src/streamer/streamer.module';
import { StreamerController } from 'src/streamer/streamer.controller';
import { StreamerService } from 'src/streamer/streamer.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, StreamerController, StreamerService],
  exports: [ProductsModule],
  imports: [StreamerModule],
})
export class ProductsModule {}
