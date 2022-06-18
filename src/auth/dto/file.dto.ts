import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FileDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
  title: string;
  vendorName: string;
  quantity: number;
  price: number;
  deliveryDate: Date;
  expiryDate: Date;
}
