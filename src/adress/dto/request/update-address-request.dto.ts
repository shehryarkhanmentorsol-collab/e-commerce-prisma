import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateAddressRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  street1?: string;

  @ApiPropertyOptional() 
  @IsOptional() 
  @IsString() 
  street2?: string;

  @ApiPropertyOptional() 
  @IsOptional() 
  @IsString() 
  city?: string;

  @ApiPropertyOptional() 
  @IsOptional() 
  @IsString() 
  state?: string;

  @ApiPropertyOptional() 
  @IsOptional() 
  @IsString() 
  postalCode?: string;

  @ApiPropertyOptional() 
  @IsOptional() 
  @IsString() 
  country?: string;

  @ApiPropertyOptional() 
  @IsOptional() 
  @IsBoolean() 
  isDefault?: boolean;
}