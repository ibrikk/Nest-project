import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('delete')
  deleteProducts(@Body() body): Promise<void> {
    return this.productsService.deleteProduct(body.data);
  }

  @Get('products')
  getProducts() {
    return this.productsService.constructFromJson();
  }
}
