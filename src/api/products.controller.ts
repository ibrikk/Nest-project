import { Body, Controller, Get, Post, Put, Query, UseGuards, Delete, ForbiddenException } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import * as Models from '../models';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @UseGuards(JwtAuthGuard)
    @Get() // Returns in memory parsed JSON object
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
