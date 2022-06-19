import { Body, Controller, Get, Post, Put, Query, UseGuards, Delete, ForbiddenException } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import * as Models from '../models';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
   // Returns in memory parsed JSON object
   // localhost:3000/products?pid=33755a6e-0c33-4de2-8278-f7f7e25cdd74

  @UseGuards(JwtAuthGuard)
    @Get()
    getProducts(@Query('pid') productId: string) {
      if (productId === '' || productId === undefined) {
        return this.productsService.getAllActiveProducts();
      }
      return this.productsService.getProduct(productId);
    }
    
  @UseGuards(JwtAuthGuard)
  @Put()
  upsertProducts(@Body() body): Promise<Models.Product[]> {
    const productArray = this.productsService.processJsonArray(body);
    if (productArray) {
      return this.productsService.upsertProducts(productArray);
    }
    throw new ForbiddenException();
  }

@UseGuards(JwtAuthGuard)
  @Delete()
  deleteProducts(@Body() body): Promise<void> {
    const productArray = this.productsService.processJsonArray(body);
    if (productArray) {
      return this.productsService.deleteProducts(productArray);
    }
    throw new ForbiddenException();
  }


@UseGuards(JwtAuthGuard)
  @Put('restore')
  restoreProducts(@Body() body): Promise<Models.Product[]> {
    const productArray = this.productsService.processJsonArray(body);
    if (productArray) {
      return this.productsService.upsertProducts(productArray);
    }
    throw new ForbiddenException();
  }
}
