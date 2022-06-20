import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
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
  getProductsById(@Query('pid') productId: string) {
    if (productId === '' || productId === undefined) {
      return this.productsService.getAllActiveProducts();
    }
    return this.productsService.getProductById(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  getProducts(@Body() body: string[]): Promise<Models.Product[]> {
    if (body.length === 0 || body === undefined) {
      return this.productsService.getAllActiveProducts();
    }
    return this.productsService.getProduct(body);
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
  deleteProductsById(@Body() body): Promise<void> {
    // const productArray = this.productsService.processJsonArray(body);
    if (body.length === 0 || body === undefined) {  
      throw new ForbiddenException();
    }
    return this.productsService.deleteProductsById(body);
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
