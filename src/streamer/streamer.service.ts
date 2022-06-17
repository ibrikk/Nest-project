import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { StreamableFile } from '@nestjs/common';

@Injectable()
export class StreamerService {
  async getFile() {
    const file = await createReadStream(join(process.cwd(), '../../test.json'));
    return new StreamableFile(file);
  }

  //   async getFileById(ids: string[]) {
  //     const fullFile = await createReadStream(
  //       join(process.cwd(), '../../test.json'),
  //     );
  //     let file = [];
  //     // const parsedFullFile = JSON.parse(fullFile);
  //     for (const id of ids) {
  //       fullFile.filter((obj) => obj.id === id);
  //       file.push(obj);
  //     }
  //     return fullFile;
  //   }
}
