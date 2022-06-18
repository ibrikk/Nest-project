import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FileDto {
  @IsNotEmpty()
  @ApiProperty()
  data: string;
}
