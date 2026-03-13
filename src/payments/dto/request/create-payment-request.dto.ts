import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePaymentRequestDto {
  @ApiProperty({ example: 'uuid-of-order' })
  @IsNotEmpty() 
  @IsUUID()
  orderId: string;

  @ApiPropertyOptional({ example: 'card', enum: ['card', 'cash', 'paypal'] })
  @IsOptional() 
  @IsString()
  method?: string;
}