import { Injectable } from '@nestjs/common';
import { mkdirSync, existsSync, writeFile } from 'fs';
import { readFile } from 'fs/promises';

@Injectable()
export class StreamerService {
  private path = '../../test.json';

  async checkIfFileOrDirectoryExists(): Promise<boolean> {
    return existsSync(this.path);
  }

  async getFile() {
    return await readFile(this.path, 'utf8');

    // const file = await createReadStream(join(process.cwd(), this.path));
    // return new StreamableFile(file);
  }

  async createFile(data) {
    if (!this.checkIfFileOrDirectoryExists()) {
      mkdirSync(this.path);
    }

    const file = await writeFile(this.path, data, 'utf8', (err) =>
      console.error(err),
    );

    return file;
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
