import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { StreamerModule } from '../streamer/streamer.module'
import { StreamerService } from'../streamer/streamer.service';

@Module({
  providers: [ProductsService, StreamerService],
  exports: [ProductsModule],
  imports: [StreamerModule],
})
export class ProductsModule {}
