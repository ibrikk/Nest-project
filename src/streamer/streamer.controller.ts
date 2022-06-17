import { Controller, Get, StreamableFile, Response } from '@nestjs/common';
import { StreamerService } from './streamer.service';

@Controller('streamer')
export class StreamerController {
  constructor(private readonly streamerService: StreamerService) {}

  @Get()
  getFile(@Response({ passthrough: true }) res): Promise<StreamableFile> {
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="test.json"',
    });
    return this.streamerService.getFile();
  }

  // @Get('byId')
  // getFileById(@Response() res): Promise<void> {
  //   res.set({
  //     'Content-Type': 'application/json',
  //     'Content-Disposition': 'attachment; filename="test.json"',
  //   });
  //   return this.streamerService.getFileById();
  // }
}
