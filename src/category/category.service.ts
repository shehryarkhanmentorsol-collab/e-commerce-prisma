import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from '../common/database/category/repositories/category.repository';
import { CategoryReadModel } from './models/categroy-read.model';
import { CreateCategoryModel } from './models/create-category.model';
import { UpdateCategoryModel } from './models/update-category.model';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(model: CreateCategoryModel): Promise<{id: string}> {
    try {
      return await this.categoryRepository.create(model);
    } catch (error) {
        console.log("create category error", error);
        
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async findAll(): Promise<CategoryReadModel[]> {
    try {
      return await this.categoryRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve categories');
    }
  }

  async findById(id: string): Promise<CategoryReadModel> {
    try {
      const category = await this.categoryRepository.findById(id);
      if (!category) throw new NotFoundException(`Category with id ${id} not found`);
      return category;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve category');
    }
  }

  async update(model: UpdateCategoryModel): Promise<{id: string}> {
    try {
      return await this.categoryRepository.update(model);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update category');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.categoryRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete category');
    }
  }
}