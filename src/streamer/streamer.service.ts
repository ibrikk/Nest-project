import { Injectable } from '@nestjs/common';
import { mkdirSync, existsSync, writeFile, writeFileSync } from 'fs';
import { readFile } from 'fs/promises';
import * as Models from '../models';

@Injectable()
export class StreamerService {
  static activeProductsDbPath = './data/active_products.json';
  static deletedProductsDbPath = './data/deleted_products.json';
  
  

  async checkIfFileOrDirectoryExists(path: string): Promise<boolean> {
    console.log(process.cwd());
    return existsSync(path);
  }

  async getFile(path: string): Promise<Models.DbStructure> {
    try {
      const file = await readFile(path, 'utf8');
      const parsedJson = JSON.parse(file);
      const dbStructure = new Models.DbStructure(parsedJson);
      if (dbStructure.products === undefined) return null;
      return dbStructure;
  
    } catch (err) {
      console.error(err);
      return null;
    };
  }

  writeFile(path: string, data: Models.DbStructure): boolean {
    if (this.checkIfFileOrDirectoryExists(path)) {
      return false;
    } else {
      mkdirSync(path);
    }
    const strigifiedData = JSON.stringify(data);
    try {
      writeFileSync(path, strigifiedData, 'utf8');
    } catch(err) {
      console.error('We have an error: ', err);
      return false;
    }
    return true;
  }

  // async writeDeletedRecords(data) {
  //   if (!this.checkIfFileOrDirectoryExists()) {
  //     mkdirSync(this.deletedProductsPath);
  //   }
  //   const strigifiedData = JSON.stringify(data);
  //   const result = await writeFile(
  //     this.deletedProductsPath,
  //     strigifiedData,
  //     'utf8',
  //     (err) => {
  //       if (err) {
  //         console.error('We have an error: ', err);
  //       }
  //     },
  //   );
  //   return result;
  // }

  // async getDeletedRecords() {
  //   const file = await readFile(this.deletedProductsPath, 'utf8');
  //   return JSON.parse(file);
  // }
}
