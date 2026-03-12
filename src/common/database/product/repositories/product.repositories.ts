import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { BaseRepository, IQueryOptions } from '../../base.repository';
import { ProductReadModel } from '../../../../product/model/product-read.model';
import { CreateProductModel } from '../../../../product/model/create-product.model';
import { UpdateProductModel } from '../../../../product/model/update-product.model';
import { GetProductsModel } from '../../../../product/model/get-product.model';

const productInclude = {
  images: true,
  category: true,
} satisfies Prisma.ProductInclude;

@Injectable()
export class ProductRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async create(model: CreateProductModel, options?: IQueryOptions): Promise<ProductReadModel> {
    const { db } = this.parseOptions(options);
    try {
      const product = await db.product.create({
        data: model.toCreateInput(),
        include: productInclude,
      });
      return ProductReadModel.fromPrisma(product);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create product', {
        cause: new Error(`Error creating product: ${(error as Error).message}`),
      });
    }
  }

  async findAll(model: GetProductsModel, options?: IQueryOptions): Promise<[ProductReadModel[], number]> {
    const { db } = this.parseOptions(options);
    const where: Prisma.ProductWhereInput = {
      ...(model.categoryId && { categoryId: model.categoryId }),
      ...(model.search && { name: { contains: model.search, mode: 'insensitive' } }),
    };
    const skip = (model.page - 1) * model.limit;
    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        skip,
        take: model.limit,
        include: productInclude,
        orderBy: { createdAt: 'desc' },
      }),
      db.product.count({ where }),
    ]);
    return [products.map((p) => ProductReadModel.fromPrisma(p)), total];
  }

  async findById(id: string, options?: IQueryOptions): Promise<ProductReadModel | null> {
    const { db } = this.parseOptions(options);
    const product = await db.product.findUnique({
      where: { id },
      include: productInclude,
    });
    return product ? ProductReadModel.fromPrisma(product) : null;
  }

  async update(model: UpdateProductModel, options?: IQueryOptions): Promise<ProductReadModel> {
    const { db } = this.parseOptions(options);
    const existing = await db.product.findUnique({ where: { id: model.id } });
    if (!existing) throw new NotFoundException(`Product with id ${model.id} not found`);
    try {
      const updated = await db.product.update({
        where: { id: model.id },
        data: model.toUpdateInput(),
        include: productInclude,
      });
      return ProductReadModel.fromPrisma(updated);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update product', {
        cause: new Error(`Error updating product: ${(error as Error).message}`),
      });
    }
  }

  async delete(id: string, options?: IQueryOptions): Promise<void> {
    const { db } = this.parseOptions(options);
    const existing = await db.product.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Product with id ${id} not found`);
    try {
      await db.product.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete product', {
        cause: new Error(`Error deleting product: ${(error as Error).message}`),
      });
    }
  }
}