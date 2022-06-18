import { Injectable } from '@nestjs/common';
import { StreamerService } from 'src/streamer/streamer.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductsService {
  productId: string;
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

  async deleteProduct(arr: string[]): Promise<void> {
    const constructedJson = await this.constructFromJson();
    const deepClone = JSON.parse(JSON.stringify(constructedJson));
    let result = [];
    for (const obj of deepClone) {
      for (const id of arr) {
        if (obj.productId === id) {
          result.push(obj);
        }
      }
    }
    return this.streamerService.writeDeletedRecords(result);
  }
}
