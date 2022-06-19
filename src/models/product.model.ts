import { ApiProperty } from '@nestjs/swagger';
export class Product {
  constructor(json) {
    this.id = json.id || null;
    this.title = json.title || null;
    this.vendorName = json.vendorName || null;
    this.quantity = json.quantity || null;
    this.price = json.price || null;
    this.deliverDate = json.deliverDate || null;
    this.expiryDate = json.expiryDate || null;
  }
  @ApiProperty()
  id: string;
  title: string;
  vendorName: string;
  quantity: number;
  price: number;
  deliverDate: string;
  expiryDate: string;
}