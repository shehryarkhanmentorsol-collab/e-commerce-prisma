import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderRequestDto {
  @ApiProperty({ example: 'uuid-of-address' })
  @IsNotEmpty() 
  @IsUUID()
  addressId: string;
}   