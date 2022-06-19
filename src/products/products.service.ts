import { Injectable } from '@nestjs/common';
import { StreamerService } from 'src/streamer/streamer.service';
import { plainToClass } from 'class-transformer';
import * as Models from '../models';

@Injectable()
export class ProductsService {
  constructor(private readonly streamerService: StreamerService) {}

  removeProductsFromDto(
    products: Models.Product[],
    dto: Models.DbStructure,
  ): Models.DbStructure {
    if (dto === undefined || dto.products === undefined) return;
    let itemsToBeRemoved: Models.Product[] = [];
    for (const item of products) {
      if (dto.products.findIndex((el) => el.id === item.id) > -1) {
        itemsToBeRemoved.push(item);
      }
    }
    if (itemsToBeRemoved.length) {
      const newDto = new Models.DbStructure();
      newDto.products = dto.products.filter(
        (el) => !itemsToBeRemoved.some((ir) => ir.id === el.id),
      );
      newDto.lastModifiedDate = new Date();
      return newDto;
    }
    return dto;
  }

  upsertProductsToDto(
    products: Models.Product[],
    dto: Models.DbStructure,
  ): Models.DbStructure {
    if (dto === undefined || dto.products === undefined) return;
    let itemsToBeAdded: Models.Product[] = [];
    for (const item of products) {
      const existingIndex = dto.products.findIndex((el) => el.id === item.id);
      if (existingIndex > -1) {
        dto.products[existingIndex] = item;
      } else {
        itemsToBeAdded.push(item);
      }
    }
    if (itemsToBeAdded.length) {
      const newDto = new Models.DbStructure();
      newDto.products = [...dto.products, ...itemsToBeAdded];
      newDto.lastModifiedDate = new Date();
      return newDto;
    }
    return dto;
  }

  processJsonArray(json: Object): Models.Product[] | void {
    const payloadArray = json as Object[];
    if (payloadArray.length) {
      const productArray = payloadArray.map((item) => new Models.Product(item));
      return productArray;
    }
    return;
  }

  async getAllActiveProducts(): Promise<Models.Product[]> {
    const db = await this.streamerService.getFile(
      StreamerService.activeProductsDbPath,
    );
    if (db) {
      return db.products;
    }
    return [];
  }

  async getProduct(productId: string): Promise<Models.Product[]> {
    const db = await this.streamerService.getFile(
      StreamerService.activeProductsDbPath,
    );
    if (db) {
      const product = db.products.find((item) => item.id === productId);
      if (product) {
        return [product];
      }
    }
    return [];
  }
  
  async getProduct2(productIds: string[]): Promise<Models.Product[]> {
    const db = await this.streamerService.getFile(
      StreamerService.activeProductsDbPath,
    );
    if (db) {
      let newProductIds = [];
      for (const productId of productIds) {
        for (const item of db.products) {
          if (item.id === productId) {
            newProductIds.push(item);
          }
        }
      }
      return newProductIds;
    }
    return [];
  }

  async upsertProducts(
    productArray: Models.Product[],
  ): Promise<Models.Product[]> {
    const deletedDb = await this.streamerService.getFile(
      StreamerService.deletedProductsDbPath,
    );
    if (deletedDb) {
      const newDeletedDb = this.removeProductsFromDto(productArray, deletedDb);
      this.streamerService.writeFile(
        StreamerService.deletedProductsDbPath,
        newDeletedDb,
      );
    }

    const activeDb = await this.streamerService.getFile(
      StreamerService.activeProductsDbPath,
    );
    if (activeDb) {
      const newDb = this.upsertProductsToDto(productArray, activeDb);
      this.streamerService.writeFile(
        StreamerService.activeProductsDbPath,
        newDb,
      );
      return newDb.products;
    }
    return [];
  }

  async deleteProducts(productArray: Models.Product[]): Promise<void> {
    const activeDb = await this.streamerService.getFile(
      StreamerService.activeProductsDbPath,
    );
    if (activeDb) {
      const newActiveDb = this.removeProductsFromDto(productArray, activeDb);
      this.streamerService.writeFile(
        StreamerService.activeProductsDbPath,
        newActiveDb,
      );
    }
    const deletedDb = await this.streamerService.getFile(
      StreamerService.deletedProductsDbPath,
    );

    if (deletedDb) {
      const newDeletedDb = this.upsertProductsToDto(productArray, deletedDb);
      this.streamerService.writeFile(
        StreamerService.deletedProductsDbPath,
        newDeletedDb,
      );
    }
    return;
  }
}
