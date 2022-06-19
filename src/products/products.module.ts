import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { StreamerModule } from 'src/streamer/streamer.module';
import { StreamerService } from 'src/streamer/streamer.service';

@Module({
  providers: [ProductsService, StreamerService],
  exports: [ProductsModule],
  imports: [StreamerModule],
})
export class ProductsModule {}
