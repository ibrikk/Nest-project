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

  async constructDeletedFromJson(): Promise<ProductsService> {
    const jsonData = await this.streamerService.getDeletedRecords();
    const newProductService = plainToClass(ProductsService, jsonData);
    return newProductService;
  }

  async readProducts(arr): Promise<ProductsService[]> {
    const constructedJson = await this.constructFromJson();
    const deepClone = JSON.parse(JSON.stringify(constructedJson));
    const result = [];
    for (const obj of deepClone) {
      for (const id of arr) {
        if (obj.id === id) {
          result.push(obj);
        }
      }
    }
    return result;
  }

  async upsertProducts(arr): Promise<void> {
    const constructedJson = await this.constructFromJson();
    const deepClone = JSON.parse(JSON.stringify(constructedJson));
    for (const obj of arr) {
      const index = deepClone.indexOf(obj);
      if (index !== -1) {
        deepClone[index].id = obj.id;
        deepClone[index].title = obj.title;
        deepClone[index].vendorName = obj.vendorName;
        deepClone[index].quantity = obj.quantity;
        deepClone[index].price = obj.price;
        deepClone[index].deliveryDate = obj.deliveryDate;
        deepClone[index].expiryDate = obj.expiryDate;
      } else {
        deepClone.push(obj);
      }
    }
    return this.streamerService.createFile(deepClone);
  }

  async restoreProduct(jsonObj: ProductsService): Promise<void> {
    const constructDeletedFileJson = await this.constructDeletedFromJson();
    const cloneConstructDeletedFileJson = JSON.parse(
      JSON.stringify(constructDeletedFileJson),
    );
    console.log(cloneConstructDeletedFileJson);
    console.log('jsonObject', jsonObj);
    if (!cloneConstructDeletedFileJson.includes(jsonObj)) {
      console.log('File does not exist in Deleted Files Record');
      return;
    }
    const constructedJson = await this.constructFromJson();
    const cloneConstructedJson = JSON.parse(JSON.stringify(constructedJson));

    for (let i = 0; i < cloneConstructDeletedFileJson.length; i++) {
      if (cloneConstructDeletedFileJson[i] === jsonObj) {
        // deleted entry
        if (cloneConstructedJson.includes(jsonObj)) {
          console.log('File already exists in Active Files Record');
          return;
        } else {
          cloneConstructedJson.push(jsonObj);
          cloneConstructDeletedFileJson.slice(i, 1);
        }
      }
    }
    this.streamerService.createFile(cloneConstructedJson);
    return this.streamerService.writeDeletedRecords(
      cloneConstructDeletedFileJson,
    );
  }

  async deleteProduct(arr: string[]): Promise<void> {
    const constructedJson = await this.constructFromJson();
    const deepClone = JSON.parse(JSON.stringify(constructedJson));
    console.log(deepClone);
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
