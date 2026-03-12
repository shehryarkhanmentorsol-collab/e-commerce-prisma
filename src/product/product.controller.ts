import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../common/guards/roles.guards';
import { Roles } from '../common/decorators/roles.decorators';
import { UserRole } from '../user/enums/user.enum';
import { CreateRequestProductDto } from './dto/request/create-product-request.dto';
import { UpdateProductRequestDto } from './dto/request/update-product-request.dto';
import { GetProductsRequestDto } from './dto/request/get-product-request.dto';
import { ProductResponseDto } from './dto/response/product-response.dto';
import { CreateProductModel } from './model/create-product.model';
import { UpdateProductModel } from './model/update-product.model';
import { GetProductsModel } from './model/get-product.model';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a product (ADMIN only)' })
  async create(@Body() dto: CreateRequestProductDto): Promise<ProductResponseDto> {
    const model = CreateProductModel.fromDto(dto);
    const result = await this.productService.create(model);
    return ProductResponseDto.fromModel(result);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products with filters and pagination' })
  async findAll(@Query() dto: GetProductsRequestDto) {
    const model = GetProductsModel.fromDto(dto);
    const result = await this.productService.findAll(model);

    // later we move mapping logics to repo. make controller clean.
    return {
      data: result.data.map((p) => ProductResponseDto.fromModel(p)),
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    const product = await this.productService.findById(id);
    return ProductResponseDto.fromModel(product);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a product (ADMIN only)' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductRequestDto,
  ): Promise<ProductResponseDto> {
    const model = UpdateProductModel.fromDto(dto, id);
    const result = await this.productService.update(model);
    return ProductResponseDto.fromModel(result);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product (ADMIN only)' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.productService.delete(id);
  }
}