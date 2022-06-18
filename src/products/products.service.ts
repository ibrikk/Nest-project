import { Injectable } from '@nestjs/common';
import { StreamerService } from 'src/streamer/streamer.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductsService {
  id: string;
  title: string;
  vendorName: string;
  quantity: number;
  price: number;
  deliverDate: string;
  expiryDate: string;

  constructor(private readonly streamerService: StreamerService) {}

  async constructFromJson(): Promise<ProductsService> {
    const jsonData = await this.streamerService.getFile();
    const newProductService = plainToClass(ProductsService, jsonData);
    return newProductService;
  }

  async readProducts(arr): Promise<ProductsService[]> {
    const constructedJson = await this.constructFromJson();
    const deepClone = JSON.parse(JSON.stringify(constructedJson));
    const result = [];
    for (let i = 0; i < deepClone.length; i++) {
      for (const id of arr) {
        if (deepClone[i].id === id) {
          result.push(deepClone[i]);
        }
      }
    }
    return result;
  }

  async deleteProduct(arr: string[]): Promise<void> {
    const constructedJson = await this.constructFromJson();
    const deepClone = JSON.parse(JSON.stringify(constructedJson));
    const result = [];
    for (let i = 0; i < deepClone.length; i++) {
      for (const id of arr) {
        if (deepClone[i].id === id) {
          result.push(deepClone[i]);
          deepClone.splice(i, 1);
        }
      }
    }
    const oldDeletedRecords = await this.streamerService.getDeletedRecords();
    const newRecords = [...oldDeletedRecords, ...result];
    this.streamerService.writeDeletedRecords(newRecords);
    return this.streamerService.createFile(deepClone);
  }
}
