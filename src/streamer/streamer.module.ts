import { Module } from '@nestjs/common';
import { StreamerService } from './streamer.service';

@Module({
  providers: [StreamerService],
  exports: [StreamerModule],
})
export class StreamerModule {}
