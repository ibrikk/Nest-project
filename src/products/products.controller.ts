import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Put('delete')
  deleteProducts(@Body() body): Promise<void> {
    return this.productsService.deleteProduct(body.data);
  }

  @Get('allProducts') // Returns in memory parsed JSON object
  getProducts() {
    return this.productsService.constructFromJson();
  }

  @Post('read')
  readProducts(@Body() body): Promise<ProductsService[]> {
    return this.productsService.readProducts(body.data);
  }

  @Put('upsert')
  upsertProduct(@Body() body): Promise<void> {
    return this.productsService.upsertProducts(body.data);
  }

  @Put('restore')
  restoreProduct(@Body() body): Promise<void> {
    return this.productsService.restoreProduct(body.data);
  }
}
