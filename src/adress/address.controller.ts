import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guards';
import { CurrentUser } from '../common/decorators/current-user.decorators';
import { CreateAddressRequestDto } from './dto/request/create-address-request.dto';
import { UpdateAddressRequestDto } from './dto/request/update-address-request.dto';
import { AddressResponseDto } from './dto/response/address-response.dto';
import { CreateAddressModel } from './models/create-address.model';
import { UpdateAddressModel } from './models/update-address.model';

@ApiTags('Addresses')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new address' })
  async create(@Body() dto: CreateAddressRequestDto, @CurrentUser() user: { id: string }): Promise<AddressResponseDto> {
    const model = CreateAddressModel.fromDto(dto, user.id);
    const result = await this.addressService.create(model);
    return AddressResponseDto.fromModel(result);
  }

  @Get()
  @ApiOperation({ summary: 'Get my addresses' })
  async findAll(@CurrentUser() user: { id: string }): Promise<AddressResponseDto[]> {
    const addresses = await this.addressService.findByUser(user.id);
    return addresses.map((a) => AddressResponseDto.fromModel(a));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an address' })
  async update(@Param('id') id: string, @Body() dto: UpdateAddressRequestDto, @CurrentUser() user: { id: string }): Promise<AddressResponseDto> {
    const model = UpdateAddressModel.fromDto(dto, id);
    const result = await this.addressService.update(model, user.id);
    return AddressResponseDto.fromModel(result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an address' })
  async delete(@Param('id') id: string, @CurrentUser() user: { id: string }): Promise<void> {
    await this.addressService.delete(id, user.id);
  }
}