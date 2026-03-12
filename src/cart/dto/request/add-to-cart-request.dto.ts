import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class AddToCartRequestDto {
  @ApiProperty({ example: 'uuid-of-product' })
  @IsNotEmpty() @IsUUID()
  productId: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional() @IsInt() @Min(1) @Type(() => Number)
  quantity?: number;
}