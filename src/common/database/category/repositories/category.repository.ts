import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { BaseRepository, IQueryOptions } from '../../base.repository';
import { CategoryReadModel } from '../../../../category/models/categroy-read.model';
import { CreateCategoryModel } from '../../../../category/models/create-category.model';
import { UpdateCategoryModel } from '../../../../category/models/update-category.model';

@Injectable()
export class CategoryRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async create(model: CreateCategoryModel, options?: IQueryOptions): Promise<{id: string}> {
    const { db } = this.parseOptions(options);
    try {
      const category = await db.category.create({ data: model.toCreateInput() });
      return CategoryReadModel.fromPrisma(category);
    } catch (error) {
        console.log("Error in repository category", error);
        
      throw new InternalServerErrorException('Failed to create category', {
        cause: new Error(`Error creating category: ${(error as Error).message}`),
      });
    }
  }

  async findAll(options?: IQueryOptions): Promise<CategoryReadModel[]> {
    const { db } = this.parseOptions(options);
    const categories = await db.category.findMany({ orderBy: { name: 'asc' } });
    return categories.map((c) => CategoryReadModel.fromPrisma(c));
  }

  async findById(id: string, options?: IQueryOptions): Promise<CategoryReadModel | null> {
    const { db } = this.parseOptions(options);
    const category = await db.category.findUnique({ where: { id } });
    return category ? CategoryReadModel.fromPrisma(category) : null;
  }

  async update(model: UpdateCategoryModel, options?: IQueryOptions): Promise<{id: string}> {
    const { db } = this.parseOptions(options);
    const existing = await db.category.findUnique({ where: { id: model.id } });
    if (!existing) throw new NotFoundException(`Category with id ${model.id} not found`);
    try {
      const updated = await db.category.update({
        where: { id: model.id },
        data: model.toUpdateInput(),
      });
      return CategoryReadModel.fromPrisma(updated);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update category', {
        cause: new Error(`Error updating category: ${(error as Error).message}`),
      });
    }
  }

  async delete(id: string, options?: IQueryOptions): Promise<void> {
    const { db } = this.parseOptions(options);
    const existing = await db.category.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Category with id ${id} not found`);
    try {
      await db.category.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete category', {
        cause: new Error(`Error deleting category: ${(error as Error).message}`),
      });
    }
  }
}