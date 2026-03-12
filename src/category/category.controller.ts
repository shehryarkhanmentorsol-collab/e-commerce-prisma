import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, Patch, Post, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../common/guards/roles.guards';
import { Roles } from '../common/decorators/roles.decorators';
import { UserRole } from '../user/enums/user.enum';
import { CreateCategoryRequestDto } from './dto/request/create-category-request.dto';
import { UpdateCategoryRequestDto } from './dto/request/update-category-request.dto';
import { CategoryResponseDto } from './dto/response/category-response.dto';
import { CreateCategoryModel } from './models/create-category.model';
import { UpdateCategoryModel } from './models/update-category.model';
import { CategoryReadResponseDto } from './dto/response/category-read-response.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a category (ADMIN only)' })
  async create(@Body() dto: CreateCategoryRequestDto): Promise<CategoryResponseDto> {
    const model = CreateCategoryModel.fromDto(dto);
    const result = await this.categoryService.create(model);
    return CategoryResponseDto.fromId(result.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  async findAll(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryService.findAll();
    // we can move it to repository make controller more clean 
    return categories.map((c) => CategoryReadResponseDto.fromModel(c));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  async findOne(@Param('id') id: string): Promise<CategoryResponseDto> {
    const category = await this.categoryService.findById(id);
    return CategoryReadResponseDto.fromModel(category);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a category (ADMIN only)' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    const model = UpdateCategoryModel.fromDto(dto, id);
    const result = await this.categoryService.update(model);
    return CategoryResponseDto.fromId(result.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a category (ADMIN only)' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.categoryService.delete(id);
  }
}