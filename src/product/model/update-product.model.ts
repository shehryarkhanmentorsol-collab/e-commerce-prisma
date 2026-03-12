import { Prisma } from '@prisma/client';
import { UpdateProductRequestDto } from '../dto/request/update-product-request.dto';

export class UpdateProductModel {
  static fromDto(dto: UpdateProductRequestDto, id: string): UpdateProductModel {
    const model = new UpdateProductModel();
    model.id = id;
    model.name = dto.name;
    model.description = dto.description;
    model.price = dto.price;
    model.stock = dto.stock;
    model.categoryId = dto.categoryId;
    return model;
  }

  toUpdateInput(): Prisma.ProductUpdateInput {
    return {
      ...(this.name !== undefined && { name: this.name }),
      ...(this.description !== undefined && { description: this.description }),
      ...(this.price !== undefined && { price: this.price }),
      ...(this.stock !== undefined && { stock: this.stock }),
      ...(this.categoryId !== undefined && { category: { connect: { id: this.categoryId } } }),
    };
  }

  id: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
}