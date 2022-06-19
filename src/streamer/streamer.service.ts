import { Injectable } from '@nestjs/common';
import { mkdirSync, existsSync, writeFile } from 'fs';
import { readFile } from 'fs/promises';

@Injectable()
export class StreamerService {
  private path = '../../test.json';
  private deletedProductsPath = '../../deletedProducts.json';

  async checkIfFileOrDirectoryExists(): Promise<boolean> {
    return existsSync(this.path);
  }

  async checkIfDeletedFileOrDirectoryExists(): Promise<boolean> {
    return existsSync(this.deletedProductsPath);
  }

  async getFile() {
    const file = await readFile(this.path, 'utf8');
    return JSON.parse(file);

    // const file = await createReadStream(join(process.cwd(), this.path));
    // return new StreamableFile(file);
  }

  async createFile(data) {
    if (!this.checkIfFileOrDirectoryExists()) {
      mkdirSync(this.path);
    }
    const strigifiedData = JSON.stringify(data);
    const result = await writeFile(this.path, strigifiedData, 'utf8', (err) => {
      if (err) {
        console.error('We have an error: ', err);
      }
    });
    return result;
  }

  async writeDeletedRecords(data) {
    if (!this.checkIfFileOrDirectoryExists()) {
      mkdirSync(this.deletedProductsPath);
    }
    const strigifiedData = JSON.stringify(data);
    const result = await writeFile(
      this.deletedProductsPath,
      strigifiedData,
      'utf8',
      (err) => {
        if (err) {
          console.error('We have an error: ', err);
        }
      },
    );
    return result;
  }

  async getDeletedRecords() {
    const file = await readFile(this.deletedProductsPath, 'utf8');
    return JSON.parse(file);
  }
}
