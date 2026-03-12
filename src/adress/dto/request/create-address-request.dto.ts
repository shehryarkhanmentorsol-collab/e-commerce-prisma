import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressRequestDto {
  @ApiProperty({ example: '123 Main St' })
  @IsNotEmpty() @IsString()
  street1: string;

  @ApiPropertyOptional({ example: 'Apt 4B' })
  @IsOptional() @IsString()
  street2?: string;

  @ApiProperty({ example: 'New York' })
  @IsNotEmpty() @IsString()
  city: string;

  @ApiPropertyOptional({ example: 'NY' })
  @IsOptional() @IsString()
  state?: string;

  @ApiProperty({ example: '10001' })
  @IsNotEmpty() @IsString()
  postalCode: string;

  @ApiProperty({ example: 'US' })
  @IsNotEmpty() @IsString()
  country: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional() @IsBoolean()
  isDefault?: boolean;
}