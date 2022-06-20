import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import * as Models from '../models';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  getProducts(@Body() body: string[]): Promise<Models.Product[]> {
    if (!Array.isArray(body)) {
      throw new BadRequestException(
        'Wrong data type, please send an array instead',
      );
    }
    if (body.length === 0) {
      return this.productsService.getAllActiveProducts();
    }
    return this.productsService.getProduct(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  upsertProducts(@Body() body): Promise<Models.Product[]> {
    if (!Array.isArray(body)) {
      throw new BadRequestException(
        'Wrong data type, please send an array instead',
      );
    }
    if (body.length === 0)
      throw new BadRequestException(
        'You are sending an empty array which will not get processed to a Product Model - Send an array of products',
      );

    const productArray = this.productsService.processJsonArray(body);
    if (productArray) {
      return this.productsService.upsertProducts(productArray);
    }
    throw new BadRequestException('Failed to process to a Product Model');
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteProductsById(@Body() body): Promise<void> {
    if (!Array.isArray(body)) {
      throw new BadRequestException();
    }
    if (body.length === 0) {
      throw new BadRequestException('Empty array! Please add products IDs');
    }
    return this.productsService.deleteProductsById(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('restore')
  restoreProducts(@Body() body): Promise<Models.Product[]> {
    if (!Array.isArray(body)) {
      throw new BadRequestException(
        'Wrong data type, please send an array instead',
      );
    }
    if (body.length === 0)
      throw new BadRequestException(
        'You are sending an empty array which will not get processed to a Product Model - Send an array of products',
      );

    const productArray = this.productsService.processJsonArray(body);
    if (productArray) {
      return this.productsService.upsertProducts(productArray);
    }
    throw new BadRequestException('Failed to process to a Product Model');
  }

  // localhost:3000/products?pid=33755a6e-0c33-4de2-8278-f7f7e25cdd74

  @UseGuards(JwtAuthGuard)
  @Get()
  getProductsById(@Query('pid') productId: string) {
    if (productId === '' || productId === undefined) {
      return this.productsService.getAllActiveProducts();
    }
    return this.productsService.getProductById(productId);
  }
}
