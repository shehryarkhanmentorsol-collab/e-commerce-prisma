import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCartItemRequestDto {
  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  @IsInt() 
  @Min(1) 
  @Type(() => Number)
  quantity: number;
}