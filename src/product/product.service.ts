import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '../common/database/product/repositories/product.repositories';
import { ProductReadModel } from './model/product-read.model';
import { CreateProductModel } from './model/create-product.model';
import { UpdateProductModel } from './model/update-product.model';
import { GetProductsModel } from './model/get-product.model';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(model: CreateProductModel): Promise<ProductReadModel> {
    try {
      return await this.productRepository.create(model);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async findAll(model: GetProductsModel): Promise<{ data: ProductReadModel[]; total: number; page: number; limit: number }> {
    try {
      const [data, total] = await this.productRepository.findAll(model);
      return { data, total, page: model.page, limit: model.limit };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }

  async findById(id: string): Promise<ProductReadModel> {
    try {
      const product = await this.productRepository.findById(id);
      if (!product) throw new NotFoundException(`Product with id ${id} not found`);
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve product');
    }
  }

  async update(model: UpdateProductModel): Promise<ProductReadModel> {
    try {
      return await this.productRepository.update(model);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update product');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.productRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete product');
    }
  }
}