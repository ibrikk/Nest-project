import { Controller, Get, Response, Post, Body } from '@nestjs/common';
import { FileDto } from 'src/auth/dto/file.dto';
import { StreamerService } from './streamer.service';

@Controller('streamer')
export class StreamerController {
  constructor(private readonly streamerService: StreamerService) {}

  @Get()
  getFile(@Response({ passthrough: true }) res): Promise<string> {
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="test.json"',
    });
    return this.streamerService.getFile();
  }

  @Post('write')
  createFile(@Body() body: FileDto) {
    return this.streamerService.createFile(body.data);
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
